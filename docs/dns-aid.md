# DNS-AID Publication Runbook

Status: `NEEDS HUMAN LOGIN`

The production domain uses Cloudflare authoritative nameservers and GoDaddy as registrar. Publish DNS-AID only after the production MCP endpoint and Server Card both return HTTP 200.

## 1. Verify the advertised service

```sh
curl -fsS https://yourfamilyfirstinsurance3.com/.well-known/mcp/server-card.json
curl -fsS -X POST https://yourfamilyfirstinsurance3.com/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  --data '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'
```

Do not create the DNS record if either command fails or if the Server Card endpoint differs from `/mcp`.

## 2. Publish the Cloudflare SVCB record

In Cloudflare, open `yourfamilyfirstinsurance3.com` and select **DNS → Records → Add record**.

Use these values:

| Field | Value |
| --- | --- |
| Type | `SVCB` |
| Name | `_mcp._agents` |
| Priority | `1` |
| Target | `yourfamilyfirstinsurance3.com` |
| Value | `mandatory=alpn,port alpn="mcp,h2,h3" port=443 key65400="/mcp" key65401="/.well-known/mcp/server-card.json"` |
| TTL | `1 hour` |

Equivalent zone-file form:

```dns
_mcp._agents.yourfamilyfirstinsurance3.com. 3600 IN SVCB 1 yourfamilyfirstinsurance3.com. mandatory=alpn,port alpn="mcp,h2,h3" port=443 key65400="/mcp" key65401="/.well-known/mcp/server-card.json"
```

`key65400` and `key65401` are numeric Private Use SvcParamKeys for the experimental endpoint and card paths. Numeric keys are used because DNS-AID's custom names are not registered by IANA. The `mcp` ALPN identifier is also still an Internet-Draft placeholder.

Do not add `_a2a._agents`: this site does not operate an A2A endpoint.

## 3. Enable DNSSEC in Cloudflare

1. Open **Cloudflare → yourfamilyfirstinsurance3.com → DNS → Settings**.
2. In **DNSSEC**, select **Enable DNSSEC** and confirm.
3. Open **DS record** and copy the exact **Key Tag**, **Algorithm**, **Digest Type**, and **Digest** values. Do not alter or retype the digest.

At this point Cloudflare signs the zone, but validation is not complete until the DS record exists at GoDaddy.

## 4. Add the DS record at GoDaddy

1. Sign in to the GoDaddy **Domain Portfolio**.
2. Open `yourfamilyfirstinsurance3.com`.
3. Select **DNS → DS Records → Add**.
4. Paste the exact Key Tag, Algorithm, Digest Type, and Digest from Cloudflare.
5. Select **Save**.

Do not disable Cloudflare zone signing after publishing the DS record. A mismatched or removed signing key while the parent DS remains published can make validating resolvers return `SERVFAIL`.

## 5. Validate

Run:

```sh
pnpm check:dns-aid
```

The check passes only when the SVCB answer exists and Cloudflare's validating resolver sets the Authenticated Data (`AD`) flag. Then re-run the Agent Ready scan and confirm `checks.discoverability.dnsAid.status` is `pass`.
