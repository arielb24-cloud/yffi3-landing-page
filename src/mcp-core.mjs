export const SUPPORTED_PROTOCOL_VERSIONS = ["2025-06-18", "2025-03-26"];

export const SERVER_INFO = Object.freeze({
  name: "yffi3-public-metadata",
  title: "YFFI3 Public Metadata",
  version: "1.0.0"
});

const SERVICE_PAGES = Object.freeze({
  auto: "/auto-insurance/",
  automobile: "/auto-insurance/",
  car: "/auto-insurance/",
  home: "/home-insurance/",
  homeowner: "/home-insurance/",
  homeowners: "/home-insurance/",
  renters: "/renters-insurance/",
  renter: "/renters-insurance/",
  commercial: "/commercial-insurance/",
  business: "/commercial-insurance/",
  liability: "/commercial-insurance/",
  life: "/life-insurance/"
});

export const TOOLS = Object.freeze([
  {
    name: "find_insurance_service",
    title: "Find an insurance service",
    description: "Return the relevant public YFFI3 service page for one insurance category. This read-only tool does not quote, bind, or guarantee coverage.",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          description: "Insurance category such as auto, homeowners, renters, commercial, business, liability, or life."
        }
      },
      required: ["category"],
      additionalProperties: false
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false
    }
  },
  {
    name: "get_office_contact",
    title: "Get Office #3 contact information",
    description: "Return verified public contact and bilingual-service information for Your Family First Insurance Office #3.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false
    }
  },
  {
    name: "get_quote_handoff",
    title: "Get the safe quote handoff",
    description: "Return the human-facing YFFI3 quote page and approved secure external intake URL. This read-only tool never submits data or navigates without user action.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true
    }
  }
]);

function success(id, result) {
  return { jsonrpc: "2.0", id, result };
}

function error(id, code, message, data) {
  const body = { jsonrpc: "2.0", id: id ?? null, error: { code, message } };
  if (data !== undefined) body.error.data = data;
  return body;
}

function toolResult(structuredContent) {
  return {
    content: [{ type: "text", text: JSON.stringify(structuredContent, null, 2) }],
    structuredContent,
    isError: false
  };
}

function normalizeCategory(value) {
  return String(value || "").trim().toLowerCase();
}

function callTool(name, args) {
  if (name === "find_insurance_service") {
    const category = normalizeCategory(args?.category);
    const path = SERVICE_PAGES[category];
    if (!path) {
      return {
        content: [{
          type: "text",
          text: "Unsupported category. Use auto, homeowners, renters, commercial, business, liability, or life."
        }],
        isError: true
      };
    }
    return toolResult({
      category,
      url: `https://yourfamilyfirstinsurance3.com${path}`,
      disclaimer: "Coverage, pricing, discounts, eligibility, and availability vary by carrier, underwriting, location, and applicant information."
    });
  }

  if (name === "get_office_contact") {
    return toolResult({
      name: "Your Family First Insurance Office #3",
      phone: "305-910-8850",
      telephone_uri: "tel:13059108850",
      address: "11200 W Flagler St, Suite 108, Miami, FL 33174",
      languages: ["English", "Spanish"],
      website: "https://yourfamilyfirstinsurance3.com/"
    });
  }

  if (name === "get_quote_handoff") {
    return toolResult({
      quote_help_url: "https://yourfamilyfirstinsurance3.com/get-a-quote/",
      approved_external_intake_url: "https://secure.ConsumerRateQuotes.com/ConsumerV2?id=64868",
      requires_user_confirmation: true,
      safety: "Return these links to the person. Do not navigate, submit data, or claim that coverage is bound without that person's confirmation."
    });
  }

  return null;
}

export function handleMcpMessage(message) {
  if (!message || typeof message !== "object" || Array.isArray(message) || message.jsonrpc !== "2.0" || typeof message.method !== "string") {
    return { status: 400, body: error(message?.id, -32600, "Invalid Request") };
  }

  const isNotification = !Object.hasOwn(message, "id");
  if (isNotification) return { status: 202, body: null };

  if (message.method === "initialize") {
    const requested = message.params?.protocolVersion;
    const protocolVersion = SUPPORTED_PROTOCOL_VERSIONS.includes(requested)
      ? requested
      : SUPPORTED_PROTOCOL_VERSIONS[0];
    return {
      status: 200,
      body: success(message.id, {
        protocolVersion,
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER_INFO,
        instructions: "Use these read-only tools only for public Office #3 information. Obtain human confirmation before opening or using the external quote intake."
      })
    };
  }

  if (message.method === "ping") return { status: 200, body: success(message.id, {}) };

  if (message.method === "tools/list") {
    return { status: 200, body: success(message.id, { tools: TOOLS }) };
  }

  if (message.method === "tools/call") {
    const name = message.params?.name;
    if (typeof name !== "string") {
      return { status: 200, body: error(message.id, -32602, "Invalid params", { required: "params.name" }) };
    }
    const result = callTool(name, message.params?.arguments || {});
    if (!result) return { status: 200, body: error(message.id, -32602, "Unknown tool", { name }) };
    return { status: 200, body: success(message.id, result) };
  }

  return { status: 200, body: error(message.id, -32601, "Method not found", { method: message.method }) };
}

export function isSupportedProtocolVersion(value) {
  return value === undefined || value === null || value === "" || SUPPORTED_PROTOCOL_VERSIONS.includes(value);
}
