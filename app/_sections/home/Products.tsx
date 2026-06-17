"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { allProducts } from "@/lib/products";

/**
 * Products — "We don't just pitch — we ship our own."
 *
 * Vyusoft's in-house product portfolio, sourced from lib/products.ts (the
 * single source of truth shared with the navbar mega-menu, the /products
 * index, and each /products/[slug] detail page). Each card carries:
 *   - brand name (the product's actual name, not a category description)
 *   - one-line positioning
 *   - a status pill
 *   - hero image for the three branded products (Vyuflo has visual parity)
 *   - a deep-link into its dedicated product page
 *
 * The fourth card (VYU Startup Solutions) intentionally has no image —
 * it reads as the engagement model rather than a single product.
 */

const PRODUCTS = allProducts;

export function Products() {
    return (
        <section className="products-section" aria-labelledby="products-heading" data-theme="dark">
            <div className="products-section-content">
                <div className="products-section-split">
                    <div className="products-section-left">
                        <div className="products-section-left-inner">
                            <Reveal>
                                <p className="products-section-eyebrow">OUR PRODUCTS</p>
                            </Reveal>

                            <Reveal delay={0.12}>
                                <h2 id="products-heading" className="products-section-title">
                                    We don&apos;t just pitch &mdash;
                                    <br />
                                    we build our own.
                                </h2>
                            </Reveal>

                            <Reveal delay={0.22}>
                                <p className="products-section-body">
                                    Three applications are in active development under the
                                    VyuSoft label, plus an engagement track that pulls
                                    every practice into one named principal for funded
                                    founders. Each is a product we&apos;re building — not a
                                    case study or a slide.
                                </p>
                            </Reveal>
                        </div>
                    </div>

                    <div className="products-section-right">
                        {PRODUCTS.map((product) => (
                            <Reveal
                                key={product.name}
                                delay={0}
                                y={48}
                                duration={0.75}
                                margin="-15%"
                            >
                                <Link
                                    href={`/products/${product.slug}`}
                                    className="product-card product-card--link"
                                    aria-label={`${product.name} — ${product.positioning}`}
                                >
                                    {product.cardImage && (
                                        <div className="product-card-image-wrap">
                                            <Image
                                                src={product.cardImage}
                                                alt={`${product.name} preview`}
                                                width={500}
                                                height={320}
                                                className="product-card-image"
                                                sizes="(max-width: 1024px) 100vw, 50vw"
                                            />
                                        </div>
                                    )}
                                    <div className="product-card-body">
                                        <div className="product-card-header">
                                            <div>
                                                <p className="product-card-category">
                                                    {product.category}
                                                </p>
                                                <h3 className="product-card-title">
                                                    {product.name}
                                                </h3>
                                            </div>
                                            <span className="product-card-status">
                                                {product.status}
                                            </span>
                                        </div>
                                        <p className="product-card-positioning">
                                            {product.positioning}
                                        </p>
                                        <p className="product-card-desc">
                                            {product.description}
                                        </p>
                                        <span className="product-card-cue" aria-hidden="true">
                                            Explore {product.name}
                                            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                                        </span>
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
