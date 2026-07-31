import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import TurndownService from "turndown";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const publicDir = path.join(root, "public");
const wellKnownDir = path.join(publicDir, ".well-known");
const markdownDir = path.join(publicDir, ".agent-markdown");
const siteFacts = JSON.parse(fs.readFileSync(path.join(root, "content", "site-facts.json"), "utf8"));
const siteUrl = siteFacts.siteUrl;

const routes = [
  "",
  "auto-insurance",
  "home-insurance",
  "commercial-insurance",
  "life-insurance",
  "renters-insurance",
  "about-office-3",
  "get-a-quote",
  "privacy-policy",
  "terms",
  "es",
  "es/seguro-de-auto",
  "es/seguro-de-vivienda",
  "es/seguro-de-inquilinos",
  "es/seguro-comercial",
  "es/seguro-de-vida",
  "es/sobre-oficina-3",
  "es/solicitar-cotizacion",
  "es/privacidad",
  "es/terminos"
];

function write(relativePath, content) {
  const filePath = path.join(publicDir, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function escapeYaml(value) {
  return JSON.stringify(String(value).replace(/\s+/g, " ").trim());
}

function metaContent(html, selector) {
  const match = html.match(selector);
  return match ? match[1].replace(/&amp;/g, "&").replace(/&quot;/g, '"').trim() : "";
}

function markdownForHtml(html, canonicalUrl) {
  const title = metaContent(html, /<title>([^<]+)<\/title>/i);
  const description = metaContent(html, /<meta name="description" content="([^"]+)">/i);
  const language = metaContent(html, /<html lang="([^"]+)"/i) || "en-US";
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || html;
  const turndown = new TurndownService({
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
    headingStyle: "atx"
  });
  turndown.remove(["script", "style", "noscript", "svg", "video", "source", "form", "button"]);
  const body = turndown.turndown(main)
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return `---\ntitle: ${escapeYaml(title)}\ndescription: ${escapeYaml(description)}\nlanguage: ${escapeYaml(language)}\ncanonical: ${escapeYaml(canonicalUrl)}\n---\n\n${body}\n`;
}

fs.rmSync(wellKnownDir, { recursive: true, force: true });
fs.rmSync(markdownDir, { recursive: true, force: true });

for (const route of routes) {
  const sourcePath = route ? path.join(root, route, "index.html") : path.join(root, "index.html");
  if (!fs.existsSync(sourcePath)) throw new Error(`Cannot generate agent Markdown; missing ${sourcePath}`);
  const canonical = route ? `${siteUrl}/${route}/` : `${siteUrl}/`;
  const target = route ? path.join(".agent-markdown", route, "index.md") : path.join(".agent-markdown", "index.md");
  write(target, markdownForHtml(fs.readFileSync(sourcePath, "utf8"), canonical));
}

const skillSource = path.join(root, "agent-discovery", "find-yffi3-insurance-services", "SKILL.md");
const skillText = fs.readFileSync(skillSource, "utf8");
const skillDigest = crypto.createHash("sha256").update(skillText).digest("hex");
write(path.join(".well-known", "agent-skills", "find-yffi3-insurance-services", "SKILL.md"), skillText);
write(path.join(".well-known", "agent-skills", "index.json"), `${JSON.stringify({
  $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
  skills: [{
    name: "find-yffi3-insurance-services",
    type: "skill-md",
    description: "Find verified public Miami insurance-service, bilingual contact, and safe quote-handoff information for Your Family First Insurance Office #3.",
    url: `${siteUrl}/.well-known/agent-skills/find-yffi3-insurance-services/SKILL.md`,
    digest: `sha256:${skillDigest}`
  }]
}, null, 2)}\n`);

const publicSiteMetadata = {
  schema_version: "1.0",
  name: siteFacts.businessName,
  url: siteUrl,
  description: "Public contact, service, language, and safe quote-handoff information for Your Family First Insurance Office #3 in Miami.",
  languages: ["en-US", "es-US"],
  contact: {
    phone: siteFacts.phone.display,
    telephone_uri: siteFacts.phone.tel,
    address: siteFacts.address
  },
  service_areas: siteFacts.serviceAreas,
  insurance_types: siteFacts.insuranceTypes,
  pages: {
    home: `${siteUrl}/`,
    auto: `${siteUrl}/auto-insurance/`,
    homeowners: `${siteUrl}/home-insurance/`,
    renters: `${siteUrl}/renters-insurance/`,
    commercial: `${siteUrl}/commercial-insurance/`,
    life: `${siteUrl}/life-insurance/`,
    about: `${siteUrl}/about-office-3/`,
    quote_help: `${siteUrl}/get-a-quote/`,
    spanish_home: `${siteUrl}/es/`
  },
  quote_handoff: {
    type: "external-human-facing-form",
    url: siteFacts.quoteDestination,
    requires_user_confirmation: true,
    sensitive_data_warning: "Do not send SSNs, dates of birth, driver license numbers, VINs, payment data, medical records, claim files, passwords, or carrier credentials through a general website interaction."
  },
  disclaimer: siteFacts.contentBoundaries.disclaimer
};
write(path.join("api", "site.json"), `${JSON.stringify(publicSiteMetadata, null, 2)}\n`);
write(path.join("api", "status.json"), `${JSON.stringify({
  service: "YFFI3 public site metadata API",
  status: "available",
  version: "1.0.0",
  documentation: `${siteUrl}/docs/api.md`
}, null, 2)}\n`);
write("healthz", "ok\n");

const openApi = {
  openapi: "3.1.0",
  info: {
    title: "YFFI3 Public Site Metadata API",
    version: "1.0.0",
    description: "Read-only public business metadata. This API does not accept quote submissions, credentials, or sensitive underwriting data."
  },
  servers: [{ url: siteUrl }],
  paths: {
    "/api/site.json": {
      get: {
        operationId: "getPublicSiteMetadata",
        summary: "Get verified public office and insurance-service metadata",
        responses: { "200": { description: "Public site metadata", content: { "application/json": { schema: { type: "object" } } } } }
      }
    },
    "/api/status.json": {
      get: {
        operationId: "getPublicMetadataStatus",
        summary: "Get the availability document for the public metadata API",
        responses: { "200": { description: "Availability document", content: { "application/json": { schema: { type: "object" } } } } }
      }
    },
    "/healthz": {
      get: {
        operationId: "getSiteHealth",
        summary: "Confirm that the public site origin is responding",
        responses: { "200": { description: "Plain-text ok response", content: { "text/plain": { schema: { type: "string", const: "ok" } } } } }
      }
    }
  }
};
write(path.join(".well-known", "openapi.json"), `${JSON.stringify(openApi, null, 2)}\n`);

const mcpServerCard = {
  $schema: "https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json",
  name: "com.yourfamilyfirstinsurance3/public-metadata",
  title: "YFFI3 Public Metadata",
  description: "Read-only public Office #3 service, contact, and safe quote-handoff metadata.",
  version: "1.0.0",
  websiteUrl: `${siteUrl}/`,
  serverInfo: {
    name: "yffi3-public-metadata",
    title: "YFFI3 Public Metadata",
    version: "1.0.0"
  },
  protocolVersion: "2025-06-18",
  remotes: [{
    type: "streamable-http",
    url: `${siteUrl}/mcp`,
    supportedProtocolVersions: ["2025-06-18", "2025-03-26"]
  }],
  transport: {
    type: "streamable-http",
    endpoint: `${siteUrl}/mcp`
  },
  capabilities: {
    tools: { listChanged: false }
  },
  documentationUrl: `${siteUrl}/docs/api.md`
};
write(path.join(".well-known", "mcp", "server-card.json"), `${JSON.stringify(mcpServerCard, null, 2)}\n`);

write(path.join(".well-known", "api-catalog"), `${JSON.stringify({
  linkset: [
    {
      anchor: `${siteUrl}/api/site.json`,
      "service-desc": [{ href: `${siteUrl}/.well-known/openapi.json`, type: "application/vnd.oai.openapi+json" }],
      "service-doc": [{ href: `${siteUrl}/docs/api.md`, type: "text/markdown" }],
      status: [{ href: `${siteUrl}/api/status.json`, type: "application/json" }]
    },
    {
      anchor: `${siteUrl}/mcp`,
      "service-desc": [{ href: `${siteUrl}/.well-known/mcp/server-card.json`, type: "application/mcp-server-card+json" }],
      "service-doc": [{ href: `${siteUrl}/docs/api.md`, type: "text/markdown" }],
      status: [{ href: `${siteUrl}/healthz`, type: "text/plain" }]
    }
  ]
}, null, 2)}\n`);

write(path.join("docs", "api.md"), `# YFFI3 Public Site Metadata API\n\nThis read-only API publishes verified public facts for Your Family First Insurance Office #3 in Miami. It does not accept quote submissions, create accounts, bind coverage, or process credentials.\n\n## Endpoints\n\n- \`GET /api/site.json\`: public office, language, service, page, and quote-handoff metadata.\n- \`GET /api/status.json\`: availability document for this metadata API.\n- \`GET /healthz\`: plain-text origin health response.\n- \`GET /.well-known/openapi.json\`: OpenAPI 3.1 description.\n- \`GET /.well-known/api-catalog\`: RFC 9727 API catalog.\n\n## MCP\n\n- \`GET /.well-known/mcp/server-card.json\`: public MCP Server Card.\n- \`POST /mcp\`: stateless Streamable HTTP MCP endpoint.\n- Runtime capability: three read-only tools for public service lookup, office contact details, and a user-confirmed quote handoff.\n\nThe MCP endpoint accepts MCP protocol versions \`2025-06-18\` and \`2025-03-26\`. It does not create sessions, accept credentials, submit quote data, or perform background actions.\n\n## Authentication\n\n\`NOT APPLICABLE — NO PROTECTED API\`: no authentication is required because every endpoint is read-only and contains public information. No OAuth or OpenID Connect server is operated by this website, so OAuth Authorization Server Metadata and Protected Resource Metadata are intentionally not published.\n\n## Privacy and Safety\n\nDo not send personal, underwriting, payment, medical, claim, password, or carrier-login data to these endpoints. Quote requests continue through the approved human-facing quote path shown on the website.\n`);

write("auth.md", `# auth.md\n\n## Agent audience\n\nAI agents may read the public pages, \`llms.txt\`, the agent skill, and the public site metadata API without registration.\n\n## Authentication status\n\n\`NOT APPLICABLE — NO PROTECTED API\`: this website does not operate user accounts, an OAuth authorization server, an OpenID Connect provider, or an agent credential-issuance service. No bearer token is required or accepted by the public metadata or MCP endpoints.\n\n## Supported access method\n\n- Method: anonymous, unregistered, public read-only access.\n- Registration or provisioning endpoint: none.\n- Credential type: none; do not send bearer tokens, API keys, passwords, or identity assertions.\n- Available interfaces: the public metadata API and the read-only MCP endpoint at \`/mcp\`.\n\nAutomated agent registration is not offered because this service has no account or authorization boundary to register against. Do not send customer data or sensitive underwriting information to the public endpoints.\n\n## Human-facing quote handoff\n\nAgents may return the quote-help page or approved external quote URL to a person, but must obtain that person's confirmation before navigating or submitting anything. Coverage is not bound by reading or using the public metadata API.\n`);

const discoveryLinks = '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json", </.well-known/openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json", </.well-known/mcp/server-card.json>; rel="service-desc"; type="application/mcp-server-card+json", </docs/api.md>; rel="service-doc"; type="text/markdown", </llms.txt>; rel="describedby"; type="text/plain"';
write("_headers", `/*\n  X-Content-Type-Options: nosniff\n  X-Frame-Options: SAMEORIGIN\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()\n  Strict-Transport-Security: max-age=31536000\n  Cross-Origin-Opener-Policy: same-origin\n  Cross-Origin-Resource-Policy: same-origin\n  Origin-Agent-Cluster: ?1\n  X-Permitted-Cross-Domain-Policies: none\n  Content-Signal: search=yes, ai-input=yes, ai-train=no\n  Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self' https://secure.ConsumerRateQuotes.com; img-src 'self' data: https:; media-src 'self'; font-src 'self' data:; script-src 'self' 'sha256-DaMsrnme1cB26ZbUI+06/lNY3R+EpKtlVPrw4gsa8A0=' https://www.googletagmanager.com; script-src-attr 'none'; style-src 'self' 'unsafe-inline'; style-src-attr 'unsafe-inline'; frame-src https://www.googletagmanager.com; connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com; upgrade-insecure-requests\n\n/\n  Link: ${discoveryLinks}\n  Vary: Accept\n\n/index.html\n  Link: ${discoveryLinks}\n  Vary: Accept\n\n/.well-known/api-catalog\n  Content-Type: application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"\n  Access-Control-Allow-Origin: *\n\n/.well-known/openapi.json\n  Content-Type: application/vnd.oai.openapi+json; charset=utf-8\n  Access-Control-Allow-Origin: *\n\n/.well-known/agent-skills/*\n  Access-Control-Allow-Origin: *\n\n/.well-known/mcp/server-card.json\n  Content-Type: application/mcp-server-card+json; charset=utf-8\n  Access-Control-Allow-Origin: *\n  Access-Control-Allow-Methods: GET\n  Access-Control-Allow-Headers: Content-Type, If-None-Match\n  Access-Control-Expose-Headers: ETag\n  Cache-Control: public, max-age=3600\n\n/api/*\n  Access-Control-Allow-Origin: *\n  Cache-Control: public, max-age=300, must-revalidate\n\nhttps://:project.pages.dev/*\n  X-Robots-Tag: noindex, nofollow\n\nhttps://:version.:project.pages.dev/*\n  X-Robots-Tag: noindex, nofollow\n`);

const headersFile = path.join(publicDir, "_headers");
fs.writeFileSync(
  headersFile,
  `${fs.readFileSync(headersFile, "utf8")
    .replace("  Cross-Origin-Resource-Policy: same-origin\n", "")
    .replaceAll(
      "  Access-Control-Allow-Origin: *\n",
      "  Access-Control-Allow-Origin: *\n  Cross-Origin-Resource-Policy: cross-origin\n"
    )}\n/assets/*\n  Cross-Origin-Resource-Policy: same-origin\n`
);

const functionRoutes = routes.flatMap((route) => {
  if (!route) return ["/", "/index.html"];
  return [`/${route}`, `/${route}/`, `/${route}/index.html`];
});
functionRoutes.push("/mcp");
write("_routes.json", `${JSON.stringify({ version: 1, include: functionRoutes, exclude: [] }, null, 2)}\n`);

console.log(`Generated agent discovery resources and ${routes.length} Markdown page variants.`);
