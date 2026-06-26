"use client";

import { motion } from "framer-motion";
import { slowBurn } from "./motion";

const LINES = [
    "Technology should be",
    "an accelerator,",
    "not a barrier —",
    "and the teams",
    "who build it",
    "should be",
    "exactly that.",
];

/**
 * ManifestoSection — full-viewport editorial moment.
 *
 * A single Fraunces-italic statement broken into seven short lines that
 * reveal in 90 ms stagger. Mono attribution slides in from the right
 * after the last line. The page's signature beat — the moment a senior
 * About page earns by saying one thing well.
 */
export function ManifestoSection() {
    return (
        <section
            className="manifesto"
            aria-labelledby="manifesto-heading"
        >
            <div className="manifesto-inner">
                <motion.p
                    className="manifesto-eyebrow"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-20% 0px" }}
                    transition={{ duration: 0.6, ease: slowBurn }}
                >
                    A PRINCIPLE
                </motion.p>

                <h2 id="manifesto-heading" className="manifesto-headline">
                    {LINES.map((line, i) => (
                        <motion.span
                            key={i}
                            className="manifesto-line"
                            initial={{ opacity: 0, y: 36 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-25% 0px" }}
                            transition={{
                                duration: 0.85,
                                ease: slowBurn,
                                delay: i * 0.09,
                            }}
                        >
                            {line}
                        </motion.span>
                    ))}
                </h2>

                <motion.p
                    className="manifesto-attribution"
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-15% 0px" }}
                    transition={{
                        duration: 0.7,
                        ease: slowBurn,
                        delay: 0.9,
                    }}
                >
                    VyuSoft operating principle &middot; Active since 2024
                </motion.p>
            </div>
        </section>
    );
}
