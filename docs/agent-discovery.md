# Agent Discovery Implementation

The website publishes public, read-only discovery resources without implying that Office #3 operates services it does not have.

## Implemented

- RFC 8288 `Link` response headers on the homepage.
- RFC 9727 API catalog at `/.well-known/api-catalog`.
- OpenAPI 3.1 description at `/.well-known/openapi.json`.
- Public site metadata at `/api/site.json` and status at `/api/status.json`.
- HTML-to-Markdown content negotiation using `Accept: text/markdown` on Cloudflare Pages and the Express fallback server.
- Agent Skills Discovery v0.2 index and SHA-256-verified skill artifact.
- Read-only WebMCP tools for service lookup, public office contact details, and a user-confirmed quote handoff.
- `/auth.md` explaining that the public API requires no authentication and that no agent-registration service exists.

## Intentionally Not Advertised

- OAuth/OIDC discovery and OAuth Protected Resource Metadata are omitted because the website has no protected API or authorization server.
- An MCP Server Card is omitted because the website has no remote MCP transport endpoint. WebMCP is browser-local and does not make `/mcp` exist.
- Inventing issuer, token, JWKS, registration, or MCP URLs would mislead agents and create a security problem.

## DNS-AID Status

`NEEDS HUMAN LOGIN`: DNS is hosted on Cloudflare, but this repository has no Cloudflare API token or authenticated Wrangler session. DNS-AID is also an active Internet-Draft, not a final RFC, and the site currently has no A2A or remote MCP agent endpoint to advertise.

When Office #3 deploys a real remote agent protocol endpoint, publish its draft-compliant ServiceMode SVCB record under `_agents.yourfamilyfirstinsurance3.com`, enable DNSSEC in Cloudflare, and validate the record with DNS-over-HTTPS. Do not publish a placeholder SVCB record that points to a nonexistent agent service merely to raise a scanner score.

## Verification

```sh
curl -I https://yourfamilyfirstinsurance3.com/
curl -H 'Accept: text/markdown' -D - https://yourfamilyfirstinsurance3.com/
curl -D - https://yourfamilyfirstinsurance3.com/.well-known/api-catalog
curl https://yourfamilyfirstinsurance3.com/.well-known/agent-skills/index.json
```
