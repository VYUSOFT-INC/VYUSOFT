"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Search,
    Bell,
    Sparkles,
    ArrowUpRight,
    SendHorizontal,
    Cpu,
    Code2,
    Building2,
    TrendingUp,
    Wrench,
    User,
    Settings,
    HelpCircle,
} from "lucide-react";
import { servicesByGroup } from "@/lib/nav";
import { allServices, getServiceBySlug, type Service } from "@/lib/services";
import { stackForService } from "@/lib/serviceMeta";

/**
 * ServicesDashboard — interactive "OUR SERVICES" console. Showcases ONLY
 * VyuSoft's service practices (no pipeline / engagements / revenue).
 *
 * Fixed-shape card:
 *   • Sidebar = the five capability groups (the group selector).
 *   • Middle  = a capability-groups donut + active-group blurb, then a
 *     scrollable list of practices. Each practice is a LINK — clicking it
 *     navigates to its /services/[slug] page (route fades via app/template).
 *   • Rail    = "at a glance" facts + intake CTA.
 *
 * Self-playing: when idle, an ambient loop cycles the groups every ~3.8s;
 * any interaction pauses it; after ~9s idle it resumes. Disabled under
 * prefers-reduced-motion.
 */

const GROUPS = servicesByGroup;

const GROUP_ACCENT: Record<string, string> = {
    Technology: "#635BFF",
    Engineering: "#06B6D4",
    Enterprise: "#C9962E",
    Growth: "#FB7185",
    Operations: "#22C55E",
};

const GROUP_ICON: Record<string, React.ReactNode> = {
    Technology: <Cpu />,
    Engineering: <Code2 />,
    Enterprise: <Building2 />,
    Growth: <TrendingUp />,
    Operations: <Wrench />,
};

const GROUP_DESC: Record<string, string> = {
    Technology:
        "AI, cyber security, cloud, data, and the network platforms beneath them.",
    Engineering:
        "Web, mobile, cross-platform, blockchain, and embedded product engineering.",
    Enterprise:
        "ERP, workflow, and integration systems built for large-organisation change.",
    Growth:
        "Strategy, go-to-market, and the operational work that turns interest into revenue.",
    Operations:
        "Backup, payments, QA, and the systems that keep delivery sustainable.",
};

const SIDEBAR_HINTS: Record<string, string> = {
    Profile: "Coming soon",
    Settings: "Coming soon",
    Support: "Coming soon",
};

/* ── Donut geometry — 5 equal segments (one per capability group). ─────── */
function arcPoint(cx: number, cy: number, r: number, deg: number): [number, number] {
    const a = ((deg - 90) * Math.PI) / 180;
    return [
        Number((cx + r * Math.cos(a)).toFixed(2)),
        Number((cy + r * Math.sin(a)).toFixed(2)),
    ];
}
function donutSegment(startDeg: number, endDeg: number): string {
    const cx = 50,
        cy = 50,
        R = 46,
        r = 28;
    const [x1, y1] = arcPoint(cx, cy, R, startDeg);
    const [x2, y2] = arcPoint(cx, cy, R, endDeg);
    const [x3, y3] = arcPoint(cx, cy, r, endDeg);
    const [x4, y4] = arcPoint(cx, cy, r, startDeg);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${r} ${r} 0 ${large} 0 ${x4} ${y4} Z`;
}
const SEG_GAP = 2.5;
const SEGMENTS = GROUPS.map((_, i) => {
    const step = 360 / GROUPS.length;
    return donutSegment(i * step + SEG_GAP / 2, (i + 1) * step - SEG_GAP / 2);
});

/* ── Ambient demo — cycle through the capability groups while idle. */
const SCENES = GROUPS.map((_, i) => i);

const SLOW = "cubic-bezier(0.32, 0.72, 0, 1)";

export function ServicesDashboard() {
    const [activeGroup, setActiveGroup] = useState(0);
    const [hoveredGroup, setHoveredGroup] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const [autoplay, setAutoplay] = useState(true);
    const [reduced, setReduced] = useState(false);
    const [chat, setChat] = useState("");
    const sceneRef = useRef(0);
    const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (typeof window === "undefined") return;
        setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }, []);

    /* Chat composer → carry the query to the contact page (prefills the brief). */
    const sendChat = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            const q = chat.trim();
            try {
                if (q) sessionStorage.setItem("vyu:contact-prefill", q);
            } catch {
                /* storage may be unavailable; navigate anyway */
            }
            router.push("/contact");
        },
        [chat, router],
    );

    const selectGroup = useCallback((i: number) => {
        setSearchQuery("");
        setActiveGroup(i);
    }, []);

    useEffect(() => {
        if (!autoplay || reduced) return;
        const id = setInterval(() => {
            sceneRef.current = (sceneRef.current + 1) % SCENES.length;
            setSearchQuery("");
            setActiveGroup(SCENES[sceneRef.current]);
        }, 3800);
        return () => clearInterval(id);
    }, [autoplay, reduced]);

    const pauseAutoplay = useCallback(() => {
        if (reduced) return;
        setAutoplay(false);
        if (resumeTimer.current) clearTimeout(resumeTimer.current);
        resumeTimer.current = setTimeout(() => setAutoplay(true), 9000);
    }, [reduced]);

    useEffect(
        () => () => {
            if (resumeTimer.current) clearTimeout(resumeTimer.current);
        },
        [],
    );

    const group = GROUPS[activeGroup];
    const searching = searchQuery.trim().length > 0;

    const visible = useMemo<Service[]>(() => {
        if (searching) {
            const q = searchQuery.trim().toLowerCase();
            return allServices.filter((s) => {
                const hay = [s.title, s.slug, s.group, ...s.features.map((f) => f.title)]
                    .join(" ")
                    .toLowerCase();
                return hay.includes(q);
            });
        }
        return group.items
            .map((it) => getServiceBySlug(it.slug))
            .filter((s): s is Service => Boolean(s));
    }, [searching, searchQuery, group]);

    const live = autoplay && !reduced;
    const focusGroup = searching ? hoveredGroup : hoveredGroup ?? activeGroup;
    const centerNum = searching ? visible.length : group.items.length;
    const centerLabel = searching ? "MATCHES" : group.title.toUpperCase();

    return (
        <div className="sd" onPointerDownCapture={pauseAutoplay} onKeyDownCapture={pauseAutoplay}>
            {/* SIDEBAR — five capability groups (the selector) */}
            <aside className="sd-side">
                <div className="sd-side-logo">
                    <span className="sd-side-logo-mark" />
                </div>

                <nav className="sd-side-nav">
                    {GROUPS.map((g, i) => (
                        <SideItem
                            key={g.title}
                            icon={GROUP_ICON[g.title]}
                            label={g.title}
                            active={!searching && i === activeGroup}
                            onSelect={() => selectGroup(i)}
                        />
                    ))}
                </nav>

                <div className="sd-side-spacer" />

                <nav className="sd-side-nav sd-side-nav--secondary">
                    <SideItem icon={<User />} label="Profile" muted />
                    <SideItem icon={<Settings />} label="Settings" muted />
                    <SideItem icon={<HelpCircle />} label="Support" muted />
                </nav>

                <Link href="/services" className="sd-side-promo">
                    <Sparkles className="sd-side-promo-icon" />
                    <div>
                        <p className="sd-side-promo-title">Browse all services</p>
                        <p className="sd-side-promo-sub">The full catalogue</p>
                    </div>
                </Link>
            </aside>

            {/* MAIN */}
            <main className="sd-main">
                <div className="sd-top">
                    <div>
                        <p className="sd-top-breadcrumb">VyuSoft / Services</p>
                        <h3 className="sd-top-title">Service Practices</h3>
                    </div>
                    <div className="sd-top-actions">
                        <span
                            className={"sd-live-flag" + (live ? " is-live" : "")}
                            title={
                                reduced
                                    ? "Auto-demo disabled (reduced motion)"
                                    : live
                                      ? "Auto-cycling · interact to take over"
                                      : "Paused · you're in control"
                            }
                        >
                            <span className="sd-live-dot" aria-hidden="true" />
                            {reduced ? "STATIC" : live ? "LIVE" : "PAUSED"}
                        </span>
                        <Bell className="sd-top-bell" strokeWidth={1.6} />
                        <div className="sd-top-search sd-top-search--input">
                            <Search className="sd-top-search-icon" strokeWidth={1.6} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search practices"
                                className="sd-top-search-field"
                                aria-label="Search service practices"
                            />
                        </div>
                    </div>
                </div>

                {/* Capability-groups donut + active-group blurb */}
                <div className="sd-groupchart">
                    <svg
                        className="sd-donut"
                        viewBox="0 0 100 100"
                        role="img"
                        aria-label="Practices by capability group"
                    >
                        {GROUPS.map((g, i) => {
                            const focused = focusGroup === i;
                            const dim = focusGroup != null && !focused;
                            return (
                                <path
                                    key={g.title}
                                    d={SEGMENTS[i]}
                                    fill={GROUP_ACCENT[g.title]}
                                    opacity={dim ? 0.32 : 1}
                                    onMouseEnter={() => setHoveredGroup(i)}
                                    onMouseLeave={() => setHoveredGroup(null)}
                                    onClick={() => selectGroup(i)}
                                    style={{
                                        cursor: "pointer",
                                        transformOrigin: "50px 50px",
                                        transform: focused ? "scale(1.05)" : "scale(1)",
                                        transition: `opacity 220ms ${SLOW}, transform 220ms ${SLOW}`,
                                    }}
                                />
                            );
                        })}
                        <text x="50" y="48" textAnchor="middle" className="sd-donut-num">
                            {centerNum}
                        </text>
                        <text x="50" y="60" textAnchor="middle" className="sd-donut-label">
                            {centerLabel}
                        </text>
                    </svg>

                    <div className="sd-gc-info" key={searching ? "search" : group.title}>
                        <p className="sd-gc-active">
                            {searching ? "Search results" : group.title}
                        </p>
                        <p className="sd-gc-desc">
                            {searching
                                ? `${visible.length} ${visible.length === 1 ? "practice" : "practices"} match “${searchQuery.trim()}”`
                                : GROUP_DESC[group.title]}
                        </p>
                    </div>
                </div>

                {/* Practices list — each row links straight to its service page */}
                <section className="sd-table sd-table--svc" aria-label="Service practices">
                    <div className="sd-table-header-row">
                        <h4 className="sd-table-title">
                            {searching ? "Matching practices" : group.title}
                        </h4>
                        {searching && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                className="sd-table-clear"
                            >
                                Clear search
                            </button>
                        )}
                    </div>
                    <div className="sd-table-head" aria-hidden="true">
                        <span>Practice</span>
                        <span>Caps</span>
                        <span>Stack</span>
                        <span />
                    </div>

                    <div className="sd-table-scroll" key={searching ? "s" : group.title}>
                        {visible.length === 0 ? (
                            <p className="sd-row-empty">
                                No practices match &ldquo;{searchQuery}&rdquo;.
                            </p>
                        ) : (
                            visible.map((s) => (
                                <PracticeRow key={s.slug} service={s} searching={searching} />
                            ))
                        )}
                    </div>
                </section>
            </main>

            {/* RIGHT RAIL — service-relevant facts only */}
            <aside className="sd-rail">
                <div className="sd-rail-block">
                    <div className="sd-rail-head">
                        <h4 className="sd-rail-title">At a glance</h4>
                    </div>
                    <div className="sd-input">
                        <div className="sd-input-value">30</div>
                        <div className="sd-input-meta">Practices across 5 capability groups</div>
                    </div>
                    <div className="sd-input">
                        <div className="sd-input-value">17</div>
                        <div className="sd-input-meta">Industries served end to end</div>
                    </div>
                    <div className="sd-input">
                        <div className="sd-input-value">6</div>
                        <div className="sd-input-meta">Named capabilities per practice</div>
                    </div>

                    <p className="sd-chat-label">Ask a quick question</p>
                    <form className="sd-chat" onSubmit={sendChat}>
                        <input
                            type="text"
                            className="sd-chat-input"
                            value={chat}
                            onChange={(e) => setChat(e.target.value)}
                            placeholder="Type your query…"
                            aria-label="Type your query"
                        />
                        <button
                            type="submit"
                            className="sd-chat-send"
                            aria-label="Send your query"
                            disabled={chat.trim().length === 0}
                        >
                            <SendHorizontal strokeWidth={1.75} />
                        </button>
                    </form>
                </div>
            </aside>

            {/* BOTTOM faded tab strip */}
            <div className="sd-bottom-tabs" aria-hidden="true">
                <span>Practices</span>
                <span>Capabilities</span>
                <span>Stack</span>
            </div>
        </div>
    );
}

/* ── Practice row — a link to the full /services/[slug] page ──────────── */

function PracticeRow({ service, searching }: { service: Service; searching: boolean }) {
    const stack = stackForService(service.slug, service.group);
    return (
        <Link
            href={`/services/${service.slug}`}
            className="sd-row sd-row--interactive sd-row--link"
            style={{ ["--row-accent" as string]: service.accent }}
            aria-label={`${service.title} — open the practice`}
        >
            <span className="sd-row-name">
                <span className="sd-row-dot" style={{ background: service.accent }} />
                <span className="sd-row-name-text">{service.title}</span>
                {searching && <span className="sd-row-group-chip">{service.group}</span>}
            </span>
            <span className="sd-row-num">{service.features.length}</span>
            <span className="sd-row-num sd-row-num--mute">{stack.length}</span>
            <span className="sd-row-go" aria-hidden="true">
                <ArrowUpRight strokeWidth={1.75} />
            </span>
        </Link>
    );
}

function SideItem({
    icon,
    label,
    active,
    muted,
    onSelect,
}: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    muted?: boolean;
    onSelect?: () => void;
}) {
    const className =
        "sd-side-item sd-side-item--interactive" +
        (active ? " sd-side-item--active" : "") +
        (muted ? " sd-side-item--muted" : "") +
        (onSelect ? " sd-side-item--button" : "");
    const inner = (
        <>
            <span className="sd-side-icon">{icon}</span>
            <span className="sd-side-label">{label}</span>
        </>
    );
    if (onSelect) {
        return (
            <button
                type="button"
                className={className}
                onClick={onSelect}
                aria-pressed={active}
                title={SIDEBAR_HINTS[label] ?? label}
            >
                {inner}
            </button>
        );
    }
    return (
        <div className={className} title={SIDEBAR_HINTS[label] ?? label}>
            {inner}
        </div>
    );
}
