// ============================================================
//  Loupe — Canva Connect backend
//  Handles the OAuth 2.0 (PKCE) handshake with Canva and proxies
//  the read-only API the Loupe front-end needs.
//
//  Endpoints used by the front-end (all on this server):
//    GET  /auth/canva/login      -> redirects the user to Canva consent
//    GET  /auth/canva/callback   -> Canva redirects back here; sets session cookie
//    POST /auth/canva/logout     -> clears the session
//    GET  /api/me                -> { connected, profile }
//    GET  /api/designs?query=...  -> { items: [...] }   (real Canva design search)
//    GET  /api/assets            -> { items: [...] }    (uploaded images)
//
//  Node 18+ (global fetch). See README.md for setup.
// ============================================================
import "dotenv/config";

import express from "express";
import cors from "cors";
import session from "express-session";
import crypto from "node:crypto";

const {
  CANVA_CLIENT_ID,
  CANVA_CLIENT_SECRET,
  CANVA_REDIRECT_URI,          // e.g. https://your-backend.example.com/auth/canva/callback
  APP_ORIGIN,                  // comma-separated list of allowed front-end origins
  SESSION_SECRET = "change-me-in-production",
  CANVA_UPLOADS_FOLDER = "uploads", // folder id to list uploaded images from
  OPENAI_API_KEY,              // optional: enables AI visual indexing/search
  OPENAI_VISION_MODEL = "gpt-4.1-mini",
  OPENAI_EMBEDDING_MODEL = "text-embedding-3-small",
  PORT = 8787,
  NODE_ENV = "development",
} = process.env;

// --- Canva Connect well-known endpoints -------------------------------------
const AUTHORIZE_URL = "https://www.canva.com/api/oauth/authorize";
const TOKEN_URL = "https://api.canva.com/rest/v1/oauth/token";
const API = "https://api.canva.com/rest/v1";
const SCOPES = [
  "design:meta:read",
  "design:content:read",
  "asset:read",
  "profile:read",
  "folder:read"
];

const ALLOWED_ORIGINS = (APP_ORIGIN || "http://localhost:3000")
  .split(",").map(s => s.trim()).filter(Boolean);

if (!CANVA_CLIENT_ID || !CANVA_CLIENT_SECRET || !CANVA_REDIRECT_URI) {
  console.warn("[loupe] Missing CANVA_CLIENT_ID / CANVA_CLIENT_SECRET / CANVA_REDIRECT_URI — set them in your environment (.env).");
}

const app = express();
app.use(express.static(process.cwd()));
app.set("trust proxy", 1);

app.use(cors({
  origin(origin, cb) {
    // allow same-origin / curl (no origin) and any configured front-end origin
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    return cb(new Error("Origin not allowed by CORS: " + origin));
  },
  credentials: true,
}));

const crossSite = NODE_ENV === "production";

app.use(session({
  name: "loupe_sess",
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    sameSite: crossSite ? "none" : "lax",
    secure: crossSite,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
}));

// --- PKCE helpers ------------------------------------------------------------
const b64url = (buf) => buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const makeVerifier = () => b64url(crypto.randomBytes(48));
const challengeFor = (v) => b64url(crypto.createHash("sha256").update(v).digest());
const basicAuth = () => "Basic " + Buffer.from(`${CANVA_CLIENT_ID}:${CANVA_CLIENT_SECRET}`).toString("base64");

// --- Token exchange / refresh ------------------------------------------------
async function exchangeCode(code, codeVerifier) {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    code_verifier: codeVerifier,
    redirect_uri: CANVA_REDIRECT_URI,
  });
  const r = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Authorization": basicAuth(), "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!r.ok) throw new Error("token exchange failed: " + r.status + " " + (await r.text()));
  return r.json();
}

async function refresh(refreshToken) {
  const body = new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken });
  const r = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Authorization": basicAuth(), "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!r.ok) throw new Error("refresh failed: " + r.status);
  return r.json();
}

function storeToken(req, tok) {
  req.session.token = {
    access_token: tok.access_token,
    refresh_token: tok.refresh_token,
    expires_at: Date.now() + (tok.expires_in || 3600) * 1000,
  };
}

// Returns a valid access token, refreshing if needed. null if not authed.
async function validToken(req) {
  const t = req.session && req.session.token;
  if (!t) return null;
  if (Date.now() < t.expires_at - 60_000) return t.access_token;
  if (!t.refresh_token) return null;
  try {
    const fresh = await refresh(t.refresh_token);
    storeToken(req, fresh);
    return fresh.access_token;
  } catch (e) {
    req.session.token = null;
    return null;
  }
}

async function canvaGet(token, path) {
  const r = await fetch(API + path, { headers: { "Authorization": "Bearer " + token } });
  if (!r.ok) throw new Error("canva GET " + path + " -> " + r.status);
  return r.json();
}

async function canvaGetAllPages(token, path, params = {}, maxPages = 250) {
  const allItems = [];
  let continuation = null;
  let page = 0;

  do {
    const qs = new URLSearchParams();

    for (const [key, value] of Object.entries(params || {})) {
      if (value !== undefined && value !== null && value !== "") {
        qs.set(key, String(value));
      }
    }

    if (continuation) qs.set("continuation", continuation);

    const url = path + (qs.toString() ? `?${qs.toString()}` : "");
    const data = await canvaGet(token, url);

    if (Array.isArray(data.items)) allItems.push(...data.items);

    continuation = data.continuation || null;
    page += 1;
  } while (continuation && page < maxPages);

  return allItems;
}

function mapDesign(d) {
  return {
    id: d.id,
    title: d.title || "Untitled design",
    thumbnailUrl: d.thumbnail && d.thumbnail.url,
    editUrl: d.urls && d.urls.edit_url,
    viewUrl: d.urls && d.urls.view_url,
    updatedAt: d.updated_at || d.created_at,
    source: "Design",
    raw: d,
  };
}

function mapAsset(it) {
  const img = it.image || it;
  return {
    id: img.id || it.id,
    title: img.name || it.name || "Uploaded image",
    thumbnailUrl: (img.thumbnail && img.thumbnail.url) || (it.thumbnail && it.thumbnail.url),
    editUrl: null,
    viewUrl: img.url || it.url || null,
    updatedAt: img.updated_at || it.updated_at || img.created_at || it.created_at,
    source: "Upload",
    raw: it,
  };
}

async function getAllDesigns(token, query = "") {
  const rawItems = await canvaGetAllPages(
    token,
    "/designs",
    query ? { query } : {},
    250
  );

  const designs = rawItems.map(mapDesign);

  for (const design of designs) {
    design.pages = await getDesignPages(token, design.id);

    if (!design.pages.length && design.thumbnailUrl) {
      design.pages = [
        {
          id: design.id + "-cover",
          index: 1,
          thumbnailUrl: design.thumbnailUrl,
        },
      ];
    }
  }

  return designs;
}

async function getDesignPages(token, designId) {
  try {
    const data = await canvaGetAllPages(
      token,
      `/designs/${encodeURIComponent(designId)}/pages`,
      {},
      "items"
    );

    return data.map((page) => ({
      id: page.id || page.index,
      index: page.index,
      thumbnailUrl:
        page.thumbnail?.url ||
        page.thumbnail_url ||
        page.image?.url ||
        ""
    })).filter((p) => p.thumbnailUrl);
  } catch (e) {
    console.warn("[loupe] failed to load pages for design", designId, e.message);
    return [];
  }
}

async function getAllAssets(token) {
  const folderPath = `/folders/${encodeURIComponent(CANVA_UPLOADS_FOLDER)}/items`;
  let rawItems = [];

  try {
    rawItems = await canvaGetAllPages(token, folderPath, { item_types: "image" }, 250);
  } catch (e) {
    console.warn("[loupe] assets with item_types=image failed; retrying without item_types:", e.message);
    rawItems = await canvaGetAllPages(token, folderPath, {}, 250);
  }

  return rawItems
    .filter((it) => {
      const type = String(it.type || it.image?.type || "").toLowerCase();
      return type === "image" || !!it.image || !!it.thumbnail;
    })
    .map(mapAsset);
}


// --- AI visual search helpers ----------------------------------------------
// Local in-memory index for development. Restarting the server clears it.
// For production, move this to SQLite/Postgres/Supabase/Pinecone/etc.
const aiIndex = new Map();

function getOutputText(data) {
  if (!data) return "";
  if (typeof data.output_text === "string") return data.output_text;
  const chunks = [];
  for (const out of data.output || []) {
    for (const c of out.content || []) {
      if (typeof c.text === "string") chunks.push(c.text);
      if (typeof c.output_text === "string") chunks.push(c.output_text);
    }
  }
  return chunks.join("\n").trim();
}

function extractJson(text) {
  if (!text) return {};
  try { return JSON.parse(text); } catch (_) {}
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start >= 0 && end > start) {
    try { return JSON.parse(text.slice(start, end + 1)); } catch (_) {}
  }
  return { visibleText: "", objects: [], themes: [], context: text, searchableText: text };
}

async function openaiRequest(path, body) {
  if (!OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY in .env");

  const r = await fetch("https://api.openai.com/v1" + path, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + OPENAI_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!r.ok) {
    const text = await r.text();
    throw new Error("OpenAI API failed: " + r.status + " " + text);
  }

  return r.json();
}

async function analyzeImageWithOpenAI(item) {
  if (!item.thumbnailUrl) {
    return { visibleText: "", objects: [], themes: [], context: "", searchableText: item.title || "" };
  }

  const data = await openaiRequest("/responses", {
    model: OPENAI_VISION_MODEL,
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text:
              "Analyze this Canva design or uploaded image for visual search. " +
              "Return ONLY valid JSON with these keys: visibleText, objects, themes, context, searchableText. " +
              "visibleText should include readable text in the image. " +
              "objects should be a short array of visible objects/people/actions/settings. " +
              "themes should be a short array of topics/categories such as fitness, restaurant, sale, skincare, baby, real estate, logo, flyer, menu, ad, social post. " +
              "context should be a plain-language description of what is happening in the image. " +
              "searchableText should combine all useful search phrases. " +
              "Do not identify real people by name."
          },
          {
            type: "input_image",
            image_url: item.thumbnailUrl,
          },
        ],
      },
    ],
  });

  const parsed = extractJson(getOutputText(data));
  return {
    visibleText: parsed.visibleText || "",
    objects: Array.isArray(parsed.objects) ? parsed.objects : (parsed.objects ? [String(parsed.objects)] : []),
    themes: Array.isArray(parsed.themes) ? parsed.themes : (parsed.themes ? [String(parsed.themes)] : []),
    context: parsed.context || "",
    searchableText: parsed.searchableText || parsed.context || "",
  };
}

async function embedText(text) {
  const data = await openaiRequest("/embeddings", {
    model: OPENAI_EMBEDDING_MODEL,
    input: text || "empty",
  });

  return data.data[0].embedding;
}

function cosineSimilarity(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return 0;
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  if (!magA || !magB) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

function buildSearchableText(item, analysis) {
  return [
    item.title,
    item.source,
    analysis.visibleText,
    Array.isArray(analysis.objects) ? analysis.objects.join(", ") : analysis.objects,
    Array.isArray(analysis.themes) ? analysis.themes.join(", ") : analysis.themes,
    analysis.context,
    analysis.searchableText,
  ].filter(Boolean).join("\n");
}

async function indexOneItem(item) {
  const existing = aiIndex.get(item.id);
  if (existing && existing.updatedAt === item.updatedAt) return { skipped: true, item: existing };

  console.log("[loupe] AI analyzing:", item.title || item.id);
  const ai = await analyzeImageWithOpenAI(item);
  const aiSearchText = buildSearchableText(item, ai);
  const embedding = await embedText(aiSearchText);

  const indexed = { ...item, ai, aiSearchText, embedding, indexedAt: new Date().toISOString() };
  aiIndex.set(item.id, indexed);
  return { skipped: false, item: indexed };
}

async function searchAiIndex(query, limit = 100) {
  const q = String(query || "").trim();
  const all = Array.from(aiIndex.values());
  if (!q) return all.slice(0, limit);

  const queryEmbedding = await embedText(q);
  return all
    .map((item) => ({ ...item, score: cosineSimilarity(queryEmbedding, item.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// --- OAuth routes ------------------------------------------------------------
app.get("/auth/canva/login", (req, res) => {
  const verifier = makeVerifier();
  const state = b64url(crypto.randomBytes(16));
  req.session.oauth = { verifier, state };
  const params = new URLSearchParams({
    response_type: "code",
    client_id: CANVA_CLIENT_ID,
    redirect_uri: CANVA_REDIRECT_URI,
    scope: SCOPES.join(" "),
    code_challenge: challengeFor(verifier),
    code_challenge_method: "S256",
    state,
  });
  res.redirect(`${AUTHORIZE_URL}?${params.toString()}`);
});

app.get("/auth/canva/callback", async (req, res) => {
  const appUrl = `${ALLOWED_ORIGINS[0] || "/"}/Loupe.dc.html`;

  console.log("[loupe] callback query:", req.query);
  console.log("[loupe] saved oauth session:", req.session.oauth);

  try {
    const { code, state, error } = req.query;

    if (error) {
      console.error("[loupe] Canva returned error:", error);
      return res.redirect(`${appUrl}?error=${encodeURIComponent(String(error))}`);
    }

    const saved = req.session.oauth;

    if (!saved) {
      console.error("[loupe] No saved OAuth session. Cookie/session was not preserved.");
      return res.redirect(`${appUrl}?error=no_saved_oauth_session`);
    }

    if (state !== saved.state) {
      console.error("[loupe] State mismatch:", {
        returnedState: state,
        savedState: saved.state,
      });
      return res.redirect(`${appUrl}?error=state_mismatch`);
    }

    console.log("[loupe] Exchanging code for token...");

    const tok = await exchangeCode(String(code), saved.verifier);

    console.log("[loupe] Token exchange success:", {
      hasAccessToken: !!tok.access_token,
      hasRefreshToken: !!tok.refresh_token,
      expiresIn: tok.expires_in,
    });

    storeToken(req, tok);
    req.session.oauth = null;

    console.log("[loupe] Token stored in session.");

    return res.redirect(`${appUrl}?connected=1`);
  } catch (e) {
    console.error("[loupe] OAuth callback failed:", e);
    return res.redirect(`${appUrl}?error=${encodeURIComponent(e.message || String(e))}`);
  }
});

app.post("/auth/canva/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("loupe_sess");
    res.json({ ok: true });
  });
});

// --- API proxy ---------------------------------------------------------------
app.get("/api/me", async (req, res) => {
  const token = await validToken(req);
  if (!token) return res.json({ connected: false });
  try {
    const profile = await canvaGet(token, "/users/me/profile"); // { display_name }
    res.json({ connected: true, profile });
  } catch (e) {
    res.json({ connected: true, profile: null });
  }
});

app.get("/api/designs", async (req, res) => {
  const token = await validToken(req);
  if (!token) return res.status(401).json({ error: "not_connected" });

  try {
    const query = req.query.query ? String(req.query.query) : "";
    const items = await getAllDesigns(token, query);
    console.log(`[loupe] /api/designs returned ${items.length} items`);
    res.set("Cache-Control", "no-store");
    res.json({ items, count: items.length });
  } catch (e) {
    console.error("[loupe] designs:", e);
    res.status(502).json({ error: String(e.message) });
  }
});

app.get("/api/assets", async (req, res) => {
  const token = await validToken(req);
  if (!token) return res.status(401).json({ error: "not_connected" });

  try {
    const items = await getAllAssets(token);
    console.log(`[loupe] /api/assets returned ${items.length} items from folder ${CANVA_UPLOADS_FOLDER}`);
    res.set("Cache-Control", "no-store");
    res.json({ items, count: items.length });
  } catch (e) {
    // Folders/uploads listing varies by account; fail soft so designs still load.
    console.error("[loupe] assets:", e.message);
    res.json({ items: [], count: 0, error: String(e.message) });
  }
});

app.get("/api/library", async (req, res) => {
  const token = await validToken(req);
  if (!token) return res.status(401).json({ error: "not_connected" });

  try {
    const query = req.query.query ? String(req.query.query) : "";

    // Once the AI index exists, the existing Loupe search box can use visual AI search
    // without any front-end changes. Add ?ai=0 to force normal Canva/title search.
    if (query && req.query.ai !== "0" && aiIndex.size > 0) {
      const items = await searchAiIndex(query, 100);
      const designs = items.filter((x) => x.source === "Design");
      const uploads = items.filter((x) => x.source === "Upload");
      console.log(`[loupe] /api/library AI search returned ${items.length} items for "${query}"`);
      res.set("Cache-Control", "no-store");
      return res.json({
        items,
        designs,
        uploads,
        count: items.length,
        designsCount: designs.length,
        uploadsCount: uploads.length,
        ai: true,
        aiIndexedCount: aiIndex.size,
      });
    }

    const [designs, uploadsAll] = await Promise.all([
      getAllDesigns(token, query).catch((e) => {
        console.error("[loupe] library designs:", e.message);
        return [];
      }),
      getAllAssets(token).catch((e) => {
        console.error("[loupe] library assets:", e.message);
        return [];
      }),
    ]);

    const uploads = query
      ? uploadsAll.filter((x) => String(x.title || "").toLowerCase().includes(query.toLowerCase()))
      : uploadsAll;

    const items = [...designs, ...uploads];
    console.log(`[loupe] /api/library returned ${items.length} items (${designs.length} designs, ${uploads.length} uploads)`);
    res.set("Cache-Control", "no-store");
    res.json({ items, designs, uploads, count: items.length, designsCount: designs.length, uploadsCount: uploads.length, ai: false, aiIndexedCount: aiIndex.size });
  } catch (e) {
    console.error("[loupe] library:", e);
    res.status(502).json({ error: String(e.message) });
  }
});

app.get("/api/ai/status", async (_req, res) => {
  res.set("Cache-Control", "no-store");
  res.json({
    enabled: !!OPENAI_API_KEY,
    indexedCount: aiIndex.size,
    visionModel: OPENAI_VISION_MODEL,
    embeddingModel: OPENAI_EMBEDDING_MODEL,
  });
});

async function handleAiReindex(req, res) {
  const token = await validToken(req);
  if (!token) return res.status(401).json({ error: "not_connected" });
  if (!OPENAI_API_KEY) return res.status(400).json({ error: "Missing OPENAI_API_KEY in .env" });

  try {
    const limit = Math.max(1, Math.min(Number(req.query.limit || 500), 2000));
    const query = req.query.query ? String(req.query.query) : "";

    const [designs, uploads] = await Promise.all([
      getAllDesigns(token, query),
      getAllAssets(token),
    ]);

    const library = [...designs, ...uploads].filter((item) => !!item.thumbnailUrl).slice(0, limit);

    let indexed = 0;
    let skipped = 0;
    const failures = [];

    for (const item of library) {
      try {
        const result = await indexOneItem(item);
        if (result.skipped) skipped += 1;
        else indexed += 1;
      } catch (e) {
        console.error("[loupe] AI failed for", item.title || item.id, e.message);
        failures.push({ id: item.id, title: item.title, error: e.message });
      }
    }

    res.set("Cache-Control", "no-store");
    res.json({
      ok: true,
      indexed,
      skipped,
      failed: failures.length,
      failures: failures.slice(0, 20),
      totalIndexedNow: aiIndex.size,
      scanned: library.length,
      note: "This is an in-memory development index. Restarting the backend clears it.",
    });
  } catch (e) {
    console.error("[loupe] AI reindex failed:", e);
    res.status(500).json({ error: String(e.message || e) });
  }
}

app.post("/api/ai/reindex", handleAiReindex);
app.get("/api/ai/reindex", handleAiReindex); // browser-friendly local-dev shortcut

app.get("/api/ai/search", async (req, res) => {
  const token = await validToken(req);
  if (!token) return res.status(401).json({ error: "not_connected" });
  if (!OPENAI_API_KEY) return res.status(400).json({ error: "Missing OPENAI_API_KEY in .env" });

  try {
    const query = String(req.query.query || "").trim();
    const limit = Math.max(1, Math.min(Number(req.query.limit || 100), 250));
    const items = await searchAiIndex(query, limit);
    const designs = items.filter((x) => x.source === "Design");
    const uploads = items.filter((x) => x.source === "Upload");

    res.set("Cache-Control", "no-store");
    res.json({
      items,
      designs,
      uploads,
      count: items.length,
      designsCount: designs.length,
      uploadsCount: uploads.length,
      aiIndexedCount: aiIndex.size,
    });
  } catch (e) {
    console.error("[loupe] AI search failed:", e);
    res.status(500).json({ error: String(e.message || e) });
  }
});

app.get("/", (_req, res) => res.json({ ok: true, service: "loupe-canva-backend", aiIndexedCount: aiIndex.size }));

app.get("/", (req, res) => {
  res.redirect("/Loupe.dc.html");
});

app.listen(PORT, () => console.log(`[loupe] backend listening on :${PORT}`));
