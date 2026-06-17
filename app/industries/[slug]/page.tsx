import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { allIndustrySlugs, getIndustryBySlug, allIndustries } from "@/lib/industries";
import { regulatoryForIndustry, operationalSignals } from "@/lib/industryMeta";
import { getIndustryPageContent } from "@/lib/industryPages";
import { PageBackdrop } from "@/components/layout/PageBackdrop";
import { PageHero } from "@/components/templates/PageHero";
import { IndustryBlueprint } from "@/components/templates/IndustryBlueprint";
import { OutcomesStrip } from "@/components/templates/OutcomesStrip";
import { RegulatoryGrid } from "@/components/templates/RegulatoryGrid";
import { RelatedCards } from "@/components/templates/RelatedCards";
import { MarqueeStrip } from "@/components/templates/MarqueeStrip";
import { ClosingCta } from "@/components/templates/ClosingCta";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Reveal } from "@/components/ui/Reveal";
import { IndustryHero } from "../_components/IndustryHero";
import { IndustryChallenge } from "../_components/IndustryChallenge";
import { IndustrySolutions } from "../_components/IndustrySolutions";

const INDUSTRY_HERO_IMAGES: Record<string, { src: string; position?: string; brightness?: number }> = {
    banking: { src: "/sections/industries images/banking.png", position: "75% center" },
    "capital-markets": { src: "/sections/industries images/capital market.png", position: "75% center" },
    "communication-media": { src: "/sections/industries images/communication and media.png", position: "75% center" },
    "consumer-packed-goods": { src: "/sections/industries images/consumer packed goods.png", position: "75% center" },
    ecommerce: { src: "/sections/industries images/e-commerce.png", position: "75% center" },
    education: { src: "/sections/industries images/education.png", position: "75% center" },
    "energy-utilities": { src: "/sections/industries images/energy and utility.png", position: "75% center" },
    fintech: { src: "/sections/industries images/fintech.png", position: "75% center" },
    "food-grocery": { src: "/sections/industries images/food and groceries.png", position: "75% center" },
    government: { src: "/sections/industries images/government.png", position: "75% center" },
    healthcare: { src: "/sections/industries images/health care.png", position: "75% center" },
    insurance: { src: "/sections/industries images/insurance.png", position: "75% center" },
    "it-services": { src: "/sections/industries images/it services.png", position: "75% center" },
    manufacturing: { src: "/sections/industries images/manufacturing.png", position: "75% center" },
    "public-services": { src: "/sections/industries images/public service.png", position: "75% center" },
    retail: { src: "/sections/industries images/retail.png", position: "75% center" },
    "travel-logistics": { src: "/sections/industries images/travel and logistics.png", position: "75% center" },
};

export function generateStaticParams() {
    return allIndustrySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const industry = getIndustryBySlug(slug);
    if (!industry) return { title: "Industry" };
    return {
        title: industry.title,
        description: industry.description,
    };
}

/**
 * Industry pages — lean four-section anatomy: dark hero → cream
 * Challenge diagram (industry-at-center node map) → dark Solutions
 * (numbered cards) → dark CTA + footer. No workflow, no case-study
 * placeholders, no trust-mark row, no sub-sector carousel — each was
 * filler that didn't earn its place. Industries with supplied content
 * (lib/industryPages.ts) render this template; the rest keep legacy.
 */
export default async function IndustryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const industry = getIndustryBySlug(slug);
    if (!industry) notFound();

    const frameworks = regulatoryForIndustry(industry.slug);
    const content = getIndustryPageContent(industry.slug);

    // Cross-link to three other industries (next in the catalogue).
    const idx = allIndustries.findIndex((i) => i.slug === industry.slug);
    const related = [1, 2, 3]
        .map((offset) => allIndustries[(idx + offset) % allIndustries.length])
        .filter((i) => i && i.slug !== industry.slug)
        .slice(0, 3)
        .map((i) => ({
            slug: i.slug,
            title: i.title,
            href: `/industries/${i.slug}`,
            subtitle: "Vertical",
            description: i.description,
        }));

    /* ── Six-section template — for industries with supplied content ─ */
    if (content) {
        return (
            <>
                <PageBackdrop accent={industry.accent} />

                <IndustryHero
                    industry={industry.title}
                    eyebrow={content.eyebrow ?? "INDUSTRY"}
                    headline={content.headline}
                    vision={content.vision}
                    accent={industry.accent}
                    solutionsCount={content.solutions.length}
                    heroImage={INDUSTRY_HERO_IMAGES[slug]?.src}
                    heroImagePosition={INDUSTRY_HERO_IMAGES[slug]?.position}
                    heroImageBrightness={INDUSTRY_HERO_IMAGES[slug]?.brightness}
                />

                <IndustryChallenge
                    industry={industry.title}
                    title={content.challenge.title}
                    lede={content.challenge.lede}
                    cards={content.challenge.cards}
                    accent={industry.accent}
                />

                <IndustrySolutions
                    title={content.solutionsTitle}
                    lede={content.solutionsLede}
                    solutions={content.solutions}
                    accent={industry.accent}
                />

                <ClosingCta
                    title={content.cta.title}
                    subtitle={content.cta.lede}
                    primary={{ label: "Contact us today", href: "/contact" }}
                    secondary={{ label: "See more verticals", href: "/industries" }}
                    media="/sections/industries images/industries cta.png"
                />

                <SiteFooter />
            </>
        );
    }

    /* ── Legacy template (industries without supplied content) ───── */
    const marqueeTokens = [
        industry.title.toUpperCase(),
        `${frameworks.length} REGULATORY FRAMEWORKS`,
        "COMPLIANCE-FIRST DELIVERY",
        "SENIOR-LED ENGAGEMENTS",
        "DOMAIN ENGINEERS",
    ];

    return (
        <>
            <PageBackdrop accent={industry.accent} />

            <PageHero
                eyebrow="VERTICAL"
                title={industry.title}
                description={industry.description}
                accent={industry.accent}
                cta={{ label: "Engage the team", href: "/contact" }}
                heroImage={INDUSTRY_HERO_IMAGES[slug]?.src}
                heroImagePosition={INDUSTRY_HERO_IMAGES[slug]?.position}
                heroImageBrightness={INDUSTRY_HERO_IMAGES[slug]?.brightness}
                aside={
                    <IndustryBlueprint
                        industry={industry.title}
                        solutions={industry.solutions}
                        accent={industry.accent}
                    />
                }
                marginalia={[
                    `${industry.solutions.length} SOLUTIONS`,
                    "REV.01",
                    "COMPLIANCE-FIRST DELIVERY",
                ]}
            />

            <MarqueeStrip items={marqueeTokens} accent={industry.accent} variant="dark" />

            <section
                className="inner-light"
                aria-labelledby="industry-solutions-heading"
                style={{ ["--accent" as string]: industry.accent }}
            >
                <div className="inner-section-inner">
                    <div className="about-competencies-header">
                        <div>
                            <Reveal>
                                <p className="inner-section-eyebrow">SOLUTIONS</p>
                            </Reveal>
                            <Reveal delay={0.08}>
                                <h2
                                    id="industry-solutions-heading"
                                    className="inner-section-headline"
                                >
                                    Built for {industry.title.toLowerCase()}.
                                </h2>
                            </Reveal>
                        </div>
                        <Reveal delay={0.16}>
                            <p className="inner-section-body about-competencies-lede">
                                Specialised practices, tuned to the regulatory weight,
                                data shape, and operational rhythm of the {industry.title.toLowerCase()} sector.
                            </p>
                        </Reveal>
                    </div>

                    <Reveal delay={0.22}>
                        <ol className="inner-hl-list">
                            {industry.solutions.map((s, i) => (
                                <li key={s.slug} className="inner-hl-item">
                                    <Link
                                        href={`/services/${s.slug}`}
                                        className="inner-hl-link"
                                    >
                                        <span className="inner-hl-num">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <h3 className="inner-hl-title">{s.title}</h3>
                                        <p className="inner-hl-desc">
                                            Tailored {s.title.toLowerCase()} for the
                                            {" " + industry.title.toLowerCase()} sector.
                                        </p>
                                        <span className="inner-hl-arrow" aria-hidden="true">
                                            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ol>
                    </Reveal>
                </div>
            </section>

            <RegulatoryGrid
                eyebrow="REGULATORY LANDSCAPE"
                title={`What ${industry.title.toLowerCase()} regulates.`}
                description={`The frameworks we routinely build to in the ${industry.title.toLowerCase()} sector. Every design decision we make on an engagement traces back to one of these.`}
                frameworks={frameworks}
            />

            <OutcomesStrip
                eyebrow="OPERATIONAL SIGNALS"
                title="What the work feels like."
                description="Three commitments that hold whether we are migrating a core platform or shipping a single capability."
                outcomes={operationalSignals}
            />

            <section
                className="inner-dark"
                aria-labelledby="industry-value-heading"
                style={{ ["--accent" as string]: industry.accent }}
            >
                <div className="inner-section-inner">
                    <div className="about-diff-grid">
                        <div className="about-diff-headcol">
                            <Reveal>
                                <p className="inner-section-eyebrow">WHY VYUSOFT</p>
                            </Reveal>
                            <Reveal delay={0.08}>
                                <h2
                                    id="industry-value-heading"
                                    className="inner-section-headline"
                                >
                                    Domain depth meets engineering rigour.
                                </h2>
                            </Reveal>
                            <Reveal delay={0.16}>
                                <p className="inner-section-body about-diff-lede">
                                    Senior engineers who have already shipped in {industry.title.toLowerCase()},
                                    paired with our research lab. We bring patterns; you bring the problem.
                                </p>
                            </Reveal>
                        </div>
                        <Reveal delay={0.22}>
                            <ol className="inner-hl-list about-diff-list">
                                {industry.valueProps.map((prop, i) => (
                                    <li key={i} className="inner-hl-item about-diff-item">
                                        <span className="inner-hl-num">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <p className="about-diff-body">{prop}</p>
                                    </li>
                                ))}
                            </ol>
                        </Reveal>
                    </div>
                </div>
            </section>

            <RelatedCards
                eyebrow="ADJACENT VERTICALS"
                title="Other industries we work in."
                description="Many programmes span sector boundaries: payments + healthcare, manufacturing + retail, banking + government. These verticals often share patterns."
                items={related}
            />

            <ClosingCta
                title={`Working in ${industry.title.toLowerCase()}?`}
                subtitle="Tell us where it hurts."
                primary={{ label: "Start the conversation", href: "/contact" }}
                secondary={{ label: "See more verticals", href: "/industries" }}
                media="/sections/industries images/industries cta.png"
            />

            <SiteFooter />
        </>
    );
}
