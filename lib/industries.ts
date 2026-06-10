// Source-of-truth data for the 17 industry pages. Drives /industries/[slug] dynamic route.
//
// Every industry has a hand-written description, accent colour, six linked
// solutions (mapped to real service slugs), and six sector-specific value
// propositions. We deliberately avoid generic copy — each entry should read
// as if written by someone who has shipped in that sector.

import { industriesNav } from "./nav";

export type Solution = { slug: string; title: string };
export type Industry = {
    slug: string;
    title: string;
    accent: string;
    description: string;
    /** Linked services that map to this industry. */
    solutions: Solution[];
    /** "Why VyuSoft for X" bullet points. */
    valueProps: string[];
};

type Override = {
    description: string;
    accent: string;
    solutions: Solution[];
    valueProps: string[];
};

const overrides: Record<string, Override> = {
    // ── FINANCIAL ─────────────────────────────────────────────────────────────
    banking: {
        accent: "#F59E0B",
        description:
            "Core modernisation, digital channels, and risk platforms for retail, commercial, and private banks — engineered to survive audits and outages.",
        solutions: [
            { slug: "enterprise-solutions", title: "Core Banking Modernisation" },
            { slug: "cyber-security", title: "Fraud & Cyber Defence" },
            { slug: "data", title: "Risk & Regulatory Analytics" },
            { slug: "digital-solutions-web-app", title: "Digital Banking Channels" },
            { slug: "payment-solutions", title: "Payments & Settlement" },
            { slug: "artificial-intelligence", title: "AI for Underwriting & Service" },
        ],
        valueProps: [
            "Core banking modernisation off mainframe and AS/400 stacks.",
            "Real-time fraud, AML, and sanctions screening pipelines.",
            "Regulatory reporting automation — Basel, CCAR, FFIEC, RBI.",
            "Mobile and web banking channels with biometric and passkey auth.",
            "ISO 20022 migration and payments orchestration.",
            "Customer 360, propensity models, and next-best-action engines.",
        ],
    },
    "capital-markets": {
        accent: "#00D4FF",
        description:
            "Low-latency trading, quant analytics, and post-trade infrastructure for buy-side and sell-side institutions — measured in microseconds, audited in hours.",
        solutions: [
            { slug: "data", title: "Market Data & Quant Platforms" },
            { slug: "cloud", title: "Co-located & Hybrid Cloud" },
            { slug: "artificial-intelligence", title: "Alpha & Risk Models" },
            { slug: "cyber-security", title: "Trading-Floor Security" },
            { slug: "enterprise-solutions", title: "Post-Trade & Reconciliation" },
            { slug: "devops", title: "Release Engineering for Trading" },
        ],
        valueProps: [
            "Low-latency execution venues, FIX/FIXatdl, and order management.",
            "Tick-by-tick data lakes, time-series stores, and feature pipelines.",
            "Quant research environments — kdb+, Python, vector tooling.",
            "Real-time market, credit, and counterparty risk dashboards.",
            "T+1 settlement readiness and CSDR-aligned post-trade.",
            "MiFID II, Dodd-Frank, and SEC Rule 17a-4 record-keeping.",
        ],
    },
    fintech: {
        accent: "#22C55E",
        description:
            "Resilient, regulated, lightning-fast fintech infrastructure — embedded payments, lending, neobanking, and wealth tech — designed for scale on day one.",
        solutions: [
            { slug: "payment-solutions", title: "Payments & Card Issuing" },
            { slug: "cyber-security", title: "KYC, AML & Fraud" },
            { slug: "cloud", title: "Cloud-Native Banking Stack" },
            { slug: "artificial-intelligence", title: "Credit Decisioning AI" },
            { slug: "blockchain-app-development", title: "Tokenisation & Stablecoins" },
            { slug: "digital-solutions-web-app", title: "Consumer & Merchant Apps" },
        ],
        valueProps: [
            "PCI DSS, PSD2/SCA, and PSD3 readiness from launch.",
            "KYC, KYB, and perpetual-monitoring orchestration.",
            "Real-time fraud, AML, and transaction-monitoring pipelines.",
            "Ledger-grade double-entry systems with audit immutability.",
            "Card-issuing, BIN sponsorship, and embedded-finance APIs.",
            "Open Banking, FDX, and account-aggregation integrations.",
        ],
    },
    insurance: {
        accent: "#06B6D4",
        description:
            "Underwriting automation, claims intelligence, and policy administration platforms purpose-built for modern P&C, life, and health carriers.",
        solutions: [
            { slug: "artificial-intelligence", title: "Underwriting & Claims AI" },
            { slug: "data", title: "Actuarial Data Platforms" },
            { slug: "enterprise-solutions", title: "Policy Administration" },
            { slug: "digital-solutions-web-app", title: "Broker & Customer Portals" },
            { slug: "iot-digital-engineering", title: "Telematics & IoT Sensing" },
            { slug: "cyber-security", title: "Compliance & Data Privacy" },
        ],
        valueProps: [
            "Straight-through underwriting with explainable AI scoring.",
            "Claims triage, fraud detection, and image-based estimation.",
            "Guidewire, Duck Creek, and Sapiens migrations and extensions.",
            "Embedded insurance, broker APIs, and quote-and-bind portals.",
            "Telematics, wearables, and IoT-driven usage-based pricing.",
            "SOC 2, NAIC, HIPAA, and Solvency II-aligned compliance.",
        ],
    },

    // ── HEALTH & PUBLIC ───────────────────────────────────────────────────────
    healthcare: {
        accent: "#FF6B6B",
        description:
            "Patient-first systems and AI-assisted clinical tooling that improve outcomes, lower costs, and stand up to HIPAA, HITRUST, and FDA software-as-a-medical-device review.",
        solutions: [
            { slug: "artificial-intelligence", title: "Clinical Decision Support" },
            { slug: "data", title: "Clinical Data Platforms & FHIR" },
            { slug: "digital-solutions-web-app", title: "Patient & Provider Portals" },
            { slug: "iot-digital-engineering", title: "Remote Patient Monitoring" },
            { slug: "wearables", title: "Wearables & Connected Devices" },
            { slug: "cyber-security", title: "HIPAA & HITRUST Security" },
        ],
        valueProps: [
            "EHR integrations — Epic, Cerner, Athena — and FHIR-native APIs.",
            "Telehealth, asynchronous care, and remote-monitoring platforms.",
            "AI-assisted triage, radiology, and clinical decision support.",
            "HIPAA, HITRUST CSF, SOC 2, and HITECH compliance posture.",
            "Patient engagement, scheduling, and digital front-door portals.",
            "Clinical data warehouses, ML-ready cohorts, and analytics.",
        ],
    },
    government: {
        accent: "#0EA5E9",
        description:
            "Citizen-facing portals and back-office modernisation for federal, state, and local government — accessibility-first, audit-ready, and cleared for FedRAMP and StateRAMP.",
        solutions: [
            { slug: "digital-solutions-web-app", title: "Citizen Service Portals" },
            { slug: "enterprise-solutions", title: "Case & Benefits Management" },
            { slug: "cloud", title: "FedRAMP / StateRAMP Cloud" },
            { slug: "cyber-security", title: "FISMA & Zero-Trust Security" },
            { slug: "data", title: "Open Data & Reporting" },
            { slug: "consulting", title: "Digital Service Strategy" },
        ],
        valueProps: [
            "Section 508 and WCAG 2.2 AA accessibility built in by default.",
            "FedRAMP Moderate, StateRAMP, and CJIS-aligned cloud architectures.",
            "Legacy COBOL, mainframe, and FoxPro modernisation paths.",
            "Identity proofing — Login.gov, ID.me, NIST 800-63 IAL/AAL.",
            "Open-data publishing and FOIA-ready record management.",
            "Procurement-aware delivery — TBM, agile BPA, and 18F-style ATO.",
        ],
    },
    "public-services": {
        accent: "#3B82F6",
        description:
            "Workflow modernisation and citizen-engagement platforms for public-sector agencies, utilities authorities, and mission-driven non-profits.",
        solutions: [
            { slug: "digital-solutions-web-app", title: "Service Request Portals" },
            { slug: "enterprise-solutions", title: "Case Management Systems" },
            { slug: "data", title: "Performance Analytics" },
            { slug: "artificial-intelligence", title: "AI Triage & Routing" },
            { slug: "cyber-security", title: "Records & Privacy Protection" },
            { slug: "consulting", title: "Programme & Change Advisory" },
        ],
        valueProps: [
            "311-style omnichannel intake — web, voice, SMS, and walk-in.",
            "Workflow engines for permits, licensing, and inspections.",
            "Multilingual, accessibility-compliant resident interfaces.",
            "Real-time performance dashboards for council and oversight.",
            "Privacy-by-design records management and retention policy.",
            "Change-management partnership — not just delivery.",
        ],
    },
    education: {
        accent: "#A18CD1",
        description:
            "EdTech and LMS platforms that scale from classrooms to global universities — engagement-first design, FERPA-compliant, and instrumented for learning outcomes.",
        solutions: [
            { slug: "digital-solutions-web-app", title: "Learning Platforms & LMS" },
            { slug: "artificial-intelligence", title: "Adaptive Learning AI" },
            { slug: "data", title: "Learning Analytics" },
            { slug: "ui-ux-development", title: "Learner Experience Design" },
            { slug: "cross-platform-apps", title: "Student & Faculty Apps" },
            { slug: "cyber-security", title: "FERPA & Safeguarding" },
        ],
        valueProps: [
            "LMS — Canvas, Moodle, D2L — integrations and custom builds.",
            "Adaptive assessment and AI tutoring with content guardrails.",
            "SIS, SSO, LTI 1.3, and OneRoster integrations.",
            "FERPA, COPPA, and GDPR-K compliance for under-13 audiences.",
            "Engagement, retention, and at-risk-learner analytics.",
            "Accessible-by-default WCAG 2.2 AA, captioning, and dyslexia-aware UI.",
        ],
    },

    // ── COMMERCE ──────────────────────────────────────────────────────────────
    retail: {
        accent: "#EC4899",
        description:
            "Storefronts, supply chain, and personalisation engines that turn one-time shoppers into lifetime customers across stores, web, and marketplace.",
        solutions: [
            { slug: "digital-solutions-web-app", title: "Headless Commerce" },
            { slug: "artificial-intelligence", title: "Personalisation Engines" },
            { slug: "data", title: "Customer Data Platforms" },
            { slug: "enterprise-solutions", title: "OMS & Inventory" },
            { slug: "payment-solutions", title: "Unified Checkout" },
            { slug: "ui-ux-development", title: "Brand & Storefront Design" },
        ],
        valueProps: [
            "Headless commerce on Shopify, commercetools, Saleor, and BigCommerce.",
            "Real-time inventory, omnichannel OMS, and BOPIS workflows.",
            "Personalisation, recommendation, and search rerank with AI.",
            "Customer Data Platforms with Segment, RudderStack, or in-house CDP.",
            "Unified checkout, loyalty, and gift-card orchestration.",
            "Store-associate apps, RFID, and clienteling tooling.",
        ],
    },
    ecommerce: {
        accent: "#F472B6",
        description:
            "Headless commerce, conversion optimisation, and unified channel experiences that lift revenue per visitor — and survive a Black Friday spike.",
        solutions: [
            { slug: "digital-solutions-web-app", title: "Storefront Engineering" },
            { slug: "ui-ux-development", title: "Conversion-Led UX" },
            { slug: "artificial-intelligence", title: "Search, Recs & GenAI Shopping" },
            { slug: "payment-solutions", title: "Checkout & Subscriptions" },
            { slug: "data", title: "Marketing & Funnel Analytics" },
            { slug: "digital-marketing-monitoring", title: "Performance Marketing Ops" },
        ],
        valueProps: [
            "Composable commerce with sub-second page performance budgets.",
            "Server-side tagging, consent mode, and first-party analytics.",
            "AI-powered search, semantic recommendations, and chat shopping.",
            "Checkout, wallets, BNPL, and subscription billing orchestration.",
            "A/B and multivariate experimentation with statistical guardrails.",
            "SEO-grade rendering, structured data, and Core Web Vitals.",
        ],
    },
    "consumer-packed-goods": {
        accent: "#F472B6",
        description:
            "Demand forecasting, trade promotion, and DTC commerce for consumer packed goods brands selling through retail, wholesale, and direct channels.",
        solutions: [
            { slug: "data", title: "Demand Forecasting" },
            { slug: "artificial-intelligence", title: "Trade Promotion Optimisation" },
            { slug: "enterprise-solutions", title: "S&OP / IBP Platforms" },
            { slug: "digital-solutions-web-app", title: "DTC Brand Experiences" },
            { slug: "iot-digital-engineering", title: "Connected Supply Chain" },
            { slug: "cloud", title: "Retail Data Sharing" },
        ],
        valueProps: [
            "AI-driven demand sensing across syndicated and POS data.",
            "Trade promotion ROI modelling and shopper-marketing analytics.",
            "Integrated business planning — S&OP, IBP, and S&OE.",
            "Direct-to-consumer storefronts with subscription mechanics.",
            "Connected pallet, cold-chain, and last-mile telemetry.",
            "Retail-media monetisation and clean-room data sharing.",
        ],
    },
    "food-grocery": {
        accent: "#84CC16",
        description:
            "Order management, last-mile delivery, and inventory intelligence for grocery chains, dark-store operators, and quick-commerce platforms.",
        solutions: [
            { slug: "digital-solutions-web-app", title: "Ordering & Quick Commerce" },
            { slug: "cross-platform-apps", title: "Customer & Rider Apps" },
            { slug: "artificial-intelligence", title: "Demand & Pricing AI" },
            { slug: "data", title: "Inventory & Waste Analytics" },
            { slug: "iot-digital-engineering", title: "Cold Chain & Sensors" },
            { slug: "payment-solutions", title: "Tip, Wallet & Loyalty" },
        ],
        valueProps: [
            "10-minute fulfilment, dark-store, and micro-fulfilment ops.",
            "Dynamic slot management and route-optimised last mile.",
            "AI-driven freshness, expiry, and waste reduction.",
            "Inventory accuracy across multi-temperature, multi-banner.",
            "Loyalty, vouchering, and SNAP/EBT-aware payment flows.",
            "Marketplace integrations — Instacart, Uber Eats, DoorDash.",
        ],
    },

    // ── INDUSTRY ──────────────────────────────────────────────────────────────
    manufacturing: {
        accent: "#635BFF",
        description:
            "IoT, predictive maintenance, and digital twins that move manufacturing from reactive firefighting to predictive, instrumented operations.",
        solutions: [
            { slug: "iot-digital-engineering", title: "Industrial IoT" },
            { slug: "artificial-intelligence", title: "Predictive Maintenance" },
            { slug: "data", title: "OEE & MES Analytics" },
            { slug: "enterprise-solutions", title: "ERP & MES Modernisation" },
            { slug: "cloud", title: "Edge & Hybrid Cloud" },
            { slug: "cyber-security", title: "OT/ICS Security" },
        ],
        valueProps: [
            "MES, SCADA, and historian integrations — OSIsoft PI, Ignition, Wonderware.",
            "Predictive maintenance models for rotating equipment and CNC.",
            "Digital twins for plants, lines, and supply networks.",
            "OT/ICS cyber posture — Purdue model, IEC 62443, NIST SP 800-82.",
            "Quality 4.0 — vision inspection, SPC, and traceability.",
            "Edge compute, OPC UA, and unified namespace architectures.",
        ],
    },
    "energy-utilities": {
        accent: "#FACC15",
        description:
            "Smart-grid, asset management, and sustainability analytics for energy producers, utilities, and renewable operators — built for NERC CIP and ESG audit.",
        solutions: [
            { slug: "iot-digital-engineering", title: "Smart Grid & SCADA" },
            { slug: "artificial-intelligence", title: "Load & Outage Forecasting" },
            { slug: "data", title: "Asset & ESG Analytics" },
            { slug: "cyber-security", title: "NERC CIP Security" },
            { slug: "enterprise-solutions", title: "CIS & Billing" },
            { slug: "cloud", title: "Grid-Edge Compute" },
        ],
        valueProps: [
            "AMI, MDM, and meter-data-to-billing pipelines.",
            "Outage prediction, vegetation, and storm-readiness analytics.",
            "DER, EV-charging, and virtual-power-plant orchestration.",
            "NERC CIP, FERC, and OT security operations.",
            "Carbon, methane, and Scope 1/2/3 ESG reporting.",
            "Customer self-service, prepay, and energy-marketplace apps.",
        ],
    },
    "travel-logistics": {
        accent: "#10B981",
        description:
            "Booking platforms, fleet operations, and last-mile logistics powered by real-time data — for airlines, carriers, freight forwarders, and 3PLs.",
        solutions: [
            { slug: "digital-solutions-web-app", title: "Booking & Reservation" },
            { slug: "artificial-intelligence", title: "Pricing & Route AI" },
            { slug: "data", title: "Network & Yield Analytics" },
            { slug: "iot-digital-engineering", title: "Fleet & Telematics" },
            { slug: "enterprise-solutions", title: "TMS, WMS & OMS" },
            { slug: "cross-platform-apps", title: "Driver & Crew Apps" },
        ],
        valueProps: [
            "Booking, reservation, and NDC-aware distribution platforms.",
            "Dynamic pricing, revenue management, and yield optimisation.",
            "TMS, WMS, port, and customs-broker integrations.",
            "Real-time fleet telematics, ELD, and HOS compliance.",
            "Last-mile routing, slot optimisation, and proof-of-delivery.",
            "Loyalty, ancillary, and disruption-recovery automation.",
        ],
    },

    // ── COMMS & IT ────────────────────────────────────────────────────────────
    "communication-media": {
        accent: "#818CF8",
        description:
            "Content platforms, OTT, and 5G-enabled experiences for telecom, media, and entertainment organisations — engineered for scale at premiere night.",
        solutions: [
            { slug: "digital-solutions-web-app", title: "OTT & Streaming Platforms" },
            { slug: "artificial-intelligence", title: "Content & Recommendation AI" },
            { slug: "data", title: "Audience & Ad Analytics" },
            { slug: "cloud", title: "Media Pipelines & CDN" },
            { slug: "enterprise-solutions", title: "BSS / OSS Modernisation" },
            { slug: "cyber-security", title: "DRM & Content Protection" },
        ],
        valueProps: [
            "OTT, DRM, low-latency streaming, and live-event scaling.",
            "Recommendation, search, and discovery powered by GenAI.",
            "Ad-tech, SSAI, programmatic, and clean-room measurement.",
            "BSS/OSS, charging, and 5G slicing for telcos.",
            "Newsroom, MAM/DAM, and content-production pipelines.",
            "Subscriber acquisition, churn, and lifetime-value modelling.",
        ],
    },
    "it-services": {
        accent: "#34D399",
        description:
            "Managed IT, NOC/SOC services, and digital workplace solutions for IT-led businesses — running quietly so the rest of the business can move loudly.",
        solutions: [
            { slug: "end-user-computing", title: "Digital Workplace" },
            { slug: "cyber-security", title: "SOC & Managed Security" },
            { slug: "cloud", title: "Managed Cloud" },
            { slug: "devops", title: "Platform Engineering" },
            { slug: "operational-tools", title: "ITSM & Observability" },
            { slug: "software-quality-testing", title: "Quality Engineering" },
        ],
        valueProps: [
            "24×7 NOC/SOC operations with on-call and runbooks.",
            "ITSM, ITAM, and observability on ServiceNow and Datadog.",
            "Managed AWS, Azure, and GCP landing zones.",
            "Digital workplace — Intune, Jamf, M365, Google Workspace.",
            "SLA-backed incident, problem, and change management.",
            "Vendor consolidation and cost-engineering for IT estates.",
        ],
    },
};

export const allIndustries: Industry[] = industriesNav.map((item) => {
    const o = overrides[item.slug];
    if (!o) {
        // Safety fallback (should not hit — every nav slug has an override).
        return {
            slug: item.slug,
            title: item.title,
            accent: "#635BFF",
            description: `Tailored technology solutions for the ${item.title.toLowerCase()} industry — from strategy through managed operations.`,
            solutions: [
                { slug: "consulting", title: "Strategy & Advisory" },
                { slug: "digital-solutions-web-app", title: "Product Engineering" },
                { slug: "data", title: "Data & Analytics" },
                { slug: "artificial-intelligence", title: "Applied AI" },
                { slug: "cloud", title: "Cloud Modernisation" },
                { slug: "cyber-security", title: "Security & Compliance" },
            ],
            valueProps: [
                `Domain expertise in ${item.title.toLowerCase()}.`,
                "Compliance and regulatory readiness.",
                "Customer experience and engagement.",
                "Operational automation and efficiency.",
                "Real-time analytics and reporting.",
                "Scalable platforms built for growth.",
            ],
        };
    }
    return {
        slug: item.slug,
        title: item.title,
        accent: o.accent,
        description: o.description,
        solutions: o.solutions,
        valueProps: o.valueProps,
    };
});

export const allIndustrySlugs = allIndustries.map((i) => i.slug);

export function getIndustryBySlug(slug: string): Industry | undefined {
    return allIndustries.find((i) => i.slug === slug);
}
