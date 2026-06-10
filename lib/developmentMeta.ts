// Content-aware enrichment for the 7 development-phase pages.
// Drives artifacts + duration sections rendered by /development/[slug].

export type Artifact = {
    title: string;
    kind: string;
    description: string;
};

export type PhaseMeta = {
    duration: string;
    cadence: string;
    leadRole: string;
    artifacts: Artifact[];
};

const PHASE_META: Record<string, PhaseMeta> = {
    discover: {
        duration: "2 – 4 weeks",
        cadence: "Daily working sessions",
        leadRole: "Principal Strategist",
        artifacts: [
            {
                title: "Engagement Brief",
                kind: "PDF · 12 – 20 pages",
                description: "Goals, success criteria, risks, and a phased timeline you can show your board.",
            },
            {
                title: "Stakeholder Map",
                kind: "Miro · Read-write",
                description: "Decision-makers, influencers, and signal owners across the program.",
            },
            {
                title: "User Persona Set",
                kind: "Figma · Versioned",
                description: "Primary and secondary personas with goals, frustrations, and behaviour signals.",
            },
            {
                title: "Capability Inventory",
                kind: "Notion · Live",
                description: "What you already have, what you are missing, and what is worth keeping.",
            },
        ],
    },
    analyse: {
        duration: "3 – 6 weeks",
        cadence: "Weekly architecture review",
        leadRole: "Principal Architect",
        artifacts: [
            {
                title: "Architecture Decision Records",
                kind: "Markdown · ADR/MADR",
                description: "Every consequential decision documented, with context, trade-offs, and status.",
            },
            {
                title: "High-Level Architecture",
                kind: "C4 · Structurizr",
                description: "System, container, component, and code views — versioned in source control.",
            },
            {
                title: "Risk Register",
                kind: "Spreadsheet · Live",
                description: "Likelihood × impact × mitigation owner for every identified risk.",
            },
            {
                title: "Compliance Matrix",
                kind: "PDF + Live tracker",
                description: "Regulatory requirements mapped to specific controls and design decisions.",
            },
        ],
    },
    "ui-prototyping": {
        duration: "4 – 8 weeks",
        cadence: "Bi-weekly stakeholder review",
        leadRole: "Principal Designer",
        artifacts: [
            {
                title: "Design System v1",
                kind: "Figma · Tokens + components",
                description: "Tokens, primitives, and components ready to feed engineering.",
            },
            {
                title: "Interactive Prototype",
                kind: "Figma · Clickable",
                description: "End-to-end flows usability-tested with five to eight target users.",
            },
            {
                title: "Usability Findings",
                kind: "PDF + Loom recordings",
                description: "Issues prioritised severity 1 – 4, with recommended fixes and rationale.",
            },
            {
                title: "MVP Scope",
                kind: "Notion · Living doc",
                description: "What ships first, what ships next, what waits — with explicit cut-lines.",
            },
        ],
    },
    iterations: {
        duration: "Continuous · Per sprint",
        cadence: "Two-week sprints",
        leadRole: "Engagement Lead",
        artifacts: [
            {
                title: "Sprint Demos",
                kind: "Loom · Recorded",
                description: "Every increment recorded and archived. No live-demo theatre required.",
            },
            {
                title: "Feedback Backlog",
                kind: "Linear · Live",
                description: "Stakeholder feedback triaged, scored, and routed to the right cycle.",
            },
            {
                title: "Experiment Log",
                kind: "Notion · Versioned",
                description: "Hypotheses, designs, results — A/B tests captured for posterity.",
            },
            {
                title: "Working Roadmap",
                kind: "Linear roadmap",
                description: "Refreshed every sprint with explicit confidence levels on each milestone.",
            },
        ],
    },
    development: {
        duration: "8 – 24 weeks",
        cadence: "Daily deploys to staging",
        leadRole: "Principal Engineer",
        artifacts: [
            {
                title: "Production Codebase",
                kind: "Git · Reviewed PRs",
                description: "Every commit reviewed by a senior engineer. No lone-wolf merges.",
            },
            {
                title: "API Contracts",
                kind: "OpenAPI · Versioned",
                description: "Typed, documented, breaking-change tracked, and consumer-tested.",
            },
            {
                title: "Architecture Records",
                kind: "ADR markdown",
                description: "Every consequential decision captured in the repo, not lost in Slack.",
            },
            {
                title: "Runbooks",
                kind: "Markdown · In repo",
                description: "On-call playbooks for the systems we ship. Tested in chaos drills.",
            },
        ],
    },
    "testing-qa": {
        duration: "Parallel · 2 – 6 weeks per release",
        cadence: "Daily test reports",
        leadRole: "Principal QA",
        artifacts: [
            {
                title: "Test Strategy",
                kind: "PDF + Live doc",
                description: "Pyramid coverage targets, environments, tooling, and exit criteria.",
            },
            {
                title: "Automated Test Suite",
                kind: "Cypress · Playwright · Jest",
                description: "Unit, integration, and end-to-end — wired into CI, gating every deploy.",
            },
            {
                title: "Security Assessment",
                kind: "PDF · OWASP-aligned",
                description: "Penetration test results with severity rated and remediation owners assigned.",
            },
            {
                title: "Accessibility Report",
                kind: "PDF · WCAG 2.2 AA",
                description: "Automated and manual conformance checks with named owner per defect.",
            },
        ],
    },
    "launch-support": {
        duration: "1 – 2 weeks · then ongoing",
        cadence: "24/7 on-call · Weekly review",
        leadRole: "Reliability Engineer",
        artifacts: [
            {
                title: "Launch Plan",
                kind: "PDF + checklist",
                description: "Cutover steps, rollback triggers, comms tree, and named owners per stage.",
            },
            {
                title: "Observability Stack",
                kind: "Prometheus · Grafana · OTel",
                description: "Dashboards, SLOs, and alerts wired to PagerDuty before any traffic shifts.",
            },
            {
                title: "Incident Runbooks",
                kind: "Markdown · In repo",
                description: "Each playbook tested under simulated load before production debut.",
            },
            {
                title: "Quarterly Health Report",
                kind: "PDF · 8 – 12 pages",
                description: "What was shipped, what slipped, what is next. Honest, with named owners.",
            },
        ],
    },
};

export function metaForPhase(slug: string): PhaseMeta {
    return (
        PHASE_META[slug] ?? {
            duration: "Variable",
            cadence: "Defined per engagement",
            leadRole: "Principal Lead",
            artifacts: [],
        }
    );
}
