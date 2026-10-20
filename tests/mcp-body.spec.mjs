import { expect, test } from "@playwright/test";
import { onRequestPost } from "../functions/mcp.js";

const endpoint = "https://yourfamilyfirstinsurance3.com/mcp";

test("Cloudflare stops oversized streamed bodies without trusting Content-Length", async ({}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Transport-independent stream contract.");
  let pulls = 0;
  let cancelled = false;
  const body = new ReadableStream({
    pull(controller) {
      pulls++;
      controller.enqueue(new Uint8Array(32 * 1024));
      if (pulls === 7) controller.close();
    },
    cancel() { cancelled = true; }
  }, { highWaterMark: 0 });
  const request = new Request(endpoint, {
    method: "POST", headers: { "Content-Type": "application/json" }, body, duplex: "half"
  });
  const response = await onRequestPost({ request });
  expect(response.status).toBe(413);
  expect(cancelled).toBe(true);
  expect(pulls).toBe(3);
});

test("Cloudflare accepts valid JSON split across UTF-8 chunks", async ({}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Transport-independent stream contract.");
  const payload = new TextEncoder().encode(JSON.stringify({ jsonrpc: "2.0", id: 7, method: "ping", params: { note: "español" } }));
  const body = new ReadableStream({
    start(controller) {
      for (let i = 0; i < payload.length; i++) controller.enqueue(payload.slice(i, i + 1));
      controller.close();
    }
  });
  const response = await onRequestPost({ request: new Request(endpoint, {
    method: "POST", headers: { "Content-Type": "application/json" }, body, duplex: "half"
  }) });
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ jsonrpc: "2.0", id: 7, result: {} });
});
