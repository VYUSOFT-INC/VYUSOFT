"use client";

import { ScrollReveal } from "./ScrollReveal";

const DIFFERENTIATORS = [
    {
        title: "Tailored Approach",
        body: "Every business is unique. We do not use off-the-shelf templates — every project is designed and built specifically for your needs.",
    },
    {
        title: "Full-Stack Expertise",
        body: "From secure cloud deployment and DevSecOps pipelines to intelligent interfaces and automated ML workflows, we cover the entire software lifecycle.",
    },
    {
        title: "Data-First Innovation",
        body: "We leverage analytics and AI from day one — transforming raw data into actionable insight and competitive advantage.",
    },
    {
        title: "Agile Collaboration",
        body: "Transparency, tight coordination, and regular iterations ensure you are in control at every milestone.",
    },
    {
        title: "Security & Reliability",
        body: "Robust architecture, enterprise-grade security, and rigorous testing mean you launch smarter and safer.",
    },
];

export function EdgeSection() {
    return (
        <section className="inner-light" aria-labelledby="about-edge-heading" data-theme="light">
            <div className="inner-section-inner">
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gap: 56,
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "16px 48px",
                            alignItems: "end",
                        }}
                    >
                        <div>
                            <ScrollReveal>
                                <p className="inner-section-eyebrow">THE EDGE</p>
                            </ScrollReveal>
                            <ScrollReveal delay={0.08}>
                                <h2
                                    id="about-edge-heading"
                                    className="inner-section-headline"
                                >
                                    What sets Vyusoft apart.
                                </h2>
                            </ScrollReveal>
                        </div>
                        <ScrollReveal delay={0.16}>
                            <p className="inner-section-body">
                                The difference is in the defaults — how we staff, how we
                                scope, how we stay after launch.
                            </p>
                        </ScrollReveal>
                    </div>

                    <ol
                        style={{
                            margin: 0,
                            padding: 0,
                            listStyle: "none",
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            gap: 0,
                        }}
                    >
                        {DIFFERENTIATORS.map((d, i) => (
                            <ScrollReveal key={d.title} delay={0.2 + i * 0.06}>
                                <li
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "56px 1fr 1.2fr",
                                        gap: "0 32px",
                                        padding: "28px 0",
                                        borderTop: "1px solid var(--color-rule)",
                                        alignItems: "baseline",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "0.75rem",
                                            fontWeight: 500,
                                            letterSpacing: "0.18em",
                                            color: "var(--color-ink-low)",
                                        }}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h3
                                        style={{
                                            fontFamily: "var(--font-sans)",
                                            fontSize: "1.125rem",
                                            fontWeight: 540,
                                            lineHeight: 1.25,
                                            letterSpacing: "-0.01em",
                                            color: "var(--color-ink)",
                                            margin: 0,
                                        }}
                                    >
                                        {d.title}
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: "0.9375rem",
                                            lineHeight: 1.6,
                                            color: "var(--color-ink-mid)",
                                            margin: 0,
                                        }}
                                    >
                                        {d.body}
                                    </p>
                                </li>
                            </ScrollReveal>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
