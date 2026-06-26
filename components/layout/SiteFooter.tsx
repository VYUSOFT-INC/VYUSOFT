"use client";

import Link from "next/link";
import Image from "next/image";

/**
 * SiteFooter — colophon. Real VyuSoft contact details (Denton, TX HQ).
 *
 * Renders transparent over the page backdrop on dark inner pages; on
 * white pages it sits in its own dark band. Composition pulled out of
 * the previous FinalCta block so it can be reused across every page
 * (home keeps FinalCta which composes ClosingCta + this footer).
 */
export function SiteFooter() {
    return (
        <footer className="site-footer" aria-label="Site footer">
            <div className="site-footer-inner">
                <div className="site-footer-brand">
                    <Link href="/" aria-label="VyuSoft, home">
                        <Image
                            src="/vyusoft-logo-white-transparent.png"
                            alt="VyuSoft"
                            width={200}
                            height={40}
                            style={{ height: 40, width: "auto", objectFit: "contain", marginBottom: 16 }}
                        />
                    </Link>
                    <p className="site-footer-get-in-touch">Get In Touch</p>
                    <a href="mailto:sales@vyusoft.com" className="site-footer-email">
                        <strong>Email:</strong> sales@vyusoft.com
                    </a>
                    <a href="tel:+14692132369" className="site-footer-email">
                        <strong>TelePhone:</strong> +1 (469)-213-2369
                    </a>
                    <a href="tel:+19409779963" className="site-footer-email">
                        <strong>Phone:</strong> +1 (940) 977-9963
                    </a>
                    <p className="site-footer-address">
                        <strong>Address:</strong> 511 E John Carpenter Fwy, STE 500, Irving, Texas, 75062, USA.
                    </p>
                </div>

                <div className="site-footer-cols">
                    <div className="site-footer-col">
                        <p className="site-footer-col-title">Menu</p>
                        <Link href="/" className="site-footer-link">Home</Link>
                        <Link href="/services" className="site-footer-link">Services</Link>
                        <Link href="/products" className="site-footer-link">Products</Link>
                        <Link href="/about" className="site-footer-link">About</Link>
                        <Link href="/contact" className="site-footer-link">Contact Us</Link>
                    </div>
                    <div className="site-footer-col">
                        <p className="site-footer-col-title">Company</p>
                        <Link href="/services/vyu-startup-solutions" className="site-footer-link">Startup Solutions</Link>
                        <Link
                            href="https://vyusoft.zohorecruit.com/jobs/Careers/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="site-footer-link"
                        >
                            Careers
                        </Link>
                        <Link href="/privacy" className="site-footer-link">Privacy Policy</Link>
                        <Link href="/terms" className="site-footer-link">Terms &amp; Conditions</Link>
                    </div>
                    <div className="site-footer-col">
                        <p className="site-footer-col-title">Socials</p>
                        <Link
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="site-footer-link"
                        >
                            Instagram
                        </Link>
                        <Link
                            href="https://www.linkedin.com/company/vyusoft"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="site-footer-link"
                        >
                            LinkedIn
                        </Link>
                        <Link
                            href="https://x.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="site-footer-link"
                        >
                            X
                        </Link>
                    </div>
                </div>
            </div>

            <div className="site-footer-baseline">
                <p className="site-footer-baseline-text">
                    &copy; {new Date().getFullYear()} VyuSoft. All rights reserved.
                </p>
                <p className="site-footer-baseline-text">
                    Engineered in Irving, Texas.
                </p>
            </div>
        </footer>
    );
}
