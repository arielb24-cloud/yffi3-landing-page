import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const args = process.argv.slice(2);

function valueFor(flag) {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}

const inputArg = valueFor("--input");
const id = valueFor("--id");
const posterTime = valueFor("--poster-time") || "00:00:01";
const dryRun = args.includes("--dry-run");

if (!inputArg || !id || !/^[a-z0-9-]+$/.test(id)) {
  console.error("Usage: node scripts/transcode-media.mjs --input /absolute/source.mov --id service-scene [--poster-time 00:00:01] [--dry-run]");
  process.exit(2);
}

const input = path.resolve(inputArg);
if (!fs.existsSync(input) || !fs.statSync(input).isFile()) throw new Error(`Input video not found: ${input}`);

const outputDir = path.join(root, "public", "assets", "yffi3", "media");
const webm = path.join(outputDir, `${id}.webm`);
const mp4 = path.join(outputDir, `${id}.mp4`);
const poster = path.join(outputDir, `${id}-poster.webp`);

const jobs = [
  ["ffmpeg", ["-y", "-i", input, "-an", "-vf", "scale='min(1280,iw)':-2:flags=lanczos,fps=24", "-c:v", "libvpx-vp9", "-crf", "38", "-b:v", "0", "-row-mt", "1", "-deadline", "good", "-cpu-used", "2", webm]],
  ["ffmpeg", ["-y", "-i", input, "-an", "-vf", "scale='min(1280,iw)':-2:flags=lanczos,fps=24", "-c:v", "libx264", "-profile:v", "high", "-crf", "27", "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4]],
  ["ffmpeg", ["-y", "-ss", posterTime, "-i", input, "-frames:v", "1", "-vf", "scale='min(1280,iw)':-2:flags=lanczos", "-c:v", "libwebp", "-quality", "78", poster]]
];

console.log(`Input: ${input}`);
console.log(`Output directory: ${outputDir}`);
for (const [command, commandArgs] of jobs) console.log(`${dryRun ? "Would run" : "Running"}: ${command} ${commandArgs.join(" ")}`);
if (dryRun) process.exit(0);

fs.mkdirSync(outputDir, { recursive: true });
for (const [command, commandArgs] of jobs) {
  const result = spawnSync(command, commandArgs, { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

console.log("Transcode complete. Add the generated paths and asset-specific commercial license proof to content/media-manifest.json.");
