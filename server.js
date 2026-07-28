const express = require("express");
const compression = require("compression");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const distDir = path.join(__dirname, "dist");
const canonicalHostname = "yourfamilyfirstinsurance3.com";
const productionHostnames = new Set([canonicalHostname, `www.${canonicalHostname}`]);

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
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self' https://secure.ConsumerRateQuotes.com; img-src 'self' data: https:; media-src 'self'; font-src 'self' data:; script-src 'self'; script-src-attr 'none'; style-src 'self' 'unsafe-inline'; style-src-attr 'unsafe-inline'; connect-src 'self'; upgrade-insecure-requests"
  );
  if (req.secure) {
    res.setHeader("Strict-Transport-Security", "max-age=31536000");
  }
  next();
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
