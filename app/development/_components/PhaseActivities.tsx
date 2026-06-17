"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * PhaseActivities — the family's signature mechanic: the section pins
 * and time runs sideways. While the section holds the viewport,
 * vertical scroll pans a horizontal rail of work-stream panels laid
 * along a ruled time axis; an accent bar tracks progress along the
 * ruler. No other page family moves like this.
 *
 * Composition fills the frame: the phase ordinal stands as a giant
 * watermark behind the rail, the header carries the phase facts on its
 * right shoulder, every panel runs full-height with a stream-index
 * footer, and the rail ends on a handoff card into the next phase —
 * so the screen is owned by content, not air.
 *
 * Small screens and prefers-reduced-motion get a plain vertical list
 * (the rail never pins, panels stack) — same markup, CSS switched.
 */

type Activity = { title: string; description: string };
type NextPhase = { slug: string; title: string; phaseNumber: number };

export function PhaseActivities({
    activities,
    accent,
    phaseNumber,
    duration,
    leadRole,
    next,
}: {
    activities: Activity[];
    accent: string;
    phaseNumber: number;
    duration: string;
    leadRole: string;
    next?: NextPhase;
}) {
    const outerRef = useRef<HTMLDivElement>(null);
    const stripRef = useRef<HTMLDivElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const outer = outerRef.current;
        const strip = stripRef.current;
        const fill = fillRef.current;
        if (!outer || !strip || !fill) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const small = window.matchMedia("(max-width: 1099px)").matches;
        if (reduce || small) return; /* vertical fallback, no motion */

        /* Direct 1:1 mapping — Lenis already smooths the scroll itself,
           so the strip must not add its own lag (double-smoothing made
           the pan trail far behind the page). */
        let raf = 0;
        const tick = () => {
            const rect = outer.getBoundingClientRect();
            const vh = window.innerHeight;
            const total = outer.offsetHeight - vh;
            const progress = total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;
            const overflow = Math.max(0, strip.scrollWidth - (strip.parentElement?.clientWidth ?? strip.clientWidth));
            strip.style.transform = `translate3d(${(-progress * overflow).toFixed(1)}px, 0, 0)`;
            fill.style.width = `${(progress * 100).toFixed(2)}%`;
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, []);

    const count = activities.length;

    return (
        <div
            ref={outerRef}
            className="phase-acts"
            style={{
                ["--accent" as string]: accent,
                ["--acts-count" as string]: count + 1,
            }}
        >
            <section
                className="phase-acts-stage"
                data-theme="dark"
                aria-labelledby="phase-acts-heading"
            >
                {/* Giant phase ordinal — typographic decoration that ties
                    the rail to its phase. */}
                <span className="phase-acts-mark" aria-hidden="true">
                    {String(phaseNumber).padStart(2, "0")}
                </span>

                <div className="phase-acts-head">
                    <div>
                        <p className="inner-section-eyebrow">THE WORK, IN ORDER</p>
                        <h2 id="phase-acts-heading" className="phase-acts-headline">
                            Scroll, and the phase unfolds sideways.
                        </h2>
                    </div>
                    <dl className="phase-acts-facts">
                        <div>
                            <dt>STREAMS</dt>
                            <dd>{String(count).padStart(2, "0")}</dd>
                        </div>
                        <div>
                            <dt>WINDOW</dt>
                            <dd>{duration}</dd>
                        </div>
                        <div>
                            <dt>LED BY</dt>
                            <dd>{leadRole}</dd>
                        </div>
                    </dl>
                </div>

                <div className="phase-acts-ruler" aria-hidden="true">
                    <div className="phase-acts-ruler-line" />
                    <div ref={fillRef} className="phase-acts-ruler-fill" />
                    {activities.map((_, i) => (
                        <span
                            key={i}
                            className="phase-acts-tick"
                            style={{ left: `${(i / Math.max(1, count)) * 100}%` }}
                        >
                            {String(i + 1).padStart(2, "0")}
                        </span>
                    ))}
                    <span className="phase-acts-tick phase-acts-tick--end" style={{ left: "100%" }}>
                        {next ? "HANDOFF" : "SHIP"}
                    </span>
                </div>

                <div className="phase-acts-viewport">
                    <div ref={stripRef} className="phase-acts-strip">
                        {activities.map((a, i) => (
                            <article key={i} className="phase-acts-panel">
                                <span className="phase-acts-panel-num">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3 className="phase-acts-panel-title">{a.title}</h3>
                                <p className="phase-acts-panel-desc">{a.description}</p>
                                <span className="phase-acts-panel-foot">
                                    WORK STREAM {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                                </span>
                            </article>
                        ))}

                        {next ? (
                            <Link
                                href={`/development/${next.slug}`}
                                className="phase-acts-panel phase-acts-panel--handoff"
                            >
                                <span className="phase-acts-panel-num">
                                    PHASE {String(next.phaseNumber).padStart(2, "0")}
                                </span>
                                <h3 className="phase-acts-panel-title">
                                    Hands off to {next.title}.
                                </h3>
                                <p className="phase-acts-panel-desc">
                                    Everything produced here becomes the input of the
                                    next phase — nothing is re-discovered twice.
                                </p>
                                <span className="phase-acts-panel-foot phase-acts-panel-foot--link">
                                    CONTINUE THE METHOD &rarr;
                                </span>
                            </Link>
                        ) : (
                            <Link
                                href="/contact"
                                className="phase-acts-panel phase-acts-panel--handoff"
                            >
                                <span className="phase-acts-panel-num">END OF THE METHOD</span>
                                <h3 className="phase-acts-panel-title">
                                    Shipped, supported, yours.
                                </h3>
                                <p className="phase-acts-panel-desc">
                                    The lifecycle closes with a running system and a
                                    team that knows how to run it.
                                </p>
                                <span className="phase-acts-panel-foot phase-acts-panel-foot--link">
                                    START A PROJECT &rarr;
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
