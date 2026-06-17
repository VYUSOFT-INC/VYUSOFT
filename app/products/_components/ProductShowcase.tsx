"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { Product } from "@/lib/products";

/**
 * ProductShowcase — one generous, landing-page-style block per product on
 * the /products index. Image side alternates (zigzag) and the theme
 * alternates dark/light for rhythm. Apps use their real screenshot; the
 * engagement model (no image) gets a typographic stack instead.
 */
export function ProductShowcase({ product, index }: { product: Product; index: number }) {
    const theme = index % 2 === 0 ? "dark" : "light";
    const flip = index % 2 === 1;

    return (
        <section
            className={`prod-show prod-show--${theme}${flip ? " prod-show--flip" : ""}`}
            data-theme={theme}
            aria-label={product.name}
            style={{ ["--accent" as string]: product.accent }}
        >
            <div className="prod-show-inner">
                <div className="prod-show-text">
                    <Reveal>
                        <p className="prod-show-eyebrow">
                            <span className="prod-show-cat">{product.category}</span>
                            <span className="prod-show-status">{product.status}</span>
                        </p>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <h2 className="prod-show-name">{product.name}</h2>
                    </Reveal>
                    <Reveal delay={0.14}>
                        <p className="prod-show-tagline">{product.tagline}</p>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="prod-show-desc">{product.description}</p>
                    </Reveal>
                    <Reveal delay={0.26}>
                        <ul className="prod-show-feats">
                            {product.features.slice(0, 3).map((f) => (
                                <li key={f.title}>
                                    <span className="prod-show-feat-dot" aria-hidden="true" />
                                    {f.title}
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                    <Reveal delay={0.32}>
                        <Link href={`/products/${product.slug}`} className="prod-show-cta">
                            Explore {product.name}
                            <ArrowUpRight strokeWidth={2} className="prod-show-cta-icon" />
                        </Link>
                    </Reveal>
                </div>

                <Reveal delay={0.16} y={36} className="prod-show-visual">
                    {product.cardImage ? (
                        <div className="prod-show-frame">
                            <Image
                                src={product.cardImage}
                                alt={`${product.name} preview`}
                                width={760}
                                height={560}
                                className="prod-show-img"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                    ) : (
                        <div className="prod-show-schem">
                            <p className="prod-show-schem-label">ENGAGEMENT MODEL</p>
                            {["Strategy", "Design", "Engineering", "Operations"].map(
                                (tier, i) => (
                                    <div key={tier} className="prod-show-schem-tier">
                                        <span className="prod-show-schem-idx">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span className="prod-show-schem-name">{tier}</span>
                                    </div>
                                ),
                            )}
                            <p className="prod-show-schem-foot">One accountable principal</p>
                        </div>
                    )}
                </Reveal>
            </div>
        </section>
    );
}
