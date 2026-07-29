# YFFI3 Public Site Metadata API

This read-only API publishes verified public facts for Your Family First Insurance Office #3 in Miami. It does not accept quote submissions, create accounts, bind coverage, or process credentials.

## Endpoints

- `GET /api/site.json`: public office, language, service, page, and quote-handoff metadata.
- `GET /api/status.json`: availability document for this metadata API.
- `GET /healthz`: plain-text origin health response.
- `GET /.well-known/openapi.json`: OpenAPI 3.1 description.
- `GET /.well-known/api-catalog`: RFC 9727 API catalog.

## Authentication

No authentication is required because every endpoint is read-only and contains public information. No OAuth or OpenID Connect server is operated by this website.

## Privacy and Safety

Do not send personal, underwriting, payment, medical, claim, password, or carrier-login data to these endpoints. Quote requests continue through the approved human-facing quote path shown on the website.
