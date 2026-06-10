// Navigation data — single source of truth for header, footer, and dynamic routes.
// In Phase 2 this file also drives /services/[slug], /industries/[slug], and /development/[slug] pages.

export type NavItem = { slug: string; title: string };
export type ServiceGroup = { title: string; items: NavItem[] };

export const servicesByGroup: ServiceGroup[] = [
    {
        title: "Technology",
        items: [
            { slug: "artificial-intelligence", title: "Artificial Intelligence" },
            { slug: "cyber-security", title: "Cyber Security" },
            { slug: "cloud", title: "Cloud" },
            { slug: "data", title: "Data" },
            { slug: "devops", title: "DevOps" },
            { slug: "network-solutions", title: "Network Solutions" },
        ],
    },
    {
        title: "Engineering",
        items: [
            { slug: "digital-solutions-web-app", title: "Web & App Dev" },
            { slug: "ui-ux-development", title: "UI/UX Development" },
            { slug: "cross-platform-apps", title: "Cross Platform Apps" },
            { slug: "blockchain-app-development", title: "Blockchain Dev" },
            { slug: "iot-digital-engineering", title: "IoT & Digital Eng." },
            { slug: "wearables", title: "Wearables" },
        ],
    },
    {
        title: "Enterprise",
        items: [
            { slug: "enterprise-solutions", title: "Enterprise Solutions" },
            { slug: "erps", title: "ERPs" },
            { slug: "cognitive-business-operation", title: "Cognitive Business Ops" },
            { slug: "digital-architect", title: "Digital Architect" },
            { slug: "vyu-migrations", title: "Vyu Migrations" },
            { slug: "end-user-computing", title: "End User Computing" },
        ],
    },
    {
        title: "Growth",
        items: [
            { slug: "consulting", title: "Consulting" },
            { slug: "business-development", title: "Business Development" },
            { slug: "digital-marketing-monitoring", title: "Digital Marketing" },
            { slug: "vyu-startup-solutions", title: "Startup Solutions" },
            { slug: "prototyping", title: "Prototyping" },
            { slug: "hr-services", title: "HR Services" },
        ],
    },
    {
        title: "Operations",
        items: [
            { slug: "backup-data-protection", title: "Backup & Data" },
            { slug: "aws-microsoft-google", title: "AWS, Azure, GCP" },
            { slug: "payment-solutions", title: "Payment Solutions" },
            { slug: "operational-tools", title: "Operational Tools" },
            { slug: "software-quality-testing", title: "Quality Testing" },
            { slug: "info-xchange", title: "Info Xchange" },
        ],
    },
];

export const industriesNav: NavItem[] = [
    { slug: "banking", title: "Banking" },
    { slug: "capital-markets", title: "Capital Markets" },
    { slug: "consumer-packed-goods", title: "Consumer Packed Goods" },
    { slug: "communication-media", title: "Communication & Media" },
    { slug: "it-services", title: "IT Services" },
    { slug: "education", title: "Education" },
    { slug: "energy-utilities", title: "Energy & Utilities" },
    { slug: "healthcare", title: "Healthcare" },
    { slug: "insurance", title: "Insurance" },
    { slug: "government", title: "Government" },
    { slug: "manufacturing", title: "Manufacturing" },
    { slug: "public-services", title: "Public Services" },
    { slug: "retail", title: "Retail" },
    { slug: "travel-logistics", title: "Travel & Logistics" },
    { slug: "ecommerce", title: "Ecommerce" },
    { slug: "fintech", title: "FinTech" },
    { slug: "food-grocery", title: "Food & Grocery" },
];

export const productsNav: NavItem[] = [
    { slug: "vyudine", title: "Vyudine" },
    { slug: "mivyu", title: "Mivyu" },
    { slug: "vyuflo", title: "Vyuflo" },
    { slug: "vyu-startup-solutions", title: "VYU Startup Solutions" },
];

export const developmentNav: NavItem[] = [
    { slug: "discover", title: "Discover" },
    { slug: "analyse", title: "Analyse & Sustainability" },
    { slug: "ui-prototyping", title: "UI & Prototyping / MVP" },
    { slug: "iterations", title: "Iterations" },
    { slug: "development", title: "Development" },
    { slug: "testing-qa", title: "Testing & QA" },
    { slug: "launch-support", title: "Launch & Support" },
];

// Flat list (handy for the mobile accordion)
export const allServices = servicesByGroup.flatMap((g) => g.items);
