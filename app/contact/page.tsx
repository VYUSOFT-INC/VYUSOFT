import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "./_components/ContactForm";
import { PageBackdrop } from "@/components/layout/PageBackdrop";
import { PageHero } from "@/components/templates/PageHero";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata = {
    title: "Contact",
    description:
        "Bring us a hard problem. We answer within one business day with a principal engineer on the thread.",
};

/**
 * Contact — direct-conversion page. Dark hero with the invitation copy,
 * then a white inner-light section with the form on the left and direct
 * contact lines on the right. No ClosingCta — this page IS the CTA.
 */
export default function ContactPage() {
    return (
        <>
            <PageBackdrop />

            <PageHero
                eyebrow="CONTACT, OPEN CHANNEL"
                title={"Bring us a\nhard problem."}
                description="Send a paragraph describing what you are trying to ship and where it hurts. A principal engineer will respond personally within one business day. No discovery-call gate."
                cta={{ label: "Skip to the brief", href: "#brief" }}
                marginalia={[
                    "RESPONSE · ONE BUSINESS DAY",
                    "SALES@VYUSOFT.COM",
                    "+1 (469) 213-2369",
                ]}
            />

            <section className="inner-light contact-section" aria-labelledby="contact-form-heading" data-theme="light">
                <div className="inner-section-inner">
                    <div className="contact-grid">
                        <div className="contact-form-col">
                            <p className="inner-section-eyebrow">DISPATCH</p>
                            <h2
                                id="contact-form-heading"
                                className="inner-section-headline"
                            >
                                Send the brief.
                            </h2>
                            <p className="inner-section-body contact-form-lede">
                                Seven fields. No discovery-call gate, no sales-development
                                rep, no nurture sequence. A principal reads every dispatch
                                personally and replies within one business day.
                            </p>
                            <div id="brief" className="contact-form-wrap">
                                <ContactForm />
                            </div>
                        </div>

                        <aside className="contact-info-col" aria-label="Direct contact lines">
                            <p className="inner-section-eyebrow contact-info-eyebrow">
                                DIRECT LINES
                            </p>
                            <ul className="contact-info-list">
                                <InfoRow
                                    icon={<Mail strokeWidth={1.5} />}
                                    label="EMAIL"
                                    value="sales@vyusoft.com"
                                    href="mailto:sales@vyusoft.com"
                                />
                                <InfoRow
                                    icon={<Phone strokeWidth={1.5} />}
                                    label="PHONE"
                                    value="+1 (469) 213-2369"
                                    href="tel:+14692132369"
                                />
                                <InfoRow
                                    icon={<MapPin strokeWidth={1.5} />}
                                    label="OFFICE"
                                    value="414 W Parkway St, Denton, TX 76201"
                                />
                            </ul>

                            <div className="contact-info-hours">
                                <p className="contact-info-hours-label">HOURS</p>
                                <p className="contact-info-hours-text">
                                    Mon to Fri, 09:00 to 18:00 CST.
                                </p>
                                <p className="contact-info-hours-note">
                                    Out-of-hours dispatches answered next business day.
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <SiteFooter />
        </>
    );
}

function InfoRow({
    icon,
    label,
    value,
    href,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    href?: string;
}) {
    const inner = (
        <div className="contact-info-row">
            <span className="contact-info-icon" aria-hidden="true">
                {icon}
            </span>
            <div className="contact-info-text">
                <span className="contact-info-row-label">{label}</span>
                <span className="contact-info-row-value">{value}</span>
            </div>
        </div>
    );
    return <li>{href ? <a href={href} className="contact-info-link">{inner}</a> : inner}</li>;
}
