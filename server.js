const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const distDir = path.join(__dirname, "dist");
const canonicalHost = "yourfamilyfirstinsurance3.com";
const blockedPublicPaths = [
  /^\/(?:AGENTS|AUDIT_REPORT|DEPLOYMENT|DEPLOYMENT_AUTHORIZATION_REQUESTS|README|SECURITY|SEO_AI_FINDABILITY_NOTES)\.md$/i,
  /^\/(?:package|pnpm-lock)\.json$/i,
  /^\/(?:server|playwright\.config)\.(?:js|mjs|ts)$/i,
  /^\/(?:node_modules|test-results|playwright-report|playwright-screenshots|audit-screenshots)(?:\/|$)/i,
  /^\/.*\.zip$/i,
  /^\/\.git(?:\/|$)/i,
  /^\/\.env/i
];

app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self' https://secure.ConsumerRateQuotes.com; img-src 'self' data: https:; media-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self'; connect-src 'self'; upgrade-insecure-requests"
  );
  next();
});

app.use((req, res, next) => {
  const host = req.hostname || "";
  if (host.toLowerCase() === `www.${canonicalHost}`) {
    res.redirect(301, `https://${canonicalHost}${req.originalUrl}`);
    return;
  }
  next();
});

app.use((req, res, next) => {
  const requestPath = decodeURIComponent(req.path || "/");
  if (blockedPublicPaths.some((pattern) => pattern.test(requestPath))) {
    res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
    res.status(404).type("text/plain").send("Not found");
    return;
  }
  next();
});

app.use(express.static(distDir, {
  extensions: ["html"],
  index: "index.html",
  redirect: true
}));

app.get("/healthz", (_req, res) => {
  res.status(200).type("text/plain").send("ok");
});

app.use((req, res) => {
  if (req.accepts("html")) {
    res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
    res.status(404).sendFile(path.join(distDir, "404.html"));
    return;
  }
  res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
  res.status(404).type("text/plain").send("Not found");
});

app.listen(port, () => {
  console.log(`YFFI3 website server listening on port ${port}`);
});
