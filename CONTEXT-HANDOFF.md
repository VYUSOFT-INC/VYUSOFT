# VyuSoft Marketing Site — Context Handoff

> A self-contained briefing so any AI (or engineer) can pick up this project
> cold. Written 2026-06-10. Save point: git commit `2b25388` ("Checkpoint:
> marketing site through service-page rollout, bug sweep, and contact-form
> polish"). This is the **first** commit of a freshly-initialised repo —
> `git reset --hard 2b25388` returns to exactly this state.

---

## 1. What this project is

A premium marketing website for **VyuSoft**, a software engineering studio.
Built as a polished, editorial, non-templated brand site. Owner/user is
**karthik@vyusoft.com** — non-engineer-facing in tone but technically precise;
he drives the design direction and reviews every change.

**Stack**
- **Next.js 16.2.6** App Router + **Turbopack**, **React 19**, **TypeScript** (strict)
- **Tailwind v4** (CSS-first `@theme` in `app/globals.css` — no `tailwind.config`)
- **Framer Motion 12**, **Lenis** (smooth scroll), **lucide-react** icons, **geist** font
- `next build` produces **71 static routes** (SSG via `generateStaticParams`)
- Windows 11 / PowerShell environment. `git` runs via the Bash tool (git-bash).

> ⚠️ **IMPORTANT — read `AGENTS.md`:** it warns that this Next.js version has
> breaking changes vs training data, and to consult `node_modules/next/dist/docs/`
> before writing framework code. `next lint` is removed in Next 16 — use
> `npx eslint .` instead.

---

## 2. How the user works (read before touching anything)

These are hard-won preferences. Violating them has caused rework:

- **Small, targeted changes.** Don't refactor or "improve" beyond what was asked.
- **Don't make unrequested decisions.** When he says fix X, fix only X.
- **No AI slop / cliché / fabricated metrics.** Copy must read human-written.
- **No stock imagery.** Visuals are graphic/typographic/SVG-schematic only.
- **No content repetition within a page** (e.g. don't list the same 6 items in
  both a hero and the next section — this was an explicit correction).
- **Each page should feel distinct**, not templated.
- **Don't over-narrate.** He notices and dislikes verbose explanation.
- **He often verifies manually** ("just say completed, I'll check myself").
- **"Catch the nuances a human does when designing" / "think like a human, not
  an AI"** is a recurring instruction — applies to spacing, hierarchy, polish.

### The #1 recurring technical gotcha
**Turbopack dev-cache lags one edit behind → blank/unstyled pages.** This is
NOT a code bug. Fix: stop the dev server, delete `.next`, restart. `next build`
(production) is always correct. When something "looks blank," suspect stale
`.next` before suspecting the code.

Also: **running a dev/preview server locks `.next` on Windows** (EPERM on
`unlink` during `next build`). Stop the preview before building:
`Get-Process node | Stop-Process -Force; Remove-Item .next -Recurse -Force; npx next build`.

---

## 3. Architecture — single source of truth data layer

All page content is data-driven from `lib/`. Dynamic routes read these maps.

| File | Drives |
|------|--------|
| `lib/nav.ts` | **Master nav.** `servicesByGroup` (5 groups × 6 = 30 services), `industriesNav` (17), `productsNav` (4), `developmentNav` (7). Header, footer, mobile nav, and every `generateStaticParams` derive from here. |
| `lib/services.ts` | `allServices`, `getServiceBySlug`, `Feature` type, per-slug `overrides` (accent, description, 6 features). Built by flat-mapping `servicesByGroup`. |
| `lib/servicePages.ts` | **NEW this session.** Per-slug `{ headline, intro, services[6] }` for the redesigned service-detail pages. Sourced from the client's `services.md` content. `getServicePageContent(slug)`. |
| `lib/serviceMeta.ts` | `stackByGroup` + `stackOverrides` → `stackForService()`; `relatedServices()` (other items in same group); `defaultOutcomes`. |
| `lib/industries.ts` | `allIndustries`, `getIndustryBySlug`. Each industry has accent, description, 6 `solutions` (each maps to a real service slug), 6 `valueProps`. |
| `lib/industryMeta.ts` | `regulatoryForIndustry()`, `operationalSignals`. |
| `lib/products.ts` | `allProducts` (Vyudine, Mivyu, Vyuflo = `kind:"app"`, in development; VYU Startup Solutions = `kind:"engagement"`). `getProductBySlug`. |
| `lib/development.ts` | `allDevelopmentPhases` (7 lifecycle phases), `getDevelopmentBySlug`. |
| `lib/motion.ts` | Shared Framer variants/easings — `easeSlowBurn` (aliased `slowBurn`), `sheetSlide`, `stampReveal`, `stampReveal`, etc. |

**Theming:** sections declare `data-theme="dark"` or `data-theme="light"`.
`SiteHeader` runs an observer that reads the section under the header and
cross-fades the logo (white logo on dark, dark logo on light). Dark sections
are transparent over a fixed `PageBackdrop` (static dark radial gradient — the
old generative shader was removed). Light sections are warm paper.

**CSS class prefixes** (all live in `app/globals.css`, one big file):
`svcd-*` service detail · `svc-*` services index · `prod-show-*` products index ·
`ind-*` industries index · `method-*` development timeline · `legal-doc-*` legal ·
`sd-*` ServicesDashboard · `inner-*` shared inner-page sections.

---

## 4. Routes / pages

- `/` home — sections in `app/_sections/home/` (Hero, ServicesDashboard,
  ServicesIntro, Products, IndustriesGrid, ProcessSection, etc.). **User said
  he's happy with the home hero — do not touch it.**
- `/services` index (`app/services/_sections/Group*.tsx` — Bento/Console/Matrix/
  Manifesto/Spotlight variants) and `/services/[slug]` (30 pages, **redesigned**).
- `/industries` index + `/industries/[slug]` (17). **Still uses the older
  template** (PageHero + IndustryBlueprint aside + MarqueeStrip + solutions list
  + RegulatoryGrid + OutcomesStrip + valueProps + RelatedCards). Not yet redesigned.
- `/products` index + `/products/[slug]` (4, bespoke).
- `/development` index + `/development/[slug]` (7).
- `/about`, `/contact`, `/research`, `/privacy`, `/terms` (static).

---

## 5. Work completed in this session (chronological)

1. **ServicesDashboard rebuild** (home "Our Services" section): made it
   interactive + auto-cycling. Services-only (removed irrelevant "console/
   pipeline/engagements" content). Capability-group sidebar selector, donut
   chart, rows link straight to `/services/[slug]`, chat composer writes
   `sessionStorage["vyu:contact-prefill"]` and routes to `/contact`. Operations
   cards → 3-per-line and moved to Products. Fixed varying card aspect ratios,
   transition finishing, duplicate visuals, and the click-dropdown behavior.
2. **Index-section polish** for the "see all products / industries / methodology"
   dropdowns and the bento sections (per "first bento is great, rest need work").
3. **Development** section betterment.
4. **Static pages light pass** (about/research etc.) — "light tightening, rewrite
   only if needed."
5. **Legal pages** (`/terms`, `/privacy`): rewritten to plain, full-width,
   left-aligned documents (no PageHero, no "01/02" numbered sections, no narrow
   centered column) using client-provided Terms & Privacy copy verbatim.
   `legal-doc-*` classes. (Flagged but undecided: a "prevailing law of
   Netherlands" line in Terms — confirm with user.)
6. **Products** added end-to-end: `lib/products.ts`, `productsNav`, a Products
   megamenu in `SiteHeader`, `/products` index + `/products/[slug]`. Fixed an
   earlier `/products` 404.
7. **Service-detail redesign — prototyped on AI, then rolled to all 30.**
   - New layout per page: `ServiceHero` (single-column: eyebrow=practice name,
     h1=headline, intro, two CTAs) → `ServiceCapabilities` (numbered editorial
     grid of the 6 services, warm-paper) → `StackGrid` → `RelatedCards`
     (with mini descriptions) → `ClosingCta` → `SiteFooter`.
   - Created `lib/servicePages.ts` from the client's `services.md`.
   - `app/services/[slug]/page.tsx` now renders this for **every** service from
     the content map (the old AI-only `if` branch and the old default template —
     PageHero/Marquee/Outcomes/ServiceTOCLayout — were removed).
   - `RelatedCards` gained an optional `description` field; related items pass
     `getServiceBySlug(r.slug)?.description`.
   - **Content corrections** made in-context while transcribing `services.md`
     (the user said "understand what for what and use the content"): Enterprise
     headline said "AI Innovation" → "Enterprise Innovation"; Payment intro had a
     mis-pasted AI paragraph (removed); UI/UX item 1 mislabeled "Network Design"
     → "User Research & Strategy"; Software Quality Testing item 1 "AI-Powered
     Automation" → "Manual Testing"; "Microservices Aurerchitect" → "Microservices
     Architecture"; "DA & BA" → "Data & Business Analytics"; Operational Tools
     stray duplicate headline removed; typos/markdown escapes cleaned.
   - Rejected experiments along the way (DON'T re-add): a node-graph hero visual
     (`ServiceHeroVisual.tsx` — still on disk but **unused**, user called it "AI
     generic"); a "stack panel in the hero" replacing StackGrid ("who asked you").
     Hero is **single-column by user's explicit choice.**
8. **Functional bug sweep** (user: "fix bugs all over without changing design/
   content/layout/structure"):
   - **Fixed:** `ContactForm` home→contact prefill. The brief `<textarea>` is
     uncontrolled and was fed `defaultValue={prefill}`, but `prefill` is set in a
     post-mount `useEffect`; React ignores `defaultValue` changes after mount, so
     the prefill never appeared. Now written imperatively via `messageRef` in the
     effect.
   - **Verified clean:** all internal links / slugs (services, industries→services,
     products, development, all literal hrefs) resolve — nothing 404s; all timers/
     listeners/observers clean up (SiteHeader, ServicesDashboard, NumeralCounter,
     LenisProvider, ContactForm); SSR-guarded `window`/`sessionStorage`; React keys
     stable.
   - **Left alone (not bugs):** the 5 ESLint `react-hooks/set-state-in-effect`
     errors are the new React-compiler advisory firing on correct patterns
     (matchMedia-on-mount, close-mobile-menu-on-route-change, prefill read) —
     rewriting them risks behavior/design change. A few unused-var warnings are
     harmless dead code.
9. **Contact form labels:** removed the `+ FIELD 01 / 02 …` mono ordinals from
   every field label (user: "looks odd"); kept the field names. Removed the now-
   dead `num` prop plumbing from `Field`/`Label` and all call sites.

---

## 6. Known deferred / open items

- **Contact form delivery (backend).** The form currently fakes submission
  (generates a random reference id, shows a success "stamp", resets). Real
  delivery is **deferred pending the user's team's backend.** Frontend already
  reads the prefill and is ready to wire to an endpoint.
- **Industries `/industries/[slug]`** has NOT been redesigned (still the older
  PageHero-based template). The service pages were redesigned; industries may be
  next if the user asks.
- **Terms "Netherlands prevailing law"** line — flagged, awaiting user decision.
- `ServiceHeroVisual.tsx` is dead code (kept on disk, not imported).

---

## 7. The immediate next task

The user said: *"now comes the main and important part of my website"* — he has
NOT yet described it. He asked first to (a) save this version and (b) produce
this handoff. **Both are done.** Await his description of "the main and important
part" before acting. Do not assume what it is.

---

## 8. Verify / build commands (Windows PowerShell)

```powershell
# Clean production build (the source of truth for correctness)
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Remove-Item .next -Recurse -Force -ErrorAction SilentlyContinue
npx next build

# Lint (next lint is gone in Next 16)
npx eslint .

# Return to this save point
git reset --hard 2b25388
```

Screenshots via the preview tooling frequently time out (grain overlay + scroll
animations). Prefer verifying via `next build` output, built-HTML grep under
`.next/server/app/...`, or DOM reads — that's what worked this session.
