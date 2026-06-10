import { PageBackdrop } from "@/components/layout/PageBackdrop";
import { PageHero } from "@/components/templates/PageHero";
import { ClosingCta } from "@/components/templates/ClosingCta";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { allDevelopmentPhases } from "@/lib/development";
import { metaForPhase } from "@/lib/developmentMeta";
import { MethodTimeline, type TimelinePhase } from "./_components/MethodTimeline";

export const metadata = {
    title: "Process",
    description:
        "Seven-phase delivery methodology, from discover to launch. Each phase has a deliverable, an owner, and a written artifact that survives the engagement.",
};

/**
 * /development — the methodology as a connected timeline. Each phase carries
 * its duration, lead, cadence, and artifacts, pulled from lib/development +
 * lib/developmentMeta.
 */
export default function DevelopmentIndexPage() {
    const phases: TimelinePhase[] = allDevelopmentPhases.map((p) => {
        const meta = metaForPhase(p.slug);
        return {
            slug: p.slug,
            title: p.title,
            phaseNumber: p.phaseNumber,
            description: p.description,
            accent: p.accent,
            duration: meta.duration,
            cadence: meta.cadence,
            leadRole: meta.leadRole,
            activities: p.activities.slice(0, 3).map((a) => a.title),
            artifacts: meta.artifacts.map((a) => a.title),
        };
    });

    return (
        <>
            <PageBackdrop />

            <PageHero
                eyebrow="METHODOLOGY"
                title={"How the work\nactually gets done."}
                description="Seven phases, one calendar, no theatre. Each phase has a deliverable, an owner, and a written artifact you keep. Here is exactly how an engagement moves — and what lands in your hands at every step."
                cta={{ label: "Start a Project", href: "/contact" }}
                secondary={{ label: "See our services", href: "/services" }}
                marginalia={[
                    "TRANSPARENT · ITERATIVE",
                    "WRITTEN ARTIFACTS",
                    "NAMED OWNERS",
                ]}
            />

            <MethodTimeline phases={phases} />

            <ClosingCta
                title="Want a plan like this for your build?"
                subtitle="We'll return a phased plan with named owners and a calendar within one business day."
                primary={{ label: "Start a Project", href: "/contact" }}
                secondary={{ label: "See our services", href: "/services" }}
            />

            <SiteFooter />
        </>
    );
}
