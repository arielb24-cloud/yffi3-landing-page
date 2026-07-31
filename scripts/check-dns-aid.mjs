const domain = "yourfamilyfirstinsurance3.com";
const owner = `_mcp._agents.${domain}`;
const resolver = "https://cloudflare-dns.com/dns-query";

async function doh(name, type) {
  const url = new URL(resolver);
  url.searchParams.set("name", name);
  url.searchParams.set("type", type);
  url.searchParams.set("do", "1");
  const response = await fetch(url, { headers: { Accept: "application/dns-json" } });
  if (!response.ok) throw new Error(`DNS-over-HTTPS returned HTTP ${response.status} for ${type} ${name}`);
  return response.json();
}

function fail(message) {
  console.error(`DNS-AID validation failed: ${message}`);
  process.exitCode = 1;
}

const [svcb, ds, card] = await Promise.all([
  doh(owner, "SVCB"),
  doh(domain, "DS"),
  fetch(`https://${domain}/.well-known/mcp/server-card.json`, { headers: { Accept: "application/mcp-server-card+json" } })
]);

const svcbAnswer = (svcb.Answer || []).find((answer) => answer.type === 64);
if (!svcbAnswer) fail(`no SVCB answer found for ${owner}`);
if (svcbAnswer && (!svcbAnswer.data.includes("alpn=") || !svcbAnswer.data.includes("port=443"))) {
  fail("SVCB answer is missing alpn or port=443");
}
if (!svcb.AD) fail("the SVCB answer is not DNSSEC-authenticated (AD=false)");

const dsAnswer = (ds.Answer || []).find((answer) => answer.type === 43);
if (!dsAnswer) fail(`no parent DS record found for ${domain}`);
if (!ds.AD) fail("the DS answer is not DNSSEC-authenticated (AD=false)");

if (!card.ok) {
  fail(`MCP Server Card returned HTTP ${card.status}`);
} else {
  const serverCard = await card.json();
  if (serverCard.transport?.endpoint !== `https://${domain}/mcp`) fail("MCP Server Card endpoint does not match the DNS-AID target");
}

if (!process.exitCode) {
  console.log(`DNS-AID validation passed for ${owner}; SVCB and DS answers are authenticated.`);
}
