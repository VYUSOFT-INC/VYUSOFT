"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { slowBurn } from "./motion";

type Stat = {
    target: number;
    suffix: string;
    label: string;
};

function AnimatedNumber({ target, inView }: { target: number; inView: boolean }) {
    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: slowBurn }}
        >
            {inView ? (
                <Counter target={target} />
            ) : (
                "0"
            )}
        </motion.span>
    );
}

function Counter({ target }: { target: number }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: slowBurn }}
        >
            {target.toLocaleString()}
        </motion.span>
    );
}

export function StatsStrip({ stats }: { stats: Stat[] }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-15% 0px" });

    return (
        <section className="inner-dark" aria-label="Company statistics">
            <div className="inner-section-inner">
                <div
                    ref={ref}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                        gap: 0,
                        borderTop: "1px solid oklch(99% 0.005 80 / 0.12)",
                        borderBottom: "1px solid oklch(99% 0.005 80 / 0.12)",
                    }}
                >
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                duration: 0.65,
                                ease: slowBurn,
                                delay: i * 0.1,
                            }}
                            style={{
                                padding: "40px 24px 40px 0",
                                borderLeft: i > 0 ? "1px solid oklch(99% 0.005 80 / 0.08)" : "none",
                                paddingLeft: i > 0 ? 24 : 0,
                            }}
                        >
                            <p
                                style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "clamp(2rem, 4vw, 3.25rem)",
                                    fontWeight: 580,
                                    lineHeight: 1,
                                    letterSpacing: "-0.03em",
                                    color: "oklch(99% 0.005 80)",
                                    margin: "0 0 8px",
                                }}
                            >
                                <AnimatedNumber target={s.target} inView={inView} />
                                <span
                                    style={{
                                        fontSize: "0.5em",
                                        fontWeight: 400,
                                        letterSpacing: "0.02em",
                                        color: "oklch(99% 0.005 80 / 0.6)",
                                        marginLeft: 4,
                                    }}
                                >
                                    {s.suffix}
                                </span>
                            </p>
                            <p
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.6875rem",
                                    fontWeight: 500,
                                    letterSpacing: "0.08em",
                                    color: "oklch(99% 0.005 80 / 0.5)",
                                    margin: 0,
                                    textTransform: "uppercase",
                                }}
                            >
                                {s.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
