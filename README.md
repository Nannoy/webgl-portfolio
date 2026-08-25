# Kage — Live Kyoto Temple Landing Page

A five-chapter immersive landing page built entirely in the browser. No framework, no build step, no bundler. One HTML file. Every texture is generated at runtime via Canvas 2D API and rendered live in WebGL through Three.js.

---

## Architecture decision

> **Keep it as a single HTML file. Do not port to React or Next.js.**

This is not a compromise — it is the right call for this project:

| Concern | Single HTML | React / Next.js |
|---|---|---|
| Build complexity | None | npm, bundler, transpiler |
| WebGL integration | Direct, zero overhead | Extra abstraction layer |
| Deployment | Upload one file | CI pipeline, build step |
| Performance | No JS framework cost | Framework runtime in bundle |
| Three.js compatibility | Pinned to exact version | Risk of peer dep conflicts |
| Customization | Edit and refresh | Edit, build, refresh |

The Three.js scene uses a tightly optimized vanilla JS render loop, a custom cloth physics simulation, procedural texture generators, and a custom scroll–camera rig. None of that benefits from React's component model. Wrapping it in a framework adds complexity and removes control with zero upside.

If you want to expand this into a **multi-page portfolio** (about, work, contact, etc.), the right pattern is:
- Keep `kage.html` as-is for this experience
- Add other plain HTML pages alongside it
- Use a static-site host (Vercel, Netlify, Cloudflare Pages) that serves them all

---

## Project structure

```
threeui-portfolio/
├── README.md          ← this file
├── .gitignore
├── package.json       ← dev server only (no build step)
└── index.html         ← the entire application
```

### Why `package.json` if there's no build step?

Only to provide a one-command local dev server (`npm run dev`) so the browser can fetch fonts and assets from ThreeUI's CDN without CORS issues that some browsers enforce on `file://` protocol.

---

## Running locally

```bash
npm install
npm run dev
```

Opens on `http://localhost:5173` (Vite) or `http://localhost:3000` depending on your setup.

Alternatively, with no npm at all:

```bash
npx serve .
# or
python3 -m http.server 8080
```

---

## Section map

The page is divided into six visual chapters plus a nav and footer. All text content lives in `kage.html` between lines ~895 and ~1194. The JavaScript (Three.js scene, scroll engine, cloth simulation) lives below line 1205.

### Preloader (lines 895–909)
Shows while the 3D scene builds. Fully CSS-animated — no JS.

| Element | Selector / Line | Editable value |
|---|---|---|
| Loading label | `<span>Raising the mountain temple</span>` | Any string |
| Japanese subtitle | `.pre-jp` · `影の道` | Any text |
| Logo SVG | `.pre-mark svg` | Swap for your own SVG |

---

### Navigation (lines 911–928)

| Element | Line | Current |
|---|---|---|
| Brand name | 919 | `KAGE` |
| Brand tagline | 919 | `HIDDEN REALMS OF KYOTO` |
| Nav link 1 | 922 | Temples / 伽藍 |
| Nav link 2 | 923 | Gardens / 庭園 |
| Nav link 3 | 924 | Rituals / 神事 |
| Nav link 4 | 925 | Afterlight / 残光 |

The nav has a scroll-hide behaviour, a blur-backdrop sticky mode, and a slide-in mobile sheet. All CSS-driven — just change the text.

---

### Chapter 00 — Hero (lines 932–974)

The full-viewport opening scene. The 3D wordmark `KAGE` floats in the scene behind the copy. The background is live WebGL.

| Element | Line | Current |
|---|---|---|
| Eyebrow | 935 | `Chapter 00 — The Hidden Gate` |
| Headline line 1 | 937 | `Where stillness` |
| Headline line 2 | 938 | `reveals the` |
| Headline line 3 | 939 | `unseen.` |
| Subheading | 941–942 | Body copy |
| Scroll cue label | 948 | `Scroll to enter` |
| Chapter chip 01 | 950–951 | Thresholds · description |
| Chapter chip 02 | 952–953 | Still Gardens · description |
| Chapter chip 03 | 954–955 | Sacred Craft · description |
| Chapter chip 04 | 956–957 | Night Rituals · description |
| Peek window caption | 966 | `Sanmon — before the bell` |
| Side text (vertical) | 972 | `影の道` |
| No-WebGL fallback word | 969 | `KAGE` |

---

### Chapter I — The Sanmon (lines 976–1015)

Two-column section with headline, body copy, stats bar. Foreground: temple wall PNG, pine tree PNG, tall grass PNG.

| Element | Line | Current |
|---|---|---|
| Section label | 991 | `01 — The Sanmon` / `山門` |
| Headline | 994 | `Charred cypress, worn stone…` |
| Lead paragraph | 996–998 | Body copy |
| Second paragraph | 999–1002 | Body copy |
| CTA link | 1004 | `Cross the threshold` |
| Stat 1 | 1010 | `05` / `Chapters` |
| Stat 2 | 1011 | `92` / `Minutes` |
| Stat 3 | 1012 | `1611` / `Hall raised` |
| Stat 4 | 1013 | `∞` / `Stillness` |

---

### Chapter II — Still Gardens (lines 1017–1063)

Three-card grid (mosaic layout). Each card is a live viewport scissored into the 3D scene — the frame animates as you hover. Foreground: sakura branch, maple leaves, stone lantern, garden bush.

| Element | Line | Current |
|---|---|---|
| Section label | 1035 | `02 — Still Gardens` / `庭園` |
| Card 1 title | 1042 | `Approach` / `参道` |
| Card 1 meta | 1044 | `The long climb` / `01 / 03` |
| Card 2 title | 1050 | `Lanterns` / `灯籠` |
| Card 2 meta | 1052 | `Lantern court` / `02 / 03` |
| Card 3 title | 1058 | `Moonwater` / `月影` |
| Card 3 meta | 1060 | `The wet court` / `03 / 03` |

**Card background images** — CSS lines ~285–298. Replace URLs:
```css
url('https://threeui.com/landing-pages/secret-pathways-assets/generated/kage-approach.webp')
url('https://threeui.com/landing-pages/secret-pathways-assets/generated/kage-lantern-court.webp')
url('https://threeui.com/landing-pages/secret-pathways-assets/generated/kage-moonwater.webp')
```

---

### Chapter III — Sacred Craft (lines 1065–1119)

Curriculum / content list. Five rows with number, title, description, duration. Foreground: temple wall (flipped), basalt stones, tall grass.

| Element | Line | Current |
|---|---|---|
| Section label | 1080 | `03 — Sacred Craft` / `手業` |
| Section headline | 1083 | `Five chapters. Ninety minutes…` |
| Section intro | 1084–1085 | Body copy |
| Row 01 | 1088–1092 | The Hidden Gate · 14 min |
| Row 02 | 1094–1098 | Borrowed Scenery · 18 min |
| Row 03 | 1100–1104 | Charred Cypress · 21 min |
| Row 04 | 1106–1110 | Lantern Light · 17 min |
| Row 05 | 1112–1116 | The Vermilion Moon · 22 min |

---

### Chapter IV — Afterlight (lines 1121–1146)

Full-viewport closing chapter. Centered headline + CTA. Foreground: hill silhouette, shrine ruins, tall grass, sakura branch.

| Element | Line | Current |
|---|---|---|
| Eyebrow | 1138 | `Chapter 04 — Afterlight` |
| Headline | 1139 | `Afterlight` |
| Body copy | 1140–1141 | One paragraph |
| CTA button | 1143 | `Begin the walk` |

---

### Footer (lines 1148–1194)

| Element | Line | Current |
|---|---|---|
| Brand description | 1168–1169 | One paragraph |
| Footer col 1 (Chapters) | 1171–1176 | 4 links |
| Footer col 2 (Practice) | 1177–1182 | 4 links |
| Footer col 3 (Elsewhere) | 1183–1187 | 3 links |
| Copyright | 1190 | `© 2026 Kage — Kage no Michi` |
| Japanese tagline | 1191 | `静けさは一つの技である` |
| Tech credit | 1192 | `WebGL · Onest · Kyoto` |

---

## Design tokens (CSS variables, lines 12–27)

Change these to re-skin the entire page:

```css
:root {
  --ink:       #05070a;   /* page black */
  --bone:      #dfe7e0;   /* all text */
  --vermilion: #e0231c;   /* primary accent — nav dot, hover bar, CTA */
  --ember:     #ff5a3c;   /* hover accent */
  --gold:      #c9a24a;   /* gold accent */
}
```

---

## 3D scene customisation (JavaScript, line 1205+)

The entire WebGL scene is procedural — no external images. Search for these to make structural changes:

| What | Search term | Effect |
|---|---|---|
| 3D wordmark text | `const word = 'KAGE'` | The giant floating letters |
| Moon position | `const MOON = {` | x / y / z / radius |
| Moon color | `hdr(3.6, .64, .61)` | Tint — currently blood red |
| Fog density | `FogExp2(0x050a0e, 0.0168)` | Second arg: thicker = denser |
| Background sky | `new THREE.Color(0x060a0d)` | Scene base color |
| Lantern warmth | `hdr(2.3, .30, .085)` | Pane glow color |
| Paper glow | `hdr(1.06, .48, .18)` | Interior light color |
| Temple wall tone | `color: 0x565150` in `buildTemple` | Timber darkness |
| Torii lacquer | `hdr(1.72, 1.02, .94)` in `buildTorii` | Gate color |

---

## Foreground PNG overlays

These are decorative nature images that layer over the 3D scene. Hosted on ThreeUI CDN. To replace with your own images, swap the `src` attribute on each `<img>` inside `.fg` divs:

| File | Used in |
|---|---|
| `temple-wall.webp` | Chapter I (left), Chapter III (right, flipped) |
| `pine-tree.webp` | Chapter I (right edge) |
| `tall-grass.webp` | Chapters I, II, III, IV, Footer |
| `sakura-branch.webp` | Chapter II (left, sway), Chapter IV (left) |
| `maple-leaves.webp` | Chapter II (right, sway) |
| `stone-lantern.webp` | Chapter II |
| `garden-bush.webp` | Chapter II (right), Footer |
| `basalt-stones.webp` | Chapter III, Footer |
| `hill.webp` | Chapter IV (horizon) |
| `shrine-ruins.webp` | Chapter IV (left) |

---

## Deployment

### Vercel (recommended)

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main

# 2. Install Vercel CLI
npm i -g vercel

# 3. Deploy
vercel
```

First deploy asks a few questions, then gives you a `*.vercel.app` URL. Every subsequent `git push` auto-deploys.

Since `kage.html` is not `index.html`, visitors need to go to `/kage`. To serve it at the root, either rename the file to `index.html` or add `vercel.json`:

```json
{
  "rewrites": [{ "source": "/", "destination": "/kage.html" }]
}
```

---

## Local development

```bash
npm install   # installs vite as a dev dependency
npm run dev   # serves on http://localhost:5173
```

No build output is ever generated. `npm run dev` is purely a local HTTP server to avoid `file://` protocol restrictions when loading CDN fonts.

---

## Assets hosted externally

All assets below are loaded from `https://threeui.com/landing-pages/secret-pathways-assets/`. They are referenced by absolute URL in `kage.html` and served over HTTPS. No local copies are needed to run or deploy the page.

| Asset | Purpose |
|---|---|
| `fonts.css` | Onest (300/400/500/700), NotoJP (400), Wordmark (500/600) — all base64-embedded WOFF2 |
| `three.min.js` | Three.js WebGL library |
| `generated/kage-*.webp` | Card background stills (4 images) |
| `foreground/png/*.webp` | Foreground nature overlays (10 images) |

To fully self-host (remove CDN dependency), download these files into a local `assets/` folder and update the `src`/`href` paths accordingly.
