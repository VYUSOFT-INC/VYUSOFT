import { Reveal } from "@/components/ui/Reveal";

/**
 * PhaseArtifacts — "what you keep" rendered as what it actually is:
 * a stack of documents on the desk. Warm-paper section; the left rail
 * holds the section head and a manifest count, the right side is a
 * ledger of paper sheets — each artifact a stepped sheet with its
 * index, format chip, and description. Replaces the generic four-card
 * grid; this layout belongs to the Development family only.
 */

type Artifact = {
    title: string;
    kind: string;
    description: string;
};

export function PhaseArtifacts({
    artifacts,
    accent,
    phaseNumber,
}: {
    artifacts: Artifact[];
    accent: string;
    phaseNumber: number;
}) {
    return (
        <section
            className="inner-light phase-art"
            data-theme="light"
            aria-labelledby="phase-art-heading"
            style={{ ["--accent" as string]: accent }}
        >
            <div className="phase-art-inner">
                <div className="phase-art-rail">
                    <Reveal>
                        <p className="inner-section-eyebrow">WRITTEN ARTIFACTS</p>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <h2 id="phase-art-heading" className="phase-art-headline">
                            What you keep after this phase.
                        </h2>
                    </Reveal>
                    <Reveal delay={0.16}>
                        <p className="phase-art-lede">
                            Documents, diagrams, and recorded sessions that outlive
                            the engagement and stay with your team.
                        </p>
                    </Reveal>
                    <Reveal delay={0.22}>
                        <p className="phase-art-count">
                            PHASE {String(phaseNumber).padStart(2, "0")} ·{" "}
                            {String(artifacts.length).padStart(2, "0")} DELIVERABLES · YOURS TO KEEP
                        </p>
                    </Reveal>
                </div>

                <ol className="phase-art-ledger">
                    {artifacts.map((a, i) => (
                        <Reveal key={a.title} delay={0.06 * i} y={26}>
                            <li className="phase-art-sheet">
                                <span className="phase-art-sheet-index">
                                    A{i + 1}
                                </span>
                                <div className="phase-art-sheet-body">
                                    <div className="phase-art-sheet-top">
                                        <h3 className="phase-art-sheet-title">{a.title}</h3>
                                        <span className="phase-art-sheet-kind">{a.kind}</span>
                                    </div>
                                    <p className="phase-art-sheet-desc">{a.description}</p>
                                </div>
                            </li>
                        </Reveal>
                    ))}
                </ol>
            </div>
        </section>
    );
}
