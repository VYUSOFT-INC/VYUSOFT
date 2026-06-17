/**
 * ProcessArtifacts — one operational schematic per delivery phase.
 *
 * Phase-2 brief: the artifact carries the card (~60%). Each one is a
 * denser, phase-specific blueprint that explains the phase in a glance
 * and runs continuously: nodes connect, routes illuminate, signals
 * travel. Blueprint register — thin strokes in `currentColor` (the card
 * sets the wire colour), small nodes, slow mechanical motion. All motion
 * is CSS (offset-path / stroke-dashoffset / opacity), so they stay cheap
 * and need no motion library. When a card is active the wire colour
 * shifts to cobalt (handled in globals.css).
 */

/* PR-01 · DISCOVER — live stakeholder discovery map. */
export function ArtifactDiscover() {
    const cx = 110;
    const cy = 104;
    const r = 76;
    const sats = Array.from({ length: 8 }, (_, i) => {
        const a = (Math.PI * 2 * i) / 8 - Math.PI / 2;
        return [
            +(cx + Math.cos(a) * r).toFixed(1),
            +(cy + Math.sin(a) * r).toFixed(1),
        ];
    });
    return (
        <svg className="pba pba-discover" viewBox="0 0 220 208" fill="none">
            {/* relationship web between neighbouring stakeholders */}
            <g className="pba-d-web" stroke="currentColor" strokeWidth="0.6">
                {sats.map((s, i) => {
                    const n = sats[(i + 1) % sats.length];
                    return <line key={i} x1={s[0]} y1={s[1]} x2={n[0]} y2={n[1]} />;
                })}
            </g>
            {/* hub → stakeholder links */}
            <g className="pba-d-links" stroke="currentColor" strokeWidth="1">
                {sats.map((s, i) => (
                    <line
                        key={i}
                        className="pba-d-link"
                        x1={cx}
                        y1={cy}
                        x2={s[0]}
                        y2={s[1]}
                        pathLength={1}
                        style={{ animationDelay: `${(i % 4) * 0.4}s` }}
                    />
                ))}
            </g>
            {/* requirement clusters near two stakeholders */}
            <g className="pba-d-cluster" fill="currentColor">
                {[sats[1], sats[5]].flatMap(([x, y], k) =>
                    [
                        [x + 10, y - 6],
                        [x + 16, y + 2],
                        [x + 8, y + 8],
                    ].map(([dx, dy], j) => (
                        <circle key={`${k}-${j}`} cx={dx} cy={dy} r="1.6" />
                    )),
                )}
            </g>
            <g className="pba-d-dots" fill="currentColor">
                {sats.map(([x, y], i) => (
                    <circle
                        key={i}
                        className="pba-d-dot"
                        cx={x}
                        cy={y}
                        r="3.6"
                        style={{ animationDelay: `${(i % 4) * 0.4 + 0.2}s` }}
                    />
                ))}
                <circle className="pba-d-hub" cx={cx} cy={cy} r="7" />
                <circle className="pba-d-hub-ring" cx={cx} cy={cy} r="12" fill="none" stroke="currentColor" strokeWidth="1" />
            </g>
        </svg>
    );
}

/* PR-02 · ANALYSE — architecture assessment / dependency graph. */
export function ArtifactAnalyse() {
    return (
        <svg className="pba pba-analyse" viewBox="0 0 200 130" fill="none">
            <g className="pba-a-deps" stroke="currentColor" strokeWidth="1">
                <path className="pba-a-dep" d="M 100 30 L 100 48 L 52 70" pathLength={1} />
                <path className="pba-a-dep" d="M 100 30 L 100 48 L 148 70" pathLength={1} style={{ animationDelay: "0.5s" }} />
                <path className="pba-a-dep" d="M 52 92 L 100 110" pathLength={1} style={{ animationDelay: "1s" }} />
                <path className="pba-a-dep" d="M 148 92 L 100 110" pathLength={1} style={{ animationDelay: "1.25s" }} />
            </g>
            <g className="pba-a-blocks" stroke="currentColor" strokeWidth="1" fill="none">
                <rect className="pba-a-block" x="74" y="14" width="52" height="18" rx="3" />
                <rect className="pba-a-block" x="26" y="70" width="52" height="22" rx="3" style={{ animationDelay: "0.45s" }} />
                <rect className="pba-a-block" x="122" y="70" width="52" height="22" rx="3" style={{ animationDelay: "0.9s" }} />
                <rect className="pba-a-block" x="74" y="106" width="52" height="18" rx="3" style={{ animationDelay: "1.3s" }} />
            </g>
        </svg>
    );
}

/* PR-03 · UI & PROTOTYPE — wireframe evolves into an interface. */
export function ArtifactPrototype() {
    return (
        <svg className="pba pba-prototype" viewBox="0 0 200 130" fill="none">
            <rect className="pba-p-frame" x="50" y="12" width="100" height="106" rx="7" stroke="currentColor" strokeWidth="1" />
            {/* low-fi wireframe layer */}
            <g className="pba-p-wire" stroke="currentColor" strokeWidth="1" fill="none">
                <rect x="60" y="22" width="80" height="14" rx="2" />
                <rect x="60" y="42" width="80" height="30" rx="2" />
                <rect x="60" y="80" width="38" height="26" rx="2" />
                <rect x="102" y="80" width="38" height="26" rx="2" />
            </g>
            {/* high-fi interface layer (fades in over the wireframe) */}
            <g className="pba-p-hifi" fill="currentColor">
                <rect x="60" y="22" width="40" height="6" rx="3" />
                <rect x="60" y="33" width="64" height="4" rx="2" opacity="0.5" />
                <rect x="60" y="44" width="80" height="26" rx="3" opacity="0.28" />
                <rect x="60" y="80" width="38" height="26" rx="3" opacity="0.4" />
                <rect className="pba-p-cta" x="102" y="80" width="38" height="26" rx="3" />
            </g>
            <line className="pba-p-sweep" x1="50" y1="12" x2="150" y2="12" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

/* PR-04 · ITERATIONS — refinement engine, V1 → V2 → V3 with rising quality. */
export function ArtifactIterations() {
    const loop = "M 56 40 L 144 40 A 24 24 0 0 1 144 88 L 56 88 A 24 24 0 0 1 56 40";
    return (
        <svg className="pba pba-iterations" viewBox="0 0 200 130" fill="none">
            <path className="pba-i-loop" d={loop} stroke="currentColor" strokeWidth="1" />
            <g className="pba-i-versions" fill="currentColor">
                <circle className="pba-i-tick" cx="56" cy="64" r="3.6" />
                <circle className="pba-i-tick" cx="100" cy="40" r="3.6" style={{ animationDelay: "0.6s" }} />
                <circle className="pba-i-tick" cx="144" cy="64" r="3.6" style={{ animationDelay: "1.2s" }} />
            </g>
            {/* improvement bars rising */}
            <g className="pba-i-bars" fill="currentColor">
                <rect className="pba-i-bar" x="84" y="100" width="8" height="16" rx="1.5" />
                <rect className="pba-i-bar" x="96" y="94" width="8" height="22" rx="1.5" style={{ animationDelay: "0.4s" }} />
                <rect className="pba-i-bar" x="108" y="86" width="8" height="30" rx="1.5" style={{ animationDelay: "0.8s" }} />
            </g>
        </svg>
    );
}

/* PR-05 · DEVELOPMENT — running system topology, requests + responses. */
export function ArtifactDevelopment() {
    const layers = [
        ["FRONTEND", 22],
        ["BACKEND", 64],
        ["DATABASE", 106],
        ["INFRA", 148],
    ] as const;
    return (
        <svg className="pba pba-development" viewBox="0 0 160 182" fill="none">
            <line x1="80" y1="34" x2="80" y2="160" stroke="currentColor" strokeWidth="1" className="pba-v-spine" />
            {/* junction pulses — communication between adjacent services */}
            <g className="pba-v-pulses" fill="currentColor">
                <circle className="pba-v-pulse" cx="80" cy="55" r="2.4" />
                <circle className="pba-v-pulse" cx="80" cy="97" r="2.4" style={{ animationDelay: "0.5s" }} />
                <circle className="pba-v-pulse" cx="80" cy="139" r="2.4" style={{ animationDelay: "1s" }} />
            </g>
            <g className="pba-v-layers">
                {layers.map(([label, y], i) => (
                    <g key={label} className="pba-v-layer" style={{ animationDelay: `${i * 0.4}s` }}>
                        <rect x="28" y={y} width="104" height="26" rx="4" stroke="currentColor" strokeWidth="1" fill="none" />
                        <text x="80" y={y + 16} className="pba-label" textAnchor="middle">{label}</text>
                    </g>
                ))}
            </g>
        </svg>
    );
}

/* PR-06 · TESTING & QA — quality gates completing sequentially (wide card). */
export function ArtifactTesting() {
    const rows = ["SECURITY", "PERFORMANCE", "QA", "ACCESSIBILITY"];
    return (
        <svg className="pba pba-testing" viewBox="0 0 240 132" fill="none">
            <g>
                {rows.map((label, i) => {
                    const y = 12 + i * 28;
                    return (
                        <g key={label} className="pba-t-row" style={{ animationDelay: `${i * 0.55}s` }}>
                            <rect x="14" y={y} width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1" />
                            <path
                                className="pba-t-check"
                                d={`M ${19} ${y + 9} l 3.5 3.5 l 6.5 -7.5`}
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                pathLength={1}
                                style={{ animationDelay: `${i * 0.55}s` }}
                            />
                            <text x="42" y={y + 13} className="pba-label pba-label--l">{label}</text>
                            <rect className="pba-t-track" x="150" y={y + 7} width="76" height="4" rx="2" fill="currentColor" opacity="0.16" />
                            <rect
                                className="pba-t-fill"
                                x="150"
                                y={y + 7}
                                width="76"
                                height="4"
                                rx="2"
                                fill="currentColor"
                                style={{ animationDelay: `${i * 0.55 + 0.1}s` }}
                            />
                        </g>
                    );
                })}
            </g>
        </svg>
    );
}

/* PR-07 · LAUNCH & SUPPORT — pipeline + live monitoring (wide card). */
export function ArtifactLaunch() {
    return (
        <svg className="pba pba-launch" viewBox="0 0 240 132" fill="none">
            {/* deployment pipeline */}
            <line className="pba-l-track" x1="28" y1="36" x2="212" y2="36" stroke="currentColor" strokeWidth="1" />
            <g className="pba-l-stops">
                {[
                    [28, "STAGING"],
                    [120, "PROD"],
                    [212, "MONITOR"],
                ].map(([x, label], i) => (
                    <g key={label as string}>
                        <circle cx={x as number} cy="36" r="4" fill="currentColor" className="pba-l-stop" style={{ animationDelay: `${i * 0.6}s` }} />
                        <text x={x as number} y="20" className="pba-label" textAnchor="middle">{label}</text>
                    </g>
                ))}
            </g>
            {/* live monitoring heartbeat */}
            <polyline
                className="pba-l-beat"
                points="28,92 70,92 84,72 98,112 112,92 150,92 164,80 178,104 192,92 212,92"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
            />
            <g className="pba-l-status">
                <circle cx="34" cy="118" r="2.6" fill="currentColor" className="pba-l-live" />
                <text x="42" y="121" className="pba-label pba-label--l">UPTIME 99.9%</text>
            </g>
        </svg>
    );
}
