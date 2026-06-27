import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { ColumnRules } from "@/components/ui/ColumnRules";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { MotionRoot } from "@/components/layout/MotionRoot";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";

// Display: Fraunces — characterful contemporary serif, italic only for h1.
// Variable axis (no fixed weight) so we can drive opsz/SOFT via CSS.
const fraunces = Fraunces({
    subsets: ["latin"],
    style: ["italic"],
    variable: "--font-fraunces",
    display: "swap",
    axes: ["SOFT", "opsz"],
});

// Mono: JetBrains Mono — section markers, telemetry, micro-meta.
const jetbrains = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-jetbrains",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "VyuSoft",
        template: "%s · VyuSoft",
    },
    description:
        "VyuSoft pairs enterprise services with in-house product engineering. AI, cloud, security, data, and full-stack craft for thirty disciplines and seventeen industries.",
    icons: { icon: "/vyusoft-icon.png" },
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            className={`${fraunces.variable} ${GeistSans.variable} ${jetbrains.variable}`}
        >
            <body>
                <MotionRoot>
                    <LenisProvider />
                    <ScrollProgress />
                    <ColumnRules />
                    <GrainOverlay />
                    <SiteHeader />
                    <main id="main">{children}</main>
                </MotionRoot>
            </body>
        </html>
    );
}
