import { PageBackdrop } from "@/components/layout/PageBackdrop";
import { PageHero } from "@/components/templates/PageHero";
import { ClosingCta } from "@/components/templates/ClosingCta";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getIndustryBySlug } from "@/lib/industries";
import { regulatoryForIndustry } from "@/lib/industryMeta";
import { IndustryCluster, type ClusterIndustry } from "./_components/IndustryCluster";

export const metadata = {
    title: "Industries",
    description:
        "Seventeen regulated verticals across five sectors. We bring engineers who have already shipped under your regulator, your data shape, and your peak-day load.",
};

type Cluster = {
    eyebrow: string;
    title: string;
    lede: string;
    accent: string;
    slugs: string[];
};

const CLUSTERS: Cluster[] = [
    {
        eyebrow: "01 — FINANCIAL",
        title: "Where the postmortem goes to a regulator.",
        lede: "Banks, markets, fintech, insurers. The sector where “move fast” meets capital adequacy — and every design decision has an audit waiting for it.",
        accent: "#F59E0B",
        slugs: ["banking", "capital-markets", "fintech", "insurance"],
    },
    {
        eyebrow: "02 — HEALTH & PUBLIC",
        title: "Systems people don’t get to opt out of.",
        lede: "Care, government, education. High stakes, hard compliance, and users who can’t walk away — so accessibility and privacy are table stakes, not features.",
        accent: "#FF6B6B",
        slugs: ["healthcare", "government", "public-services", "education"],
    },
    {
        eyebrow: "03 — COMMERCE",
        title: "Where milliseconds are money.",
        lede: "Stores, marketplaces, brands, grocery. Conversion, inventory, and peak-day scale — the gap between a record quarter and a checkout that fell over.",
        accent: "#EC4899",
        slugs: ["retail", "ecommerce", "consumer-packed-goods", "food-grocery"],
    },
    {
        eyebrow: "04 — INDUSTRY",
        title: "The physical world, instrumented.",
        lede: "Manufacturing, energy, logistics. Where OT meets IT, downtime is measured in dollars per minute, and security is a safety issue.",
        accent: "#635BFF",
        slugs: ["manufacturing", "energy-utilities", "travel-logistics"],
    },
    {
        eyebrow: "05 — COMMS & IT",
        title: "The infrastructure behind everything.",
        lede: "Telecom, media, and the managed-IT backbone the rest of the economy quietly runs on.",
        accent: "#818CF8",
        slugs: ["communication-media", "it-services"],
    },
];

function buildCluster(slugs: string[]): ClusterIndustry[] {
    return slugs
        .map((slug) => {
            const ind = getIndustryBySlug(slug);
            if (!ind) return null;
            return {
                slug,
                title: ind.title,
                description: ind.description,
                accent: ind.accent,
                frameworks: regulatoryForIndustry(slug)
                    .slice(0, 4)
                    .map((f) => f.label),
            };
        })
        .filter((x): x is ClusterIndustry => Boolean(x));
}

/**
 * /industries — the 17 verticals grouped into their five sectors, each a
 * band that surfaces the cluster's regulatory + operational reality.
 */
export default function IndustriesIndexPage() {
    return (
        <>
            <PageBackdrop />

            <PageHero
                eyebrow="INDUSTRIES"
                title={"We've shipped in\nyour world before."}
                description="Seventeen regulated verticals across five sectors. We don't learn your domain on your dime — we bring engineers who have already shipped under your regulator, your data shape, and your peak-day load."
                cta={{ label: "Start a Project", href: "/contact" }}
                secondary={{ label: "See our services", href: "/services" }}
                heroImage="/sections/industries images/industries index.png"
                heroImagePosition="75% center"
                marginalia={[
                    "COMPLIANCE-FIRST",
                    "SHIPPED, NOT LEARNING",
                    "DENTON · GLOBAL",
                ]}
            />

            {CLUSTERS.map((c, i) => (
                <IndustryCluster
                    key={c.eyebrow}
                    eyebrow={c.eyebrow}
                    title={c.title}
                    lede={c.lede}
                    accent={c.accent}
                    theme={i % 2 === 0 ? "dark" : "light"}
                    industries={buildCluster(c.slugs)}
                />
            ))}

            <ClosingCta
                title="Operate in a regulated vertical?"
                subtitle="Tell us your sector and where it hurts."
                primary={{ label: "Start a Project", href: "/contact" }}
                secondary={{ label: "See our services", href: "/services" }}
                media="/sections/industries images/industries cta.png"
            />

            <SiteFooter />
        </>
    );
}
