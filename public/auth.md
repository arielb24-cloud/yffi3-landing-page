# auth.md

## Agent audience

AI agents may read the public pages, `llms.txt`, the agent skill, and the public site metadata API without registration.

## Authentication status

`NOT APPLICABLE — NO PROTECTED API`: this website does not operate user accounts, an OAuth authorization server, an OpenID Connect provider, or an agent credential-issuance service. No bearer token is required or accepted by the public metadata or MCP endpoints.

## Supported access method

- Method: anonymous, unregistered, public read-only access.
- Registration or provisioning endpoint: none.
- Credential type: none; do not send bearer tokens, API keys, passwords, or identity assertions.
- Available interfaces: the public metadata API and the read-only MCP endpoint at `/mcp`.

Automated agent registration is not offered because this service has no account or authorization boundary to register against. Do not send customer data or sensitive underwriting information to the public endpoints.

## Human-facing quote handoff

Agents may return the quote-help page or approved external quote URL to a person, but must obtain that person's confirmation before navigating or submitting anything. Coverage is not bound by reading or using the public metadata API.
