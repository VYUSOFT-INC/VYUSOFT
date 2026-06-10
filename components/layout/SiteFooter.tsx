"use client";

import Link from "next/link";

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
                    <p className="site-footer-logo">VYUSOFT</p>
                    <a
                        href="mailto:sales@vyusoft.com"
                        className="site-footer-email"
                    >
                        sales@vyusoft.com
                    </a>
                    <a
                        href="tel:+14692132369"
                        className="site-footer-email"
                    >
                        +1 (469)-213-2369
                    </a>
                    <p className="site-footer-address">
                        414 W Parkway St,
                        <br />
                        Denton, Texas, 76201, USA
                    </p>
                </div>

                <div className="site-footer-cols">
                    <div className="site-footer-col">
                        <p className="site-footer-col-title">Menu</p>
                        <Link href="/services" className="site-footer-link">Services</Link>
                        <Link href="/products" className="site-footer-link">Products</Link>
                        <Link href="/about" className="site-footer-link">About</Link>
                        <Link href="/contact" className="site-footer-link">Contact</Link>
                    </div>
                    <div className="site-footer-col">
                        <p className="site-footer-col-title">Studio</p>
                        <Link href="/research" className="site-footer-link">Research</Link>
                        <Link href="/privacy" className="site-footer-link">Privacy</Link>
                        <Link href="/terms" className="site-footer-link">Terms</Link>
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
                            href="https://linkedin.com"
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
                    Engineered in Denton, Texas.
                </p>
            </div>
        </footer>
    );
}
