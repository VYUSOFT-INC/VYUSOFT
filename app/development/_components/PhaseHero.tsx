import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { PhaseMediaSlot } from "./PhaseMediaSlot";

/**
 * PhaseHero — the Development family's own hero composition. Not the
 * shared PageHero: the phase numeral IS the layout. A giant Fraunces
 * italic ordinal anchors the left of the spread, the title and lede
 * hang off it, a ruled mono meta strip carries the engagement facts,
 * and the media slot sits as the right page of the spread.
 */

export function PhaseHero({
    phaseNumber,
    totalPhases,
    title,
    description,
    accent,
    duration,
    cadence,
    leadRole,
    activityCount,
    heroImage,
    heroImagePosition,
}: {
    phaseNumber: number;
    totalPhases: number;
    title: string;
    description: string;
    accent: string;
    duration: string;
    cadence: string;
    leadRole: string;
    activityCount: number;
    heroImage?: string;
    heroImagePosition?: string;
}) {
    const ord = String(phaseNumber).padStart(2, "0");

    return (
        <section
            className="phase-hero"
            data-theme="dark"
            aria-label={`Phase ${phaseNumber}: ${title}`}
            style={{ ["--accent" as string]: accent }}
        >
            <div className="phase-hero-inner">
                <div className="phase-hero-spread">
                    <Reveal y={28}>
                        <div className="phase-hero-left">
                            <span className="phase-hero-ordinal" aria-hidden="true">
                                {ord}
                            </span>
                            <div className="phase-hero-heading">
                                <p className="phase-hero-eyebrow">
                                    PHASE {ord} OF {String(totalPhases).padStart(2, "0")}
                                </p>
                                <h1 className="phase-hero-title">{title}</h1>
                                <p className="phase-hero-lede">{description}</p>
                                <Link href="/contact" className="phase-hero-cta">
                                    Talk to the team
                                </Link>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal y={28} delay={0.12}>
                        <div className="phase-hero-right">
                            <PhaseMediaSlot
                                phaseNumber={phaseNumber}
                                title={title}
                                accent={accent}
                                image={heroImage}
                                imagePosition={heroImagePosition}
                            />
                        </div>
                    </Reveal>
                </div>

                <Reveal delay={0.2}>
                    <dl className="phase-hero-meta">
                        <div className="phase-hero-meta-item">
                            <dt>DURATION</dt>
                            <dd>{duration}</dd>
                        </div>
                        <div className="phase-hero-meta-item">
                            <dt>CADENCE</dt>
                            <dd>{cadence}</dd>
                        </div>
                        <div className="phase-hero-meta-item">
                            <dt>LEAD</dt>
                            <dd>{leadRole}</dd>
                        </div>
                        <div className="phase-hero-meta-item">
                            <dt>WORK-STREAMS</dt>
                            <dd>{activityCount}</dd>
                        </div>
                    </dl>
                </Reveal>
            </div>
        </section>
    );
}
