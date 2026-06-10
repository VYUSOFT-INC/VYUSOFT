// Source-of-truth data for the 7 development lifecycle pages. Drives /development/[slug].

import { developmentNav } from "./nav";

export type Activity = { title: string; description: string };
export type DevelopmentPhase = {
    slug: string;
    title: string;
    accent: string;
    phaseNumber: number;
    description: string;
    activities: Activity[];
};

const data: Record<string, Omit<DevelopmentPhase, "slug" | "title" | "phaseNumber">> = {
    discover: {
        accent: "#00D4FF",
        description: "Before we write a line of code, we get the question right. Interviews, market work, and a documented brief that survives the first sprint.",
        activities: [
            { title: "Stakeholder Interviews", description: "Engage with key stakeholders to understand business objectives, pain points, and success criteria." },
            { title: "Market Research", description: "Analyze market trends, competitor offerings, and industry benchmarks to inform your strategy." },
            { title: "Requirements Gathering", description: "Document functional and non-functional requirements through workshops and collaborative sessions." },
            { title: "User Persona Development", description: "Create detailed user personas that guide design and development decisions throughout the project." },
            { title: "Technology Assessment", description: "Evaluate technology options and recommend the optimal stack for your requirements and budget." },
            { title: "Project Scoping", description: "Define project boundaries, deliverables, timelines, and resource requirements for clear alignment." },
        ],
    },
    analyse: {
        accent: "#A18CD1",
        description: "Architecture, risk, and the long view. We pressure-test the plan against cost, compliance, and a five-year horizon before anyone commits to a stack.",
        activities: [
            { title: "Technical Feasibility", description: "Validate that the proposed approach is technically sound, secure, and operationally sustainable." },
            { title: "Architecture Definition", description: "High-level system architecture, data flows, integration points, and non-functional requirements." },
            { title: "Risk Assessment", description: "Identify and prioritize technical, operational, and business risks with mitigation plans." },
            { title: "Sustainability Review", description: "Long-term cost, maintainability, and environmental impact considerations baked in early." },
            { title: "Compliance Mapping", description: "Map regulatory and security requirements to specific design decisions and controls." },
            { title: "Resourcing Plan", description: "Team composition, sprint cadence, and external dependencies surfaced before kick-off." },
        ],
    },
    "ui-prototyping": {
        accent: "#635BFF",
        description: "Design that earns its keep in production. From IA to an opinionated MVP — every screen prototyped, tested, and signed off before engineering writes anything permanent.",
        activities: [
            { title: "Information Architecture", description: "Site maps, user flows, and content structure that anchors every screen." },
            { title: "Wireframes", description: "Low-fidelity layouts that get the structure right before pixel polish." },
            { title: "Visual Design", description: "On-brand UI design with a defined design system, tokens, and component library." },
            { title: "Interactive Prototypes", description: "Clickable Figma prototypes for usability testing and stakeholder buy-in." },
            { title: "Usability Testing", description: "Moderated sessions, feedback loops, and iteration before any code is written." },
            { title: "MVP Build", description: "Functional minimum viable product to validate hypotheses with real users." },
        ],
    },
    iterations: {
        accent: "#F472B6",
        description: "Short loops, sharp feedback, ruthless prioritisation. Two-week sprints with demos, telemetry, and a backlog that bends to what we are learning — not what we hoped.",
        activities: [
            { title: "Sprint Reviews", description: "Bi-weekly demos that keep stakeholders close to the work." },
            { title: "Feedback Loops", description: "Structured channels for collecting, prioritizing, and acting on feedback." },
            { title: "Design Refinement", description: "Iterative polish — micro-interactions, copy, and edge-case handling." },
            { title: "A/B Testing", description: "Hypothesis-driven experiments to back design decisions with real data." },
            { title: "Performance Tuning", description: "Speed, perceived performance, and accessibility passes between sprints." },
            { title: "Backlog Grooming", description: "Continuous re-prioritization based on what we're learning." },
        ],
    },
    development: {
        accent: "#22C55E",
        description: "Senior teams writing the code, not training on it. Modern frameworks, clean boundaries, and architecture decisions written down so the next engineer onboards in a day.",
        activities: [
            { title: "Frontend Engineering", description: "React, Next.js, TypeScript — accessible, performant, beautifully built." },
            { title: "Backend & APIs", description: "Node, Python, Go services with clear contracts, observability, and resilience." },
            { title: "Database Design", description: "Schemas, indexes, migrations, and query patterns built for scale." },
            { title: "DevOps Integration", description: "CI/CD, infrastructure as code, and environment parity from day one." },
            { title: "Code Reviews", description: "Senior engineers reviewing every PR — quality and knowledge transfer in one." },
            { title: "Documentation", description: "Architecture docs, ADRs, and runbooks so the next engineer onboards in hours." },
        ],
    },
    "testing-qa": {
        accent: "#FF6B35",
        description: "Quality is a budget we spend deliberately. Unit, integration, performance, security, accessibility — every gate documented, every failure traceable to a fix.",
        activities: [
            { title: "Unit Testing", description: "Fast, isolated tests covering business logic with high signal." },
            { title: "Integration Testing", description: "End-to-end scenarios across services, APIs, and external systems." },
            { title: "Performance Testing", description: "Load, stress, and soak tests against realistic production traffic models." },
            { title: "Security Audits", description: "OWASP Top 10, dependency scanning, and penetration testing before launch." },
            { title: "Accessibility Testing", description: "WCAG 2.2 AA conformance, screen reader testing, and keyboard navigation." },
            { title: "User Acceptance Testing", description: "Stakeholder-led UAT with clear sign-off criteria before each release." },
        ],
    },
    "launch-support": {
        accent: "#06B6D4",
        description: "Launch is the easy part — staying up is the work. Zero-downtime rollouts, SLO-backed monitoring, and an on-call rota that picks up when something breaks at 3am.",
        activities: [
            { title: "Production Deployment", description: "Blue/green or canary rollouts with automated rollback triggers." },
            { title: "Monitoring & Alerting", description: "Prometheus, Grafana, and on-call escalation tied to SLOs." },
            { title: "Incident Response", description: "Defined playbooks, postmortems, and on-call rotations from day one." },
            { title: "Performance Optimization", description: "Continuous tuning based on real production telemetry, not synthetic benchmarks." },
            { title: "Feature Enhancement", description: "Roadmap continuation with quarterly planning and steady delivery cadence." },
            { title: "Knowledge Transfer", description: "Workshops, recorded walkthroughs, and runbooks so your team owns the system." },
        ],
    },
};

export const allDevelopmentPhases: DevelopmentPhase[] = developmentNav.map((item, idx) => {
    const d = data[item.slug];
    return {
        slug: item.slug,
        title: item.title,
        phaseNumber: idx + 1,
        accent: d?.accent ?? "#635BFF",
        description: d?.description ?? `Phase ${idx + 1} of the VyuSoft delivery lifecycle: ${item.title}.`,
        activities: d?.activities ?? [],
    };
});

export const allDevelopmentSlugs = allDevelopmentPhases.map((p) => p.slug);

export function getDevelopmentBySlug(slug: string): DevelopmentPhase | undefined {
    return allDevelopmentPhases.find((p) => p.slug === slug);
}
