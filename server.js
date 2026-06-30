const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const distDir = path.join(__dirname, "dist");

app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self' https://secure.ConsumerRateQuotes.com; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self'; connect-src 'self'; upgrade-insecure-requests"
  );
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
    res.status(404).sendFile(path.join(distDir, "index.html"));
    return;
  }
  res.status(404).type("text/plain").send("Not found");
});

app.listen(port, () => {
  console.log(`YFFI3 website server listening on port ${port}`);
});
