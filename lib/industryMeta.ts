// Content-aware enrichment for the 17 industry pages.
// Drives the regulatory landscape + operational signals sections.

export type RegulatoryFramework = {
    label: string;
    scope: string;
};

const REGULATORY_DEFAULTS: RegulatoryFramework[] = [
    { label: "SOC 2 Type II", scope: "Information security controls" },
    { label: "ISO 27001", scope: "Information security management" },
    { label: "GDPR", scope: "EU data subject rights" },
    { label: "Local data residency", scope: "Region-bound storage and processing" },
];

const REGULATORY_BY_INDUSTRY: Record<string, RegulatoryFramework[]> = {
    banking: [
        { label: "FFIEC", scope: "Federal banking examination" },
        { label: "Basel III", scope: "Capital adequacy" },
        { label: "Reg E · Reg Z", scope: "Consumer protection" },
        { label: "PCI DSS 4.0", scope: "Cardholder data security" },
        { label: "AML · BSA · FATF", scope: "Anti-money-laundering" },
        { label: "SOC 1 · SOC 2", scope: "Service-organization controls" },
    ],
    "capital-markets": [
        { label: "MiFID II", scope: "European trading transparency" },
        { label: "Reg NMS · Reg SCI", scope: "US market structure" },
        { label: "Dodd-Frank", scope: "Derivatives reporting" },
        { label: "FINRA", scope: "Broker-dealer conduct" },
        { label: "EMIR · CSDR", scope: "EU clearing and settlement" },
        { label: "SOC 2", scope: "Operational controls" },
    ],
    fintech: [
        { label: "PCI DSS 4.0", scope: "Card processing security" },
        { label: "PSD2 · Open Banking", scope: "EU payment services" },
        { label: "KYC · KYB", scope: "Customer due diligence" },
        { label: "AML · FinCEN", scope: "Anti-money-laundering" },
        { label: "GDPR · CCPA", scope: "Privacy and consent" },
        { label: "SOC 2 Type II", scope: "Trust services criteria" },
    ],
    healthcare: [
        { label: "HIPAA · HITECH", scope: "Patient data protection" },
        { label: "HITRUST CSF", scope: "Healthcare-specific controls" },
        { label: "FDA 21 CFR Part 11", scope: "Electronic records" },
        { label: "HL7 · FHIR", scope: "Interoperability standards" },
        { label: "GDPR Article 9", scope: "Special-category health data" },
        { label: "SOC 2 Type II", scope: "Operational controls" },
    ],
    insurance: [
        { label: "NAIC Model Law", scope: "US insurance cybersecurity" },
        { label: "Solvency II", scope: "EU capital adequacy" },
        { label: "GDPR · CCPA", scope: "Policyholder privacy" },
        { label: "PCI DSS", scope: "Premium card processing" },
        { label: "SOC 1 · SOC 2", scope: "Service-organization controls" },
    ],
    government: [
        { label: "FedRAMP", scope: "US federal cloud authorization" },
        { label: "FISMA · NIST 800-53", scope: "Federal information security" },
        { label: "StateRAMP", scope: "State and local cloud" },
        { label: "CJIS", scope: "Criminal justice data" },
        { label: "Section 508", scope: "Accessibility for federal IT" },
    ],
    education: [
        { label: "FERPA", scope: "Student record privacy" },
        { label: "COPPA", scope: "Children under 13" },
        { label: "WCAG 2.2 AA", scope: "Accessibility" },
        { label: "GDPR Article 8", scope: "EU minors and consent" },
        { label: "SOC 2 Type II", scope: "Operational controls" },
    ],
    retail: [
        { label: "PCI DSS 4.0", scope: "Card processing" },
        { label: "GDPR · CCPA · CPRA", scope: "Consumer privacy" },
        { label: "ADA Title III", scope: "Digital accessibility" },
        { label: "SOC 2 Type II", scope: "Operational controls" },
    ],
    manufacturing: [
        { label: "ISO 27001", scope: "Information security management" },
        { label: "ISO 9001", scope: "Quality management" },
        { label: "NIST CSF", scope: "Industrial cybersecurity" },
        { label: "IEC 62443", scope: "Industrial control system security" },
        { label: "GDPR", scope: "Employee and customer data" },
    ],
    ecommerce: [
        { label: "PCI DSS 4.0", scope: "Payment card processing" },
        { label: "GDPR · CCPA · LGPD", scope: "Multi-region consumer privacy" },
        { label: "ADA Title III · WCAG AA", scope: "Accessibility" },
        { label: "EU DSA", scope: "Digital Services Act" },
    ],
    "energy-utilities": [
        { label: "NERC CIP", scope: "North American grid security" },
        { label: "ISO 27019", scope: "Energy industry controls" },
        { label: "IEC 62443", scope: "Operational technology security" },
        { label: "GDPR", scope: "Customer data protection" },
    ],
    "communication-media": [
        { label: "FCC · Ofcom", scope: "Telecom regulation" },
        { label: "GDPR · CCPA", scope: "Subscriber privacy" },
        { label: "WCAG 2.2 AA", scope: "Accessibility for streaming" },
        { label: "DMCA · EUCD", scope: "Copyright" },
    ],
    "it-services": [
        { label: "ISO 27001", scope: "Information security management" },
        { label: "SOC 2 Type II", scope: "Operational controls" },
        { label: "ITIL 4", scope: "Service management framework" },
        { label: "GDPR · CCPA", scope: "Customer privacy" },
    ],
    "public-services": [
        { label: "FedRAMP / StateRAMP", scope: "Government cloud authorization" },
        { label: "Section 508", scope: "Federal accessibility" },
        { label: "WCAG 2.2 AA", scope: "Citizen-facing accessibility" },
        { label: "Privacy Act of 1974", scope: "Federal records" },
    ],
    "travel-logistics": [
        { label: "PCI DSS 4.0", scope: "Booking payment security" },
        { label: "GDPR · CCPA", scope: "Traveler data privacy" },
        { label: "C-TPAT", scope: "US customs trade partnership" },
        { label: "IATA NDC", scope: "Airline distribution standards" },
    ],
    "consumer-packed-goods": [
        { label: "FDA · USDA", scope: "Product safety and labeling" },
        { label: "GDPR · CCPA", scope: "Consumer privacy" },
        { label: "GS1 standards", scope: "Supply chain identifiers" },
        { label: "SOC 2 Type II", scope: "Operational controls" },
    ],
    "food-grocery": [
        { label: "FDA FSMA", scope: "Food safety modernization" },
        { label: "HACCP", scope: "Hazard analysis" },
        { label: "GDPR · CCPA", scope: "Consumer privacy" },
        { label: "PCI DSS", scope: "Card processing for grocery" },
    ],
};

export function regulatoryForIndustry(slug: string): RegulatoryFramework[] {
    return REGULATORY_BY_INDUSTRY[slug] ?? REGULATORY_DEFAULTS;
}

/* ── Sector reality — one editorial statement per industry that says
   what the sector actually is, before any selling happens. Qualitative
   truths only; no invented figures. Currently written for the dossier-
   template pilot sectors; extended at rollout. */
export type SectorRealityCopy = {
    kicker: string;
    statement: string;
    conditions: string[];
};

const REALITY_BY_INDUSTRY: Record<string, SectorRealityCopy> = {
    banking: {
        kicker: "What banking runs on.",
        statement: "Trust, settled in milliseconds.",
        conditions: [
            "Always-on availability is the baseline, not the feature.",
            "Every transaction must survive an audit.",
            "Fraud adapts daily — defences have to adapt faster.",
        ],
    },
    healthcare: {
        kicker: "What healthcare protects.",
        statement: "Human life, recorded in data.",
        conditions: [
            "Patient data outlives every system that stores it.",
            "Downtime is measured in outcomes, not minutes.",
            "Interoperability is a clinical requirement, not a feature.",
        ],
    },
    manufacturing: {
        kicker: "What manufacturing optimises.",
        statement: "Physical throughput, decided in software.",
        conditions: [
            "The line does not pause for software releases.",
            "Every sensor is a decision waiting to be made.",
            "Safety and uptime are the same requirement.",
        ],
    },
};

export function realityForIndustry(slug: string): SectorRealityCopy | undefined {
    return REALITY_BY_INDUSTRY[slug];
}

/* ── Operational signals — three numbers per industry that read as
   credible delivery commitments. Generic but punchy; per-industry
   overrides can replace if needed. */
export type Signal = { figure: string; suffix?: string; label: string };

export const operationalSignals: Signal[] = [
    { figure: "0", suffix: "downtime", label: "Cutover targets we miss in regulated migrations" },
    { figure: "24", suffix: "/7", label: "Senior-led incident response on every live engagement" },
    { figure: "100", suffix: "%", label: "Engagements with documented architecture records" },
];
