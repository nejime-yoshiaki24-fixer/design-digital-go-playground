# Model Context Protocol TypeScript SDK Documentation

Source: https://github.com/modelcontextprotocol/typescript-sdk

## Installation

```bash
npm install @modelcontextprotocol/sdk
```

## Quick Start

### Basic Server Setup

```typescript
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
});

// Add a tool
server.tool("add",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);

// Add a resource
server.resource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  async (uri, { name }) => ({
    contents: [{
      uri: uri.href,
      text: `Hello, ${name}!`
    }]
  })
);

// Connect to transport
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Client Usage

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["server.js"]
});

const client = new Client({
  name: "example-client",
  version: "1.0.0"
});

await client.connect(transport);

// List prompts
const prompts = await client.listPrompts();

// List resources
const resources = await client.listResources();

// Call a tool
const result = await client.callTool({
  name: "example-tool",
  arguments: { arg1: "value" }
});
```

## Core Concepts

### Resources

Resources expose data to LLMs (similar to GET endpoints). They should not have side effects.

```typescript
// Static resource
server.resource(
  "config",
  "config://app",
  async (uri) => ({
    contents: [{
      uri: uri.href,
      text: "App configuration here"
    }]
  })
);

// Dynamic resource with parameters
server.resource(
  "user-profile",
  new ResourceTemplate("users://{userId}/profile", { list: undefined }),
  async (uri, { userId }) => ({
    contents: [{
      uri: uri.href,
      text: `Profile data for user ${userId}`
    }]
  })
);
```

### Tools

Tools allow LLMs to perform actions. They can have side effects (similar to POST endpoints).

```typescript
// Simple tool
server.tool(
  "calculate-bmi",
  {
    weightKg: z.number(),
    heightM: z.number()
  },
  async ({ weightKg, heightM }) => ({
    content: [{
      type: "text",
      text: String(weightKg / (heightM * heightM))
    }]
  })
);

// Async tool with external API
server.tool(
  "fetch-weather",
  { city: z.string() },
  async ({ city }) => {
    const response = await fetch(`https://api.weather.com/${city}`);
    const data = await response.text();
    return {
      content: [{ type: "text", text: data }]
    };
  }
);
```

### Prompts

Prompts are reusable templates for LLM interactions.

```typescript
server.prompt(
  "review-code",
  { code: z.string() },
  ({ code }) => ({
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `Please review this code:\n\n${code}`
      }
    }]
  })
);
```

## Transport Options

### Stdio Transport

For command-line applications:

```typescript
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const transport = new StdioServerTransport();
await server.connect(transport);
```

### Streamable HTTP Transport

For web applications:

```typescript
import express from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

const app = express();
app.use(express.json());

app.post('/mcp', async (req, res) => {
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID()
  });
  
  const server = new McpServer({
    name: "example-server",
    version: "1.0.0"
  });
  
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

app.listen(3000);
```

## Advanced Features

### Dynamic Tool Management

```typescript
const putMessageTool = server.tool(
  "putMessage",
  { channel: z.string(), message: z.string() },
  async ({ channel, message }) => ({
    content: [{ type: "text", text: await putMessage(channel, message) }]
  })
);

// Disable tool
putMessageTool.disable();

// Enable tool
putMessageTool.enable();

// Update tool schema
putMessageTool.update({
  paramSchema: { channel: z.string(), message: z.string(), priority: z.number() }
});

// Remove tool
putMessageTool.remove();
```

### Session Management

```typescript
const transports: { [sessionId: string]: StreamableHTTPServerTransport } = {};

app.post('/mcp', async (req, res) => {
  const sessionId = req.headers['mcp-session-id'] as string;
  let transport: StreamableHTTPServerTransport;

  if (sessionId && transports[sessionId]) {
    transport = transports[sessionId];
  } else {
    transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (sessionId) => {
        transports[sessionId] = transport;
      }
    });
  }

  await transport.handleRequest(req, res, req.body);
});
```

### Error Handling

```typescript
server.tool(
  "query",
  { sql: z.string() },
  async ({ sql }) => {
    try {
      const results = await db.query(sql);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(results, null, 2)
        }]
      };
    } catch (err: unknown) {
      const error = err as Error;
      return {
        content: [{
          type: "text",
          text: `Error: ${error.message}`
        }],
        isError: true
      };
    }
  }
);
```

## Build and Test

```bash
npm install
npm run build        # Build ESM and CJS versions
npm run lint         # Run ESLint
npm test             # Run all tests

# Run examples
npm run server       # Start example server
npm run client       # Run example client
```

## Best Practices

1. **Resources** should be read-only and idempotent
2. **Tools** should handle errors gracefully and return meaningful error messages
3. **Prompts** should provide clear instructions to the LLM
4. Use **TypeScript** and **Zod** for type safety
5. Implement proper **session management** for HTTP transports
6. Clean up resources (database connections, file handles) properly
7. Use **semantic versioning** for your server

## Protocol Compatibility

The SDK supports both modern Streamable HTTP transport and legacy SSE transport for backwards compatibility:

```typescript
// Client with fallback
try {
  const transport = new StreamableHTTPClientTransport(url);
  await client.connect(transport);
} catch (error) {
  // Fallback to SSE
  const sseTransport = new SSEClientTransport(url);
  await client.connect(sseTransport);
}
```