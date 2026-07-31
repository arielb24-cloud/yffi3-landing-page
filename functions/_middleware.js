const canonicalHostname = "yourfamilyfirstinsurance3.com";
const discoveryLinks = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</.well-known/openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"',
  '</.well-known/mcp/server-card.json>; rel="service-desc"; type="application/mcp-server-card+json"',
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

function routeSlug(pathname) {
  return pathname.replace(/^\/+|\/+$/g, "").replace(/(^|\/)index\.html$/i, "").replace(/\/$/, "");
}

function wantsMarkdown(request) {
  return String(request.headers.get("Accept") || "")
    .split(",")
    .some((part) => /^\s*text\/markdown\b/i.test(part) && !/;\s*q=0(?:\.0*)?\b/i.test(part));
}

function estimatedTokens(text) {
  return Math.max(1, Math.ceil(text.trim().length / 4));
}

function applyHeaders(headers, url) {
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  headers.set("Strict-Transport-Security", "max-age=31536000");
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("Cross-Origin-Resource-Policy", "same-origin");
  headers.set("Origin-Agent-Cluster", "?1");
  headers.set("X-Permitted-Cross-Domain-Policies", "none");
  headers.set("Content-Signal", "search=yes, ai-input=yes, ai-train=no");
  headers.set(
    "Content-Security-Policy",
    "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self' https://secure.ConsumerRateQuotes.com; img-src 'self' data: https:; media-src 'self'; font-src 'self' data: https://fonts.gstatic.com; script-src 'self' 'sha256-DaMsrnme1cB26ZbUI+06/lNY3R+EpKtlVPrw4gsa8A0=' https://www.googletagmanager.com https://tagmanager.google.com; script-src-attr 'none'; style-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://tagmanager.google.com https://fonts.googleapis.com; style-src-attr 'unsafe-inline'; frame-src https://www.googletagmanager.com https://tagmanager.google.com; connect-src 'self' https://google.com https://www.google.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com; upgrade-insecure-requests"
  );
  if (url.pathname === "/" || url.pathname === "/index.html") {
    headers.set("Link", discoveryLinks);
    headers.set("Vary", "Accept");
  }
  if (url.hostname.endsWith(".pages.dev")) headers.set("X-Robots-Tag", "noindex, nofollow");
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  if ((url.hostname === `www.${canonicalHostname}` || url.protocol !== "https:") && !url.hostname.endsWith(".pages.dev")) {
    url.protocol = "https:";
    url.hostname = canonicalHostname;
    return Response.redirect(url.toString(), 308);
  }

  const response = await context.next();
  const headers = new Headers(response.headers);
  applyHeaders(headers, url);

  const slug = routeSlug(url.pathname);
  if (!wantsMarkdown(context.request) || !response.ok || !markdownRoutes.has(slug) || !context.env?.ASSETS) {
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }

  const markdownPath = slug ? `/.agent-markdown/${slug}/index.md` : "/.agent-markdown/index.md";
  const markdownUrl = new URL(markdownPath, url.origin);
  const markdownResponse = await context.env.ASSETS.fetch(new Request(markdownUrl, { headers: { Accept: "text/markdown" } }));
  if (!markdownResponse.ok) return new Response(response.body, { status: response.status, statusText: response.statusText, headers });

  const [markdown, originalHtml] = await Promise.all([markdownResponse.text(), response.clone().text()]);
  headers.set("Content-Type", "text/markdown; charset=utf-8");
  headers.set("Vary", "Accept");
  headers.set("Cache-Control", "public, max-age=300, must-revalidate");
  headers.set("x-markdown-tokens", String(estimatedTokens(markdown)));
  headers.set("x-original-tokens", String(estimatedTokens(originalHtml)));
  for (const bodyHeader of ["Content-Encoding", "Content-Length", "Content-Range", "ETag", "Last-Modified", "Transfer-Encoding"]) {
    headers.delete(bodyHeader);
  }
  return new Response(context.request.method === "HEAD" ? null : markdown, { status: 200, headers });
}
