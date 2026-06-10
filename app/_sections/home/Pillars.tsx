"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Pillars — "Innovation at the core of everything we do."
 *
 * White section, 3 dark cards (Build & Engineer / Design / Advise) with
 * subtle UI mockup imagery. PeachWeb frame ~135.
 *
 * Reveal cascade: eyebrow (0) → headline (.08) → body (.15) →
 * cards (.2/.28/.36) for natural staggered fade-up.
 */

const PILLARS = [
    {
        title: "Build & Engineer",
        description:
            "Web, mobile, AI, and platform engineering — shipped by senior teams with documented architecture and an explicit calendar.",
        image: "/sections/pillars/build.jpg",
    },
    {
        title: "Design",
        description:
            "Product design, design systems, and craft-grade UI — research-led, accessibility-respecting, written down so engineering can build it.",
        image: "/sections/pillars/design.jpg",
    },
    {
        title: "Advise",
        description:
            "Strategy, technology assessments, and fractional CTO — the calm second opinion before the architecture gets locked in.",
        image: "/sections/pillars/advise.jpg",
    },
];

export function Pillars() {
    return (
        <section className="pillars" aria-labelledby="pillars-heading" data-theme="light">
            <div className="pillars-content">
                <Reveal>
                    <p className="pillars-eyebrow">OUR PILLARS</p>
                </Reveal>

                <Reveal delay={0.08}>
                    <h2 id="pillars-heading" className="pillars-title">
                        Build. Design. Advise.
                    </h2>
                </Reveal>

                <Reveal delay={0.15}>
                    <p className="pillars-body">
                        Three things we are paid to do well. Engagements may
                        weight one heavier than the others, but the principals
                        leading them carry expertise across all three.
                    </p>
                </Reveal>

                <div className="pillars-grid">
                    {PILLARS.map((pillar, i) => (
                        <Reveal key={pillar.title} delay={0.22 + i * 0.12} y={32}>
                            <article className="pillars-card">
                                <div className="pillars-card-image-wrap">
                                    <Image
                                        src={pillar.image}
                                        alt=""
                                        width={560}
                                        height={420}
                                        className="pillars-card-image"
                                        sizes="(max-width: 1024px) 100vw, 33vw"
                                    />
                                </div>
                                <div className="pillars-card-body">
                                    <h3 className="pillars-card-title">{pillar.title}</h3>
                                    <p className="pillars-card-desc">{pillar.description}</p>
                                </div>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
