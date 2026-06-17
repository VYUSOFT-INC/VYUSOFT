import { notFound } from "next/navigation";
import Link from "next/link";
import {
    allDevelopmentSlugs,
    getDevelopmentBySlug,
    allDevelopmentPhases,
} from "@/lib/development";
import { metaForPhase } from "@/lib/developmentMeta";
import { PageBackdrop } from "@/components/layout/PageBackdrop";
import { PhaseTrack } from "@/components/templates/PhaseTrack";
import { ClosingCta } from "@/components/templates/ClosingCta";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PhaseSpine } from "../_components/PhaseSpine";
import { PhaseHero } from "../_components/PhaseHero";
import { PhaseActivities } from "../_components/PhaseActivities";
import { PhaseArtifacts } from "../_components/PhaseArtifacts";

const PHASE_HERO_IMAGES: Record<string, { src: string; position?: string }> = {
    discover: { src: "/sections/process images/discover.png", position: "center" },
    analyse: { src: "/sections/process images/analyse.png", position: "center" },
    "ui-prototyping": { src: "/sections/process images/ui prototyping.png", position: "center" },
    iterations: { src: "/sections/process images/iterations.png", position: "center" },
    development: { src: "/sections/process images/development.png", position: "center" },
    "testing-qa": { src: "/sections/process images/testing and qa.png", position: "center" },
    "launch-support": { src: "/sections/process images/launch and support.png", position: "center" },
};

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

    return (
        <div className="phase-shell">
            <PageBackdrop accent={phase.accent} />

            {/* The family signature: the methodology timeline rides the
                left edge for the entire visit (desktop). */}
            <PhaseSpine
                phases={allDevelopmentPhases.map((p) => ({
                    slug: p.slug,
                    title: p.title,
                    phaseNumber: p.phaseNumber,
                }))}
                currentNumber={phase.phaseNumber}
                accent={phase.accent}
            />

            <PhaseHero
                phaseNumber={phase.phaseNumber}
                totalPhases={allDevelopmentPhases.length}
                title={phase.title}
                description={phase.description}
                accent={phase.accent}
                duration={meta.duration}
                cadence={meta.cadence}
                leadRole={meta.leadRole}
                activityCount={phase.activities.length}
                heroImage={PHASE_HERO_IMAGES[slug]?.src}
                heroImagePosition={PHASE_HERO_IMAGES[slug]?.position}
            />

            {/* Compact horizontal track for small screens, where the
                fixed spine is hidden. */}
            <div className="phase-track-mobile">
                <PhaseTrack
                    phases={allDevelopmentPhases.map((p) => ({
                        slug: p.slug,
                        title: p.title,
                        phaseNumber: p.phaseNumber,
                    }))}
                    currentNumber={phase.phaseNumber}
                />
            </div>

            {/* Activities — the family's signature: the section pins and
                time runs sideways. */}
            <PhaseActivities
                activities={phase.activities}
                accent={phase.accent}
                phaseNumber={phase.phaseNumber}
                duration={meta.duration}
                leadRole={meta.leadRole}
                next={
                    next
                        ? {
                              slug: next.slug,
                              title: next.title,
                              phaseNumber: next.phaseNumber,
                          }
                        : undefined
                }
            />

            {meta.artifacts.length > 0 && (
                <PhaseArtifacts
                    artifacts={meta.artifacts}
                    accent={phase.accent}
                    phaseNumber={phase.phaseNumber}
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
                media="/sections/process images/process cta.png"
            />

            <SiteFooter />
        </div>
    );
}
