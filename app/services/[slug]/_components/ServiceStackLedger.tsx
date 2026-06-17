/**
 * ServiceStackLedger — cream categorised toolchain (new template).
 *
 * Five (or however many) columns, each headed by a category, then a
 * vertical list of tools. No floating logos, no vendor wall — just the
 * tools we actually reach for, labelled by what role they play.
 */

export function ServiceStackLedger({
    practice,
    accent,
    stack,
}: {
    practice: string;
    accent: string;
    stack: Record<string, string[]>;
}) {
    const entries = Object.entries(stack);

    return (
        <section
            className="svp-stack"
            data-theme="light"
            aria-labelledby="svp-stack-heading"
            style={{ ["--accent" as string]: accent }}
        >
            <div className="svp-stack-inner">
                <header className="svp-stack-head">
                    <p className="svp-stack-tag">03 / TOOLCHAIN</p>
                    <h2 id="svp-stack-heading" className="svp-stack-title">
                        What we reach for on {practice.toLowerCase()} engagements.
                    </h2>
                    <p className="svp-stack-lede">
                        Tools are choices, not commitments — substitute per your
                        environment. The grouping below is the shape of the stack,
                        not a vendor list.
                    </p>
                </header>

                <div
                    className="svp-stack-grid"
                    style={{
                        gridTemplateColumns: `repeat(${entries.length}, minmax(0, 1fr))`,
                    }}
                >
                    {entries.map(([group, tools]) => (
                        <section key={group} className="svp-stack-col">
                            <h3 className="svp-stack-group">{group.toUpperCase()}</h3>
                            <ul className="svp-stack-tools">
                                {tools.map((t) => (
                                    <li key={t}>{t}</li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
            </div>
        </section>
    );
}
