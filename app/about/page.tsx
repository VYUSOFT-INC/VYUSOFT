import { PageBackdrop } from "@/components/layout/PageBackdrop";
import { PageHero } from "@/components/templates/PageHero";
import { ClosingCta } from "@/components/templates/ClosingCta";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Code2, BrainCircuit, Cloud, BarChart3 } from "lucide-react";
import { FoundationSection } from "./_sections/FoundationSection";
import { LongViewStatCard } from "./_sections/LongViewStatCard";
import { ManifestoSection } from "./_sections/ManifestoSection";
import { CompetencyCard } from "./_sections/CompetencyCard";
import { TimelineSection } from "./_sections/TimelineSection";
import { ScrollReveal } from "./_sections/ScrollReveal";

export const metadata = {
    title: "About",
    description:
        "VyuSoft pairs enterprise services with in-house product engineering. Senior by default, hybrid by design, fifteen years across regulated verticals.",
};

/**
 * About — VyuSoft's editorial counterpart to the home.
 *
 * Pattern inheritance from home:
 *   • Long View   → REUSES .why-us-* (WhyChooseUs glass stat cards)
 *   • Competencies → REUSES .pillars-* (Pillars 4-up dark cards on white)
 *
 * Signature editorial moments:
 *   • Manifesto    — full-viewport white, giant Fraunces italic, line reveal
 *   • Timeline     — sixteen years of milestones, italic year + sans event
 *   • Marginalia   — studio coordinates in PageHero
 *
 * Section rhythm (D = dark transparent, W = white opaque):
 *   PageHero (D) · Foundation (D) · Long View (D) · Manifesto (W) ·
 *   Competencies (W) · Timeline (D) · Differentiators (D) ·
 *   Negative Space (W) · ClosingCta (D) · SiteFooter (D)
 */

const purposes = [
    {
        kicker: "MISSION",
        title:
            "Build software serious organisations can bet on — shaped to the problem, documented as we go, and still standing in year two.",
    },
    {
        kicker: "VISION",
        title:
            "Be the team companies call when the system simply has to work — in any regulated industry, anywhere they operate.",
    },
    {
        kicker: "PURPOSE",
        title:
            "Build digital infrastructure and applications that let serious organisations operate anywhere, at any time, without renegotiating the basics.",
    },
];

const longView = [
    {
        target: 15,
        suffix: "years",
        label: "Operating across four continents",
        emphasis: true,
    },
    {
        target: 500,
        suffix: "+ engagements",
        label: "Delivered with named principals on every line",
    },
    {
        target: 92,
        suffix: "% retention",
        label: "Clients staying beyond the initial brief",
    },
    {
        target: 30,
        suffix: "practices",
        label: "Across 17 regulated industries",
    },
];

const competencies = [
    {
        title: "Custom Software Development",
        desc: "Web, mobile, and enterprise systems designed around your business, not a templates library. Architecture decisions documented and revisitable.",
        icon: <Code2 strokeWidth={1.25} />,
    },
    {
        title: "AI and Machine Learning",
        desc: "Predictive modelling, NLP, computer vision, and generative AI pipelines that turn proprietary data into competitive advantage rather than slideware.",
        icon: <BrainCircuit strokeWidth={1.25} />,
    },
    {
        title: "Cloud and DevOps",
        desc: "Multi-cloud migrations, infrastructure-as-code, CI/CD, and Kubernetes platforms at enterprise scale. Quiet operations, audit-ready by default.",
        icon: <Cloud strokeWidth={1.25} />,
    },
    {
        title: "Business Intelligence",
        desc: "Analytics platforms, real-time dashboards, and decision-support systems that surface the patterns hiding in your operational data.",
        icon: <BarChart3 strokeWidth={1.25} />,
    },
];

const differentiators = [
    "Senior principals named on the engagement letter. The same people who write the proposal write the code and answer your calls.",
    "Full-stack practice — infrastructure, backend, frontend, design, AI — under one roof, on one calendar, with no translation tax between vendors.",
    "Analytics, observability, and AI integrated from week one. Never bolted on after a stakeholder asks for it later.",
    "Transparent workflows — weekly demos, shared backlog, on-call Slack. You see the work, the velocity, and the blockers in real time.",
    "Compliance posture written into the architecture. SOC 2, HIPAA, PCI, and GDPR controls in the first commit, not the audit week.",
    "Systems built to outlive the engagement — documented architecture, ADRs, runbooks, and a clean handover when you are ready to operate it yourself.",
];

const negativeSpace = [
    {
        title: "Not a body shop.",
        body: "We do not sell hours. We sell systems that ship, scale, and survive the second year.",
    },
    {
        title: "Not a generalist agency.",
        body: "We work in regulated verticals where engineering stakes are real. Banking, healthcare, government, fintech, manufacturing.",
    },
    {
        title: "Not template clones.",
        body: "Every system we ship is shaped to the business that asked for it. There is no in-house starter kit waiting to be rebranded for the next client.",
    },
    {
        title: "Not gated.",
        body: "There is no discovery-call wall in front of our pricing or our process. Send us a paragraph. A principal answers within one business day.",
    },
];

export default function AboutPage() {
    return (
        <>
            <PageBackdrop />

            <PageHero
                eyebrow="VYUSOFT, A STUDY"
                title={"A studio for\nhard systems."}
                description="We pair an enterprise services practice with an in-house research lab. Two delivery models, one calendar, no translation tax. Fifteen years of operating history across regulated verticals."
                cta={{ label: "Start a Project", href: "/contact" }}
                marginalia={[
                    "33°13'N 97°08'W",
                    "EST. 2010",
                    "DENTON, TEXAS",
                    "STUDIO PROFILE · VOL. 2026",
                ]}
            />

            {/* Foundation — sticky-scroll three-statement reveal */}
            <FoundationSection purposes={purposes} />

            {/* Long View — INHERITS home's WhyChooseUs glass-stat-card pattern */}
            <section className="why-us" aria-labelledby="about-longview-heading">
                <div className="why-us-content">
                    <div className="why-us-split">
                        <div className="why-us-left">
                            <div className="why-us-left-inner">
                                <ScrollReveal>
                                    <p className="why-us-eyebrow">THE LONG VIEW</p>
                                </ScrollReveal>
                                <ScrollReveal delay={0.08}>
                                    <h2 id="about-longview-heading" className="why-us-title">
                                        Numbers we are happy to talk through.
                                    </h2>
                                </ScrollReveal>
                                <ScrollReveal delay={0.16}>
                                    <p className="about-longview-lede">
                                        We do not lead with hero stat-cards because the
                                        story is the rate of compounding, not the size of
                                        any single figure. Here is the rate.
                                    </p>
                                </ScrollReveal>
                            </div>
                        </div>
                        <div className="why-us-stats">
                            {longView.map((n, i) => (
                                <LongViewStatCard
                                    key={n.label}
                                    index={i}
                                    target={n.target}
                                    suffix={n.suffix}
                                    label={n.label}
                                    emphasis={n.emphasis}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Manifesto — full-viewport editorial moment, the page's
                signature beat. Single Fraunces italic statement broken into
                lines that reveal in sequence. The "pin it to a moodboard"
                moment that an Apple/Stripe/Linear-grade About earns. */}
            <ManifestoSection />

            {/* Competencies — INHERITS home's Pillars 4-up card pattern */}
            <section className="pillars" aria-labelledby="about-competencies-heading">
                <div className="pillars-content">
                    <ScrollReveal>
                        <p className="pillars-eyebrow">WHAT WE DO</p>
                    </ScrollReveal>
                    <ScrollReveal delay={0.08}>
                        <h2 id="about-competencies-heading" className="pillars-title">
                            Four core competencies.
                        </h2>
                    </ScrollReveal>
                    <ScrollReveal delay={0.15}>
                        <p className="pillars-body">
                            Each practice is led by a senior engineer and supported
                            by working groups that share research across the studio.
                        </p>
                    </ScrollReveal>

                    <div className="pillars-grid pillars-grid--4">
                        {competencies.map((c, i) => (
                            <CompetencyCard
                                key={c.title}
                                index={i}
                                title={c.title}
                                desc={c.desc}
                                icon={c.icon}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline — sixteen years of milestones, dark transparent. */}
            <TimelineSection />

            {/* Differentiators — dark hairline list, 4/8 editorial split */}
            <section className="inner-dark" aria-labelledby="about-diff-heading" data-theme="dark">
                <div className="inner-section-inner">
                    <div className="about-diff-grid">
                        <div className="about-diff-headcol">
                            <ScrollReveal>
                                <p className="inner-section-eyebrow">WHY VYUSOFT</p>
                            </ScrollReveal>
                            <ScrollReveal delay={0.08}>
                                <h2 id="about-diff-heading" className="inner-section-headline">
                                    Six reasons clients stay.
                                </h2>
                            </ScrollReveal>
                            <ScrollReveal delay={0.16}>
                                <p className="inner-section-body about-diff-lede">
                                    The renewal rate is 92%. These are the patterns
                                    behind that number.
                                </p>
                            </ScrollReveal>
                        </div>
                        <ScrollReveal delay={0.22}>
                            <ol className="inner-hl-list about-diff-list">
                                {differentiators.map((d, i) => (
                                    <li key={i} className="inner-hl-item about-diff-item">
                                        <span className="inner-hl-num">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <p className="about-diff-body">{d}</p>
                                    </li>
                                ))}
                            </ol>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Negative Space — confident anti-positioning, white hairline */}
            <section className="inner-light about-negative" aria-labelledby="about-negative-heading" data-theme="light">
                <div className="inner-section-inner">
                    <div className="about-negative-header">
                        <ScrollReveal>
                            <p className="inner-section-eyebrow">THE NEGATIVE SPACE</p>
                        </ScrollReveal>
                        <ScrollReveal delay={0.08}>
                            <h2 id="about-negative-heading" className="inner-section-headline">
                                What we are not.
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal delay={0.16}>
                            <p className="inner-section-body about-negative-lede">
                                The category is crowded with shops that promise the universe.
                                Here is what we refuse to be, so you know whether to keep
                                reading.
                            </p>
                        </ScrollReveal>
                    </div>

                    <ol className="about-negative-list">
                        {negativeSpace.map((item, i) => (
                            <ScrollReveal key={item.title} delay={0.2 + i * 0.08} y={32}>
                                <li className="about-negative-item">
                                    <h3 className="about-negative-title">{item.title}</h3>
                                    <p className="about-negative-body">{item.body}</p>
                                </li>
                            </ScrollReveal>
                        ))}
                    </ol>
                </div>
            </section>

            <ClosingCta
                title="Like what you see?"
                subtitle="Bring us a problem worth solving."
                primary={{ label: "Start a Project", href: "/contact" }}
                secondary={{ label: "See open roles", href: "https://vyusoft.zohorecruit.com/jobs/Careers/" }}
            />

            <SiteFooter />
        </>
    );
}
