#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// ===== Core Dependencies =====
import { ConfigManager } from "./config.js";
import { DesignSystemErrorHandler, Logger } from "./core/utils.js";
import { DesignTokensProvider, DesignTokenValidator, ComponentAnalyzer } from "./core/providers.js";

// ===== MCP Module Imports =====
import { createDesignTokenResources } from "./resources/index.js";
import { createValidateDesignTokensTool, createAnalyzeComponentStructureTool, createHealthCheckTool } from "./tools/index.js";
import { createDesignSystemReviewPrompt, createComponentAuditPrompt } from "./prompts/index.js";

// ===== Initialize Core Components =====
const configManager = ConfigManager.getInstance();
const config = configManager.getConfig();
const logger = Logger.getInstance();

// Initialize providers and validators
const tokensProvider = new DesignTokensProvider();
const designValidator = new DesignTokenValidator(tokensProvider);
const componentAnalyzer = new ComponentAnalyzer();

// Initialize the error handler
DesignSystemErrorHandler.initialize(logger, configManager);

// ===== Create MCP Server =====
const server = new McpServer({
  name: "design-system-validator",
  version: "1.0.0",
});

// ===== Resources =====
const resources = createDesignTokenResources(tokensProvider);
resources.forEach(resource => {
  server.resource(resource.name, resource.uri, resource.handler);
});

// ===== Tools =====
const validateTool = createValidateDesignTokensTool(designValidator, logger, config);
server.tool("validate_design_tokens", validateTool.schema, validateTool.handler);

const analyzeTool = createAnalyzeComponentStructureTool(componentAnalyzer, logger, config);
server.tool("analyze_component_structure", analyzeTool.schema, analyzeTool.handler);

const healthTool = createHealthCheckTool(designValidator, logger, config);
server.tool("health_check", healthTool.schema, healthTool.handler);

// ===== Prompts =====
const reviewPrompt = createDesignSystemReviewPrompt();
server.prompt("design_system_review", reviewPrompt.schema, reviewPrompt.handler);

const auditPrompt = createComponentAuditPrompt();
server.prompt("component_audit", auditPrompt.schema, auditPrompt.handler);

// ===== Start Server =====
const transport = new StdioServerTransport();
server.connect(transport).then(() => {
  console.error("Design System Validator MCP Server started");
}).catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
