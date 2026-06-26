"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { slowBurn } from "./motion";

const MILESTONES = [
    {
        year: "2024",
        event: "Founded in Irving, Texas.",
        detail:
            "Two engineers, one operating philosophy: ship enterprise systems that survive the second year.",
    },
    {
        year: "2013",
        event: "First multi-cloud migration.",
        detail:
            "A regulated client moves three production workloads off on-prem with zero downtime. The playbook becomes the studio's method.",
    },
    {
        year: "2017",
        event: "Vyu Research established.",
        detail:
            "An in-house lab applying machine learning, security, and architecture research to client problems before they ship.",
    },
    {
        year: "2020",
        event: "Past one hundred engineers.",
        detail:
            "Five practice groups: Technology, Engineering, Enterprise, Growth, Operations. Each one led by a principal.",
    },
    {
        year: "2023",
        event: "Thirty service practices live.",
        detail:
            "From applied AI to ERP modernisation, every practice carries its own playbook and a named senior on every line.",
    },
    {
        year: "2026",
        event: "Operating across four continents.",
        detail:
            "Denton hub plus distributed delivery teams. Seventeen regulated verticals, ninety-two percent retention, no rebrands.",
    },
];

/**
 * TimelineSection — sixteen years of operating history rendered as a
 * vertical milestone list. Italic year on the left, sans event title in
 * the middle, mono detail on the right. Each row reveals in stagger as
 * it enters the viewport; rows shift right on hover (CSS).
 */
export function TimelineSection() {
    return (
        <section
            className="inner-dark timeline"
            aria-labelledby="timeline-heading"
        >
            <div className="inner-section-inner">
                <div className="timeline-header">
                    <div>
                        <ScrollReveal>
                            <p className="inner-section-eyebrow">THE TIMELINE</p>
                        </ScrollReveal>
                        <ScrollReveal delay={0.08}>
                            <h2 id="timeline-heading" className="inner-section-headline">
                                Sixteen years, one continuous practice.
                            </h2>
                        </ScrollReveal>
                    </div>
                    <ScrollReveal delay={0.16}>
                        <p className="inner-section-body timeline-lede">
                            No pivots, no rebrands, no restarts. The studio has been
                            shipping enterprise software since 2024, compounding one
                            engagement at a time.
                        </p>
                    </ScrollReveal>
                </div>

                <ol className="timeline-list">
                    {MILESTONES.map((m, i) => (
                        <motion.li
                            key={m.year}
                            className="timeline-item"
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-15% 0px" }}
                            transition={{
                                duration: 0.75,
                                ease: slowBurn,
                                delay: i * 0.06,
                            }}
                        >
                            <span className="timeline-year">{m.year}</span>
                            <h3 className="timeline-event">{m.event}</h3>
                            <p className="timeline-detail">{m.detail}</p>
                        </motion.li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
