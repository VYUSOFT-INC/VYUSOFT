"use client";

import { ScrollReveal } from "./ScrollReveal";

const CAPABILITIES = [
    {
        label: "01",
        title: "Custom Software Development",
        body: "From web and mobile apps to enterprise-grade systems, we build software that is fast, reliable, and future-ready.",
    },
    {
        label: "02",
        title: "AI & Machine Learning",
        body: "We use data science and ML to turn insights into predictions — helping businesses automate, optimise, and grow smarter.",
    },
    {
        label: "03",
        title: "Cloud & DevOps",
        body: "Migrate, manage, and scale your applications securely in the cloud using best-in-class CI/CD and DevSecOps practices.",
    },
    {
        label: "04",
        title: "Business Intelligence",
        body: "Leverage analytics to understand your users, streamline operations, and uncover hidden opportunities.",
    },
];

export function CapabilitiesSection() {
    return (
        <section className="inner-dark" aria-labelledby="about-capabilities-heading">
            <div className="inner-section-inner">
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gap: 56,
                    }}
                >
                    <div>
                        <ScrollReveal>
                            <p className="inner-section-eyebrow">WHAT WE DO BEST</p>
                        </ScrollReveal>
                        <ScrollReveal delay={0.08}>
                            <h2
                                id="about-capabilities-heading"
                                className="inner-section-headline"
                            >
                                Four disciplines, one delivery standard.
                            </h2>
                        </ScrollReveal>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: 0,
                        }}
                    >
                        {CAPABILITIES.map((cap, i) => (
                            <ScrollReveal key={cap.title} delay={0.16 + i * 0.06}>
                                <div
                                    style={{
                                        padding: "32px 28px 32px 0",
                                        borderTop: "1px solid oklch(99% 0.005 80 / 0.12)",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 12,
                                        height: "100%",
                                    }}
                                >
                                    <p
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "0.6875rem",
                                            fontWeight: 500,
                                            letterSpacing: "0.18em",
                                            color: "oklch(99% 0.005 80 / 0.45)",
                                            margin: 0,
                                        }}
                                    >
                                        {cap.label}
                                    </p>
                                    <h3
                                        style={{
                                            fontFamily: "var(--font-sans)",
                                            fontSize: "1.25rem",
                                            fontWeight: 540,
                                            lineHeight: 1.2,
                                            letterSpacing: "-0.015em",
                                            color: "oklch(99% 0.005 80)",
                                            margin: 0,
                                        }}
                                    >
                                        {cap.title}
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: "0.9375rem",
                                            lineHeight: 1.6,
                                            color: "oklch(99% 0.005 80 / 0.68)",
                                            margin: 0,
                                        }}
                                    >
                                        {cap.body}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
