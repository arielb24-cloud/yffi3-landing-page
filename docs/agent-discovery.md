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
- A public, stateless Streamable HTTP MCP endpoint at `/mcp` exposing the same three read-only capabilities.
- An MCP Server Card at `/.well-known/mcp/server-card.json` with current draft fields and the compatibility fields used by Agent Ready scanners.
- `/auth.md` explaining the anonymous public access method and why no agent-registration service exists.

## Intentionally Not Advertised

- `NOT APPLICABLE — NO PROTECTED API`: OAuth/OIDC discovery and OAuth Protected Resource Metadata are omitted because the website has no protected API or authorization server.
- Agent registration metadata is omitted because the site has no user accounts, credential issuer, claim ceremony, or revocation service.
- Inventing issuer, token, JWKS, or registration URLs would mislead agents and create a security problem.

## DNS-AID Status

`NEEDS HUMAN LOGIN`: DNS is hosted on Cloudflare, but this repository has no Cloudflare API token or authenticated browser session. A real remote MCP endpoint now exists in this source and can be advertised after the production deployment is verified.

Publish the exact ServiceMode SVCB record and complete the Cloudflare plus GoDaddy DNSSEC steps in `docs/dns-aid.md`. Do not publish the record before `POST /mcp` and the Server Card return successful production responses.

## Verification

```sh
curl -I https://yourfamilyfirstinsurance3.com/
curl -H 'Accept: text/markdown' -D - https://yourfamilyfirstinsurance3.com/
curl -D - https://yourfamilyfirstinsurance3.com/.well-known/api-catalog
curl https://yourfamilyfirstinsurance3.com/.well-known/agent-skills/index.json
curl https://yourfamilyfirstinsurance3.com/.well-known/mcp/server-card.json
curl -X POST https://yourfamilyfirstinsurance3.com/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  --data '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"verification","version":"1.0.0"}}}'
```
