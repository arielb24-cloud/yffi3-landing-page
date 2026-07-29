# auth.md

## Agent audience

AI agents may read the public pages, `llms.txt`, the agent skill, and the public site metadata API without registration.

## Authentication status

This website does not operate protected APIs, user accounts, an OAuth authorization server, an OpenID Connect provider, or an agent credential-issuance service. No bearer token is required or accepted by the public metadata endpoints.

## Registration

No automated agent-registration or provisioning endpoint is offered. Do not send credentials, identity assertions, customer data, or sensitive underwriting information to this website's public metadata endpoints.

## Human-facing quote handoff

Agents may return the quote-help page or approved external quote URL to a person, but must obtain that person's confirmation before navigating or submitting anything. Coverage is not bound by reading or using the public metadata API.
