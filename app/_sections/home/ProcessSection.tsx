"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { allDevelopmentPhases } from "@/lib/development";
import {
    ArtifactDiscover,
    ArtifactAnalyse,
    ArtifactPrototype,
    ArtifactIterations,
    ArtifactDevelopment,
    ArtifactTesting,
    ArtifactLaunch,
} from "./ProcessArtifacts";

/**
 * ProcessSection — a living delivery operating system.
 *
 * The seven delivery phases are not static cards; they are nodes in one
 * connected system. Three motion layers, all subtle and mechanical (no
 * neon, enterprise register):
 *   1. Blueprint background — faint grid + coordinates for depth.
 *   2. Process network — an orthogonal rail wired through the gutter
 *      lanes connecting 01 → 07, with a slow signal pulse travelling the
 *      real process journey and soft nodes where it meets each card.
 *   3. Per-phase visual artifacts — a unique animated schematic inside
 *      every card that shows what the phase *does* before you read it.
 *
 * Phases are identified by engineering process codes (PR-01 … PR-07) as
 * metadata; the phase title stays visually dominant. Hovering a card
 * makes it the active node: its artifact and code gain emphasis, its
 * network node and neighbours brighten, the rail goes active.
 *
 * The asymmetric bento is preserved: 01 tall feature, 02–05 tiles,
 * 06–07 wide. Geometry is measured live so the rail stays true across
 * breakpoints and collapses to a vertical spine on mobile.
 *
 * Data source: lib/development.ts (same seven phases as nav + detail).
 */

const TAGLINES: Record<string, string> = {
    discover: "We map your business, users, and the real problem before a line of code.",
    analyse: "Architecture and risk, validated up front.",
    "ui-prototyping": "Proving the idea before code.",
    iterations: "Rapid, evidence-led refinement.",
    development: "Production systems, engineered.",
    "testing-qa": "Hardened for year two, not just launch day — every layer checked.",
    "launch-support": "Shipped clean, then monitored, optimised, and evolved with you.",
};

const CODES: Record<string, string> = {
    discover: "PR-01",
    analyse: "PR-02",
    "ui-prototyping": "PR-03",
    iterations: "PR-04",
    development: "PR-05",
    "testing-qa": "PR-06",
    "launch-support": "PR-07",
};

const AREAS: Record<string, string> = {
    discover: "a",
    analyse: "b",
    "ui-prototyping": "c",
    iterations: "d",
    development: "e",
    "testing-qa": "f",
    "launch-support": "g",
};

const ARTIFACTS: Record<string, () => React.ReactElement> = {
    discover: ArtifactDiscover,
    analyse: ArtifactAnalyse,
    "ui-prototyping": ArtifactPrototype,
    iterations: ArtifactIterations,
    development: ArtifactDevelopment,
    "testing-qa": ArtifactTesting,
    "launch-support": ArtifactLaunch,
};

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};
const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function ProcessSection() {
    const phases = allDevelopmentPhases;
    const first = phases[0];

    const [active, setActive] = useState<number | null>(null);

    return (
        <section
            className="process-bento"
            aria-labelledby="process-heading"
            data-theme="light"
        >
            <div className="process-bento-content">
                {/* Left rail */}
                <header className="process-bento-head">
                    <p className="process-bento-eyebrow">
                        <span className="process-bento-eyebrow-tick" aria-hidden="true" />
                        OUR PROCESS
                    </p>
                    <h2 id="process-heading" className="process-bento-title">
                        Seven phases.
                        <br />
                        No surprises.
                    </h2>
                    <p className="process-bento-lede">
                        A proven path that brings clarity at every step and
                        confidence in every outcome — each phase with an owner, a
                        cadence, and an artefact you keep.
                    </p>
                    <Link
                        href={`/development/${first.slug}`}
                        className="process-bento-cta"
                    >
                        Explore our process
                        <span className="process-bento-cta-icon">
                            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                        </span>
                    </Link>
                </header>

                {/* Bento — the operating system */}
                <motion.div
                    className="process-bento-grid"
                    data-active={active !== null ? "true" : "false"}
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-15%" }}
                >
                    {phases.map((phase, i) => {
                        const area = AREAS[phase.slug] ?? "a";
                        const code = CODES[phase.slug] ?? "PR-00";
                        const Artifact = ARTIFACTS[phase.slug] ?? ArtifactDiscover;
                        const state =
                            active === null
                                ? ""
                                : active === i
                                  ? " is-active"
                                  : Math.abs(active - i) === 1
                                    ? " is-near"
                                    : "";

                        return (
                            <motion.div
                                key={phase.slug}
                                className="process-bento-cell"
                                style={{ gridArea: area }}
                                variants={item}
                                onMouseEnter={() => setActive(i)}
                                onMouseLeave={() => setActive(null)}
                                onFocusCapture={() => setActive(i)}
                                onBlurCapture={() => setActive(null)}
                            >
                                <Link
                                    href={`/development/${phase.slug}`}
                                    className={`process-bento-card process-bento-card--${area}${state}`}
                                    style={{ ["--accent" as string]: phase.accent }}
                                >
                                    <div className="pbc-top">
                                        <span className="pbc-code">{code}</span>
                                        <span className="pbc-status" aria-hidden="true" />
                                    </div>
                                    <div className="pbc-artifact" aria-hidden="true">
                                        <Artifact />
                                    </div>
                                    <div className="pbc-foot">
                                        <h3 className="pbc-title">{phase.title}</h3>
                                        <p className="pbc-desc">
                                            {TAGLINES[phase.slug] ?? ""}
                                        </p>
                                    </div>
                                    <span className="pbc-arrow" aria-hidden="true">
                                        <ArrowUpRight
                                            className="w-3.5 h-3.5"
                                            strokeWidth={1.75}
                                        />
                                    </span>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
