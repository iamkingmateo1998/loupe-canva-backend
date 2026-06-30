# Loupe — Canva backend

This small server makes the Loupe front-end a **real** Canva integration. It runs the
OAuth 2.0 (PKCE) handshake with Canva, keeps the tokens server-side (never in the
browser), and proxies the read-only Canva API the front-end needs.

```
Browser (Loupe.dc.html)
   │  "Connect Canva account"
   ▼
GET  /auth/canva/login   ──redirect──►  Canva consent screen
                                              │ user approves
GET  /auth/canva/callback ◄──redirect──┘  (code) → exchanges for tokens, sets cookie
   │  redirect back to the app (?connected=1)
   ▼
GET /api/me · /api/designs?query= · /api/assets   (cookie-authed proxy)
```

Why a backend is required: Canva's token exchange needs your **client secret** (which can
never live in front-end HTML), and Canva's REST API rejects direct browser calls (CORS).
The server holds the secret and makes the calls.

---

## 1. Create a Canva Connect app

1. Go to **https://www.canva.com/developers/** → *Your integrations* → **Create an integration**.
2. Add the **redirect URL** — it must exactly match `CANVA_REDIRECT_URI`, e.g.
   `https://your-backend.example.com/auth/canva/callback`
   (for local dev: `http://127.0.0.1:8787/auth/canva/callback`).
3. Enable these **scopes**: `design:meta:read`, `asset:read`, `profile:read`, `folder:read`.
4. Copy the **Client ID** and **Client secret**.

## 2. Configure & run

```bash
cd canva-backend
cp .env.example .env        # fill in the values from step 1
npm install
npm start                   # -> http://localhost:8787
```

Set in `.env`:

| var | what |
|-----|------|
| `CANVA_CLIENT_ID` / `CANVA_CLIENT_SECRET` | from your Canva app |
| `CANVA_REDIRECT_URI` | the redirect URL you registered (…`/auth/canva/callback`) |
| `APP_ORIGIN` | where Loupe's front-end is served (the origin shown in Loupe → Settings) |
| `SESSION_SECRET` | a long random string |
| `NODE_ENV` | `production` when served over HTTPS (required for cross-site cookies) |

## 3. Point Loupe at it

Open Loupe → **Settings** → paste your backend base URL (e.g. `https://your-backend.example.com`)
→ **Save** → **Connect Canva account**.

---

## Notes & limits

- **HTTPS in production.** If the front-end and backend are on different domains, browsers
  require `SameSite=None; Secure` cookies — so both must be HTTPS and `NODE_ENV=production`.
  Easiest alternative: serve the front-end and backend from the **same origin** (e.g. host
  `Loupe.dc.html` behind the same server / a reverse proxy) and cookies "just work".
- **Search** uses Canva's `GET /v1/designs?query=` — it matches your design titles/metadata
  (not full visual semantic search). The Loupe UI is wired to call it live.
- **Uploaded images** are read via the Folders API (`/v1/folders/{id}/items`). Which folder
  holds uploads can vary by account; set `CANVA_UPLOADS_FOLDER` accordingly. If listing fails
  it fails soft so your designs still load.
- **Endpoints assumed** (verify against current Canva Connect docs, which evolve):
  authorize `https://www.canva.com/api/oauth/authorize`,
  token `https://api.canva.com/rest/v1/oauth/token`,
  `GET /rest/v1/users/me/profile`, `GET /rest/v1/designs`, `GET /rest/v1/folders/{id}/items`.
- This server keeps tokens in a signed cookie session for simplicity. For multi-user or
  production scale, swap `cookie-session` for a server-side session/token store.

## Deploy

Any Node 18+ host works (Render, Railway, Fly, a VPS, etc.). Deploy `canva-backend/`, set the
env vars, and make sure `CANVA_REDIRECT_URI` matches the deployed URL **and** the Canva app
registration.
