import fs from "node:fs";
import path from "node:path";
import { build } from "esbuild";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const entry = path.join(root, "assets", "site.entry.js");
const outfile = path.join(root, "assets", "site.js");

if (!fs.existsSync(entry)) throw new Error(`Missing generated browser entry: ${entry}`);

await build({
  entryPoints: [entry],
  outfile,
  bundle: true,
  minify: true,
  sourcemap: false,
  legalComments: "eof",
  target: ["es2020"],
  format: "iife",
  platform: "browser",
  logLevel: "info"
});

console.log(`Bundled browser code in ${path.relative(root, outfile)}`);
