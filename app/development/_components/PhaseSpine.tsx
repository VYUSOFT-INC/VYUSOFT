"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * PhaseSpine — the Development family's signature: the methodology
 * timeline rides the left edge of the viewport for the whole page.
 *
 * Seven nodes, one per phase. The line is filled up to the current
 * phase (the journey so far); the segment from the current node toward
 * the next fills as the reader scrolls this page — finishing the page
 * visually completes the phase. The current node breathes gently.
 *
 * Desktop only (the page renders a compact horizontal track on small
 * screens instead). Respects prefers-reduced-motion with a static
 * half-filled segment.
 */

type SpinePhase = {
    slug: string;
    title: string;
    phaseNumber: number;
};

export function PhaseSpine({
    phases,
    currentNumber,
    accent,
}: {
    phases: SpinePhase[];
    currentNumber: number;
    accent: string;
}) {
    const fillRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fill = fillRef.current;
        if (!fill) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
            fill.style.height = "50%";
            return;
        }

        let raf = 0;
        let smooth = 0;
        const tick = () => {
            const doc = document.documentElement;
            const max = Math.max(1, doc.scrollHeight - window.innerHeight);
            const target = Math.max(0, Math.min(1, window.scrollY / max));
            smooth += (target - smooth) * 0.12;
            fill.style.height = `${(smooth * 100).toFixed(2)}%`;
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, []);

    const count = phases.length;

    return (
        <nav
            className="phase-spine"
            aria-label="Methodology phases"
            style={{ ["--accent" as string]: accent }}
        >
            <div className="phase-spine-track">
                {/* Journey so far: solid to the current node. */}
                <div
                    className="phase-spine-done"
                    style={{
                        height: `${(((currentNumber - 1) / (count - 1)) * 100).toFixed(2)}%`,
                    }}
                />
                {/* This page's reading progress fills the next segment. */}
                <div
                    className="phase-spine-segment"
                    style={{
                        top: `${(((currentNumber - 1) / (count - 1)) * 100).toFixed(2)}%`,
                        height: `${((1 / (count - 1)) * 100).toFixed(2)}%`,
                    }}
                >
                    <div ref={fillRef} className="phase-spine-segment-fill" />
                </div>

                {phases.map((p) => {
                    const pos = ((p.phaseNumber - 1) / (count - 1)) * 100;
                    const state =
                        p.phaseNumber < currentNumber
                            ? "done"
                            : p.phaseNumber === currentNumber
                                ? "current"
                                : "todo";
                    return (
                        <Link
                            key={p.slug}
                            href={`/development/${p.slug}`}
                            className={`phase-spine-node phase-spine-node--${state}`}
                            style={{ top: `${pos.toFixed(2)}%` }}
                            aria-current={state === "current" ? "page" : undefined}
                        >
                            <span className="phase-spine-dot" />
                            <span className="phase-spine-label">
                                <span className="phase-spine-label-num">
                                    {String(p.phaseNumber).padStart(2, "0")}
                                </span>
                                <span className="phase-spine-label-title">{p.title}</span>
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
