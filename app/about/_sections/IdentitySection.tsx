"use client";

import { ScrollReveal } from "./ScrollReveal";

export function IdentitySection() {
    return (
        <section className="inner-dark" aria-labelledby="about-identity-heading">
            <div className="inner-section-inner">
                <ScrollReveal>
                    <p className="inner-section-eyebrow">WHO WE ARE</p>
                </ScrollReveal>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gap: 48,
                    }}
                >
                    <ScrollReveal delay={0.08}>
                        <h2
                            id="about-identity-heading"
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontWeight: 540,
                                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                                lineHeight: 1.2,
                                letterSpacing: "-0.02em",
                                color: "oklch(99% 0.005 80)",
                                margin: 0,
                                maxWidth: "48ch",
                            }}
                        >
                            Vyusoft is a future-focused software solutions company that
                            empowers businesses to navigate digital transformation with
                            confidence.
                        </h2>
                    </ScrollReveal>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "32px 48px",
                        }}
                    >
                        <ScrollReveal delay={0.16}>
                            <p
                                style={{
                                    fontSize: "1.0625rem",
                                    lineHeight: 1.65,
                                    color: "oklch(99% 0.005 80 / 0.78)",
                                    margin: 0,
                                }}
                            >
                                We specialise in delivering customised, intelligent solutions
                                that solve real-world challenges using a blend of cutting-edge
                                technologies — AI, cloud computing, data analytics, and
                                automation.
                            </p>
                        </ScrollReveal>
                        <ScrollReveal delay={0.24}>
                            <p
                                style={{
                                    fontSize: "1.0625rem",
                                    lineHeight: 1.65,
                                    color: "oklch(99% 0.005 80 / 0.78)",
                                    margin: 0,
                                }}
                            >
                                From startups to enterprises, we work across industries to
                                build secure, scalable, and innovative platforms that drive
                                measurable impact. Our team of seasoned engineers, data
                                scientists, and cloud architects operates as an extension of
                                your in-house staff.
                            </p>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
