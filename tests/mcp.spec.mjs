import { expect, test } from "@playwright/test";

test("MCP Server Card and read-only tool discovery stay aligned", async ({ request }, testInfo) => {

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


test("all public pages negotiate Markdown without mixing cache variants", async ({ request }, testInfo) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  expect(paths).toHaveLength(30);
  for (const path of paths) {
    const markdown = await request.get(path, { headers: { Accept: "text/markdown" } });
    expect(markdown.status(), path).toBe(200);
    expect(markdown.headers()["content-type"], path).toContain("text/markdown");
    expect(await markdown.text(), path).toMatch(/(?:^|\n)# /);
    for (const accept of ["text/html", "text/markdown;q=0", "text/html;q=1, text/markdown;q=0.2"]) {
      const html = await request.get(path, { headers: { Accept: accept } });
      expect(html.headers()["content-type"], path).toContain("text/html");
      expect(html.headers().vary, path).toMatch(/\bAccept\b/i);
    }
  }
  const head = await request.head("/policyholder-help/", { headers: { Accept: "text/markdown" } });
  expect(head.headers()["content-type"]).toContain("text/markdown");
  expect(await head.body()).toHaveLength(0);
  expect((await request.post("/policyholder-help/", { headers: { Accept: "text/markdown" } })).status()).toBe(404);
});

test("Cloudflare negotiation preserves cache headers and honors HTTP methods and preferences", async ({}, testInfo) => {
  const { onRequest } = await import("../functions/_middleware.js");
  for (const [method, accept, type] of [
    ["GET", "text/markdown", "text/markdown"],
    ["HEAD", "text/markdown", "text/markdown"],
    ["GET", "text/markdown;q=0", "text/html"],
    ["GET", "text/html;q=1, text/markdown;q=0.1", "text/html"],
    ["POST", "text/markdown", "text/html"]
  ]) {
    let assetPath;
    const response = await onRequest({
      request: new Request("https://yourfamilyfirstinsurance3.com/es/recursos-para-clientes/revision-anual/", { method, headers: { Accept: accept } }),
      next: async () => new Response("<h1>Guide</h1>", { headers: { "Content-Type": "text/html", Vary: "Accept-Encoding", "Content-Encoding": "gzip", ETag: "old-html" } }),
      env: { ASSETS: { fetch: async (request) => {
        assetPath = new URL(request.url).pathname;
        return new Response("# Guide", { headers: { "Content-Type": "text/markdown" } });
      } } }
    });
    expect(response.headers.get("Content-Type")).toContain(type);
    expect(response.headers.get("Vary")).toBe("Accept-Encoding, Accept");
    if (type === "text/markdown") {
      expect(assetPath).toBe("/.agent-markdown/es/recursos-para-clientes/revision-anual/index.md");
      expect(response.headers.has("Content-Encoding")).toBe(false);
      expect(response.headers.has("ETag")).toBe(false);
      expect(await response.text()).toBe(method === "HEAD" ? "" : "# Guide");
    } else expect(assetPath).toBeUndefined();
  }
});


test("Google tag startup waits for initial paint, keeps queued events and matches CSP", async ({ request }, testInfo) => {
  const { createHash } = await import("node:crypto");
  const { runInNewContext } = await import("node:vm");
  const response = await request.get("/");
  const html = await response.text();
  const source = html.match(/<!-- Google Tag Manager -->\s*<script data-site-tracking="gtm">([\s\S]*?)<\/script>/)[1];
  const hash = "sha256-" + createHash("sha256").update(source).digest("base64");
  expect(response.headers()["content-security-policy"]).toContain(hash);
  const frames = [];
  const callbacks = {};
  const inserted = [];
  const window = {
    dataLayer: [],
    requestAnimationFrame: (callback) => frames.push(callback),
    addEventListener: (name, callback) => { callbacks[name] = callback; }
  };
  const document = {
    readyState: "loading",
    addEventListener: (name, callback) => { callbacks[name] = callback; },
    getElementsByTagName: () => [{ parentNode: { insertBefore: (script) => inserted.push(script) } }],
    createElement: () => ({})
  };
  runInNewContext(source, { window, document, Date });
  window.dataLayer.push({ event: "quote_start" });
  expect(inserted).toHaveLength(0);
  callbacks.DOMContentLoaded();
  frames.shift()();
  expect(inserted).toHaveLength(0);
  frames.shift()();
  callbacks.pointerdown();
  callbacks.keydown();
  expect(inserted).toHaveLength(1);
  expect(inserted[0].src).toBe("https://www.googletagmanager.com/gtm.js?id=GTM-5FZCMM3V");
  expect(window.dataLayer.filter((entry) => entry.event).map((entry) => entry.event)).toEqual(["gtm.js", "quote_start"]);
  expect(Array.from(window.dataLayer[0]).slice(0, 2)).toEqual(["consent", "default"]);
});

test("commercial truck lookups reach business guidance and the phone quote path", async ({ request }, testInfo) => {
  for (const category of ["trucking", "truck", "CDL", "commercial auto"]) {
    const response = await request.post("/mcp", {
      headers: { Accept: "application/json, text/event-stream", "Content-Type": "application/json" },
      data: { jsonrpc: "2.0", id: 10, method: "tools/call", params: { name: "find_insurance_service", arguments: { category } } }
    });
    expect(response.status()).toBe(200);
    const result = (await response.json()).result;
    expect(result.isError).toBe(false);
    expect(result.structuredContent.url).toBe("https://yourfamilyfirstinsurance3.com/commercial-insurance/#trucking-insurance");
  }
  for (const [route, title] of [["/commercial-insurance/", "Commercial auto and trucking"], ["/es/seguro-comercial/", "Auto comercial y seguro de camiones"]]) {
    const html = await (await request.get(route)).text();
    expect(html).toContain('id="trucking-insurance"');
    expect(html).toContain(title);
    expect(html).toContain('href="tel:13059108850"');
  }
  const facts = await (await request.get("/api/site.json")).json();
  expect(facts.insurance_types).toEqual(expect.arrayContaining(["Trucking insurance", "Commercial auto insurance", "Individual and family health insurance"]));
  expect(facts.pages.trucking).toBe("https://yourfamilyfirstinsurance3.com/commercial-insurance/#trucking-insurance");
});


test("public HTML, styles and runtime support compressed delivery", async ({ request }) => {
  for (const path of ["/", "/es/", "/assets/styles.css", "/assets/site.js"]) {
    const response = await request.get(path, { headers: { "Accept-Encoding": "gzip" } });
    expect(response.status(), path).toBe(200);
    expect(response.headers()["content-encoding"], path).toBe("gzip");
    expect(response.headers().vary, path).toMatch(/\bAccept-Encoding\b/i);
    expect((await response.body()).length, path).toBeGreaterThan(1000);
  }
});
