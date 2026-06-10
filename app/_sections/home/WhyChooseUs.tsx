"use client";

import { Reveal } from "@/components/ui/Reveal";

/**
 * WhyChooseUs — value-density section.
 *
 * Pattern:
 *   • LEFT column: sticky text — eyebrow + headline + supporting lede
 *   • RIGHT column: 4 stat cards stacked vertically. Each stat now carries
 *     a one-line sub-caption that explains the number rather than letting
 *     it stand alone as an unverifiable boast. First card is emphasised
 *     (white) to anchor the strongest claim.
 */

type Stat = {
    value: string;
    label: string;
    caption: string;
    emphasis?: boolean;
};

const STATS: Stat[] = [
    {
        value: "92%",
        label: "Client retention beyond the initial brief",
        caption:
            "Renewal and expansion rate measured across engagements completed 2022 – 2025.",
        emphasis: true,
    },
    {
        value: "−30%",
        label: "Project overruns vs industry average",
        caption:
            "Average schedule variance against original scope, tracked across the 2024 – 2025 portfolio.",
    },
    {
        value: "500+",
        label: "Engagements shipped to production",
        caption:
            "Distinct delivery engagements taken from kick-off through go-live since 2010.",
    },
    {
        value: "15+",
        label: "Years operating across regulated sectors",
        caption:
            "Continuous operating history. No pivots, no rebrands, no restarts.",
    },
];

export function WhyChooseUs() {
    return (
        <section className="why-us" aria-labelledby="why-us-heading" data-theme="dark">
            <div className="why-us-content">
                <div className="why-us-split">
                    <div className="why-us-left">
                        <div className="why-us-left-inner">
                            <Reveal>
                                <p className="why-us-eyebrow">WHY VYUSOFT</p>
                            </Reveal>

                            <Reveal delay={0.14}>
                                <h2 id="why-us-heading" className="why-us-title">
                                    The receipts —
                                    <br />
                                    not the pitch.
                                </h2>
                            </Reveal>

                            <Reveal delay={0.22}>
                                <p className="why-us-lede">
                                    Every engagement has a named principal, a written
                                    architecture record, and a calendar you can hold us
                                    to. The numbers on the right are receipts &mdash; they
                                    come from real engagements, not a marketing budget.
                                </p>
                            </Reveal>
                        </div>
                    </div>

                    <div className="why-us-stats">
                        {STATS.map((stat) => (
                            <Reveal
                                key={stat.label}
                                delay={0}
                                y={36}
                                duration={0.7}
                                margin="-15%"
                            >
                                <div
                                    className={`why-us-stat ${
                                        stat.emphasis ? "why-us-stat--emphasis" : ""
                                    }`}
                                >
                                    <div className="why-us-stat-value">{stat.value}</div>
                                    <div className="why-us-stat-label">{stat.label}</div>
                                    <p className="why-us-stat-caption">{stat.caption}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
