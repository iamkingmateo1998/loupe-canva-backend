# Brief — Design System

> The brand & UI system for **Brief**, an AI writing tool that auto-generates clear, structured task descriptions inside Asana.
> Full product name: *Asana Description Writer*. Short brand name / wordmark: **Brief**.

Brief turns a one-line idea ("redesign the onboarding email") into a complete, well-structured task description — context, acceptance criteria, links, and next steps — so anyone on the team can pick the task up and run with it. The product personality is that of a **calm, literate writing assistant**: editorial, warm, and human, never a noisy dashboard.

---

## 1. Product context

- **What it is:** an AI assistant that writes task descriptions. The user gives brief inputs (a title, a few bullets, links); Brief expands them into a clean, consistent description with sections.
- **Where it lives:** primarily a focused **web app — the writer/editor** (the surface built out as a UI kit here). It connects to Asana to read/write tasks.
- **Who it's for:** PMs, EMs, designers, and ICs who create a lot of tasks and want them to be legible to the whole team.
- **The core loop:** *Input → Generate → Refine → Push to Asana.* The editor is the home base; generation is one action away at all times.

### Sources
No external codebase, Figma, or brand assets were provided for this build. The brand, tokens, components, and UI kit were **designed from scratch** to the brief: *calm & editorial, warm coral/amber, serif display + sans body, encouraging human tone.* If a real Figma/codebase or brand kit exists, re-attach it and this system should be reconciled against it.

> **Naming note / open question:** I introduced **"Brief"** as a short, ownable wordmark ("a brief" = a task description). The literal product name remains *Asana Description Writer*. Confirm whether you want to lead with "Brief" or the literal name.

---

## 2. Content fundamentals (voice & tone)

Brief sounds like **a sharp, encouraging teammate who happens to be a great writer.** Helpful, warm, never cutesy, never corporate.

- **Person:** Talk to the user as **"you."** Brief refers to itself sparingly and in first person ("I'll draft that") only in conversational/generative moments — most UI copy is plain and subjectless ("Generating description…").
- **Tone:** Encouraging and human. Celebrate progress lightly; never gush. *"Nice — that's ready to ship to Asana."* not *"🎉 Amazing job!!!"*
- **Casing:** **Sentence case everywhere** — buttons, headings, menus, labels. ("Generate description", not "Generate Description"). The only uppercase is the **mono eyebrow label** style (small, tracked, e.g. `CONTEXT`, `ACCEPTANCE CRITERIA`).
- **Length:** Short and concrete. Prefer verbs. Microcopy under buttons/empty states is one sentence. Editorial/marketing moments may use a single serif sentence for warmth.
- **Editorial accent:** Use *italic serif* for the product's "voice" — quoted suggestions, example outputs, taglines. e.g. *"Tell me what needs doing — I'll write the rest."*
- **No emoji** in product UI. (A rare single mark in a celebratory toast is the absolute ceiling — default to none.)
- **Punctuation:** Em dashes for asides, oxford commas, no exclamation-point inflation. Periods on full-sentence helper text; none on labels/buttons.
- **Numbers & structure:** Brief loves structure — its output is sectioned (Context / Acceptance criteria / Resources). Mirror that calm structure in the UI copy.

**Examples**
- Empty state: *"Start with a title. Add a few bullets if you have them — Brief fills in the rest."*
- Button: `Generate description` · `Refine` · `Push to Asana`
- Toast (success): `Pushed to Asana — view task`
- Toast (error): `Couldn't reach Asana. Retry?`
- Tagline: *Task descriptions, written for you.*
- Eyebrow label: `ACCEPTANCE CRITERIA`

---

## 3. Visual foundations

The feeling is **warm paper + ink + a coral pen.** Editorial calm with generous whitespace; one confident accent color; serif for thought, sans for action.

### Color
- **Primary — Coral `#E1542C`.** The pen. Used for the primary action, the brand mark, links (a deeper `coral-600`), focus accents, and selection. Used *sparingly* — one coral thing per view, usually.
- **Accent — Amber `#D98A1A` / `amber-300 #EEB54A`.** The "spark" of generation. Highlights, the mark's spark dot, subtle in-progress shimmer, sparing data accents.
- **Neutrals — "Paper" + "Ink".** Backgrounds are warm off-white *paper* (`--paper-0 #FBF6F0`), surfaces are a near-white warm white (`#FFFDFB`). Text and lines are warm gray-brown *ink*, never pure black or cool gray.
- **Semantics:** green `#2F8F5B` (done/success), blue `#3B6FB0` (info — the only cool hue, used for contrast), red `#C23522` (danger), amber (warning). Each has a `-subtle` tint background.
- **Imagery vibe:** warm, natural light, paper/desk textures, soft focus. No cold corporate stock, no neon, no purple gradients.

### Type
- **Newsreader (serif)** — display & headings, and *italic* for the product's voice. Editorial, optical, literary.
- **Hanken Grotesk (sans)** — all UI and body text. Warm humanist grotesque, highly legible.
- **IBM Plex Mono** — eyebrow labels, metadata, section keys, keyboard hints. Uppercase + tracked for labels.
- Scale runs 11px → 76px; UI body is 15px, reading body 17px, hero up to 60–76px serif. Headings are medium (500) serif, never heavy.

### Space & layout
- **4px base grid.** Generous: editorial whitespace is a feature, not waste. Reading column capped at ~68ch.
- Fixed left **sidebar (264px)** in the app; content centered with comfortable margins.
- Sections separated by space and hairlines, not heavy boxes.

### Shape, border, shadow
- **Corner radii:** gently rounded — inputs/buttons `10px`, cards `14px`, large surfaces `20px`, pills `999px`. Nothing sharp, nothing bubbly.
- **Borders:** 1px warm hairlines (`--border-default #D8CDC0`, subtle `#EAE1D5`). Cards often use a hairline *instead of* a heavy shadow.
- **Shadows:** soft, low, **warm-tinted** (brown rgba, not gray/black). `--shadow-sm/md/lg` lift cards and popovers a little; never a hard drop shadow. An inset hairline (`--shadow-hairline`) lifts surfaces off the paper.
- **Cards** = warm white surface + 14px radius + hairline border + optional `--shadow-sm`. Calm, not floaty.

### Motion
- **Calm and quick.** `--dur-fast 120ms` for hovers, `--dur-base 200ms` for most transitions, `--dur-slow 320ms` for entrances.
- **Easing:** `--ease-out` (cubic-bezier(.22,1,.36,1)) for entrances; gentle. **No bounce, no spring, no parallax.**
- Generation is the one expressive moment: a soft amber shimmer / typewriter reveal as text streams in. Otherwise fades and small (2–4px) slides.

### States
- **Hover:** primary buttons darken to `coral-600`; ghost/secondary get a faint `--paper-50`/`--brand-subtle` wash. Links underline.
- **Press/active:** darken one more step (`coral-700`) + subtle 0.99 scale or 1px translate; no big squish.
- **Focus:** 3px soft coral ring (`--focus-ring`), never a default browser outline.
- **Disabled:** 45% opacity, no shadow, `not-allowed`.
- **Selected:** `--brand-subtle` background + coral text/left accent for list items.

### Transparency & blur
- Used lightly: sticky headers and popovers may use a `--paper-0` at ~85% with `backdrop-filter: blur(8px)`. Modal scrims are warm ink at ~35%. No glassmorphism everywhere.

---

## 4. Iconography

- **System: [Lucide](https://lucide.dev)** — loaded from CDN. Thin (1.5–2px), rounded-join, open line icons match the calm editorial feel. This is a **substitution** (no icon set was provided) — flagged for your confirmation.
  - In static HTML (cards, UI kit): `<script src="https://unpkg.com/lucide@latest"></script>` then `lucide.createIcons()`, using `<i data-lucide="sparkles"></i>`.
  - Default stroke `1.75`, size 18–20px in UI, color `currentColor` (inherits ink).
- **Common icons:** `sparkles` (generate), `wand-2` / `pen-line` (write/refine), `list-checks` (acceptance criteria), `link`, `paperclip`, `check`, `arrow-up-right` (push to Asana), `settings`, `history`, `search`, `plus`.
- **No emoji** as icons. **No unicode glyphs** as functional icons (the mono eyebrow + Lucide cover labeling).
- **Brand mark** (`assets/logo-mark.svg`) is the only bespoke glyph — three text lines completing with an amber spark. Don't substitute it with a Lucide icon.
- If you adopt a real icon set later, swap the CDN link and keep the stroke weight ≈1.75 to preserve the feel.

---

## 5. Index / manifest

**Root**
- `styles.css` — global entry point (import this). `@import`s everything below.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skills-compatible entry for use in Claude Code.

**`tokens/`**
- `colors.css` · `typography.css` · `spacing.css` (radii/shadow/motion/layout) · `fonts.css` (`@font-face`/imports) · `base.css` (element defaults + `.eyebrow`, `.display`, `.prose`, `.in-voice`).

**`assets/`**
- `logo-mark.svg` · `wordmark.svg` · `wordmark-reversed.svg`.

**`guidelines/`** — foundation specimen cards (Type, Colors, Spacing, Brand) shown in the Design System tab.

**`components/`** — reusable React primitives (each: `<Name>.jsx` + `.d.ts` + `.prompt.md`, with one demo card per folder):
- `buttons/` — **Button** (primary/secondary/ghost/danger · sm/md/lg · icon · loading), **IconButton** (ghost/bordered/solid).
- `forms/` — **Input** (label/hint/error/icon), **Textarea** (char count), **Switch**, **Checkbox**.
- `display/` — **Badge** (status tones), **Tag** (icon + removable), **Avatar** (initials/image), **Card** (header/variants/interactive), **SectionLabel** (mono eyebrow).
- Starting points: **Button**, **Card** (components) and the **Writer app** screen.

**`ui_kits/writer/`** — the Brief writer web app, interactive (`index.html` + `Sidebar/Composer/DescriptionView/App.jsx` + `app.css`). Flow: compose → generate → edit → push to Asana. See `ui_kits/writer/README.md`.

> Namespace for runtime components: see `check_design_system` output (`window.<Namespace>.<Component>`).
