import { notFound } from "next/navigation";
import Link from "next/link";
import {
    allDevelopmentSlugs,
    getDevelopmentBySlug,
    allDevelopmentPhases,
} from "@/lib/development";
import { metaForPhase } from "@/lib/developmentMeta";
import { PageBackdrop } from "@/components/layout/PageBackdrop";
import { PageHero } from "@/components/templates/PageHero";
import { PhaseTrack } from "@/components/templates/PhaseTrack";
import { ArtifactsGrid } from "@/components/templates/ArtifactsGrid";
import { MarqueeStrip } from "@/components/templates/MarqueeStrip";
import { ClosingCta } from "@/components/templates/ClosingCta";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Reveal } from "@/components/ui/Reveal";

export function generateStaticParams() {
    return allDevelopmentSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const phase = getDevelopmentBySlug(slug);
    if (!phase) return { title: "Process" };
    return {
        title: phase.title,
        description: phase.description,
    };
}

export default async function DevelopmentPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const phase = getDevelopmentBySlug(slug);
    if (!phase) notFound();

    const meta = metaForPhase(phase.slug);

    const next = allDevelopmentPhases.find(
        (p) => p.phaseNumber === phase.phaseNumber + 1,
    );
    const prev = allDevelopmentPhases.find(
        (p) => p.phaseNumber === phase.phaseNumber - 1,
    );

    const marqueeTokens = [
        `PHASE ${String(phase.phaseNumber).padStart(2, "0")}`,
        phase.title.toUpperCase(),
        meta.duration.toUpperCase(),
        meta.cadence.toUpperCase(),
        `LED BY ${meta.leadRole.toUpperCase()}`,
        "TRANSPARENT · ITERATIVE",
    ];

    return (
        <>
            <PageBackdrop accent={phase.accent} />

            <PageHero
                eyebrow={`PHASE ${String(phase.phaseNumber).padStart(2, "0")} OF ${String(allDevelopmentPhases.length).padStart(2, "0")}`}
                title={phase.title}
                description={phase.description}
                accent={phase.accent}
                cta={{ label: "Talk to the team", href: "/contact" }}
                marginalia={[
                    `${phase.activities.length} ACTIVITIES`,
                    `DURATION · ${meta.duration.toUpperCase()}`,
                    `LEAD · ${meta.leadRole.toUpperCase()}`,
                ]}
            />

            <MarqueeStrip items={marqueeTokens} accent={phase.accent} variant="dark" />

            <PhaseTrack
                phases={allDevelopmentPhases.map((p) => ({
                    slug: p.slug,
                    title: p.title,
                    phaseNumber: p.phaseNumber,
                }))}
                currentNumber={phase.phaseNumber}
            />

            {/* Phase profile — dark 4/8 strip with three meta facts. */}
            <section
                className="inner-dark phase-profile"
                aria-label="Phase profile"
                style={{ ["--accent" as string]: phase.accent }}
            >
                <div className="inner-section-inner">
                    <Reveal>
                        <p className="inner-section-eyebrow">PHASE PROFILE</p>
                    </Reveal>
                    <div className="phase-profile-grid">
                        <Reveal delay={0.08}>
                            <article className="phase-profile-card">
                                <p className="phase-profile-label">DURATION</p>
                                <p className="phase-profile-value">{meta.duration}</p>
                                <p className="phase-profile-meta">
                                    Phase length on a typical engagement. Adjusts to scope and stakeholder availability.
                                </p>
                            </article>
                        </Reveal>
                        <Reveal delay={0.16}>
                            <article className="phase-profile-card">
                                <p className="phase-profile-label">CADENCE</p>
                                <p className="phase-profile-value">{meta.cadence}</p>
                                <p className="phase-profile-meta">
                                    How often we surface progress and surface decisions to stakeholders.
                                </p>
                            </article>
                        </Reveal>
                        <Reveal delay={0.24}>
                            <article className="phase-profile-card">
                                <p className="phase-profile-label">LEAD ROLE</p>
                                <p className="phase-profile-value">{meta.leadRole}</p>
                                <p className="phase-profile-meta">
                                    Named senior on the engagement, responsible for the phase and accountable to you.
                                </p>
                            </article>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Activities — white hairline list */}
            <section
                className="inner-light"
                aria-labelledby="phase-activities-heading"
                style={{ ["--accent" as string]: phase.accent }}
            >
                <div className="inner-section-inner">
                    <div className="about-competencies-header">
                        <div>
                            <Reveal>
                                <p className="inner-section-eyebrow">ACTIVITIES</p>
                            </Reveal>
                            <Reveal delay={0.08}>
                                <h2
                                    id="phase-activities-heading"
                                    className="inner-section-headline"
                                >
                                    Six work-streams in this phase.
                                </h2>
                            </Reveal>
                        </div>
                        <Reveal delay={0.16}>
                            <p className="inner-section-body about-competencies-lede">
                                Each activity has a deliverable, an owner, and a written
                                artifact that survives the engagement.
                            </p>
                        </Reveal>
                    </div>

                    <Reveal delay={0.22}>
                        <ol className="inner-hl-list">
                            {phase.activities.map((a, i) => (
                                <li key={i} className="inner-hl-item">
                                    <span className="inner-hl-num">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="inner-hl-title">{a.title}</h3>
                                    <p className="inner-hl-desc">{a.description}</p>
                                </li>
                            ))}
                        </ol>
                    </Reveal>
                </div>
            </section>

            {meta.artifacts.length > 0 && (
                <ArtifactsGrid
                    eyebrow="WRITTEN ARTIFACTS"
                    title="What you keep after this phase."
                    description="Documents, diagrams, and recorded sessions that outlive the engagement and stay with your team."
                    artifacts={meta.artifacts}
                />
            )}

            {/* Adjacent phases — dark typographic nav */}
            <section
                className="inner-dark phase-adjacents"
                aria-label="Adjacent phases"
                style={{ ["--accent" as string]: phase.accent }}
            >
                <div className="inner-section-inner">
                    <div className="phase-adjacents-grid">
                        {prev ? (
                            <Link
                                href={`/development/${prev.slug}`}
                                className="phase-adjacent phase-adjacent--prev"
                            >
                                <span className="phase-adjacent-meta">
                                    &larr; PREVIOUS &middot; PHASE {String(prev.phaseNumber).padStart(2, "0")}
                                </span>
                                <span className="phase-adjacent-title">
                                    {prev.title}
                                </span>
                            </Link>
                        ) : (
                            <span />
                        )}
                        {next && (
                            <Link
                                href={`/development/${next.slug}`}
                                className="phase-adjacent phase-adjacent--next"
                            >
                                <span className="phase-adjacent-meta">
                                    NEXT &middot; PHASE {String(next.phaseNumber).padStart(2, "0")} &rarr;
                                </span>
                                <span className="phase-adjacent-title">
                                    {next.title}
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            <ClosingCta
                title="Brief the team."
                subtitle="A phased plan with named owners and a calendar, returned within one business day."
                primary={{ label: "Start a Project", href: "/contact" }}
            />

            <SiteFooter />
        </>
    );
}
