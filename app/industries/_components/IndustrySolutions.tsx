import type { IndustrySolution } from "@/lib/industryPages";

/**
 * IndustrySolutions — cream "solutions ledger".
 * Five solutions as full-width editorial rows separated by hairlines.
 * Plain title rendered unconditionally (no Reveal, no opacity gates).
 * Replaces the earlier 5-up card grid that was rendering invisibly.
 */

export function IndustrySolutions({
    title,
    lede,
    solutions,
    accent,
}: {
    title: string;
    lede: string;
    solutions: IndustrySolution[];
    accent: string;
}) {
    return (
        <section
            className="ind-ledger"
            aria-labelledby="ind-ledger-heading"
            style={{ ["--accent" as string]: accent }}
        >
            <div className="ind-ledger-inner">
                <header className="ind-ledger-head">
                    <span className="ind-ledger-tag">02 / CORE SOLUTIONS</span>
                    <h2 id="ind-ledger-heading" className="ind-ledger-title">
                        {title}
                    </h2>
                    <p className="ind-ledger-lede">{lede}</p>
                </header>

                <ol className="ind-ledger-list">
                    {solutions.map((s, i) => (
                        <li key={s.title} className="ind-ledger-row">
                            <span className="ind-ledger-ord" aria-hidden="true">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <div className="ind-ledger-meta">
                                <p className="ind-ledger-group">
                                    {s.group.toUpperCase()}
                                </p>
                                <h3 className="ind-ledger-name">{s.title}</h3>
                            </div>
                            <p className="ind-ledger-desc">{s.description}</p>
                            <ul className="ind-ledger-items">
                                {s.items.map((it) => (
                                    <li key={it}>{it}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
