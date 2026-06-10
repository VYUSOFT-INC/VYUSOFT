# PRODUCT.md — VyuSoft

## Register

`brand` — this is a corporate marketing site. The design IS the product surface. Quality of typography, motion, composition, and craft directly signals trust to enterprise buyers evaluating VyuSoft as a technology partner. This is not an internal tool serving a workflow; it is a public artifact whose job is to differentiate VyuSoft from a saturated, template-clone "IT services" category.

## Product purpose

VyuSoft is a hybrid technology company. Two delivery models run in parallel: enterprise services (consulting, engineering, operations) and in-house product innovation (Vyu Research, applied AI, vertical SaaS). The website's job is to communicate this duality without drowning the reader in feature lists, while presenting a credible system across:

- 30 service offerings, organised into 5 capability groups
- 17 industries served
- A 7-phase development methodology
- A research lab arm
- Static pages: about, contact, privacy, terms

## Users

**Primary buyer**: VP / CTO / Head of Engineering at a mid-market enterprise (banking, healthcare, retail, manufacturing, fintech, logistics). They are evaluating offshore + onshore service partners. They have been burned by template-clone vendor sites that all look identical and promise everything.

**Secondary**: technical decision-makers (architects, principal engineers) who have been forwarded the site by procurement and need to gut-check whether VyuSoft is a "real" engineering shop or a sales surface.

**Tertiary**: prospective hires who arrive via a Careers link.

What the buyer needs from this site:
1. Fast credibility judgement in the first 8 seconds — "is this a serious company?"
2. Specific evidence of what VyuSoft does, in their language, not generic capability slogans.
3. A clear next step: a contact path that doesn't feel like a sales funnel.
4. A signal that the team has taste, craft, and rigour — because those qualities translate to delivery.

## Brand voice & tone

- **Confident, not loud.** Specific, measured statements. Verbs over adjectives.
- **Technical, not jargon.** Terms a working engineer uses, not buzzword stacks.
- **Editorial, not promotional.** The site reads like a research journal or a portfolio of engineering practice, not a brochure.
- **Generous, not gated.** Information is presented in full; no "request a demo" wall to learn what a service is.

## Anti-references — what we are NOT

- We are not a Stripe clone. The category-reflex for any tech-services site is a Stripe-template lookalike (purple gradient hero, navy section, white capability cards). VyuSoft must not look like that, even faintly.
- We are not a Sanity clone. Sanity has a strong editorial voice with mono accents and content-driven color; we admire the discipline but do not adopt the look.
- We are not a "dark mode SaaS" — no dark canvas, no glassmorphism, no neon accents.
- We are not a "luxury watch" or portfolio site. The aesthetic must support 50+ data-driven pages without becoming precious.
- We are not the typical Indian IT services site. The category-reflex is a Bootstrap-era stock-photography layout with rotating sliders; this site must read as belonging to an entirely different class.
- We do not use:
  - Purple-to-cyan brand gradients
  - Orbital "platform hub" hero illustrations
  - Mega-watermark display text behind the hero
  - "30+" "17" "2,400+" hero stat cards as the primary value prop
  - Card grids of icon + heading + paragraph repeated endlessly
  - Section-walls of alternating background colors that chop pages into rectangular slabs
  - Em dashes (per impeccable house style)

## Strategic principles

1. **Composition over containers.** Pages flow on a single warm-paper canvas. Sections are defined by typography, whitespace, hairline rules, and layout asymmetry — never by switching the page background. The continuous canvas is the brand.
2. **Surgical color.** One saturated brand color (electric cobalt) used as scalpel, not paint. Per-page accent variables let 54 dynamic pages feel related without uniform.
3. **Editorial typography is the brand mark.** A characterful italic display serif (Fraunces) anchors every page. Body and UI in a refined neo-grotesque (Geist Sans). Technical voice via a single mono (JetBrains Mono) for labels, dimension annotations, and marginalia.
4. **Motion earns its place.** Framer Motion is already a dependency; in this redesign it finally does work. One orchestrated page-load reveal, scroll-triggered section markers, AnimatePresence on every conditional UI surface, animated numerals, cursor parallax on the hero anchor only. Every motion has a reason.
5. **Data-driven scale.** 30 services × 17 industries × 7 development phases = 54 generated pages. The system is built so that adding a service, industry, or phase requires only a data row, never a layout decision.
6. **Marginalia as identity.** Right-margin mono micro-meta (timestamps, references, dimension annotations) appears on every page. Most pages leave the margin sparse; when something appears there, it pops because nothing else competes.
7. **No category reflexes.** The first-order reflex (light + cobalt = "fintech-clean") is countered by the editorial italic display + warm paper canvas + technical marginalia. The second-order reflex (light editorial = "design agency") is countered by the data density and the schematic motifs (numbered sections, dimension annotations, the live coordinate rail in the header).

## Constraints

- Stack: Next.js 16.2.6 (App Router, React 19, Tailwind v4 CSS-first). All pages must continue to render via `generateStaticParams` for the dynamic routes.
- Performance: hero must be fast first-paint. Hero motion runs once on mount, not infinitely. Grain overlay is GPU-cheap (SVG, not canvas).
- Accessibility: prefers-reduced-motion respected on every animation. Color contrast AA on all body text (graphite ink on warm paper passes comfortably).
- Browsers: evergreen only. CSS Variables, OKLCH where supported with hex fallback.
- Data sources: existing data files in `lib/` (`nav.ts`, `services.ts`, `industries.ts`, `development.ts`) are the source of truth and continue to drive the dynamic routes.

## Success criteria

The redesign is successful if:
- A first-time visitor can describe the site in three nouns that are not "tech services site" within five seconds.
- The home hero sets a tone that holds across the 54 dynamic pages without retuning.
- A returning visitor can navigate the 30 services without bouncing because pages are scannable, structured, and load fast.
- The motion makes the site feel alive without becoming a portfolio show-reel.
- An engineer reading the source code can extend the system (new service, new industry) in under five minutes.
