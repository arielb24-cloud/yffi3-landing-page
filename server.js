const express = require("express");
const compression = require("compression");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const distDir = path.join(__dirname, "dist");
const canonicalHostname = "yourfamilyfirstinsurance3.com";
const productionHostnames = new Set([canonicalHostname, `www.${canonicalHostname}`]);
const discoveryLinks = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</.well-known/openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"',
  '</docs/api.md>; rel="service-doc"; type="text/markdown"',
  '</llms.txt>; rel="describedby"; type="text/plain"'
].join(", ");
const markdownRoutes = new Set([
  "", "auto-insurance", "home-insurance", "commercial-insurance", "life-insurance",
  "renters-insurance", "about-office-3", "get-a-quote", "privacy-policy", "terms",
  "es", "es/seguro-de-auto", "es/seguro-de-vivienda", "es/seguro-de-inquilinos",
  "es/seguro-comercial", "es/seguro-de-vida", "es/sobre-oficina-3",
  "es/solicitar-cotizacion", "es/privacidad", "es/terminos"
]);

function routeSlug(requestPath) {
  return requestPath.replace(/^\/+|\/+$/g, "").replace(/(^|\/)index\.html$/i, "").replace(/\/$/, "");
}

function estimatedTokens(text) {
  return Math.max(1, Math.ceil(text.trim().length / 4));
}

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(compression({ threshold: 1024 }));

app.use((req, res, next) => {
  const hostname = String(req.hostname || "").toLowerCase();
  if (productionHostnames.has(hostname) && (!req.secure || hostname !== canonicalHostname)) {
    res.redirect(308, `https://${canonicalHostname}${req.originalUrl}`);
    return;
  }

  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  res.setHeader("Content-Signal", "search=yes, ai-input=yes, ai-train=no");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self' https://secure.ConsumerRateQuotes.com; img-src 'self' data: https:; media-src 'self'; font-src 'self' data:; script-src 'self'; script-src-attr 'none'; style-src 'self' 'unsafe-inline'; style-src-attr 'unsafe-inline'; connect-src 'self'; upgrade-insecure-requests"
  );
  if (req.secure) {
    res.setHeader("Strict-Transport-Security", "max-age=31536000");
  }
  if (req.path === "/" || req.path === "/index.html") {
    res.setHeader("Link", discoveryLinks);
    res.vary("Accept");
  }
  next();
});

app.use(["/api", "/.well-known"], (_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

app.get("/.well-known/api-catalog", (_req, res) => {
  res.setHeader("Content-Type", 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"');
  res.sendFile(path.join(distDir, ".well-known", "api-catalog"));
});

app.get("/.well-known/openapi.json", (_req, res) => {
  res.type("application/vnd.oai.openapi+json");
  res.sendFile(path.join(distDir, ".well-known", "openapi.json"));
});

app.use("/.well-known/agent-skills", express.static(path.join(distDir, ".well-known", "agent-skills"), {
  dotfiles: "allow",
  maxAge: "5m"
}));

app.use((req, res, next) => {
  if (!/\btext\/markdown\b/i.test(String(req.get("Accept") || ""))) {
    next();
    return;
  }
  const slug = routeSlug(req.path);
  if (!markdownRoutes.has(slug)) {
    next();
    return;
  }
  const markdownPath = slug
    ? path.join(distDir, ".agent-markdown", slug, "index.md")
    : path.join(distDir, ".agent-markdown", "index.md");
  const htmlPath = slug ? path.join(distDir, slug, "index.html") : path.join(distDir, "index.html");
  if (!fs.existsSync(markdownPath)) {
    next();
    return;
  }
  const markdown = fs.readFileSync(markdownPath, "utf8");
  const originalHtml = fs.existsSync(htmlPath) ? fs.readFileSync(htmlPath, "utf8") : "";
  res.setHeader("Content-Type", "text/markdown; charset=utf-8");
  res.setHeader("Vary", "Accept");
  res.setHeader("x-markdown-tokens", String(estimatedTokens(markdown)));
  res.setHeader("x-original-tokens", String(estimatedTokens(originalHtml)));
  res.setHeader("Cache-Control", "public, max-age=300, must-revalidate");
  res.send(markdown);
});

app.use("/assets", express.static(path.join(distDir, "assets"), {
  maxAge: "7d",
  etag: true,
  lastModified: true
}));

app.use(express.static(distDir, {
  extensions: ["html"],
  index: "index.html",
  redirect: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith(".html")) res.setHeader("Cache-Control", "no-cache");
  }
}));

app.get("/healthz", (_req, res) => {
  res.status(200).type("text/plain").send("ok");
});

app.use((req, res) => {
  if (req.accepts("html")) {
    const notFoundPage = req.path === "/es" || req.path.startsWith("/es/")
      ? path.join(distDir, "es", "404.html")
      : path.join(distDir, "404.html");
    res.status(404).sendFile(notFoundPage);
    return;
  }
  res.status(404).type("text/plain").send("Not found");
});

app.listen(port, () => {
  console.log(`YFFI3 website server listening on port ${port}`);
});
