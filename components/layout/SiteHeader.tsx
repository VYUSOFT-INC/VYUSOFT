"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
    servicesByGroup,
    industriesNav,
    developmentNav,
} from "@/lib/nav";
import { allProducts } from "@/lib/products";
import { easeSlowBurn as slowBurn, sheetSlide } from "@/lib/motion";

type MenuKey = "services" | "products" | "industries" | "process" | null;


/* Panel positioning — full width of site-header-inner (max-width 1480),
   centered. Uses left:0 / right:0 instead of left:50% + transform so
   Framer Motion's `y` animation doesn't overwrite our horizontal
   centering. */
const PANEL_OUTER_STYLE: React.CSSProperties = {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: 14,
    pointerEvents: "auto",
    zIndex: 60,
    display: "flex",
    justifyContent: "center",
};

const PANEL_INNER_STYLE: React.CSSProperties = {
    width: "100%",
    maxWidth: 1280,
    background: "oklch(10% 0.04 245 / 0.92)",
    backdropFilter: "blur(24px) saturate(140%)",
    WebkitBackdropFilter: "blur(24px) saturate(140%)",
    border: "1px solid oklch(99% 0.005 80 / 0.10)",
    borderRadius: 24,
    padding: "40px 36px",
    boxShadow: "0 24px 60px -20px oklch(0% 0 0 / 0.45)",
    color: "oklch(99% 0.005 80)",
};

export function SiteHeader() {
    const [hidden, setHidden] = useState(false);
    const [openMenu, setOpenMenu] = useState<MenuKey>(null);
    /* Logo theme — driven by the section currently overlapping the header.
       Sections that opt in declare `data-theme="dark"` or `data-theme="light"`.
       The IntersectionObserver below tracks which section is under the header
       (within the top 96px sliver of the viewport) and updates the logo. */
    const [logoTheme, setLogoTheme] = useState<"dark" | "light">("dark");
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();
    const lastScrollY = useRef(0);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        let frame = 0;
        const handler = () => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
                const currentY = window.scrollY;
                const delta = currentY - lastScrollY.current;
                if (currentY < 80) {
                    setHidden(false);
                } else if (delta > 1 && !openMenu) {
                    setHidden(true);
                } else if (delta < -6) {
                    setHidden(false);
                }
                lastScrollY.current = currentY;
                frame = 0;
            });
        };
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, [openMenu]);

    /* Theme observer — picks the section closest to the top of the viewport
       and reads its data-theme. Re-evaluates on scroll + on DOM mutations
       (so route changes pick up the new page's sections). */
    useEffect(() => {
        const determineTheme = () => {
            const sections = document.querySelectorAll<HTMLElement>(
                "[data-theme]",
            );
            if (sections.length === 0) {
                setLogoTheme("dark");
                return;
            }
            const headerOffset = 56; // ~mid-height of the header pill
            let nearest: HTMLElement | null = null;
            let nearestDelta = Infinity;
            sections.forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.top <= headerOffset && rect.bottom > headerOffset) {
                    const delta = headerOffset - rect.top;
                    if (delta < nearestDelta) {
                        nearestDelta = delta;
                        nearest = el;
                    }
                }
            });
            if (nearest) {
                const theme = (nearest as HTMLElement).dataset.theme;
                if (theme === "dark" || theme === "light") {
                    setLogoTheme(theme);
                }
            }
        };

        let frame = 0;
        const onScroll = () => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
                determineTheme();
                frame = 0;
            });
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", determineTheme);
        determineTheme();
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", determineTheme);
        };
    }, []);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpenMenu(null);
                setMobileOpen(false);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    // Close the mobile menu whenever the route changes.
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    // Lock background scroll while the mobile menu is open.
    useEffect(() => {
        if (!mobileOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [mobileOpen]);

    const openNow = (menu: NonNullable<MenuKey>) => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setOpenMenu(menu);
    };
    const scheduleClose = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => setOpenMenu(null), 180);
    };
    const cancelClose = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
    };
    const closeAll = () => setOpenMenu(null);

    return (
        <header
            className={`site-header${hidden ? " site-header--hidden" : ""}${openMenu ? " site-header--menu-open" : ""}`}
            aria-label="Primary"
        >
            <div
                className="site-header-inner"
                style={{ position: "relative" }}
            >
                <Link
                    href="/"
                    aria-label="VyuSoft, home"
                    className="site-header-brand"
                    style={{ position: "relative", display: "inline-flex" }}
                >
                    {/* Two logo images stacked; opacity cross-fades between
                        them based on the theme of the section currently
                        overlapping the header. Smooth 280 ms transition. */}
                    <Image
                        src="/vyusoft-logo-white-transparent.png"
                        alt="VyuSoft"
                        width={200}
                        height={40}
                        className="site-header-logo"
                        priority
                        style={{
                            opacity: logoTheme === "dark" ? 1 : 0,
                            transition: "opacity 280ms cubic-bezier(0.32, 0.72, 0, 1)",
                        }}
                    />
                    <Image
                        src="/vyusoft-logo-transparent.png"
                        alt=""
                        aria-hidden="true"
                        width={200}
                        height={40}
                        className="site-header-logo"
                        priority
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            opacity: logoTheme === "light" ? 1 : 0,
                            transition: "opacity 280ms cubic-bezier(0.32, 0.72, 0, 1)",
                        }}
                    />
                </Link>

                <nav
                    className="site-header-links"
                    aria-label="Primary sections"
                >
                    <NavTrigger
                        label="Services"
                        active={openMenu === "services"}
                        onHover={() => openNow("services")}
                        onLeave={scheduleClose}
                    />
                    <NavTrigger
                        label="Products"
                        active={openMenu === "products"}
                        onHover={() => openNow("products")}
                        onLeave={scheduleClose}
                    />
                    <NavTrigger
                        label="Industries"
                        active={openMenu === "industries"}
                        onHover={() => openNow("industries")}
                        onLeave={scheduleClose}
                    />
                    <NavTrigger
                        label="Process"
                        active={openMenu === "process"}
                        onHover={() => openNow("process")}
                        onLeave={scheduleClose}
                    />
                    <Link href="/about" className="site-header-link">
                        About
                    </Link>
                    <Link href="/contact" className="site-header-link">
                        Contact
                    </Link>
                </nav>

                <div className="site-header-actions">
                    <Link href="/contact" className="site-header-cta">
                        Start a Project
                        <span className="site-header-cta-icon">
                            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                        </span>
                    </Link>
                    <button
                        type="button"
                        className="site-header-menu-btn"
                        aria-label="Open menu"
                        aria-expanded={mobileOpen}
                        onClick={() => setMobileOpen(true)}
                    >
                        <Menu className="w-5 h-5" strokeWidth={2} />
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {openMenu && (
                        <motion.div
                            key={openMenu}
                            className="megamenu"
                            style={PANEL_OUTER_STYLE}
                            onMouseEnter={cancelClose}
                            onMouseLeave={scheduleClose}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.24, ease: slowBurn }}
                        >
                            <div
                                className="megamenu-inner"
                                style={PANEL_INNER_STYLE}
                            >
                                {openMenu === "services" && (
                                    <ServicesMenu onLink={closeAll} />
                                )}
                                {openMenu === "products" && (
                                    <ProductsMenu onLink={closeAll} />
                                )}
                                {openMenu === "industries" && (
                                    <IndustriesMenu onLink={closeAll} />
                                )}
                                {openMenu === "process" && (
                                    <ProcessMenu onLink={closeAll} />
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
        </header>
    );
}

/* ── Mobile menu — full-height right-side sheet with accordion sections.
   Shown only below 768px (the desktop nav pill is hidden there). Uses the
   shared sheetSlide variant; backdrop fades in behind it. */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [section, setSection] = useState<string | null>(null);
    const toggle = (key: string) =>
        setSection((s) => (s === key ? null : key));

    return (
        <>
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="mobile-backdrop"
                        className="mobile-nav-backdrop"
                        aria-hidden="true"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: slowBurn }}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {open && (
                    <motion.aside
                        key="mobile-panel"
                        className="mobile-nav-panel"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Menu"
                        variants={sheetSlide}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                    >
                        <div className="mobile-nav-head">
                            <span className="mobile-nav-head-label">MENU</span>
                            <button
                                type="button"
                                className="mobile-nav-close"
                                aria-label="Close menu"
                                onClick={onClose}
                            >
                                <X className="w-4 h-4" strokeWidth={2} />
                            </button>
                        </div>

                        <div className="mobile-nav-scroll">
                            <MobileSection
                                label="Services"
                                open={section === "services"}
                                onToggle={() => toggle("services")}
                            >
                                {servicesByGroup.map((g) => (
                                    <div key={g.title} className="mobile-nav-group">
                                        <p className="mobile-nav-group-label">
                                            {g.title}
                                        </p>
                                        {g.items.map((s) => (
                                            <Link
                                                key={s.slug}
                                                href={`/services/${s.slug}`}
                                                className="mobile-nav-sublink"
                                                onClick={onClose}
                                            >
                                                {s.title}
                                            </Link>
                                        ))}
                                    </div>
                                ))}
                                <Link
                                    href="/services"
                                    className="mobile-nav-all"
                                    onClick={onClose}
                                >
                                    See all services →
                                </Link>
                            </MobileSection>

                            <MobileSection
                                label="Products"
                                open={section === "products"}
                                onToggle={() => toggle("products")}
                            >
                                {allProducts.map((p) => (
                                    <Link
                                        key={p.slug}
                                        href={`/products/${p.slug}`}
                                        className="mobile-nav-sublink"
                                        onClick={onClose}
                                    >
                                        {p.name}
                                    </Link>
                                ))}
                                <Link
                                    href="/products"
                                    className="mobile-nav-all"
                                    onClick={onClose}
                                >
                                    See all products →
                                </Link>
                            </MobileSection>

                            <MobileSection
                                label="Industries"
                                open={section === "industries"}
                                onToggle={() => toggle("industries")}
                            >
                                {industriesNav.map((i) => (
                                    <Link
                                        key={i.slug}
                                        href={`/industries/${i.slug}`}
                                        className="mobile-nav-sublink"
                                        onClick={onClose}
                                    >
                                        {i.title}
                                    </Link>
                                ))}
                                <Link
                                    href="/industries"
                                    className="mobile-nav-all"
                                    onClick={onClose}
                                >
                                    See all industries →
                                </Link>
                            </MobileSection>

                            <MobileSection
                                label="Process"
                                open={section === "process"}
                                onToggle={() => toggle("process")}
                            >
                                {developmentNav.map((p) => (
                                    <Link
                                        key={p.slug}
                                        href={`/development/${p.slug}`}
                                        className="mobile-nav-sublink"
                                        onClick={onClose}
                                    >
                                        {p.title}
                                    </Link>
                                ))}
                                <Link
                                    href="/development"
                                    className="mobile-nav-all"
                                    onClick={onClose}
                                >
                                    See the methodology →
                                </Link>
                            </MobileSection>

                            <Link
                                href="/about"
                                className="mobile-nav-direct"
                                onClick={onClose}
                            >
                                About
                            </Link>
                            <Link
                                href="/contact"
                                className="mobile-nav-direct"
                                onClick={onClose}
                            >
                                Contact
                            </Link>

                            <Link
                                href="/contact"
                                className="mobile-nav-cta"
                                onClick={onClose}
                            >
                                Start a Project
                                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                            </Link>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}

function MobileSection({
    label,
    open,
    onToggle,
    children,
}: {
    label: string;
    open: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}) {
    return (
        <div className="mobile-nav-section">
            <button
                type="button"
                className={`mobile-nav-section-btn${open ? " is-open" : ""}`}
                aria-expanded={open}
                onClick={onToggle}
            >
                <span>{label}</span>
                <ChevronDown className="mobile-nav-chevron" strokeWidth={2} />
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        className="mobile-nav-sub"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: slowBurn }}
                        style={{ overflow: "hidden" }}
                    >
                        <div className="mobile-nav-sub-inner">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function NavTrigger({
    label,
    active,
    onHover,
    onLeave,
}: {
    label: string;
    active: boolean;
    onHover: () => void;
    onLeave: () => void;
}) {
    return (
        <button
            type="button"
            className={`site-header-link site-header-trigger${active ? " is-active" : ""}`}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            onFocus={onHover}
            onBlur={onLeave}
            aria-haspopup="true"
            aria-expanded={active}
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "transparent",
                border: 0,
                padding: 0,
                cursor: "pointer",
                font: "inherit",
            }}
        >
            {label}
            <ChevronDown
                className="w-3 h-3"
                strokeWidth={2}
                style={{
                    opacity: 0.6,
                    transform: active ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 240ms cubic-bezier(0.32, 0.72, 0, 1)",
                }}
            />
        </button>
    );
}

/* ── Services mega-menu — 5 capability groups × 6 services.
   Tightened intro column (240px) so 5 service columns have room. */
function ServicesMenu({ onLink }: { onLink: () => void }) {
    return (
        <div style={MEGAMENU_GRID_LARGE}>
            <MenuIntro
                eyebrow="SERVICES · 30 PRACTICES"
                headline="Five capability groups."
                body="Senior-led delivery across the full stack of enterprise engineering. Each practice carries a documented playbook."
                overviewHref="/services"
                overviewLabel="See all services"
                onLink={onLink}
            />
            <div style={MEGAMENU_COLS_5}>
                {servicesByGroup.map((group) => (
                    <div
                        key={group.title}
                        style={{ display: "flex", flexDirection: "column", gap: 12 }}
                    >
                        <p style={COL_TITLE_STYLE}>{group.title}</p>
                        <ul style={MEGAMENU_LIST}>
                            {group.items.map((s) => (
                                <li key={s.slug}>
                                    <Link
                                        href={`/services/${s.slug}`}
                                        onClick={onLink}
                                        className="megamenu-link"
                                        style={MEGAMENU_LINK_STYLE}
                                    >
                                        {s.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── Products mega-menu — in-house portfolio, 2-column rich list. */
function ProductsMenu({ onLink }: { onLink: () => void }) {
    return (
        <div style={MEGAMENU_GRID_REGULAR}>
            <MenuIntro
                eyebrow="PORTFOLIO · IN-HOUSE"
                headline="We build our own."
                body="Applications in active development under the VyuSoft label, plus a senior-led engagement track for funded founders."
                overviewHref="/products"
                overviewLabel="See all products"
                onLink={onLink}
            />
            <ul style={MEGAMENU_PRODUCTS_GRID}>
                {allProducts.map((p) => (
                    <li key={p.slug}>
                        <Link
                            href={`/products/${p.slug}`}
                            onClick={onLink}
                            className="megamenu-link"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 4,
                                padding: "14px 16px",
                                borderRadius: 14,
                                border: "1px solid oklch(99% 0.005 80 / 0.10)",
                                background: "oklch(99% 0.005 80 / 0.03)",
                                transition: "background 200ms cubic-bezier(0.32, 0.72, 0, 1)",
                            }}
                        >
                            <span
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                }}
                            >
                                <span
                                    style={{
                                        width: 7,
                                        height: 7,
                                        borderRadius: "50%",
                                        background: p.accent,
                                        flex: "0 0 auto",
                                    }}
                                />
                                <span
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "0.9375rem",
                                        fontWeight: 540,
                                        letterSpacing: "-0.01em",
                                        color: "oklch(99% 0.005 80)",
                                    }}
                                >
                                    {p.name}
                                </span>
                            </span>
                            <span
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.625rem",
                                    fontWeight: 500,
                                    letterSpacing: "0.16em",
                                    textTransform: "uppercase",
                                    color: "oklch(99% 0.005 80 / 0.5)",
                                }}
                            >
                                {p.category}
                            </span>
                            <span
                                style={{
                                    fontSize: "0.8125rem",
                                    lineHeight: 1.45,
                                    color: "oklch(99% 0.005 80 / 0.72)",
                                }}
                            >
                                {p.positioning}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* ── Industries mega-menu — 17 verticals, 3 columns wide. */
function IndustriesMenu({ onLink }: { onLink: () => void }) {
    return (
        <div style={MEGAMENU_GRID_REGULAR}>
            <MenuIntro
                eyebrow="VERTICALS · 17 INDUSTRIES"
                headline="Specialised practices."
                body="Tuned to the regulatory weight, data shape, and operational rhythm of each sector we work in."
                overviewHref="/industries"
                overviewLabel="See all industries"
                onLink={onLink}
            />
            <ul style={MEGAMENU_LIST_3COL}>
                {industriesNav.map((i) => (
                    <li key={i.slug}>
                        <Link
                            href={`/industries/${i.slug}`}
                            onClick={onLink}
                            className="megamenu-link"
                            style={MEGAMENU_LINK_STYLE}
                        >
                            {i.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* ── Process mega-menu — 7 numbered phases. */
function ProcessMenu({ onLink }: { onLink: () => void }) {
    return (
        <div style={MEGAMENU_GRID_REGULAR}>
            <MenuIntro
                eyebrow="METHODOLOGY · 7 PHASES"
                headline="From discover to launch."
                body="A transparent, iterative process. Each phase has a deliverable, an owner, and a written artifact."
                overviewHref="/development"
                overviewLabel="See the methodology"
                onLink={onLink}
            />
            <ol
                style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                    borderTop: "1px solid oklch(99% 0.005 80 / 0.10)",
                }}
            >
                {developmentNav.map((p, i) => (
                    <li key={p.slug}>
                        <Link
                            href={`/development/${p.slug}`}
                            onClick={onLink}
                            className="megamenu-link"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "40px 1fr",
                                gap: 16,
                                padding: "14px 0",
                                borderBottom: "1px solid oklch(99% 0.005 80 / 0.10)",
                                alignItems: "baseline",
                                color: "oklch(99% 0.005 80 / 0.84)",
                                transition: "color 200ms cubic-bezier(0.32, 0.72, 0, 1)",
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.6875rem",
                                    fontWeight: 500,
                                    letterSpacing: "0.18em",
                                    color: "oklch(99% 0.005 80 / 0.55)",
                                }}
                            >
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <span
                                style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: 1.3,
                                    letterSpacing: "-0.01em",
                                }}
                            >
                                {p.title}
                            </span>
                        </Link>
                    </li>
                ))}
            </ol>
        </div>
    );
}

function MenuIntro({
    eyebrow,
    headline,
    body,
    overviewHref,
    overviewLabel,
    onLink,
}: {
    eyebrow: string;
    headline: string;
    body: string;
    overviewHref: string;
    overviewLabel: string;
    onLink: () => void;
}) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <p
                style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "oklch(99% 0.005 80 / 0.55)",
                    margin: 0,
                }}
            >
                {eyebrow}
            </p>
            <h3
                style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 540,
                    fontSize: "1.5rem",
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    color: "oklch(99% 0.005 80)",
                    margin: 0,
                    maxWidth: "14ch",
                }}
            >
                {headline}
            </h3>
            <p
                style={{
                    fontSize: "0.9375rem",
                    lineHeight: 1.55,
                    color: "oklch(99% 0.005 80 / 0.72)",
                    margin: 0,
                    maxWidth: "32ch",
                }}
            >
                {body}
            </p>
            <Link
                href={overviewHref}
                onClick={onLink}
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 8,
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "oklch(99% 0.005 80)",
                }}
            >
                {overviewLabel}{" "}
                <ArrowRight
                    className="w-3.5 h-3.5"
                    strokeWidth={1.5}
                    style={{ color: "oklch(99% 0.005 80 / 0.75)" }}
                />
            </Link>
        </div>
    );
}

/* ── Shared layout constants. Tightened intro to 240px so the 5-column
   Services panel fits within the 1280px panel width. */
const MEGAMENU_GRID_LARGE: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "240px 1fr",
    gap: 48,
    alignItems: "start",
};

const MEGAMENU_GRID_REGULAR: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "240px 1fr",
    gap: 48,
    alignItems: "start",
};

const MEGAMENU_COLS_5: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    gap: "28px 28px",
};

const MEGAMENU_LIST: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    margin: 0,
    padding: 0,
    listStyle: "none",
};

const MEGAMENU_PRODUCTS_GRID: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 14,
    margin: 0,
    padding: 0,
    listStyle: "none",
};

const MEGAMENU_LIST_3COL: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "12px 32px",
    margin: 0,
    padding: 0,
    listStyle: "none",
};

const COL_TITLE_STYLE: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "0.625rem",
    fontWeight: 500,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "oklch(99% 0.005 80 / 0.5)",
    margin: "0 0 4px",
    paddingBottom: 10,
    borderBottom: "1px solid oklch(99% 0.005 80 / 0.12)",
};

const MEGAMENU_LINK_STYLE: React.CSSProperties = {
    display: "inline-block",
    fontFamily: "var(--font-sans)",
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.4,
    color: "oklch(99% 0.005 80 / 0.84)",
    letterSpacing: "-0.005em",
    transition: "color 200ms cubic-bezier(0.32, 0.72, 0, 1)",
};
