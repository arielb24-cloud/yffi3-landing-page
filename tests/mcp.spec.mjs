import { expect, test } from "@playwright/test";

test("MCP Server Card and read-only tool discovery stay aligned", async ({ request }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "The protocol contract needs one transport-independent run.");

  const cardResponse = await request.get("/.well-known/mcp/server-card.json", {
    headers: { Accept: "application/mcp-server-card+json" }
  });
  expect(cardResponse.status()).toBe(200);
  expect(cardResponse.headers()["content-type"]).toContain("application/mcp-server-card+json");
  const card = await cardResponse.json();
  expect(card.serverInfo).toEqual({
    name: "yffi3-public-metadata",
    title: "YFFI3 Public Metadata",
    version: "1.0.0"
  });
  expect(card.transport).toEqual({
    type: "streamable-http",
    endpoint: "https://yourfamilyfirstinsurance3.com/mcp"
  });

  const initializeResponse = await request.post("/mcp", {
    headers: {
      Accept: "application/json, text/event-stream",
      "Content-Type": "application/json"
    },
    data: {
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2025-06-18",
        capabilities: {},
        clientInfo: { name: "contract-test", version: "1.0.0" }
      }
    }
  });
  expect(initializeResponse.status()).toBe(200);
  const initialize = await initializeResponse.json();
  expect(initialize.result.serverInfo).toEqual(card.serverInfo);
  expect(initialize.result.capabilities).toEqual({ tools: { listChanged: false } });

  const toolsResponse = await request.post("/mcp", {
    headers: {
      Accept: "application/json, text/event-stream",
      "Content-Type": "application/json",
      "MCP-Protocol-Version": "2025-06-18"
    },
    data: { jsonrpc: "2.0", id: 2, method: "tools/list", params: {} }
  });
  expect(toolsResponse.status()).toBe(200);
  const tools = (await toolsResponse.json()).result.tools;
  expect(tools).toHaveLength(3);
  for (const tool of tools) {
    expect(tool.annotations.readOnlyHint).toBe(true);
    expect(tool.annotations.destructiveHint).toBe(false);
  }
});

test("MCP endpoint rejects unsupported methods, protocol versions, and browser origins", async ({ request }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "The protocol contract needs one transport-independent run.");

  const getResponse = await request.get("/mcp");
  expect(getResponse.status()).toBe(405);
  expect(getResponse.headers().allow).toBe("POST, OPTIONS");

  const versionResponse = await request.post("/mcp", {
    headers: {
      "Content-Type": "application/json",
      "MCP-Protocol-Version": "1900-01-01"
    },
    data: { jsonrpc: "2.0", id: 3, method: "ping" }
  });
  expect(versionResponse.status()).toBe(400);

  const originResponse = await request.post("/mcp", {
    headers: {
      "Content-Type": "application/json",
      Origin: "https://attacker.example"
    },
    data: { jsonrpc: "2.0", id: 4, method: "ping" }
  });
  expect(originResponse.status()).toBe(403);
});
