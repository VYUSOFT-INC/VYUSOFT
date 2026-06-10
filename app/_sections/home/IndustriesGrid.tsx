"use client";

import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * IndustriesGrid — "Tailored solutions for every sector."
 *
 * White section, 3-column grid of industry pillars. Each column has a
 * cream/black/cream alternation, with a hero industry, sub-industries
 * with bullet markers, and a CTA at bottom.
 * PeachWeb frame ~225.
 */

type IndustryColumn = {
    title: string;
    subtitle: string;
    items: string[];
    cta: { label: string; href: string };
    variant: "cream" | "dark";
};

/* One industry pillar per column — matches the PeachWeb reference
   (frames 225-245) where each card leads with a single industry name
   followed by sub-verticals as bullets. Real industries from
   vyusoft.com's full vertical list (lib/nav.ts). */
const COLUMNS: IndustryColumn[] = [
    {
        title: "Banking & FinTech",
        subtitle:
            "Secure, digital, and customer-centric financial systems. AI, cloud, and zero-trust security woven through every transaction.",
        items: [
            "Capital Markets — Trading, risk, and regulatory compliance",
            "Insurance — Modernized claims, underwriting and risk",
            "FinTech — Innovative financial products and platforms",
        ],
        cta: { label: "Start a Project", href: "/contact" },
        variant: "cream",
    },
    {
        title: "Healthcare & Public",
        subtitle:
            "Compliance-grade platforms for regulated environments — HIPAA, GDPR, and SOC 2 by default, modernized for the people who depend on them.",
        items: [
            "Healthcare — Digital health platforms and patient management",
            "Government — Robust and secure public sector systems",
            "Education — AI, cloud, and interactive learning",
            "Energy & Utilities — Smart grid and operations modernization",
        ],
        cta: { label: "Contact Sales", href: "/contact" },
        variant: "dark",
    },
    {
        title: "Commerce & Industry",
        subtitle:
            "Supply chains, storefronts, and factories — re-engineered around data, automation, and customer experience.",
        items: [
            "Retail — Engaging platforms for seamless experiences",
            "Manufacturing — Smart factory and operational optimization",
            "Ecommerce — Scalable, secure online commerce",
            "Food & Grocery — Digital ordering and delivery",
        ],
        cta: { label: "Start a Project", href: "/contact" },
        variant: "cream",
    },
];

export function IndustriesGrid() {
    return (
        <section className="industries-grid" aria-labelledby="industries-heading" data-theme="light">
            <div className="industries-grid-content">
                <Reveal>
                    <p className="industries-grid-eyebrow">INDUSTRIES WE SERVE</p>
                </Reveal>

                <Reveal delay={0.08}>
                    <h2 id="industries-heading" className="industries-grid-title">
                        Built for regulated industries.
                    </h2>
                </Reveal>

                <div className="industries-grid-cols">
                    {COLUMNS.map((col, i) => (
                        <Reveal key={i} delay={0.22 + i * 0.12} y={32}>
                            <article
                                className={`industry-col industry-col--${col.variant}`}
                            >
                                <div className="industry-col-section">
                                    <h3 className="industry-col-primary-title">
                                        {col.title}
                                    </h3>
                                    <p className="industry-col-primary-subtitle">
                                        {col.subtitle}
                                    </p>
                                </div>

                                <ul className="industry-col-list">
                                    {col.items.map((item) => (
                                        <li key={item} className="industry-col-list-item">
                                            <Plus
                                                className="industry-col-list-icon"
                                                strokeWidth={2}
                                            />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href={col.cta.href} className="industry-col-cta">
                                    {col.cta.label}
                                    <span className="industry-col-cta-icon">
                                        <ArrowUpRight
                                            className="w-3.5 h-3.5"
                                            strokeWidth={2}
                                        />
                                    </span>
                                </Link>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
