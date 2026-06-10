// Strips the solid background color from a logo PNG, producing a true
// transparent version. Detects the background by sampling the (0,0)
// corner pixel and treating any pixel within `tolerance` of that color
// as background → alpha 0.
//
// Run with: node scripts/strip-logo-bg.mjs

import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, "..", "public");

async function strip(inFile, outFile, tolerance = 28) {
    const { data, info } = await sharp(inFile)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

    const { width, height, channels } = info;
    if (channels !== 4) throw new Error(`Expected RGBA, got ${channels} channels`);

    // Sample corner pixel as bg color reference
    const r0 = data[0];
    const g0 = data[1];
    const b0 = data[2];
    console.log(`  Detected bg color: rgb(${r0}, ${g0}, ${b0})`);

    // Walk every pixel; if within tolerance of bg → alpha 0
    let stripped = 0;
    for (let i = 0; i < data.length; i += 4) {
        const dr = Math.abs(data[i] - r0);
        const dg = Math.abs(data[i + 1] - g0);
        const db = Math.abs(data[i + 2] - b0);
        if (dr <= tolerance && dg <= tolerance && db <= tolerance) {
            data[i + 3] = 0; // make transparent
            stripped++;
        }
    }
    const totalPx = (data.length / 4);
    console.log(`  Stripped ${stripped}/${totalPx} px (${((stripped/totalPx)*100).toFixed(1)}%)`);

    await sharp(data, { raw: { width, height, channels: 4 } })
        .png()
        .toFile(outFile);
    console.log(`  Wrote ${outFile}`);
}

console.log("Stripping vyusoft-logo-white.png:");
await strip(
    join(PUBLIC, "vyusoft-logo-white.png"),
    join(PUBLIC, "vyusoft-logo-white-transparent.png")
);

console.log("\nStripping vyusoft-logo.png:");
await strip(
    join(PUBLIC, "vyusoft-logo.png"),
    join(PUBLIC, "vyusoft-logo-transparent.png")
);

console.log("\nDone.");
