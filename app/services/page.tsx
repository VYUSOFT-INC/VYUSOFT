import { PageBackdrop } from "@/components/layout/PageBackdrop";
import { PageHero } from "@/components/templates/PageHero";
import { ClosingCta } from "@/components/templates/ClosingCta";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { servicesByGroup } from "@/lib/nav";
import { getServiceBySlug, type Service } from "@/lib/services";
import { GroupBento } from "./_sections/GroupBento";
import { GroupSpotlight } from "./_sections/GroupSpotlight";
import { GroupMatrix } from "./_sections/GroupMatrix";
import { GroupManifesto } from "./_sections/GroupManifesto";
import { GroupConsole } from "./_sections/GroupConsole";

export const metadata = {
    title: "Services",
    description:
        "Five disciplines, thirty practices. You don't hire a catalogue — you hire the people who have already shipped what you're trying to ship.",
};

const GROUP_ACCENT: Record<string, string> = {
    Technology: "#635BFF",
    Engineering: "#06B6D4",
    Enterprise: "#C9962E",
    Growth: "#FB7185",
    Operations: "#22C55E",
};

/* Hand-written, opinionated intros — one per capability group. */
const INTROS: Record<string, { eyebrow: string; title: string; lede: string }> = {
    Technology: {
        eyebrow: "01 — TECHNOLOGY",
        title: "The layer everything else stands on.",
        lede: "AI, security, cloud, data, the network itself. Get this tier wrong and nothing above it is safe — so it's where we're most opinionated, and where most engagements quietly begin.",
    },
    Engineering: {
        eyebrow: "02 — ENGINEERING",
        title: "The part your customers actually touch.",
        lede: "Web, mobile, cross-platform, on-device. The surfaces people tap and trust every day — and the systems behind them that hold steady when traffic doesn't.",
    },
    Enterprise: {
        eyebrow: "03 — ENTERPRISE",
        title: "The systems the whole company runs on.",
        lede: "ERPs, workflow, migrations, architecture. When these go down, everyone feels it. We modernise them without the multi-year saga that gave the category its reputation.",
    },
    Growth: {
        eyebrow: "04 — GROWTH",
        title: "You built it. Now make it grow.",
        lede: "Strategy, go-to-market, prototyping, and the people to run it — the work that turns a product that merely exists into a business that compounds.",
    },
    Operations: {
        eyebrow: "05 — OPERATIONS",
        title: "The work that happens at 3am.",
        lede: "Payments, backup, quality, and the tooling that wakes someone when something breaks. The least glamorous line on the invoice, and the one that lets you sleep.",
    },
};

function practicesFor(groupTitle: string): Service[] {
    const g = servicesByGroup.find((x) => x.title === groupTitle);
    if (!g) return [];
    return g.items
        .map((it) => getServiceBySlug(it.slug))
        .filter((s): s is Service => Boolean(s));
}

/**
 * /services — the catalogue, but every capability group gets its own
 * layout (bento / spotlight / matrix / manifesto / console) so the page
 * reads as designed, not generated. Graphic & typographic only — no stock.
 */
export default function ServicesIndexPage() {
    return (
        <>
            <PageBackdrop />

            <PageHero
                eyebrow="SERVICES"
                title={"Bring the problem.\nWe bring the team."}
                description="Five disciplines, thirty practices — but you're not hiring a catalogue. You're hiring the specific people who have already shipped the thing you're trying to ship. Tell us where it hurts; we'll bring the ones who've fixed it before."
                cta={{ label: "Start a Project", href: "/contact" }}
                secondary={{ label: "How we work", href: "/development" }}
                heroImage="/sections/service images/services index.png"
                heroImagePosition="75% center"
                marginalia={[
                    "ONE ACCOUNTABLE TEAM",
                    "SHIPPED, NOT STAFFED",
                    "DENTON · GLOBAL",
                ]}
            />

            <GroupBento
                practices={practicesFor("Technology")}
                accent={GROUP_ACCENT.Technology}
                {...INTROS.Technology}
            />
            <GroupSpotlight
                practices={practicesFor("Engineering")}
                accent={GROUP_ACCENT.Engineering}
                {...INTROS.Engineering}
            />
            <GroupMatrix
                practices={practicesFor("Enterprise")}
                accent={GROUP_ACCENT.Enterprise}
                {...INTROS.Enterprise}
            />
            <GroupManifesto
                practices={practicesFor("Growth")}
                accent={GROUP_ACCENT.Growth}
                {...INTROS.Growth}
            />
            <GroupConsole
                practices={practicesFor("Operations")}
                accent={GROUP_ACCENT.Operations}
                {...INTROS.Operations}
            />

            <ClosingCta
                title="Not sure which you need?"
                subtitle="Describe the problem in a paragraph &mdash; we'll tell you who to talk to."
                primary={{ label: "Start a Project", href: "/contact" }}
                secondary={{ label: "See our industries", href: "/industries" }}
                media="/sections/service images/services cta.png"
            />

            <SiteFooter />
        </>
    );
}
