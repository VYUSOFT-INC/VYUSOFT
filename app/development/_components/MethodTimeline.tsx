"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export type TimelinePhase = {
    slug: string;
    title: string;
    phaseNumber: number;
    description: string;
    accent: string;
    duration: string;
    cadence: string;
    leadRole: string;
    activities: string[];
    artifacts: string[];
};

/* The seven phases fall into four real stages of an engagement. */
const STAGES: { label: string; note: string; count: number }[] = [
    { label: "Shape", note: "Get the question right", count: 2 },
    { label: "Design", note: "Prove it before we build", count: 2 },
    { label: "Build", note: "Engineer it properly", count: 2 },
    { label: "Run", note: "Ship it, then keep it up", count: 1 },
];

/**
 * MethodTimeline — the methodology as a staged journey. A gradient spine
 * runs through the phase colours; the seven phases are grouped into the four
 * stages of an engagement (Shape → Design → Build → Run). Each phase is a
 * chapter card showing what we do and what you keep.
 */
export function MethodTimeline({ phases }: { phases: TimelinePhase[] }) {
    const groups: { label: string; note: string; items: TimelinePhase[] }[] = [];
    let cursor = 0;
    for (const s of STAGES) {
        groups.push({ label: s.label, note: s.note, items: phases.slice(cursor, cursor + s.count) });
        cursor += s.count;
    }

    return (
        <section className="svc-sec method" data-theme="light" aria-label="Delivery methodology">
            <div className="svc-sec-inner">
                <div className="svc-group-head">
                    <Reveal>
                        <p className="svc-group-eyebrow">THE SEQUENCE</p>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <h2 className="svc-group-title">Four stages, seven phases, one calendar.</h2>
                    </Reveal>
                    <Reveal delay={0.16}>
                        <p className="svc-group-lede">
                            Every engagement moves through the same arc — shape the problem,
                            design the answer, build it properly, then keep it up. Each phase
                            has an owner, a cadence, and a written artifact you keep.
                        </p>
                    </Reveal>
                </div>

                <div className="method-flow">
                    {groups.map((g, gi) => (
                        <div className="method-stage" key={g.label}>
                            <div className="method-stage-head">
                                <span className="method-stage-marker" aria-hidden="true" />
                                <span className="method-stage-label">
                                    Stage {String(gi + 1).padStart(2, "0")} · {g.label}
                                </span>
                                <span className="method-stage-note">{g.note}</span>
                            </div>

                            {g.items.map((p) => (
                                <article
                                    key={p.slug}
                                    className="method-phase"
                                    style={{ ["--accent" as string]: p.accent }}
                                >
                                    <Reveal y={18}>
                                        <Link
                                            href={`/development/${p.slug}`}
                                            className="method-phase-link"
                                        >
                                            <div className="method-phase-rail">
                                                <span className="method-phase-num">
                                                    {String(p.phaseNumber).padStart(2, "0")}
                                                </span>
                                                <h3 className="method-phase-name">{p.title}</h3>
                                                <span className="method-phase-dur">{p.duration}</span>
                                                <span className="method-phase-lead">
                                                    {p.leadRole}
                                                    <br />
                                                    {p.cadence}
                                                </span>
                                            </div>

                                            <div className="method-phase-detail">
                                                <p className="method-phase-desc">{p.description}</p>

                                                {p.activities.length > 0 && (
                                                    <div className="method-phase-block">
                                                        <span className="method-phase-blabel">Doing</span>
                                                        <p className="method-phase-acts">
                                                            {p.activities.join("  ·  ")}
                                                        </p>
                                                    </div>
                                                )}

                                                {p.artifacts.length > 0 && (
                                                    <div className="method-phase-block">
                                                        <span className="method-phase-blabel">You keep</span>
                                                        <ul className="method-phase-arts">
                                                            {p.artifacts.map((a) => (
                                                                <li key={a}>{a}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                <span className="method-phase-go">
                                                    View the {p.title.toLowerCase()} phase
                                                    <ArrowUpRight strokeWidth={1.5} />
                                                </span>
                                            </div>
                                        </Link>
                                    </Reveal>
                                </article>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
