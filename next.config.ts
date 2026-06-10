import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
    // Pin the workspace root so Next.js ignores the stray package-lock.json
    // that lives at C:\Users\karth\ from an earlier mis-targeted npm install.
    turbopack: {
        root: path.resolve(__dirname),
    },
};

export default nextConfig;
