import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { allIndustrySlugs, getIndustryBySlug, allIndustries } from "@/lib/industries";
import { regulatoryForIndustry, operationalSignals } from "@/lib/industryMeta";
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

export default async function IndustryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const industry = getIndustryBySlug(slug);
    if (!industry) notFound();

    const frameworks = regulatoryForIndustry(industry.slug);

    // Cross-link to three other industries (next in the catalogue) so
    // visitors can keep exploring sector adjacencies.
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

            {/* Solutions — white hairline list linking to per-service pages */}
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

            {/* Value props — dark 4/8 editorial split */}
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
            />

            <SiteFooter />
        </>
    );
}
