# VyuSoft Marketing Site — Context Handoff

> Self-contained briefing so any AI/engineer can pick up cold. Updated
> 2026-06-10. Earlier code save point: git commit `2b25388` (service-page
> rollout + bug sweep). The site itself is in good shape; the open thread is
> the **3D background**, which is currently PAUSED at the user's instruction.

---

## 1. Project + stack

Premium marketing site for **VyuSoft**, a software engineering studio. Owner:
**karthik@vyusoft.com** — drives design, validates everything **visually**.

- **Next.js 16.2.6** App Router + Turbopack, **React 19**, **TypeScript** (strict)
- **Tailwind v4** (CSS-first `@theme` in `app/globals.css`)
- **Framer Motion 12**, **Lenis** (global smooth scroll), **lucide-react**, **geist**
- **three@0.184.0** (added for the 3D experiments)
- 71 static routes. Windows / PowerShell. git via git-bash.
- **`next lint` is removed in Next 16** → use `npx eslint .`. Type-check: `npx tsc --noEmit`.
- Read `AGENTS.md`: this Next version differs from training data; check
  `node_modules/next/dist/docs/` before framework work.

---

## 2. How the user works (READ THIS FIRST — it's the whole game)

- **Validation is 100% visual.** He cannot judge from descriptions, only from
  what renders. Expected loop: you build → "completed, validate" → he looks →
  reacts. Never ask him to imagine.
- **Verify with your OWN eyes before showing him.** Shipping unseen burned
  trust (a bloom bug rendered the whole scene white and I didn't catch it).
- **He is frustrated about wasted tokens / endless iteration.** Do NOT grind
  many speculative versions. If you're guessing, stop and get a concrete target.
- Small targeted changes; no unrequested decisions; don't over-narrate.
- **No AI-slop.** He has explicitly rejected: spinning particle balls, node
  graphs, floating chrome blobs, wireframe/"sketchy" looks, plain white/grey
  voids, and generic letterform/bar-chart shapes.
- **References = taste only, never copy/replicate.** He's firm on this.

### Recurring technical gotchas
- **Turbopack dev cache lags one edit → blank/unstyled page.** Fix: stop dev
  server, delete `.next`, restart. `next build` is always correct.
- Dev server locks `.next` on Windows → stop it before `next build`.
- **Claude preview MCP is broken this session** (starts server, then "Server
  not found"). Don't rely on it. What works for visual checks:
  - User's dev server at **http://localhost:3000**.
  - **gstack /browse headless browser**: `B="$HOME/.claude/skills/gstack/browse/dist/browse"`
    then `"$B" goto <url>`, `"$B" console --errors`, `"$B" screenshot --viewport /tmp/x.png`,
    `"$B" js "window.scrollTo(0, document.documentElement.scrollHeight)"`. **Always Read
    the PNGs to actually look.** This is how bugs were finally caught.

---

## 3. Site state (shipped, solid — leave unless asked)

Data-driven from `lib/`: `nav.ts` (master: 5 service groups × 6 = 30 services,
17 industries, 4 products, 7 dev phases) → `services.ts`, `servicePages.ts`,
`serviceMeta.ts`, `industries.ts`, `industryMeta.ts`, `products.ts`,
`development.ts`, `motion.ts`.

- All 30 `/services/[slug]` use the redesigned layout fed by `servicePages.ts`.
- Industries, products, development, about, contact, legal (terms/privacy) done.
- Theming: sections set `data-theme="dark"|"light"`; header logo cross-fades.
  Dark sections are transparent over a fixed `PageBackdrop`
  (`components/layout/PageBackdrop.tsx`) = **a static dark radial gradient,
  intentionally a TEMPORARY placeholder** for the eventual 3D background.
  Light sections = warm cream paper.
- CSS prefixes: `svcd-*`, `svc-*`, `prod-show-*`, `ind-*`, `method-*`,
  `legal-doc-*`, `sd-*`, `inner-*`.
- Functional bug sweep done; ContactForm prefill fixed; contact-form labels
  cleaned (`+ FIELD 0X` removed).

**Deferred:** contact-form backend (his team supplies); Terms "prevailing law
of Netherlands" line (flagged, undecided); `ServiceHeroVisual.tsx` = dead code.

---

## 4. THE 3D BACKGROUND — paused, with hard-won requirements

**Goal:** replace the temporary dark `PageBackdrop` with a site-wide,
real-time, cursor-reactive, scroll-scrubbed 3D background.

### Requirements distilled across the whole effort (DO NOT re-litigate)
- **Light, never dark; but NEVER plain white/grey, and NEVER cream** (cream is
  the content sections' color). Calm, minimal, attractive, "worthy."
- **Colorful + alive/atmospheric** (a real world with depth/light), yet calm.
  Contrast should come from temperature, not darkness.
- **Real-time + cursor-reactive** (a recorded video was explicitly ruled out —
  can't react to the pointer). Scroll scrubs forward AND backward like a
  timeline ("mantling/dismantling").
- **Objects must look REAL** — solid, lit, premium materials. Banned: dots/
  particles, wireframes/sketch lines, floating chrome blobs, giant letterforms,
  bar-chart slabs.
- **Per-page subjects** eventually: each page builds/shows its own "thing";
  home = VyuSoft the company. (Tentative: bespoke for Home + 5 capability
  groups; others inherit their group emblem recolored to their accent.)
- **Completely original** — he does NOT want any of the references reproduced.

### Reference material (taste/quality ONLY — folder `3d inspi/`)
Frame sequences + screenshots: `dark peachweb design frames` (particle organism
on black — liked the motion, not the dark), `peachweb design frames` (glass
rings over blue sky), `dribble example frames` (bright porcelain scene + magenta
light beam + gold coin), `peach frames` (dark chrome ring + silk), `peach home
frames` (pastel dreamscape: hills, water, glass bubbles, fish, jellyfish),
`photo 1` (dot-matrix hand/robot + glowing voxel star), `photo 2` (glossy black
coin on steps). He cites photos 1–2 as "objects feel REAL, not sketchy."
**He explicitly said: take NOTHING from these, build something new.**

### What was tried at `/lab/backdrop` (`app/lab/backdrop/page.tsx`) — all REJECTED
Standalone sandbox; real site untouched. v1 particle sphere → v2 particle
bloom→vortex→shell → v3 chrome torus-knot → v4 fibrous organism → v5/6
box-modules "sketch→build→ignite" (best-liked but "wireframe-y", weak ending) →
v7/8 per-page emblem system (V monogram + DATA columns) with full post-fx →
v9 "constructed world" (drafting floor/sky/monoliths) → v10 ceramic-arc ring in
an atmospheric world → **v11 "Spectrum"** (fan of fins rising from a floor under
a saturated lavender→peach sky, splitting light). Each was rejected as some mix
of: pale/grey, blown-out white, unworthy/meaningless, or sketchy.

**The user halted v11 mid-iteration** and told me to STOP wasting tokens. The
file currently holds v11 (saturated sky works; finale still blows white; fins
read like plain slabs). It is NOT approved.

### Hard technical learnings (don't relearn)
- **Bloom on a LIGHT scene white-outs everything** unless `UnrealBloomPass`
  threshold ≈ 1.0 AND strength stays low (ramp only tiny emissive/additive bits
  at the finale). This bit me repeatedly — the recurring "blown white finale."
- Don't light **near-white materials** with the bright RoomEnvironment IBL →
  everything washes pale. Use **tinted/saturated materials**, dim white IBL,
  and drive color via a **saturated gradient background + colored rim lights**.
- `scene.background = gradient CanvasTexture` (set `.colorSpace = SRGBColorSpace`)
  guarantees a colored sky with zero wash. Fog color must match the mid-tone or
  distance fades to grey.
- Self-drawing lines: `LineDashedMaterial` + `computeLineDistances()` + animate
  `dashSize`. Reflection: mirrored group `scale.y=-1`, `y=2*FLOOR_Y`, low-opacity
  clones, slightly transparent floor. (Both proven; both since dropped.)
- TS: don't type three geometries as `BufferGeometry` (generic mismatch); use a
  union of concrete geometry types.
- Imports used: `examples/jsm/environments/RoomEnvironment.js`,
  `geometries/RoundedBoxGeometry.js`, `postprocessing/{EffectComposer,RenderPass,
  UnrealBloomPass,OutputPass}.js`. `PCFSoftShadowMap` deprecation warning is harmless.

---

## 5. CURRENT DECISION POINT (where we stopped)

I stopped all 3D work and gave the user three paths. **Awaiting his pick:**
1. **Shelve the 3D for now** — keep a clean simple backdrop, ship the rest of
   the (strong) site, revisit the hero visual deliberately later. (My rec for now.)
2. **He provides ONE concrete target** (a real reference to match exactly, or a
   designer's still mockup / exported 3D model) → implement to that, no inventing.
3. **A 3D designer makes the asset** → I wire it in (load model/video + scroll +
   cursor). Integration is the reliable part; art direction comes from them.

**Do NOT resume inventing 3D speculatively.** The lesson: blind iteration in the
sandbox wastes his tokens and keeps missing. Only build 3D against a concrete,
agreed target, and verify via /browse screenshots before showing him.

---

## 6. Commands

```powershell
npx tsc --noEmit                      # fast type-check, doesn't touch .next
npx eslint .                          # lint (next lint is gone in Next 16)
Get-Process node | Stop-Process -Force; Remove-Item .next -Recurse -Force; npx next build
```
```bash
B="$HOME/.claude/skills/gstack/browse/dist/browse"
"$B" goto http://localhost:3000/lab/backdrop
"$B" console --errors
"$B" screenshot --viewport /tmp/shot.png   # then Read the png
```
