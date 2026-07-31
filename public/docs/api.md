# YFFI3 Public Site Metadata API

This read-only API publishes verified public facts for Your Family First Insurance Office #3 in Miami. It does not accept quote submissions, create accounts, bind coverage, or process credentials.

## Endpoints

- `GET /api/site.json`: public office, language, service, page, and quote-handoff metadata.
- `GET /api/status.json`: availability document for this metadata API.
- `GET /healthz`: plain-text origin health response.
- `GET /.well-known/openapi.json`: OpenAPI 3.1 description.
- `GET /.well-known/api-catalog`: RFC 9727 API catalog.

## MCP

- `GET /.well-known/mcp/server-card.json`: public MCP Server Card.
- `POST /mcp`: stateless Streamable HTTP MCP endpoint.
- Runtime capability: three read-only tools for public service lookup, office contact details, and a user-confirmed quote handoff.

The MCP endpoint accepts MCP protocol versions `2025-06-18` and `2025-03-26`. It does not create sessions, accept credentials, submit quote data, or perform background actions.

## Authentication

`NOT APPLICABLE — NO PROTECTED API`: no authentication is required because every endpoint is read-only and contains public information. No OAuth or OpenID Connect server is operated by this website, so OAuth Authorization Server Metadata and Protected Resource Metadata are intentionally not published.

## Privacy and Safety

Do not send personal, underwriting, payment, medical, claim, password, or carrier-login data to these endpoints. Quote requests continue through the approved human-facing quote path shown on the website.
