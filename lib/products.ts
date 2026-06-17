// Source-of-truth data for the in-house product portfolio. Drives:
//   • the home Products section (app/_sections/home/Products.tsx)
//   • the navbar Products mega-menu (components/layout/SiteHeader.tsx)
//   • the /products index page
//   • the /products/[slug] bespoke detail pages
//
// Vyudine, Mivyu, and Vyuflo are applications VyuSoft is building in-house.
// All three are under active development and will be available soon — copy
// is deliberately pre-launch and honest (no live metrics, no ship dates,
// no "in market" claims). VYU Startup Solutions is a separate, active
// engagement model (not an app), so it carries real descriptive numbers.

export type ProductKind = "app" | "engagement";
export type ProductFeature = { title: string; description: string };
export type ProductMetric = { figure: string; suffix?: string; label: string };

export type Product = {
    slug: string;
    /** Brand name (the product's actual name, not a category). */
    name: string;
    /** "app" = an application in development; "engagement" = a service model. */
    kind: ProductKind;
    /** Category label, e.g. "Food Delivery". */
    category: string;
    /** One-line positioning shown on cards and beneath the hero. */
    positioning: string;
    /** Longer descriptive paragraph (shared with the home card). */
    description: string;
    /** Status pill, e.g. "In development" or "Active". */
    status: string;
    /** Per-product hex accent — drives hero tick, pills, spine. */
    accent: string;
    /** Hero image, or null for engagement-model entries. */
    image: string | null;
    /** Card image shown on home page and products index (3D renders). */
    cardImage: string | null;
    /** Short hero sub-headline. */
    tagline: string;
    /** Narrative overview paragraph. */
    overview: string;
    /** "Built for ..." audience line. */
    audience: string;
    /** Feature highlights — rendered as the showcase grid ("what it will do"). */
    features: ProductFeature[];
    /** Descriptive figures — only on the engagement model (apps are pre-launch,
     *  so they carry no metrics). Rendered through the OutcomesStrip counter. */
    metrics?: ProductMetric[];
    /** Optional secondary CTA shown alongside the primary action. */
    secondaryCta?: { label: string; href: string };
};

export const allProducts: Product[] = [
    {
        slug: "vyudine",
        name: "Vyudine",
        kind: "app",
        category: "Food Delivery",
        positioning: "Restaurants, riders, and customers on one fast app.",
        description:
            "A food-delivery application that connects restaurants, riders, and customers — real-time ordering, fee-aware dispatch, kitchen-aware timing, and loyalty that rewards the restaurant's regulars. In active development.",
        status: "In development",
        accent: "#FF6B35",
        image: "/sections/products/vyudine ui/Onboarding 1.png",
        cardImage: "/sections/products/vyudine home.png",
        tagline: "A food-delivery app, built end to end.",
        overview:
            "Vyudine is a food-delivery application we're building in-house. It brings restaurants, riders, and customers onto one fast experience — real-time ordering and dispatch, kitchen-aware timing, and loyalty that pays back the restaurant rather than a marketplace. It's under active development and will be available soon.",
        audience: "Being built for restaurants, riders, and the people who order from them.",
        features: [
            { title: "Real-Time Ordering & Dispatch", description: "Live order flow with routing that weighs rider proximity, kitchen load, and delivery time on every assignment." },
            { title: "Fee-Aware Routing", description: "Routing that factors commission, distance, and demand so each order is delivered economically." },
            { title: "Kitchen-Aware Timing", description: "Live prep-time estimates that keep promised delivery windows honest when a kitchen gets busy." },
            { title: "Loyalty That Pays Back", description: "A rewards layer designed to bring a restaurant's repeat customers back — not to feed a marketplace funnel." },
            { title: "Rider Experience", description: "Clear assignments, live navigation, and transparent earnings in one rider app." },
            { title: "Restaurant Insights", description: "Order trends, busy-hour patterns, and item performance a kitchen can actually act on." },
        ],
    },
    {
        slug: "mivyu",
        name: "Mivyu",
        kind: "app",
        category: "E-commerce",
        positioning: "Online shopping that's fast, modern, and built to convert.",
        description:
            "A commerce application for modern online stores — fast storefronts, built-in analytics, secure payments, and inventory that keeps up with demand. In active development.",
        status: "In development",
        accent: "#635BFF",
        image: "/sections/products/mivyu ui/Body (1).png",
        cardImage: "/sections/products/mivyu home.png",
        tagline: "A commerce app for modern stores.",
        overview:
            "Mivyu is an e-commerce application we're building in-house. Fast storefronts, first-party analytics, secure payments, and inventory intelligence in one app — so the gap between what marketing spends and what the store earns is finally legible. It's under active development and will be available soon.",
        audience: "Being built for online stores that have outgrown templated tools.",
        features: [
            { title: "Fast Storefronts", description: "Quick, modern shopping experiences with sub-second pages and search-engine-friendly rendering." },
            { title: "Built-In Analytics", description: "First-party event and funnel tracking baked into the app, not bolted on through a tag manager." },
            { title: "Secure Payments", description: "Tokenised checkout across cards, wallets, and pay-later with consistent, reliable retries." },
            { title: "Inventory Intelligence", description: "Real-time stock, demand signals, and reorder prompts that tie spend to what actually sells." },
            { title: "Promotions & Experiments", description: "Discounts, bundles, and A/B tests with guardrails so changes are measured, not guessed." },
            { title: "One Operator View", description: "Catalog, orders, and promotions in a single place, with the numbers that decide what to do next." },
        ],
    },
    {
        slug: "vyuflo",
        name: "Vyuflo",
        kind: "app",
        category: "Visa & Mobility",
        positioning: "Visa applications without the printer-and-courier ritual.",
        description:
            "A visa & mobility application that ends the email-a-PDF shuffle — secure document handling, real-time status, and automated checks for applicants and immigration teams. In active development.",
        status: "In development",
        accent: "#06B6D4",
        image: "/sections/products/vyuflo ui/HR - DashBoard.png",
        cardImage: "/sections/products/vyuflo home.png",
        tagline: "A visa & mobility app, finally sane.",
        overview:
            "Vyuflo is a visa & mobility application we're building in-house. It replaces the email-a-PDF-and-wait ritual with secure document handling, real-time consular status, and automated verification — keeping applicants and immigration teams on the same page. It's under active development and will be available soon.",
        audience: "Being built for immigration teams, mobility firms, and the people they move.",
        features: [
            { title: "Document Handling", description: "Encrypted collection, validation, and routing of every document with a full audit trail." },
            { title: "Real-Time Status", description: "Live application status across consulates so nobody refreshes an inbox waiting for updates." },
            { title: "Automated Checks", description: "OCR, authenticity, and completeness checks — with human review where it actually matters." },
            { title: "Applicant Portal", description: "A guided front door that tells applicants exactly what's needed and what's still pending." },
            { title: "Case Management", description: "Assignments, deadlines, and escalations for case officers, all in one workflow." },
            { title: "Privacy by Default", description: "Data residency, retention, and consent controls considered from the first screen." },
        ],
    },
    {
        slug: "vyu-startup-solutions",
        name: "VYU Startup Solutions",
        kind: "engagement",
        category: "Engagement Model",
        positioning: "MVP to market launch on one calendar.",
        description:
            "Senior-led delivery for funded founders. Strategy, design, engineering, and operations under one accountable principal — from week-one architecture through post-launch ramp.",
        status: "Active",
        accent: "#C9962E",
        image: null,
        cardImage: null,
        tagline: "One accountable principal, from architecture to launch.",
        overview:
            "Not an app — an engagement model. VYU Startup Solutions pulls every studio practice into one accountable principal for funded founders: strategy, design, engineering, and operations on a single calendar, from week-one architecture through post-launch ramp.",
        audience: "Built for funded founders who need senior delivery without building the team first.",
        features: [
            { title: "Week-One Architecture", description: "Right-sized architecture that gets you to revenue without painting you into a corner before Series A." },
            { title: "One Accountable Principal", description: "The same senior who writes the plan writes the code and answers your calls." },
            { title: "Full-Stack Squad", description: "Strategy, design, engineering, and devops in one team — no translation tax between vendors." },
            { title: "Investor-Ready Engineering", description: "Architecture diagrams, security posture, and SOC-readiness docs that survive due diligence." },
            { title: "Launch Operations", description: "Marketing-site engineering, analytics, and support tooling for a real launch week." },
            { title: "Clean Handover", description: "Documented architecture, ADRs, and runbooks so you can operate it yourself when you're ready." },
        ],
        metrics: [
            { figure: "1", suffix: "principal", label: "Accountable senior across the whole engagement" },
            { figure: "4", suffix: "in 1", label: "Strategy, design, engineering, and ops on one calendar" },
            { figure: "12", suffix: "–16 wk", label: "Typical MVP-to-launch window" },
        ],
        secondaryCta: { label: "See the startup practice", href: "/services/vyu-startup-solutions" },
    },
];

export const allProductSlugs = allProducts.map((p) => p.slug);

export function getProductBySlug(slug: string): Product | undefined {
    return allProducts.find((p) => p.slug === slug);
}
