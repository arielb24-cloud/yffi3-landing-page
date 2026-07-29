import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { handleMcpMessage, SERVER_INFO, TOOLS } from "../src/mcp-core.mjs";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const checkDist = process.argv.includes("--dist");
const siteRoot = checkDist ? path.join(root, "dist") : path.join(root, "public");
const siteUrl = "https://yourfamilyfirstinsurance3.com";
const failures = [];
const routes = [
  "", "auto-insurance", "home-insurance", "commercial-insurance", "life-insurance",
  "renters-insurance", "about-office-3", "get-a-quote", "privacy-policy", "terms",
  "es", "es/seguro-de-auto", "es/seguro-de-vivienda", "es/seguro-de-inquilinos",
  "es/seguro-comercial", "es/seguro-de-vida", "es/sobre-oficina-3",
  "es/solicitar-cotizacion", "es/privacidad", "es/terminos"
];

function read(relativePath) {
  const filePath = path.join(siteRoot, relativePath);
  if (!fs.existsSync(filePath)) {
    failures.push(`Missing agent discovery resource: /${relativePath}`);
    return "";
  }
  return fs.readFileSync(filePath, "utf8");
}

function parseJson(relativePath) {
  const text = read(relativePath);
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch (error) {
    failures.push(`${relativePath} is not valid JSON: ${error.message}`);
    return {};
  }
}

const catalog = parseJson(path.join(".well-known", "api-catalog"));
if (!Array.isArray(catalog.linkset) || catalog.linkset.length !== 2) failures.push("API catalog must contain the public metadata API and MCP entries");
const catalogEntry = catalog.linkset?.find((entry) => entry.anchor === `${siteUrl}/api/site.json`) || {};
if (catalogEntry.anchor !== `${siteUrl}/api/site.json`) failures.push("API catalog anchor must be the public site metadata API");
for (const relation of ["service-desc", "service-doc", "status"]) {
  if (!Array.isArray(catalogEntry[relation]) || !catalogEntry[relation][0]?.href) failures.push(`API catalog missing ${relation} relation`);
}
const mcpCatalogEntry = catalog.linkset?.find((entry) => entry.anchor === `${siteUrl}/mcp`) || {};
if (mcpCatalogEntry["service-desc"]?.[0]?.href !== `${siteUrl}/.well-known/mcp/server-card.json`) failures.push("API catalog MCP entry must link to the Server Card");

const openApi = parseJson(path.join(".well-known", "openapi.json"));
if (openApi.openapi !== "3.1.0") failures.push("OpenAPI description must use 3.1.0");
for (const endpoint of ["/api/site.json", "/api/status.json", "/healthz"]) {
  if (!openApi.paths?.[endpoint]?.get) failures.push(`OpenAPI description missing GET ${endpoint}`);
}
if (JSON.stringify(openApi).includes('"post"') || JSON.stringify(openApi).includes("requestBody")) failures.push("Public metadata API must remain read-only");

const metadata = parseJson(path.join("api", "site.json"));
for (const expected of ["Your Family First Insurance Office #3", "305-910-8850", "11200 W Flagler St", "64868"]) {
  if (!JSON.stringify(metadata).includes(expected)) failures.push(`Public site metadata missing verified fact: ${expected}`);
}
for (const prohibitedKey of ["ssn", "date_of_birth", "driver_license", "vin", "password", "api_key", "token"]) {
  if (Object.hasOwn(metadata, prohibitedKey)) failures.push(`Public metadata exposes prohibited key: ${prohibitedKey}`);
}

const skillsIndex = parseJson(path.join(".well-known", "agent-skills", "index.json"));
if (skillsIndex.$schema !== "https://schemas.agentskills.io/discovery/0.2.0/schema.json") failures.push("Agent Skills index has the wrong schema URI");
if (!Array.isArray(skillsIndex.skills) || skillsIndex.skills.length !== 1) failures.push("Agent Skills index must advertise exactly one maintained skill");
const skill = skillsIndex.skills?.[0] || {};
const skillPath = path.join(".well-known", "agent-skills", "find-yffi3-insurance-services", "SKILL.md");
const skillText = read(skillPath);
const digest = skillText ? `sha256:${crypto.createHash("sha256").update(skillText).digest("hex")}` : "";
if (skill.digest !== digest) failures.push("Agent skill digest does not match the published SKILL.md");
for (const field of ["name", "type", "description", "url", "digest"]) if (!skill[field]) failures.push(`Agent skill entry missing ${field}`);

const auth = read("auth.md");
for (const boundary of ["NOT APPLICABLE — NO PROTECTED API", "Registration or provisioning endpoint: none", "must obtain that person's confirmation"]) {
  if (!auth.includes(boundary)) failures.push(`auth.md missing boundary: ${boundary}`);
}

const serverCard = parseJson(path.join(".well-known", "mcp", "server-card.json"));
if (serverCard.$schema !== "https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json") failures.push("MCP Server Card has the wrong schema URI");
if (serverCard.name !== "com.yourfamilyfirstinsurance3/public-metadata") failures.push("MCP Server Card has the wrong reverse-DNS name");
if (serverCard.version !== SERVER_INFO.version || serverCard.serverInfo?.name !== SERVER_INFO.name || serverCard.serverInfo?.version !== SERVER_INFO.version) failures.push("MCP Server Card identity must match the runtime serverInfo");
if (serverCard.transport?.type !== "streamable-http" || serverCard.transport?.endpoint !== `${siteUrl}/mcp`) failures.push("MCP Server Card must advertise the production Streamable HTTP endpoint");
if (serverCard.remotes?.[0]?.url !== `${siteUrl}/mcp` || !serverCard.remotes?.[0]?.supportedProtocolVersions?.includes("2025-06-18")) failures.push("MCP Server Card current-draft remote is incomplete");
if (serverCard.capabilities?.tools?.listChanged !== false) failures.push("MCP Server Card must truthfully advertise stable tool discovery");

const initialize = handleMcpMessage({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-06-18" } });
if (initialize.status !== 200 || initialize.body?.result?.serverInfo?.name !== SERVER_INFO.name) failures.push("MCP initialize response is invalid");
const toolsList = handleMcpMessage({ jsonrpc: "2.0", id: 2, method: "tools/list", params: {} });
if (toolsList.status !== 200 || toolsList.body?.result?.tools?.length !== TOOLS.length || TOOLS.length !== 3) failures.push("MCP runtime must expose exactly three maintained read-only tools");
if (TOOLS.some((tool) => tool.annotations?.readOnlyHint !== true || tool.annotations?.destructiveHint !== false)) failures.push("Every MCP tool must retain read-only and non-destructive annotations");
for (const route of routes) {
  const markdownPath = route ? path.join(".agent-markdown", route, "index.md") : path.join(".agent-markdown", "index.md");
  const markdown = read(markdownPath);
  if (markdown && (!markdown.startsWith("---\n") || !markdown.includes("\ncanonical: ") || !markdown.includes("\n# "))) {
    failures.push(`${markdownPath} is missing Markdown frontmatter or a primary heading`);
  }
}

const headers = read("_headers");
for (const expected of ["rel=\"api-catalog\"", "application/mcp-server-card+json", "rel=\"service-desc\"", "rel=\"service-doc\"", "Vary: Accept", "Content-Signal: search=yes, ai-input=yes, ai-train=no"]) {
  if (!headers.includes(expected)) failures.push(`Cloudflare headers missing ${expected}`);
}
const universalHeaders = headers.split("\n\n/")[0];
if (universalHeaders.includes("Cross-Origin-Resource-Policy")) failures.push("Cloudflare global headers must not conflict with public cross-origin metadata routes");
if ((headers.match(/Cross-Origin-Resource-Policy: cross-origin/g) || []).length !== 5) failures.push("Cloudflare discovery metadata routes need unambiguous cross-origin resource policy headers");
const routeManifest = parseJson("_routes.json");
if (routeManifest.version !== 1 || !Array.isArray(routeManifest.include) || !routeManifest.include.includes("/") || !routeManifest.include.includes("/mcp")) failures.push("Cloudflare Pages function route manifest is invalid");

for (const misleadingPath of [
  path.join(".well-known", "openid-configuration"),
  path.join(".well-known", "oauth-authorization-server"),
  path.join(".well-known", "oauth-protected-resource")
]) {
  if (fs.existsSync(path.join(siteRoot, misleadingPath))) failures.push(`Do not advertise a service that does not exist: /${misleadingPath}`);
}

if (!checkDist) {
  const middleware = fs.readFileSync(path.join(root, "functions", "_middleware.js"), "utf8");
  const mcpFunction = fs.readFileSync(path.join(root, "functions", "mcp.js"), "utf8");
  const server = fs.readFileSync(path.join(root, "server.js"), "utf8");
  const browserEntry = fs.readFileSync(path.join(root, "scripts", "generate-live-base.mjs"), "utf8");
  for (const marker of ["text/markdown", "x-markdown-tokens", "discoveryLinks"]) {
    if (!middleware.includes(marker)) failures.push(`Cloudflare middleware missing ${marker}`);
    if (!server.includes(marker)) failures.push(`Express server missing ${marker}`);
  }
  for (const marker of ["document.modelContext", "registerTool", "provideContext", "readOnlyHint"]) {
    if (!browserEntry.includes(marker)) failures.push(`Browser entry missing WebMCP marker ${marker}`);
  }
  for (const marker of ["handleMcpMessage", "MCP-Protocol-Version", "Forbidden Origin", "64 * 1024"]) {
    if (!mcpFunction.includes(marker)) failures.push(`Cloudflare MCP function missing ${marker}`);
  }
  for (const marker of ["/mcp", "mcpCorePromise", "MCP-Protocol-Version"]) {
    if (!server.includes(marker)) failures.push(`Express MCP fallback missing ${marker}`);
  }
}

if (failures.length) {
  console.error("Agent discovery validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Agent discovery validation passed for ${checkDist ? "dist" : "source"} output.`);
