# DESIGN.md — VyuSoft

**Codename: PEACHWEB-VYUSOFT.** A dark/warm-paper hybrid editorial system. Atmospheric dark stretches alternating with warm-paper opaque sections. Frosted glass for floating UI. Fraunces italic for editorial moments, Geist Sans as the workhorse, JetBrains Mono for marginalia. Per-page accents whispered, never shouted. Motion that earns its place.

The background atmospheric layer (the scroll-driven generative motion system) is documented separately — this spec covers everything except that layer.

---

## 1. Color system

OKLCH primary with hex visible to legacy tools. Neutrals are tinted toward the brand hue (~0.005 chroma) so nothing reads flat-grey.

### Foundation tokens

| Role | Token | Value | Notes |
|---|---|---|---|
| Warm paper | `--color-paper` | `oklch(97% 0.012 78)` ≈ `#FAF7F2` | The cream canvas for light/opaque sections. Never `#FFFFFF`. |
| Paper deep | `--color-paper-deep` | `oklch(95% 0.014 78)` ≈ `#F4EFE4` | Inset surface tint for icon wraps and tile backgrounds. |
| Surface | `--color-surface` | `oklch(99% 0.005 78)` ≈ `#FCFAF6` | Near-white for raised panels (form fields, pillars cards). |
| Hairline | `--color-rule` | `oklch(91% 0.012 78)` ≈ `#E8E3DA` | Primary divider. 1 px stroke. |
| Hairline soft | `--color-rule-soft` | `oklch(94% 0.010 78)` ≈ `#F0EBE0` | Column rules, very faint. |
| Ink | `--color-ink` | `oklch(15% 0.015 270)` ≈ `#0E0E14` | Body + headlines on warm paper. Never `#000`. |
| Ink mid | `--color-ink-mid` | `oklch(46% 0.014 270)` ≈ `#5A5A66` | Secondary copy, body paragraphs. |
| Ink low | `--color-ink-low` | `oklch(67% 0.010 270)` ≈ `#9A9AA3` | Tertiary, mono labels, marginalia. |

### Brand + accent tokens

| Role | Token | Value | Notes |
|---|---|---|---|
| Brand | `--color-cobalt` | `oklch(48% 0.27 268)` ≈ `#2436F8` | One saturated brand color. Used in focus rings and inline link underline. Never paints sections. |
| Brand pressed | `--color-cobalt-deep` | `oklch(38% 0.24 268)` | Hover/active state for cobalt. |
| Brand soft | `--color-cobalt-soft` | `oklch(95% 0.04 268)` | Tint background, focus halo. |
| Per-page accent | `--accent` | varies | Each dynamic page sets this from its data layer. |

### Per-page accent palette

The 30 service pages, 17 industry pages, and 7 development pages each carry an accent. Accents tint:

- The eyebrow tick under each section
- The number column on hairline lists
- The focus ring (4 px, 25 % alpha)
- The NumeralCounter "landing" flash
- The PhaseTrack fill bar
- The IndustryBlueprint spine + centre node

Accents never paint backgrounds, headlines, or body copy. They occupy ≤ 8 % of pixels per page.

| Accent | Value | Used for |
|---|---|---|
| Cobalt | `#2436F8` | Default; consulting; growth |
| AI violet | `#635BFF` | Artificial Intelligence, DevOps |
| Sage | `#7B9985` | Research (the lab) |
| Healthcare rose | `#FF6B6B` | Healthcare |
| Banking gold | `#F59E0B` | Banking |
| Plum | `#7E3FBF` | Education, comms-media |
| Cyber green | `#22C55E` | Cyber Security, FinTech |
| Cyan | `#00D4FF` | Cloud, Capital Markets, Discover phase |
| Terracotta | `#FF6B35` | Consulting, Testing & QA |
| Retail magenta | `#EC4899` | Retail |
| Pink | `#F472B6` | Iterations phase, Consumer Packed |
| Emerald | `#10B981` | Travel & Logistics |
| Cyan-04 | `#06B6D4` | Insurance, Launch & Support |
| Lime | `#84CC16` | Food & Grocery |

Accents are stored in `lib/services.ts`, `lib/industries.ts`, and `lib/development.ts` per slug.

### Section background colour strategy

Each section declares whether it's **dark transparent** (`.inner-dark`) or **warm-paper opaque** (`.inner-light`).

- **Dark transparent** sections have `background: transparent` and white-family text. They let the atmospheric backdrop layer show through.
- **Warm-paper opaque** sections use `background: var(--color-paper)` and ink-family text. They cover the backdrop entirely.

The home page alternates them in grouped pairs (`DD-WW-DD-WW-D`); inner pages alternate more freely depending on content.

---

## 2. Typography

Three families, three jobs. No system fonts as primary.

| Role | Family | Source | Weight | Where it lives |
|---|---|---|---|---|
| Display italic | **Fraunces** | next/font (Google) | 400 italic, axes `opsz` + `SOFT` | Pull-quotes, manifesto, long-view figure numbers, industry-anchor lowercase wordmark, footer baselines |
| Workhorse sans | **Geist** | next/font (Vercel) | 400, 500, 540, 600 | All headlines, body, navigation, CTAs |
| Mono | **JetBrains Mono** | next/font (Google) | 400, 500 | Eyebrows, marginalia, ordinals, footnotes, ticker tokens |

Banned as primary: Inter, Roboto, Arial, system-ui.

### Type scale

```
hero-headline       clamp(2.25rem, 5vw, 4.5rem)    Geist 540, ls -0.035em, lh 1.0
page-hero-headline  clamp(2.5rem, 6vw, 5.25rem)    Geist 540, ls -0.03em,  lh 1.02
inner-headline      clamp(2rem, 4.5vw, 3.75rem)    Geist 540, ls -0.028em, lh 1.05
manifesto-headline  clamp(2.75rem, 9vw, 9rem)      Fraunces italic 400, ls -0.045em, lh 0.94
display-figure      clamp(2.75rem, 7vw, 5.5rem)    Fraunces italic 400, ls -0.035em, lh 0.9
inner-h2            clamp(1.5rem, 2.8vw, 2.25rem)  Geist 540, ls -0.025em, lh 1.05
inner-h3            clamp(1.125rem, 2vw, 1.5rem)   Geist 540, ls -0.015em, lh 1.2
body-lg             1.0625rem                      Geist 400, lh 1.65, max-width 60ch
body                1rem                           Geist 400, lh 1.55
body-sm             0.9375rem                      Geist 400, lh 1.55
mono-label          0.75rem                        JetBrains 500, uppercase, ls 0.18em
mono-micro          0.6875rem                      JetBrains 500, uppercase, ls 0.2em
```

Hierarchy is via scale × weight; ratios ≥ 1.25. Display sizes always italic Fraunces; never bold Fraunces. Headlines always Geist 540; never Geist 600 italic (would compete with Fraunces).

---

## 3. Layout grammar

### Grid + container

- **Max content width**: 1480 px (master); 1320 px (mega-menu and Manifesto interior); 880 px (legal pages).
- **Side padding**: 32 px mobile, 64 px desktop.
- **Section padding (vertical)**: 120–160 px desktop, 96–120 px tablet, 64–96 px mobile. Specific sections vary per content density.
- **Asymmetric splits by default**: 7/5, 4/8, 5/7 — not 6/6.

### Section grammar (the editorial spine)

Every section opens with the same three-element scaffold:

```
[MONO EYEBROW]                      ← inner-section-eyebrow, mono small uppercase
Big section headline.               ← inner-section-headline, Geist 540 clamp-sized
Body lede sentence in editorial register. ← inner-section-body, max-width 60ch
[content payload below]
```

For two-column section heads, the body lede sits in the second column (`7fr 5fr` split). For single-column section heads, it sits beneath the headline.

### Section-level container classes

Every page section is either:

- `.inner-dark` — transparent background, white-family text, `padding: 120px 0` default
- `.inner-light` — `var(--color-paper)` background, ink-family text, `padding: 120px 0` default

Within both, an inner wrapper `.inner-section-inner` provides the max-width + side padding.

### Hairlines, not boxes (mostly)

Numbered narrative lists, dispatches, solutions, activities, differentiators, and competencies on the About page render as **hairline rows**, not cards:

```
01     Title here              Description here in the description column.
       ────────────────────────────────────────────────
02     Next title              Next description.
```

Cards are reserved for: glass stat cards (WhyChooseUs / Long View / Outcomes), Pillars-style image-or-icon cards (4-up), regulatory framework cards, artifact cards, related-page cross-link cards.

### Marginalia

Every `PageHero` accepts a `marginalia` prop — a mono micro-label row joined by middle-dots beneath the hero grid:

```
33°13'N 97°08'W · EST. 2010 · DENTON, TEXAS · STUDIO PROFILE · VOL. 2026
```

Editorial craft signal. Always low-opacity, never highlighted, never decorative.

---

## 4. Motion principles

Framer Motion is the only animation library. Lenis drives smooth scroll. Slow-burn easing is the default.

### Easing curves

- **Slow-burn** (default): `cubic-bezier(0.16, 1, 0.3, 1)` — used for hover state transitions, scroll reveals, header auto-hide
- **Apple ease-out**: `cubic-bezier(0.32, 0.72, 0, 1)` — used for colour transitions and the legacy palette
- **Linear** — only for the marquee ticker

No bounce, no elastic, no spring overshoot.

### Reveal pattern

```ts
initial={{ opacity: 0, y: 20-32 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-10% 0px" }}
transition={{ duration: 0.7-0.9, ease: slowBurn, delay: 0.08-0.22 + i*0.06 }}
```

Stagger via `delay: base + i * step` on list items. Section header reveals: eyebrow first (no delay), headline second (`delay: 0.08`), body lede third (`delay: 0.16`), list payload last (`delay: 0.22+`).

### Specific motion moments

| Moment | Mechanic |
|---|---|
| Page hero entry | Container `staggerChildren: 0.09`. Eyebrow → headline lines (one per line) → body → CTA, total ≈ 1.4 s |
| NumeralCounter | Counts 0 → target on viewport entry, ease-out cubic, 1.1–1.5 s, with a 320 ms accent flash on landing |
| Hairline row hover | `transform: translateX(12–24px)` on the row, plus `letter-spacing` tightening on the title and brightening of the number colour |
| Card hover | `transform: translateY(-3 to -4px)` plus border-color brighten. Never `scale`. |
| SiteHeader auto-hide | `translateY(-140%)` on scroll-down past 80 px; suppressed while mega-menu is open |
| Mega-menu open | Fade + 8 px y-drop, 240 ms slow-burn, AnimatePresence on mode change |
| Manifesto entrance | 7 lines reveal individually with 90 ms stagger, slow-burn 850 ms duration; quote mark drops in from above; attribution slides in from the right last |
| Foundation sticky-scroll | Left column pins, three statements reveal on scroll, header opacity dims to 0.4 as the last statement passes |
| PhaseTrack fill | `width: 0 → fillPercent%` over 900 ms slow-burn on viewport entry |
| Marquee strip | Infinite `x: 0% → -50%` linear loop, edge-masked, paused under `prefers-reduced-motion` |
| Reveal cascade tokens | Imported from `lib/motion.ts` |

### Reduced motion

`prefers-reduced-motion: reduce` is respected throughout. NumeralCounter snaps to final value, marquee pauses, Framer Motion `useReducedMotion` returns true, all `whileInView` animations skip to the final state instantly.

### Rules we don't break

- No `transform: scale` on hover anywhere
- No layout-property animation (`width`, `height`, `padding`, `margin`). Only `transform` and `color`
- No bouncing / elastic / springs that overshoot
- No `background-clip: text` gradient text
- No animated background gradients on actively-read content

---

## 5. Component inventory

### Layout chrome (global)

- **`SiteHeader`** ([components/layout/SiteHeader.tsx](components/layout/SiteHeader.tsx))
  Fixed top, dark-glass frosted pill. Logo with `mix-blend-mode: difference` (auto-adapts to whatever section is under it). Three hover triggers — Services / Industries / Process — each opens a wide mega-menu panel. Two static links (About, Contact). One CTA pill on the right. Auto-hides on scroll-down past 80 px, reveals on scroll-up. Suppresses auto-hide while a mega-menu is open. Honors Escape to close menus.

- **`SiteFooter`** ([components/layout/SiteFooter.tsx](components/layout/SiteFooter.tsx))
  Dark transparent colophon with the real VyuSoft brand block (logo wordmark, email, phone, Denton TX address) plus three columns: Menu, Studio, Socials. Baseline strip below with current year + fonts-used credit.

### Page composition templates

- **`PageHero`** ([components/templates/PageHero.tsx](components/templates/PageHero.tsx))
  Dark atmospheric hero. Eyebrow with accent tick → big sans headline (multi-line via `\n`) → optional body in right column or optional aside slot → primary CTA pill + optional secondary ghost CTA → optional marginalia line.

- **`ClosingCta`** ([components/templates/ClosingCta.tsx](components/templates/ClosingCta.tsx))
  Dark transparent closer. Big centred two-line headline + primary + optional secondary CTA. Every inner page ends with one (except Contact, Privacy, Terms where it would be redundant).

- **`ServiceTOCLayout`** ([components/templates/ServiceTOCLayout.tsx](components/templates/ServiceTOCLayout.tsx))
  White opaque. Sticky left-rail numbered TOC (active state tracked via IntersectionObserver) + scrolling right-column feature articles. Drives all 30 service pages.

- **`IndustryBlueprint`** ([components/templates/IndustryBlueprint.tsx](components/templates/IndustryBlueprint.tsx))
  SVG schematic used as PageHero aside on industry pages. Four horizontal tiers (Engagement / Data Plane / Core Systems / Infrastructure) populated from the industry's top four solutions. Accent-coloured spine + centre node + lowercase italic anchor word.

- **`PhaseTrack`** ([components/templates/PhaseTrack.tsx](components/templates/PhaseTrack.tsx))
  Horizontal scrubber for the 7 dev phases. Hairline track with accent fill up to the current node; future nodes are open circles. Each node clickable.

### Reusable section primitives

- **`OutcomesStrip`** ([components/templates/OutcomesStrip.tsx](components/templates/OutcomesStrip.tsx))
  Dark transparent. Three-figure stat row with NumeralCounter animation on the numeric part. Cards are frosted glass with accent-tinted ordinal labels.

- **`StackGrid`** ([components/templates/StackGrid.tsx](components/templates/StackGrid.tsx))
  White opaque. Tag-cloud of pill chips listing the tools/frameworks for a service. Pills invert (dark fill, light text) on hover.

- **`RegulatoryGrid`** ([components/templates/RegulatoryGrid.tsx](components/templates/RegulatoryGrid.tsx))
  Dark transparent. Compliance framework cards: ordinal + label + scope description. 4–6 cards per industry, content-aware per vertical.

- **`ArtifactsGrid`** ([components/templates/ArtifactsGrid.tsx](components/templates/ArtifactsGrid.tsx))
  White opaque. Cards for the written outputs of each development phase. File icon + title + kind (format / location) + description.

- **`RelatedCards`** ([components/templates/RelatedCards.tsx](components/templates/RelatedCards.tsx))
  Dark transparent. 3-up cross-link cards with corner arrow that rotates 45° on hover. Used for adjacent services and adjacent industries.

- **`MarqueeStrip`** ([components/templates/MarqueeStrip.tsx](components/templates/MarqueeStrip.tsx))
  Horizontal infinite ticker with edge-masked fade. Mono uppercase labels separated by middle-dot. Pauses under `prefers-reduced-motion`.

### Home-specific compositions

- `Hero` — full-bleed dark hero with 5-line headline, trust avatars, body + CTAs
- `ServicesIntro` — "Building the future, together." + the dashboard mockup
- `ClientsStrip` — "Trusted by leading teams worldwide." + 4 client logos in glass cards
- `Pillars` — "Innovation at the core" + 3 dark image cards on warm paper
- `ProcessSection` — "How we bring your vision to life." + 5 alternating image/text rows
- `Products` — sticky text + 4 product cards
- `WhyChooseUs` — sticky text + 4 stacked glass stat cards
- `Testimonials` — 3 cream cards on warm paper
- `IndustriesGrid` — 3 industry columns (cream / dark / cream)
- `FinalCta` — `ClosingCta` + `SiteFooter` composition

### About-specific compositions

- `FoundationSection` — sticky-scroll three-statement reveal (Mission / Vision / Purpose)
- `ManifestoSection` — full-viewport white panel with giant Fraunces italic statement, 7 lines revealing in 90 ms stagger
- `TimelineSection` — six milestones (2010 → 2026) as italic year + sans event + mono detail
- `LongViewStatCard` — wraps `.why-us-stat` markup with NumeralCounter for the figure
- `CompetencyCard` — wraps `.pillars-card` markup with a lucide icon in the image slot

---

## 6. Page composition map

| Route | Composition |
|---|---|
| `/` | Hero · ServicesIntro · ClientsStrip · Pillars · ProcessSection · Products · WhyChooseUs · Testimonials · IndustriesGrid · FinalCta |
| `/about` | PageHero · FoundationSection · LongView (sticky + glass stat cards) · ManifestoSection · Competencies (Pillars-style cards) · TimelineSection · Differentiators (hairline 4/8) · Negative Space (hairline list) · ClosingCta · SiteFooter |
| `/contact` | PageHero (with marginalia) · ContactForm + InfoCol white section · SiteFooter (no ClosingCta — page IS the CTA) |
| `/research` | PageHero (sage accent) · Dispatches hairline list · Vision (dark editorial passage) · ClosingCta · SiteFooter |
| `/privacy`, `/terms` | PageHero (slim) · numbered legal sections (white) · SiteFooter |
| `/services` | PageHero · Marquee (all 30 services) · OutcomesStrip · 5 alternating group sections (D/W/D/W/D), each a hairline list of 6 services · ClosingCta · SiteFooter |
| `/industries` | PageHero · Marquee (all 17 verticals) · OutcomesStrip (operational signals) · Solutions hairline list (17 rows) · ClosingCta · SiteFooter |
| `/development` | PageHero · Marquee (7 phases) · PhaseTrack (overview, no current) · Phases hairline list · ClosingCta · SiteFooter |
| `/services/[slug]` (× 30) | PageHero · Marquee · OutcomesStrip · ServiceTOCLayout (sticky rail + 6 features) · StackGrid · RelatedCards · ClosingCta · SiteFooter |
| `/industries/[slug]` (× 17) | PageHero with IndustryBlueprint aside · Marquee · Solutions hairline · RegulatoryGrid · OutcomesStrip · Value-props (dark 4/8) · RelatedCards · ClosingCta · SiteFooter |
| `/development/[slug]` (× 7) | PageHero · Marquee · PhaseTrack (current phase highlighted) · PhaseProfile (duration / cadence / lead role cards) · Activities hairline · ArtifactsGrid · Adjacent-phase nav · ClosingCta · SiteFooter |

Total prerendered routes: 66 (1 home + 5 static + 3 index + 30 + 17 + 7 + a `_not-found`).

---

## 7. Data layer (single source of truth per page family)

- **`lib/nav.ts`** — All slugs and titles for services / industries / development. Mega-menu and dynamic-route generation both read this.
- **`lib/services.ts`** — Per-slug accent, description, 6-feature list for 30 services.
- **`lib/industries.ts`** — Per-slug accent, description, 6 solutions, 6 value props for 17 industries.
- **`lib/development.ts`** — Per-slug accent, description, 6 activities for 7 phases.
- **`lib/serviceMeta.ts`** — Category-aware enrichment: `defaultOutcomes`, `stackByGroup`, `stackOverrides`, `relatedServices()`.
- **`lib/industryMeta.ts`** — `regulatoryForIndustry()` returning industry-specific compliance frameworks; `operationalSignals`.
- **`lib/developmentMeta.ts`** — `metaForPhase()` returning duration / cadence / lead role + 4 artifacts per phase.
- **`lib/motion.ts`** — Shared easing curves and variants.

Adding a new service or industry is purely a data change in the matching lib file. No layout edits required.

---

## 8. Anti-pattern checklist

Forbidden across the system. Match-and-refuse.

- [ ] No `transform: scale` on hover — translate-Y or translate-X only
- [ ] No animated layout properties (`width`, `height`, `padding`, `margin`) — use `transform`
- [ ] No bounce / elastic / spring-overshoot easing — slow-burn ease-out family only
- [ ] No `background-clip: text` gradient text
- [ ] No `border-left` / `border-right` thicker than 1 px as a decorative accent
- [ ] No identical card grids stamping the same `icon + title + paragraph` four times in a row — vary, or use a hairline list instead
- [ ] No "hero metric template" (giant number, small label, supporting stats grid) as the page's primary value prop
- [ ] No glassmorphism on actively-read content. Glass only on floating UI (mega-menu, header pill, secondary CTAs, stat cards over backdrop)
- [ ] No purple-to-cyan brand gradients
- [ ] No mega-watermark display text behind the hero
- [ ] No `#000` or `#FFF` literals — every neutral tints toward the brand hue
- [ ] No em dashes in copy — use commas, periods, colons, semicolons. `--` is also banned
- [ ] No section without its eyebrow + headline + body lede scaffold (unless the section is itself a single Manifesto-class moment)
- [ ] No modal as a first thought — exhaust inline / progressive disclosure first
- [ ] No floating chatbot bubbles in the bottom-right
- [ ] No accent color used for body text, headlines, or section backgrounds — accent is for the eyebrow tick, focus ring, NumeralCounter flash, and similar surgical moments only

---

## 9. Accessibility baseline

- All motion respects `prefers-reduced-motion: reduce`
- Colour contrast WCAG AA on every body and heading combination
- Focus rings clearly visible (4 px accent at 25 % alpha, 3 px offset)
- Mega-menu fully keyboard-navigable (Tab, Esc, focus management)
- All interactive surfaces have non-motion fallback semantics
- Decorative SVG layers carry `aria-hidden="true"`
- Skip-to-main link in the layout

---

## 10. Performance budget

| Slice | Target |
|---|---|
| Above-the-fold paint (LCP) | < 2.5 s on 4G |
| Total CSS | < 80 KB gzipped |
| Total JS for above-the-fold | < 120 KB gzipped |
| Image hero | < 250 KB JPEG / WebP, served via next/image |
| Font subsetting | Latin only; `display: swap`; preloaded for above-fold weights |
| `next build` clean | All 66 routes prerender statically; no client-side data fetches in render |

---

## 11. Implementation order (what we shipped)

1. **Foundation**: `globals.css` tokens, fonts in `layout.tsx`, `lib/motion.ts` shared variants
2. **Layout chrome**: `SiteHeader` (global, with mega-menus) and `SiteFooter`
3. **Templates**: `PageHero`, `ClosingCta`, hairline list grammar (`.inner-hl-*`)
4. **Section primitives**: `OutcomesStrip`, `StackGrid`, `RegulatoryGrid`, `ArtifactsGrid`, `RelatedCards`, `MarqueeStrip`
5. **Home compositions**: Hero, ServicesIntro, ClientsStrip, Pillars, ProcessSection, Products, WhyChooseUs, Testimonials, IndustriesGrid, FinalCta
6. **About compositions**: FoundationSection, LongView, ManifestoSection, Competencies, TimelineSection, Differentiators, NegativeSpace
7. **Static pages**: Contact, Research, Privacy, Terms
8. **Dynamic templates + 54 generated pages**: ServiceTOCLayout, IndustryBlueprint, PhaseTrack, plus the per-page composition for `/services/[slug]`, `/industries/[slug]`, `/development/[slug]`
9. **Index pages**: `/services`, `/industries`, `/development`
10. **Data enrichment layer**: `serviceMeta.ts`, `industryMeta.ts`, `developmentMeta.ts`

Background atmospheric layer (the scroll-driven generative motion system) is intentionally not covered here — that decision is being made separately.

---

*Documented after Phase 3. Source of truth lives in `app/globals.css` for tokens and per-component CSS; in component files for inline structural styles; in `lib/*.ts` for content. Update this document when adding new section primitives or changing the section grammar.*
