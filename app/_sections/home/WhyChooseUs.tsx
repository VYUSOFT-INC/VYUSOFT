"use client";

import { useCallback, useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * WhyChooseUs — value-density section.
 *
 * Pattern:
 *   • LEFT column: sticky text — eyebrow + headline + supporting lede
 *   • RIGHT column: a horizontal CAROUSEL of portrait cards. The active
 *     card sits centered and upright (white emphasis + drop shadow); the
 *     previous and next cards peek out partially on either side, scaled
 *     down and dimmed. Changing the active card slides the row sideways.
 *     Auto-cycles every ~4s, pauses on hover/focus, advances on click,
 *     side cards are clickable, and progress dots allow direct selection.
 *     The white emphasis follows whichever card is centered, so the
 *     active card always reads as the hero claim.
 */

type Stat = {
    value: string;
    label: string;
    caption: string;
};

const STATS: Stat[] = [
    {
        value: "92%",
        label: "Client retention beyond the initial brief",
        caption:
            "Renewal and expansion rate measured across engagements completed 2024 – 2025.",
    },
    {
        value: "−30%",
        label: "Project overruns vs industry average",
        caption:
            "Average schedule variance against original scope, tracked across the 2024 – 2025 portfolio.",
    },
    {
        value: "50+",
        label: "Engagements shipped to production",
        caption:
            "Distinct delivery engagements taken from kick-off through go-live since 2024.",
    },
    {
        value: "2+",
        label: "Years operating across regulated sectors",
        caption:
            "Continuous operating history. No pivots, no rebrands, no restarts.",
    },
];

const ROTATE_MS = 4200;
/** How far each neighbour sits from centre, as a % of card width. */
const SHIFT = 60;

export function WhyChooseUs() {
    const n = STATS.length;
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);

    const advance = useCallback(() => setActive((i) => (i + 1) % n), [n]);

    useEffect(() => {
        if (paused) return;
        if (
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }
        const id = window.setInterval(advance, ROTATE_MS);
        return () => window.clearInterval(id);
    }, [paused, advance]);

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

                    <Reveal className="why-us-right" delay={0.1} y={36} duration={0.7} margin="-15%">
                        <div
                            className="why-us-carousel"
                            role="group"
                            aria-label="VyuSoft by the numbers"
                            onMouseEnter={() => setPaused(true)}
                            onMouseLeave={() => setPaused(false)}
                            onFocusCapture={() => setPaused(true)}
                            onBlurCapture={() => setPaused(false)}
                        >
                            {STATS.map((stat, i) => {
                                // signed shortest distance from the active card,
                                // normalised into (-n/2, n/2]
                                let offset = i - active;
                                if (offset > n / 2) offset -= n;
                                if (offset < -n / 2) offset += n;
                                const dist = Math.abs(offset);
                                const center = offset === 0;
                                const neighbour = dist === 1;
                                return (
                                    <div
                                        key={stat.label}
                                        className={`why-us-stat why-us-card ${
                                            center
                                                ? "why-us-stat--emphasis why-us-card--active"
                                                : ""
                                        }`}
                                        style={{
                                            transform: `translateX(calc(-50% + ${
                                                offset * SHIFT
                                            }%)) scale(${
                                                center ? 1 : neighbour ? 0.84 : 0.7
                                            })`,
                                            opacity: center ? 1 : neighbour ? 0.5 : 0,
                                            zIndex: n - dist,
                                            pointerEvents:
                                                center || neighbour ? "auto" : "none",
                                        }}
                                        aria-hidden={!center}
                                        onClick={
                                            center ? advance : () => setActive(i)
                                        }
                                    >
                                        <div className="why-us-stat-value">{stat.value}</div>
                                        <div className="why-us-stat-foot">
                                            <div className="why-us-stat-label">
                                                {stat.label}
                                            </div>
                                            <p className="why-us-stat-caption">
                                                {stat.caption}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div
                            className="why-us-deck-nav"
                            role="tablist"
                            aria-label="Select a metric"
                        >
                            {STATS.map((stat, i) => (
                                <button
                                    key={stat.label}
                                    type="button"
                                    role="tab"
                                    className={`why-us-deck-dot ${
                                        i === active ? "is-active" : ""
                                    }`}
                                    aria-label={stat.label}
                                    aria-selected={i === active}
                                    onClick={() => setActive(i)}
                                />
                            ))}
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
