#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";

// ===== Types =====
interface DesignTokens {
  colors: Record<string, any>;
  typography: Record<string, any>;
  spacing: Record<string, string>;
  elevation: Record<string, string>;
  borderRadius: Record<string, string>;
  breakpoints: Record<string, string>;
  grid: Record<string, any>;
}

// ===== Constants & Utilities =====
const currentDir = new URL('.', import.meta.url).pathname;
const DESIGN_TOKENS_PATH = join(currentDir, "../../design-tokens/tokens.json");

// Load design tokens
let DESIGN_TOKENS: DesignTokens;
try {
  const tokensJson = readFileSync(DESIGN_TOKENS_PATH, "utf-8");
  DESIGN_TOKENS = JSON.parse(tokensJson);
} catch (error) {
  console.error("Failed to load design tokens:", error);
  process.exit(1);
}

// Extract valid values for validation
function collectColorValues(obj: unknown, values: Set<string> = new Set()): Set<string> {
  if (!obj || typeof obj !== "object") return values;
  for (const key in obj as Record<string, unknown>) {
    const value = (obj as Record<string, unknown>)[key];
    if (typeof value === "string" && value.startsWith("#")) {
      values.add(value.toUpperCase());
    } else if (typeof value === "object" && value !== null) {
      collectColorValues(value, values);
    }
  }
  return values;
}

const VALID_COLORS = collectColorValues(DESIGN_TOKENS.colors);
const VALID_SPACING = new Set(Object.values(DESIGN_TOKENS.spacing));

// ===== Design Token Provider =====
class DesignTokensProvider {
  getTokens() {
    return DESIGN_TOKENS;
  }

  getColors() {
    return DESIGN_TOKENS.colors;
  }

  getSpacing() {
    return DESIGN_TOKENS.spacing;
  }

  getTypography() {
    return DESIGN_TOKENS.typography;
  }

  getElevation() {
    return DESIGN_TOKENS.elevation;
  }

  getBorderRadius() {
    return DESIGN_TOKENS.borderRadius;
  }

  getBreakpoints() {
    return DESIGN_TOKENS.breakpoints;
  }

  getGrid() {
    return DESIGN_TOKENS.grid;
  }
}

// ===== Validators =====
class DesignTokenValidator {
  validate(cssContent: string): string[] {
    const issues: string[] = [];

    // Color validation
    const colorMatches = cssContent.matchAll(/#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}/g);
    for (const match of colorMatches) {
      const color = match[0].toUpperCase();
      if (!VALID_COLORS.has(color)) {
        issues.push(`未承認の色 '${color}' が使用されています`);
      }
    }

    // Spacing validation
    const spacingMatches = cssContent.matchAll(/\b\d+px\b/g);
    for (const match of spacingMatches) {
      const spacing = match[0];
      if (!VALID_SPACING.has(spacing)) {
        issues.push(`未承認のスペーシング '${spacing}' が使用されています`);
      }
    }

    return [...new Set(issues)];
  }
}

class ComponentAnalyzer {
  analyzeStructure(componentPath: string) {
    const result = {
      hasStyles: false,
      hasTests: false,
      hasStories: false,
      hasIndex: false,
      files: [] as string[]
    };

    try {
      const files = readdirSync(componentPath);
      result.files = files;
      
      // const componentName = componentPath.split("/").pop() ?? "";
      result.hasStyles = files.some(f => f.includes(".css"));
      result.hasTests = files.some(f => f.includes(".test.") || f.includes(".spec."));
      result.hasStories = files.some(f => f.includes(".stories."));
      result.hasIndex = files.includes("index.ts") || files.includes("index.tsx");
    } catch (error) {
      // Silently handle errors
    }

    return result;
  }
}

// ===== Initialize dependencies =====
const tokensProvider = new DesignTokensProvider();
const designValidator = new DesignTokenValidator();
const componentAnalyzer = new ComponentAnalyzer();

// ===== Create MCP Server =====
const server = new McpServer({
  name: "design-system-validator",
  version: "1.0.0",
});

// ===== Resources =====
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

// ===== Tools =====
server.tool(
  "validate_design_tokens",
  {
    css_content: z.string().describe("検証するCSSの内容"),
    component_name: z.string().optional().describe("コンポーネント名（オプション）"),
  },
  async ({ css_content, component_name }) => {
    const issues = designValidator.validate(css_content);
    
    const result = {
      component: component_name || "Unknown",
      is_compliant: issues.length === 0,
      issues,
      summary: issues.length === 0 
        ? "デザイントークンに完全に準拠しています ✓"
        : `${issues.length}件の準拠違反が見つかりました`,
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

    const structure = componentAnalyzer.analyzeStructure(component_path);
    const recommendations = [];

    if (!structure.hasStyles) {
      recommendations.push("スタイルファイル（.css または .module.css）を追加してください");
    }
    if (!structure.hasTests) {
      recommendations.push("テストファイル（.test.tsx または .spec.tsx）を追加してください");
    }
    if (!structure.hasStories) {
      recommendations.push("Storybookストーリー（.stories.tsx）を追加してください");
    }
    if (!structure.hasIndex) {
      recommendations.push("index.tsファイルを追加してエクスポートを整理してください");
    }

    const result = {
      path: component_path,
      structure,
      recommendations,
    };

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  },
);

// ===== Prompts =====
server.prompt(
  "design_system_review",
  {
    component_name: z.string().optional().describe("コンポーネント名"),
    css_content: z.string().optional().describe("検証するCSS内容")
  },
  async ({ component_name, css_content }) => {
    const instructions = `
# デザインシステム準拠性レビュー

以下の手順でコンポーネントを包括的に検証してください：

## 1. デザイントークン検証
\`validate_design_tokens\` ツールを使用してCSSの準拠性を確認

## 2. 承認済みカラーパレット確認
\`design-tokens://colors\` リソースで承認済みカラーを確認

## 3. レポート生成
以下の形式でレポートを作成：

### ✅ 準拠項目
- 使用されている承認済みトークン

### ⚠️ 改善推奨項目  
- 未承認トークンの代替案
- 修正具体例

### 📋 チェックリスト
- [ ] カラートークン準拠
- [ ] スペーシング準拠
- [ ] タイポグラフィ準拠

${component_name ? `\n対象コンポーネント: ${component_name}` : ""}
${css_content ? `\n\nCSS:\n\`\`\`css\n${css_content}\n\`\`\`` : ""}
`;

    return {
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text",
            text: instructions,
          },
        },
      ],
    };
  },
);

server.prompt(
  "component_audit",
  {
    component_path: z.string().optional().describe("監査するコンポーネントパス")
  },
  async ({ component_path }) => {
    const instructions = `
# コンポーネント構造監査

以下の手順でコンポーネント構造を監査してください：

## 1. 構造分析
\`analyze_component_structure\` ツールを使用して構造を分析

## 2. ベストプラクティス確認
- ファイル命名規則
- ディレクトリ構成
- 必須ファイルの存在

## 3. 改善提案
具体的な改善アクションプランを提示

## 4. 優先度評価
- 🔴 高優先度（必須）
- 🟡 中優先度（推奨）
- 🟢 低優先度（任意）

${component_path ? `\n対象パス: ${component_path}` : ""}
`;

    return {
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text",
            text: instructions,
          },
        },
      ],
    };
  },
);

// ===== Start Server =====
const transport = new StdioServerTransport();
server.connect(transport).then(() => {
  console.error("Design System Validator MCP Server started");
}).catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});