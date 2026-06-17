"use client";

import { ScrollReveal } from "./ScrollReveal";

type Pillar = { kicker: string; title: string };

export function PillarsSection({ pillars }: { pillars: Pillar[] }) {
    return (
        <section className="inner-light" aria-labelledby="about-pillars-heading" data-theme="light">
            <div className="inner-section-inner">
                <ScrollReveal>
                    <p className="inner-section-eyebrow">FOUNDATION</p>
                </ScrollReveal>
                <ScrollReveal delay={0.08}>
                    <h2 id="about-pillars-heading" className="inner-section-headline">
                        Three statements we orient by.
                    </h2>
                </ScrollReveal>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: 0,
                        marginTop: 56,
                    }}
                >
                    {pillars.map((p, i) => (
                        <ScrollReveal key={p.kicker} delay={0.16 + i * 0.08}>
                            <div
                                style={{
                                    padding: "36px 32px 36px 0",
                                    borderTop: "1px solid var(--color-rule)",
                                }}
                            >
                                <p
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "0.6875rem",
                                        fontWeight: 500,
                                        letterSpacing: "0.2em",
                                        textTransform: "uppercase",
                                        color: "var(--color-ink-low)",
                                        margin: "0 0 20px",
                                    }}
                                >
                                    {p.kicker}
                                </p>
                                <p
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "1.125rem",
                                        fontWeight: 420,
                                        lineHeight: 1.55,
                                        letterSpacing: "-0.005em",
                                        color: "var(--color-ink)",
                                        margin: 0,
                                        maxWidth: "38ch",
                                    }}
                                >
                                    {p.title}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
