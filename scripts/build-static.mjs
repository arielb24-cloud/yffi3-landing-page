import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { transformSync } from "esbuild";

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

run(process.execPath, ["scripts/validate-content.mjs"]);
run(process.execPath, ["scripts/generate-site.mjs"]);

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

const entries = [
  "index.html",
  "404.html",
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
  "policyholder-help",
  "customer-resources",
  "es",
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
// Keep editable source readable while shipping smaller, correctly versioned CSS.
const deploymentStyles = transformSync(fs.readFileSync(path.join(dist, "assets", "styles.css"), "utf8"), { loader: "css", minify: true }).code;
fs.writeFileSync(path.join(dist, "assets", "styles.css"), deploymentStyles);
const deploymentVersion = createHash("sha256").update(deploymentStyles).update(fs.readFileSync(path.join(dist, "assets", "site.js"))).digest("hex").slice(0, 12);
function versionDeploymentPages(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) versionDeploymentPages(file);
    else if (entry.name.endsWith(".html")) {
      const html = fs.readFileSync(file, "utf8").replace(/(\/assets\/(?:styles\.css|site\.js)\?v=)[^"\s]+/g, `$1${deploymentVersion}`);
      fs.writeFileSync(file, html);
    }
  }
}
versionDeploymentPages(dist);
fs.rmSync(path.join(dist, "assets", "site.entry.js"), { force: true });
fs.rmSync(path.join(dist, "assets", "styles 2.css"), { force: true });
fs.rmSync(path.join(dist, "assets", "site 2.js"), { force: true });
fs.rmSync(path.join(dist, "assets", "yffi3", "README.md"), { force: true });
fs.rmSync(path.join(dist, ".agent-markdown", "index 2.md"), { force: true });
fs.rmSync(path.join(dist, ".well-known", "api-catalog 2"), { force: true });
fs.rmSync(path.join(dist, ".well-known", "openapi 2.json"), { force: true });

run(process.execPath, ["scripts/validate-site.mjs", "--dist"]);
run(process.execPath, ["scripts/validate-bilingual.mjs", "--dist"]);
run(process.execPath, ["scripts/validate-agent-discovery.mjs", "--dist"]);

console.log(`Built static export in ${dist}`);
