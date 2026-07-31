import { handleMcpMessage, isSupportedProtocolVersion } from "../src/mcp-core.mjs";

const CANONICAL_ORIGIN = "https://yourfamilyfirstinsurance3.com";
const MAX_BODY_BYTES = 64 * 1024;

function corsHeaders(request) {
  const origin = request.headers.get("Origin");
  const headers = new Headers({
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, MCP-Protocol-Version",
    "Access-Control-Max-Age": "86400",
    "Cache-Control": "no-store",
    "Cross-Origin-Resource-Policy": "same-origin",
    "Vary": "Origin"
  });
  if (!origin || origin === CANONICAL_ORIGIN) headers.set("Access-Control-Allow-Origin", CANONICAL_ORIGIN);
  return headers;
}

function jsonResponse(request, body, status = 200) {
  const headers = corsHeaders(request);
  headers.set("Content-Type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(body), { status, headers });
}

function methodNotAllowed(request) {
  const headers = corsHeaders(request);
  headers.set("Allow", "POST, OPTIONS");
  return new Response("Method Not Allowed", { status: 405, headers });
}

function invalidOrigin(request) {
  const origin = request.headers.get("Origin");
  return Boolean(origin && origin !== CANONICAL_ORIGIN);
}

export function onRequestOptions({ request }) {
  if (invalidOrigin(request)) return new Response("Forbidden Origin", { status: 403, headers: corsHeaders(request) });
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export function onRequestGet({ request }) {
  return methodNotAllowed(request);
}

export function onRequestDelete({ request }) {
  return methodNotAllowed(request);
}

export async function onRequestPost({ request }) {
  if (invalidOrigin(request)) return jsonResponse(request, { error: "Forbidden Origin" }, 403);

  const contentType = request.headers.get("Content-Type") || "";
  if (!/^application\/json\b/i.test(contentType)) {
    return jsonResponse(request, { error: "Content-Type must be application/json" }, 415);
  }

  const contentLength = Number(request.headers.get("Content-Length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return jsonResponse(request, { error: "Request body is too large" }, 413);
  }

  const protocolVersion = request.headers.get("MCP-Protocol-Version");
  if (!isSupportedProtocolVersion(protocolVersion)) {
    return jsonResponse(request, { error: "Unsupported MCP-Protocol-Version" }, 400);
  }

  let text;
  let message;
  try {
    text = await request.text();
    if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES) {
      return jsonResponse(request, { error: "Request body is too large" }, 413);
    }
    message = JSON.parse(text);
  } catch {
    return jsonResponse(request, { jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }, 400);
  }

  const result = handleMcpMessage(message);
  if (result.body === null) return new Response(null, { status: result.status, headers: corsHeaders(request) });
  return jsonResponse(request, result.body, result.status);
}
