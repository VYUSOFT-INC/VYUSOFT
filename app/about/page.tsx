import { PageBackdrop } from "@/components/layout/PageBackdrop";
import { PageHero } from "@/components/templates/PageHero";
import { ClosingCta } from "@/components/templates/ClosingCta";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { IdentitySection } from "./_sections/IdentitySection";
import { PillarsSection } from "./_sections/PillarsSection";
import { CapabilitiesSection } from "./_sections/CapabilitiesSection";
import { StatsStrip } from "./_sections/StatsStrip";
import { EdgeSection } from "./_sections/EdgeSection";
import { ManifestoSection } from "./_sections/ManifestoSection";
import { ScrollReveal } from "./_sections/ScrollReveal";

export const metadata = {
    title: "About",
    description:
        "VyuSoft pairs enterprise services with in-house product engineering. Senior by default, hybrid by design, fifteen years across regulated verticals.",
};

/**
 * About — VyuSoft's editorial counterpart to the home.
 *
 * Section rhythm (D = dark transparent, W = white opaque):
 *   PageHero (D) · Identity (D) · Pillars (W) · Capabilities (D) ·
 *   Stats Strip (D) · Edge (W) · Negative Space (D) · Manifesto (W) ·
 *   ClosingCta (D) · SiteFooter (D)
 */

const pillars = [
    {
        kicker: "MISSION",
        title:
            "Help organisations unlock their full digital potential — software shaped to the problem, tailored in approach, transparent in execution, and transformative in result.",
    },
    {
        kicker: "VISION",
        title:
            "Become the global technology partner ambitious companies call when software simply has to work — in any industry, at any scale, anywhere they operate.",
    },
    {
        kicker: "PURPOSE",
        title:
            "Build digital infrastructure and applications that let serious organisations operate anywhere, at any time, without renegotiating the basics.",
    },
];

const stats = [
    { target: 1250, suffix: "+ clients", label: "Happy to name them on request" },
    { target: 2450, suffix: "+ projects", label: "Delivered end-to-end" },
    { target: 85, suffix: "+ team", label: "Engineers, scientists, architects" },
    { target: 120, suffix: "+ awards", label: "Industry recognitions" },
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
                title={"Built to accelerate,\nnot obstruct."}
                description="We partner with ambitious companies — startups through enterprise — to craft custom software and AI-driven solutions that unlock full digital potential. Our team of engineers, data scientists, and cloud architects operates as an extension of your in-house staff."
                cta={{ label: "Start a Project", href: "/contact" }}
                heroImage="/sections/about/about.png"
                heroImagePosition="75% center"
                marginalia={[
                    "32°51'N 96°56'W",
                    "EST. 2024",
                    "IRVING, TEXAS",
                ]}
            />

            <IdentitySection />

            <PillarsSection pillars={pillars} />

            <CapabilitiesSection />

            <StatsStrip stats={stats} />

            <EdgeSection />

            {/* Negative Space — 2×2 grid anti-positioning */}
            <section className="inner-dark" aria-labelledby="about-negative-heading">
                <div className="inner-section-inner">
                    <div style={{ marginBottom: 56 }}>
                        <ScrollReveal>
                            <p className="inner-section-eyebrow">THE NEGATIVE SPACE</p>
                        </ScrollReveal>
                        <ScrollReveal delay={0.08}>
                            <h2 id="about-negative-heading" className="inner-section-headline">
                                What we are not.
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal delay={0.16}>
                            <p
                                className="inner-section-body"
                                style={{ color: "oklch(99% 0.005 80 / 0.72)" }}
                            >
                                The category is crowded with shops that promise the universe.
                                Here is what we refuse to be, so you know whether to keep
                                reading.
                            </p>
                        </ScrollReveal>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: 0,
                        }}
                    >
                        {negativeSpace.map((item, i) => (
                            <ScrollReveal key={item.title} delay={0.2 + i * 0.06} y={32}>
                                <div
                                    style={{
                                        padding: "32px 28px 32px 0",
                                        borderTop: "1px solid oklch(99% 0.005 80 / 0.12)",
                                        height: "100%",
                                    }}
                                >
                                    <h3
                                        style={{
                                            fontFamily: "var(--font-sans)",
                                            fontSize: "1.25rem",
                                            fontWeight: 540,
                                            lineHeight: 1.2,
                                            letterSpacing: "-0.015em",
                                            color: "oklch(99% 0.005 80)",
                                            margin: "0 0 12px",
                                        }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: "0.9375rem",
                                            lineHeight: 1.6,
                                            color: "oklch(99% 0.005 80 / 0.68)",
                                            margin: 0,
                                        }}
                                    >
                                        {item.body}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <ManifestoSection />

            <ClosingCta
                title="Like what you see?"
                subtitle="Bring us a problem worth solving."
                primary={{ label: "Start a Project", href: "/contact" }}
                secondary={{ label: "See open roles", href: "https://vyusoft.zohorecruit.com/jobs/Careers/" }}
                media="/sections/about/about cta.png"
            />

            <SiteFooter />
        </>
    );
}
