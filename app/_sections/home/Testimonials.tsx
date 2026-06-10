"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Testimonials — "What our partners say."
 *
 * White section, three cream cards with photo + name + title + quote.
 * PeachWeb frame ~245.
 */

/* Real testimonials sourced from vyusoft.com homepage (verbatim quotes
   + real names + real company titles). */
const TESTIMONIALS = [
    {
        name: "Alex Datta",
        title: "CTO, FinTech Innovators",
        avatar: "/sections/testimonials/jane.png",
        quote: "Vyusoft transformed our AI roadmap into a reality. Their team delivered cutting-edge machine learning models on time and within budget. Communication was seamless throughout the project — highly recommended!",
    },
    {
        name: "Maria Patel",
        title: "Product Manager, Health + Tech Corp",
        avatar: "/sections/testimonials/mark.png",
        quote: "We partnered with Vyusoft for a full-stack web and mobile solution. Their developers not only understood our business goals but consistently offered creative, practical alternatives that improved our UX drastically.",
    },
    {
        name: "David Nguyen",
        title: "VP of IT, Global Manufacturing Co.",
        avatar: "/sections/testimonials/sarah.png",
        quote: "As our trusted partner in digital transformation, Vyusoft handled everything from cybersecurity assessments to data science pipelines. Their agile approach helped us launch ahead of schedule with zero security incidents.",
    },
];

export function Testimonials() {
    return (
        <section className="testimonials" aria-labelledby="testimonials-heading" data-theme="light">
            <div className="testimonials-content">
                <Reveal>
                    <p className="testimonials-eyebrow">TESTIMONIALS</p>
                </Reveal>

                <Reveal delay={0.08}>
                    <h2 id="testimonials-heading" className="testimonials-title">
                        What our partners say.
                    </h2>
                </Reveal>

                <div className="testimonials-grid">
                    {TESTIMONIALS.map((t, i) => (
                        <Reveal key={t.name} delay={0.22 + i * 0.12} y={32}>
                            <article className="testimonial-card">
                                <div className="testimonial-card-header">
                                    <div className="testimonial-card-avatar">
                                        <Image
                                            src={t.avatar}
                                            alt={t.name}
                                            width={48}
                                            height={48}
                                            className="testimonial-card-avatar-img"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="testimonial-card-name">{t.name}</h3>
                                        <p className="testimonial-card-role">{t.title}</p>
                                    </div>
                                </div>
                                <p className="testimonial-card-quote">&ldquo;{t.quote}&rdquo;</p>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
