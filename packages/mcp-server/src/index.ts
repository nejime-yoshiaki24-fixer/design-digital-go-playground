#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { existsSync } from "fs";

// Tool imports
import {
  StructureAnalyzer,
  FileAnalyzer,
} from "./tools/analyze/analyzer.js";
import {
  DesignTokenValidator,
  TypographyValidator,
  ElevationValidator,
  LayoutValidator,
} from "./tools/validate/index.js";

// Resource imports
import { DesignTokensProvider } from "./resources/tokens/provider.js";

// Initialize dependencies
const structureAnalyzer = new StructureAnalyzer();
const fileAnalyzer = new FileAnalyzer();
const designValidator = new DesignTokenValidator();
const typographyValidator = new TypographyValidator();
const elevationValidator = new ElevationValidator();
const layoutValidator = new LayoutValidator();
const tokensProvider = new DesignTokensProvider();

// Create server
const server = new McpServer({
  name: "design-system-validator",
  version: "1.0.0",
});

// Resources
server.resource(
  "design-tokens-all",
  "design-tokens://all",
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        text: JSON.stringify(tokensProvider.getTokens(), null, 2),
      },
    ],
  }),
);

server.resource(
  "design-tokens-colors",
  "design-tokens://colors",
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        text: JSON.stringify(tokensProvider.getColors(), null, 2),
      },
    ],
  }),
);

server.resource(
  "design-tokens-spacing",
  "design-tokens://spacing",
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        text: JSON.stringify(tokensProvider.getSpacing(), null, 2),
      },
    ],
  }),
);

server.resource(
  "design-tokens-typography",
  "design-tokens://typography",
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        text: JSON.stringify(tokensProvider.getTypography(), null, 2),
      },
    ],
  }),
);

server.resource(
  "design-tokens-elevation",
  "design-tokens://elevation",
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        text: JSON.stringify(
          {
            elevation: tokensProvider.getElevation(),
            borderRadius: tokensProvider.getBorderRadius(),
          },
          null,
          2,
        ),
      },
    ],
  }),
);

server.resource(
  "design-tokens-layout",
  "design-tokens://layout",
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        text: JSON.stringify(
          {
            breakpoints: tokensProvider.getBreakpoints(),
            grid: tokensProvider.getGrid(),
          },
          null,
          2,
        ),
      },
    ],
  }),
);

// Tools
server.tool(
  "validate_design_tokens",
  {
    css_content: z.string().describe("検証するCSSの内容"),
    component_name: z
      .string()
      .optional()
      .describe("コンポーネント名（オプション）"),
  },
  async ({ css_content, component_name }) => {
    // 各検証を実行
    const colorIssues = designValidator.validate(css_content);
    const typographyIssues = typographyValidator.validate(css_content);
    const elevationIssues = elevationValidator.validate(css_content);
    const layoutIssues = layoutValidator.validate(css_content);

    // すべての問題を統合
    const allIssues = [
      ...colorIssues.map((issue) => ({ category: "color", issue })),
      ...typographyIssues.map((issue) => ({ category: "typography", issue })),
      ...elevationIssues.map((issue) => ({ category: "elevation", issue })),
      ...layoutIssues.map((issue) => ({ category: "layout", issue })),
    ];

    const result = {
      component: component_name || "Unknown",
      is_compliant: allIssues.length === 0,
      validation_results: {
        color: {
          passed: colorIssues.length === 0,
          issues: colorIssues,
        },
        typography: {
          passed: typographyIssues.length === 0,
          issues: typographyIssues,
        },
        elevation: {
          passed: elevationIssues.length === 0,
          issues: elevationIssues,
        },
        layout: {
          passed: layoutIssues.length === 0,
          issues: layoutIssues,
        },
      },
      summary:
        allIssues.length === 0
          ? "デザイントークンに完全に準拠しています ✓"
          : `${allIssues.length}件の準拠違反が見つかりました`,
      total_issues: allIssues.length,
    };

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  },
);

server.tool(
  "analyze_component_structure",
  {
    component_path: z.string().describe("分析するコンポーネントのパス"),
  },
  async ({ component_path }) => {
    if (!existsSync(component_path)) {
      throw new Error(`Component path '${component_path}' not found`);
    }

    const structure = structureAnalyzer.analyze(component_path);
    const fileInfo = fileAnalyzer.analyze(component_path);

    const result = {
      path: component_path,
      structure: {
        has_styles: structure.hasStyles,
        has_tests: structure.hasTests,
        has_stories: structure.hasStories,
        has_index: structure.hasIndex,
      },
      files: fileInfo.files,
      recommendations: [] as string[],
    };

    // Add recommendations
    if (!structure.hasStyles) {
      result.recommendations.push(
        "スタイルファイル（.css または .module.css）を追加してください",
      );
    }
    if (!structure.hasTests) {
      result.recommendations.push(
        "テストファイル（.test.tsx または .spec.tsx）を追加してください",
      );
    }
    if (!structure.hasStories) {
      result.recommendations.push(
        "Storybookストーリー（.stories.tsx）を追加してください",
      );
    }
    if (!structure.hasIndex) {
      result.recommendations.push(
        "index.tsファイルを追加してエクスポートを整理してください",
      );
    }

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  },
);

server.tool(
  "validate_accessibility",
  {
    html_content: z.string().describe("検証するHTMLの内容"),
    component_name: z
      .string()
      .optional()
      .describe("コンポーネント名（オプション）"),
  },
  async ({ html_content, component_name }) => {
    // Basic accessibility checks
    const issues = [];

    // Check for alt attributes on images
    if (html_content.includes("<img") && !html_content.includes("alt=")) {
      issues.push("画像にalt属性が設定されていません");
    }

    // Check for proper heading hierarchy
    const headings = html_content.match(/<h[1-6]/g) || [];
    const headingLevels = headings.map((h) => parseInt(h.charAt(2)));
    for (let i = 1; i < headingLevels.length; i++) {
      const currentLevel = headingLevels[i];
      const previousLevel = headingLevels[i - 1];
      if (
        currentLevel !== undefined &&
        previousLevel !== undefined &&
        currentLevel - previousLevel > 1
      ) {
        issues.push("見出しレベルが適切な階層になっていません");
      }
    }

    // Check for form labels
    if (html_content.includes("<input") && !html_content.includes("<label")) {
      issues.push("フォーム要素にラベルが設定されていません");
    }

    // Check for button/link text
    if (
      html_content.match(/<button[^>]*>\s*<\/button>/) ||
      html_content.match(/<a[^>]*>\s*<\/a>/)
    ) {
      issues.push("ボタンまたはリンクにテキストが設定されていません");
    }

    const result = {
      component: component_name || "Unknown",
      is_accessible: issues.length === 0,
      issues: issues,
      summary:
        issues.length === 0
          ? "アクセシビリティ基準に準拠しています ✓"
          : `${issues.length}件のアクセシビリティ問題が見つかりました`,
      note: "この検証は基本的なチェックのみです。完全な検証にはaxe-coreなどの専門ツールの使用を推奨します。",
    };

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  },
);

// Start server
const transport = new StdioServerTransport();
server.connect(transport).then(() => {
  console.error("Design System Validator MCP Server started");
}).catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
