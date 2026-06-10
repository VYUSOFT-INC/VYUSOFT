"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { easeSlowBurn as slowBurn } from "@/lib/motion";

type Phase = {
    slug: string;
    title: string;
    phaseNumber: number;
};

type Props = {
    phases: Phase[];
    currentNumber: number;
};


/**
 * PhaseTrack — horizontal scrubber for the 7 development phases. Hairline
 * track in white-translucent (works on the PageBackdrop dark canvas).
 * Filled progress in the page accent up to the current phase. Each phase
 * is a clickable node with mono number + first word of title beneath.
 *
 * Rewritten for the PeachWeb dark canvas: white-translucent track and
 * labels, accent-coloured fill + current node halo.
 */
export function PhaseTrack({ phases, currentNumber }: Props) {
    const total = phases.length;
    const fillPercent = ((currentNumber - 1) / (total - 1)) * 100;

    return (
        <section
            className="inner-dark phase-track-section"
            aria-label="Development phase navigation"
            data-theme="dark"
        >
            <div className="inner-section-inner">
                <motion.p
                    className="inner-section-eyebrow phase-track-eyebrow"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.6, ease: slowBurn }}
                >
                    SEQUENCE &middot; 7 PHASES
                </motion.p>

                <div className="phase-track">
                    <div className="phase-track-line" aria-hidden="true" />
                    <motion.div
                        className="phase-track-fill"
                        aria-hidden="true"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${fillPercent}%` }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.9, ease: slowBurn, delay: 0.3 }}
                    />

                    {phases.map((p) => {
                        const left = ((p.phaseNumber - 1) / (total - 1)) * 100;
                        const state =
                            p.phaseNumber < currentNumber
                                ? "past"
                                : p.phaseNumber === currentNumber
                                  ? "current"
                                  : "future";
                        return (
                            <Link
                                key={p.slug}
                                href={`/development/${p.slug}`}
                                className={`phase-track-node phase-track-node--${state}`}
                                style={{ left: `${left}%` }}
                                aria-label={`Phase ${p.phaseNumber}, ${p.title}`}
                            >
                                <motion.span
                                    className="phase-track-dot"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true, margin: "-10% 0px" }}
                                    transition={{
                                        duration: 0.35,
                                        ease: slowBurn,
                                        delay: 0.4 + p.phaseNumber * 0.04,
                                    }}
                                />
                                <span className="phase-track-num">
                                    {String(p.phaseNumber).padStart(2, "0")}
                                </span>
                                <span className="phase-track-title">
                                    {p.title.split(" ")[0]}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
