import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dist = path.join(root, "dist");

function run(command, args) {
  const result = spawnSync(command, args, { cwd: root, stdio: "inherit" });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function copyIfExists(from, to) {
  if (!fs.existsSync(from)) return;
  fs.cpSync(from, to, { recursive: true });
}

run(process.execPath, ["scripts/generate-site.mjs"]);

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

const entries = [
  "index.html",
  "favicon.ico",
  "auto-insurance",
  "home-insurance",
  "commercial-insurance",
  "life-insurance",
  "renters-insurance",
  "about-office-3",
  "get-a-quote",
  "privacy-policy",
  "terms",
  "assets",
  ".htaccess",
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "humans.txt"
];

for (const entry of entries) {
  copyIfExists(path.join(root, entry), path.join(dist, entry));
}

copyIfExists(path.join(root, "public"), path.join(dist));
fs.mkdirSync(path.join(dist, "assets"), { recursive: true });
fs.copyFileSync(path.join(root, "assets", "styles.css"), path.join(dist, "assets", "styles.css"));
fs.copyFileSync(path.join(root, "assets", "site.js"), path.join(dist, "assets", "site.js"));
fs.rmSync(path.join(dist, "assets", "styles 2.css"), { force: true });
fs.rmSync(path.join(dist, "assets", "site 2.js"), { force: true });
fs.rmSync(path.join(dist, "assets", "yffi3", "README.md"), { force: true });

run(process.execPath, ["scripts/validate-site.mjs", "--dist"]);

console.log(`Built static export in ${dist}`);
