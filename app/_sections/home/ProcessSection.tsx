"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { allDevelopmentPhases } from "@/lib/development";

/**
 * ProcessSection — "How we bring your vision to life."
 *
 * Single source of truth: `lib/development.ts` (also drives the navbar
 * Process dropdown and the /development pages). Same seven phases
 * everywhere, in the same order, with the same titles.
 *
 * Visual rhythm: alternating image-left / image-right per phase. Images
 * cycle through the three process photos we have (discover / build /
 * optimize); each phase links to its dedicated /development/[slug] page
 * so users can drill into specifics.
 */

const PROCESS_IMAGES = [
    "/sections/process/discover.jpg",
    "/sections/process/build-process.jpg",
    "/sections/process/optimize.jpg",
];

/** Short tagline overlaid on the per-phase title — keeps the home presentation
 *  scannable while the canonical detail lives on /development/[slug]. */
const PHASE_TAGLINES: Record<string, string> = {
    discover: "Understanding your unique needs.",
    analyse: "Validating the architecture and the risks.",
    "ui-prototyping": "Proving the idea before any code is written.",
    iterations: "Refining through rapid, evidence-led cycles.",
    development: "Engineering production-grade systems.",
    "testing-qa": "Hardening for the second year, not the first launch.",
    "launch-support": "Shipping cleanly, then steering past launch.",
};

export function ProcessSection() {
    return (
        <section className="process-section" aria-labelledby="process-heading" data-theme="light">
            <div className="process-section-content">
                <Reveal>
                    <p className="process-section-eyebrow">OUR PROCESS</p>
                </Reveal>

                <div className="process-section-header">
                    <Reveal delay={0.08}>
                        <h2 id="process-heading" className="process-section-title">
                            Seven phases. No surprises.
                        </h2>
                    </Reveal>

                    <Reveal delay={0.15}>
                        <p className="process-section-body">
                            Each phase has an owner, a cadence, and a written
                            artifact you keep. Transparent start to finish —
                            click any phase for the detailed playbook.
                        </p>
                    </Reveal>
                </div>

                <div className="process-section-steps">
                    {allDevelopmentPhases.map((phase, idx) => {
                        const num = String(phase.phaseNumber).padStart(2, "0");
                        const imageRight = idx % 2 === 0;
                        const image = PROCESS_IMAGES[idx % PROCESS_IMAGES.length];
                        const tagline =
                            PHASE_TAGLINES[phase.slug] ?? phase.description;

                        return (
                            <Reveal
                                key={phase.slug}
                                delay={0}
                                y={48}
                                duration={0.8}
                                margin="-15%"
                                once={false}
                            >
                                <article
                                    className={`process-step ${
                                        imageRight
                                            ? "process-step--image-right"
                                            : "process-step--image-left"
                                    }`}
                                >
                                    <div className="process-step-text">
                                        <p className="process-step-eyebrow">
                                            {phase.title.toUpperCase()}
                                        </p>
                                        <h3 className="process-step-title">
                                            {tagline}
                                        </h3>
                                        <p className="process-step-body">
                                            {phase.description}
                                        </p>
                                        <Link
                                            href={`/development/${phase.slug}`}
                                            className="process-step-link"
                                        >
                                            See the {phase.title.toLowerCase()} playbook
                                            <ArrowUpRight
                                                className="w-3.5 h-3.5"
                                                strokeWidth={2}
                                            />
                                        </Link>
                                    </div>
                                    <div className="process-step-visual">
                                        <span className="process-step-num">{num}</span>
                                        <Image
                                            src={image}
                                            alt=""
                                            width={680}
                                            height={420}
                                            className="process-step-image"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />
                                    </div>
                                </article>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
