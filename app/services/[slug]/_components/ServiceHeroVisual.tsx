"use client";

import { motion } from "framer-motion";
import { easeSlowBurn as slowBurn } from "@/lib/motion";

/* A small abstract node-graph — accent "spine" of active nodes through a
   field of connected points. Schematic, on-brand, and content-agnostic so
   it works on any service hero (just recoloured by the accent). */
const NODES: [number, number][] = [
    [90, 120], [200, 80], [320, 130],
    [130, 230], [250, 210], [370, 250],
    [90, 340], [210, 330], [330, 360],
];
const EDGES: [number, number][] = [
    [0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5],
    [3, 6], [4, 7], [5, 8], [6, 7], [7, 8], [4, 8], [0, 4],
];
const ACTIVE = new Set([1, 4, 7]);

export function ServiceHeroVisual({ accent, label }: { accent: string; label: string }) {
    return (
        <motion.div
            className="svcd-hero-visual"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: slowBurn, delay: 0.25 }}
            style={{ ["--accent" as string]: accent }}
        >
            <svg viewBox="0 0 460 440" className="svcd-hero-svg" aria-hidden="true">
                <rect
                    x="0.5"
                    y="0.5"
                    width="459"
                    height="439"
                    rx="14"
                    fill="none"
                    stroke="rgba(255,255,255,0.12)"
                    strokeDasharray="3 3"
                />
                <text
                    x="18"
                    y="28"
                    fontFamily="var(--font-mono)"
                    fontSize="10"
                    letterSpacing="0.16em"
                    fill="rgba(255,255,255,0.5)"
                >
                    {label.toUpperCase()}
                </text>
                <text
                    x="442"
                    y="28"
                    textAnchor="end"
                    fontFamily="var(--font-mono)"
                    fontSize="10"
                    letterSpacing="0.16em"
                    fill="rgba(255,255,255,0.4)"
                >
                    SYSTEM MAP
                </text>

                {EDGES.map(([a, b], i) => {
                    const A = NODES[a];
                    const B = NODES[b];
                    const accentEdge = ACTIVE.has(a) && ACTIVE.has(b);
                    return (
                        <motion.line
                            key={`e${i}`}
                            x1={A[0]}
                            y1={A[1]}
                            x2={B[0]}
                            y2={B[1]}
                            stroke={accentEdge ? "var(--accent)" : "rgba(255,255,255,0.18)"}
                            strokeWidth={accentEdge ? 1.4 : 1}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.7, ease: slowBurn, delay: 0.4 + i * 0.04 }}
                        />
                    );
                })}

                {NODES.map(([x, y], i) => {
                    const active = ACTIVE.has(i);
                    return (
                        <motion.circle
                            key={`n${i}`}
                            cx={x}
                            cy={y}
                            r={active ? 7 : 5}
                            fill={active ? "var(--accent)" : "#0a0f1a"}
                            stroke={active ? "var(--accent)" : "rgba(255,255,255,0.35)"}
                            strokeWidth="1.5"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4, ease: slowBurn, delay: 0.5 + i * 0.05 }}
                            style={{ transformOrigin: `${x}px ${y}px` }}
                        />
                    );
                })}
            </svg>
        </motion.div>
    );
}
