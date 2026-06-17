import type { ServiceSpinePhase } from "@/lib/servicePages";

/**
 * ServiceSpine — dark vertical engagement timeline (new template).
 *
 * A single rail down the left with phase ordinals; each phase row
 * carries title, body, and a small deliverables list. Not four icon
 * cards — the rail itself communicates sequence, no clip-art required.
 */

export function ServiceSpine({
    practice,
    accent,
    phases,
}: {
    practice: string;
    accent: string;
    phases: ServiceSpinePhase[];
}) {
    return (
        <section
            className="svp-spine"
            data-theme="dark"
            aria-labelledby="svp-spine-heading"
            style={{ ["--accent" as string]: accent }}
        >
            <div className="svp-spine-inner">
                <header className="svp-spine-head">
                    <p className="svp-spine-tag">02 / ENGAGEMENT SPINE</p>
                    <h2 id="svp-spine-heading" className="svp-spine-title">
                        How {/^[aeiou]/i.test(practice) ? "an" : "a"} {practice.toLowerCase()} engagement actually runs.
                    </h2>
                    <p className="svp-spine-lede">
                        Five phases — each with a clear deliverable so the
                        progress is checkable, not vibes. Phases overlap in
                        practice; the rail is sequence, not gates.
                    </p>
                </header>

                <ol className="svp-spine-list">
                    {phases.map((p) => (
                        <li key={p.ord} className="svp-spine-row">
                            <div className="svp-spine-ord-col">
                                <span className="svp-spine-ord">{p.ord}</span>
                                <span className="svp-spine-bar" aria-hidden="true" />
                            </div>
                            <div className="svp-spine-body">
                                <h3 className="svp-spine-name">{p.title}</h3>
                                <p className="svp-spine-copy">{p.body}</p>
                            </div>
                            <ul className="svp-spine-deliv">
                                {p.deliverables.map((d) => (
                                    <li key={d}>
                                        <span aria-hidden="true">/</span> {d}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
