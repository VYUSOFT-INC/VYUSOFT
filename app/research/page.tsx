import { PageBackdrop } from "@/components/layout/PageBackdrop";
import { PageHero } from "@/components/templates/PageHero";
import { ClosingCta } from "@/components/templates/ClosingCta";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
    title: "Research",
    description:
        "Vyu Research is the studio's in-house lab. Applied AI, security, cloud architecture, and data-science investigations that flow into client engagements.",
};

/**
 * Research — sage-accented dispatches page. Editorial register matching
 * the studio's "research journal, not brochure" voice.
 */

const SAGE = "#7B9985";

const dispatches = [
    {
        no: "DSP-014",
        date: "2026-04",
        title: "Foundation models in regulated environments",
        copy:
            "Pre-training, fine-tuning, and inference patterns for orgs that cannot ship data outside their VPC. Includes a comparison of two on-prem stacks and an audit checklist.",
    },
    {
        no: "DSP-013",
        date: "2026-03",
        title: "Zero-trust at the data plane",
        copy:
            "Identity-first access for analytics platforms. We map how Snowflake, Databricks, and BigQuery handle row-level masking under impersonated principals.",
    },
    {
        no: "DSP-012",
        date: "2026-02",
        title: "FinOps for serverless",
        copy:
            "A 90-day study of cost-per-request across Lambda, Cloud Functions, and Cloudflare Workers under burst, steady-state, and idle profiles.",
    },
    {
        no: "DSP-011",
        date: "2026-01",
        title: "Streaming-first architectures",
        copy:
            "Kafka and Kinesis as the system of record. Includes a reference implementation for sub-second analytics with eventual-consistent reporting.",
    },
    {
        no: "DSP-010",
        date: "2025-12",
        title: "Knowledge management for support",
        copy:
            "An assistive-search prototype that pairs vector retrieval with structured ticket history. Released as an internal beta to two enterprise pilots.",
    },
    {
        no: "DSP-009",
        date: "2025-11",
        title: "Patterns for migration without downtime",
        copy:
            "Cutover playbooks for zero-downtime migrations across regions. Generic enough to apply to most relational databases, with notes on mongo and cassandra.",
    },
];

export default function ResearchPage() {
    return (
        <>
            <PageBackdrop accent={SAGE} />

            <PageHero
                eyebrow="VYU.RESEARCH"
                title={"The studio's\nin-house lab."}
                description="Applied AI, cybersecurity, cloud architecture, and data-science investigations. Research flows into client engagements as patterns, not slideware."
                accent={SAGE}
                cta={{ label: "Partner with the lab", href: "/contact" }}
                marginalia={[
                    "EST. 2017",
                    "DISPATCH 014",
                    "ACTIVE STREAMS · 6",
                ]}
            />

            {/* Dispatches index — white opaque hairline list */}
            <section
                className="inner-light"
                aria-labelledby="dispatches-heading"
                style={{ ["--accent" as string]: SAGE }}
            >
                <div className="inner-section-inner">
                    <div className="about-competencies-header">
                        <div>
                            <Reveal>
                                <p className="inner-section-eyebrow">DISPATCHES</p>
                            </Reveal>
                            <Reveal delay={0.08}>
                                <h2 id="dispatches-heading" className="inner-section-headline">
                                    Recent investigations.
                                </h2>
                            </Reveal>
                        </div>
                        <Reveal delay={0.16}>
                            <p className="inner-section-body about-competencies-lede">
                                We publish dispatches monthly. Each one is a working paper
                                from a current research stream, written by the engineer
                                leading the work.
                            </p>
                        </Reveal>
                    </div>

                    <Reveal delay={0.22}>
                        <ol className="inner-hl-list">
                            {dispatches.map((d, i) => (
                                <li key={d.no} className="inner-hl-item research-dispatch-item">
                                    <span className="inner-hl-num">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="inner-hl-title">{d.title}</h3>
                                    <div className="research-dispatch-meta">
                                        <p className="inner-hl-desc">{d.copy}</p>
                                        <p className="research-dispatch-stamp">
                                            {d.no} &middot; {d.date}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </Reveal>
                </div>
            </section>

            {/* Vision — dark transparent editorial passage */}
            <section
                className="inner-dark research-vision"
                aria-labelledby="research-vision-heading"
                style={{ ["--accent" as string]: SAGE }}
            >
                <div className="inner-section-inner">
                    <div className="research-vision-grid">
                        <div>
                            <Reveal>
                                <p className="inner-section-eyebrow">VISION</p>
                            </Reveal>
                            <Reveal delay={0.08}>
                                <h2
                                    id="research-vision-heading"
                                    className="inner-section-headline research-vision-headline"
                                >
                                    Innovation is not about new technology.
                                </h2>
                            </Reveal>
                        </div>
                        <Reveal delay={0.16}>
                            <div className="research-vision-body">
                                <p className="research-vision-lede">
                                    It is about reimagining how technology solves the
                                    problems that already exist.
                                </p>
                                <p className="research-vision-text">
                                    Our teams work across AI, cloud, data, and
                                    human-computer interaction — and what we learn turns
                                    into patterns we hand to client engineering, not
                                    slides we present once and shelve.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <ClosingCta
                title="Run a study with us."
                subtitle="Partner with Vyu Research on a focused investigation."
                primary={{ label: "Start a partnership", href: "/contact" }}
                secondary={{ label: "Read the dispatches", href: "#dispatches-heading" }}
            />

            <SiteFooter />
        </>
    );
}
