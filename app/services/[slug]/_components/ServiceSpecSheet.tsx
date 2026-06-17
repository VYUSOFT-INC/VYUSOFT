import type { ServiceCapability } from "@/lib/servicePages";

/**
 * ServiceSpecSheet — cream "spec sheet" of capabilities (new template).
 *
 * Two-column grid of six spec cards. Each card carries an ordinal,
 * capability name, description, and an optional "delivered with" stack
 * pill. Section title sits sticky on a left rail so it stays anchored
 * while the cards scroll past.
 */

export function ServiceSpecSheet({
    practice,
    accent,
    capabilities,
}: {
    practice: string;
    accent: string;
    capabilities: ServiceCapability[];
}) {
    return (
        <section
            className="svp-spec"
            data-theme="light"
            aria-labelledby="svp-spec-heading"
            style={{ ["--accent" as string]: accent }}
        >
            <div className="svp-spec-inner">
                <aside className="svp-spec-rail">
                    <p className="svp-spec-tag">01 / SPEC SHEET</p>
                    <h2 id="svp-spec-heading" className="svp-spec-title">
                        What we deliver under {practice}.
                    </h2>
                    <p className="svp-spec-lede">
                        Six capabilities — each one is a real engagement shape, not
                        a marketing line. Pick the ones that match the brief; we
                        ship them as a coherent practice rather than a stack of
                        proofs of concept.
                    </p>
                </aside>

                <ol className="svp-spec-grid">
                    {capabilities.map((c, i) => (
                        <li key={c.title} className="svp-spec-card">
                            <span className="svp-spec-ord" aria-hidden="true">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <h3 className="svp-spec-name">{c.title}</h3>
                            <p className="svp-spec-desc">{c.description}</p>
                            {c.stackTag ? (
                                <p className="svp-spec-stack">
                                    <span className="svp-spec-stack-label">
                                        DELIVERED WITH
                                    </span>
                                    <span className="svp-spec-stack-value">
                                        {c.stackTag}
                                    </span>
                                </p>
                            ) : null}
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
