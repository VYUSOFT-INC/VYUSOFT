"use client";

import { Reveal } from "@/components/ui/Reveal";
import type { IndustryChallenge as Challenge } from "@/lib/industryPages";

/**
 * IndustryChallenge — cream section, industry-at-center node diagram.
 * Six labeled challenge chips sit around a central industry icon, each
 * connected by a hairline elbow. Industry is the centre — never
 * VyuSoft. Below 1100px the diagram collapses to a clean 1-col list so
 * nothing is lost on mobile.
 */

const POSES: { side: "left" | "right"; row: 0 | 1 | 2 }[] = [
    { side: "left", row: 0 },
    { side: "right", row: 0 },
    { side: "left", row: 1 },
    { side: "right", row: 1 },
    { side: "left", row: 2 },
    { side: "right", row: 2 },
];

export function IndustryChallenge({
    industry,
    title,
    lede,
    cards,
    accent,
}: {
    industry: string;
    title: string;
    lede: string;
    cards: Challenge[];
    accent: string;
}) {
    return (
        <section
            className="inner-light ind-challenge"
            data-theme="light"
            aria-labelledby="ind-challenge-heading"
            style={{ ["--accent" as string]: accent }}
        >
            <div className="ind-challenge-inner">
                <div className="ind-challenge-head">
                    <div>
                        <Reveal>
                            <p className="inner-section-eyebrow">01 &middot; THE CHALLENGE</p>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <h2
                                id="ind-challenge-heading"
                                className="ind-challenge-headline"
                            >
                                {title}
                            </h2>
                        </Reveal>
                    </div>
                    <Reveal delay={0.16}>
                        <p className="ind-challenge-lede">{lede}</p>
                    </Reveal>
                </div>

                <div className="ind-diagram">
                    {/* Connector layer — drawn behind the chips so they
                        cover the line at their inner edge. SVG follows
                        the same 6-pose schema as the chips. */}
                    <svg
                        className="ind-diagram-lines"
                        viewBox="0 0 1000 600"
                        aria-hidden="true"
                        preserveAspectRatio="none"
                    >
                        {POSES.map((p, i) => {
                            const y =
                                p.row === 0
                                    ? 110
                                    : p.row === 1
                                      ? 300
                                      : 490;
                            const fromX = p.side === "left" ? 350 : 650;
                            const toX = 500;
                            const midY = 300;
                            const path = `M ${fromX} ${y} L ${(fromX + toX) / 2} ${y} L ${(fromX + toX) / 2} ${midY} L ${toX} ${midY}`;
                            return (
                                <path
                                    key={i}
                                    d={path}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    strokeDasharray="3 5"
                                />
                            );
                        })}
                    </svg>

                    <div className="ind-diagram-hub">
                        <span
                            className="ind-diagram-hub-glyph"
                            aria-hidden="true"
                        >
                            {industry
                                .split(" ")
                                .map((w) => w[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                        </span>
                        <span className="ind-diagram-hub-label">
                            {industry.toUpperCase()}
                        </span>
                    </div>

                    {cards.slice(0, 6).map((c, i) => (
                        <article
                            key={c.title}
                            className={`ind-diagram-chip ind-diagram-chip--${POSES[i].side} ind-diagram-chip--r${POSES[i].row}`}
                        >
                            <span className="ind-diagram-chip-dot" aria-hidden="true" />
                            <h3 className="ind-diagram-chip-title">{c.title}</h3>
                            <p className="ind-diagram-chip-desc">{c.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
