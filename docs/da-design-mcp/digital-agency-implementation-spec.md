# デジタル庁デザインシステムMCPサーバー 技術実装仕様

## 1. アーキテクチャ概要

```
┌─────────────────────────────────────────────────────────┐
│                    MCP Client (Cursor等)                 │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│              Digital Agency MCP Server                   │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌──────────────────┐            │
│  │  新規ツール      │  │  既存ツール       │            │
│  ├─────────────────┤  ├──────────────────┤            │
│  │ • get_component  │  │ • get_figma_data │            │
│  │ • get_tokens    │  │ • download_images│            │
│  │ • generate_code │  └──────────────────┘            │
│  └─────────────────┘                                   │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌──────────────────┐            │
│  │ Component       │  │  Token           │            │
│  │ Registry        │  │  Manager         │            │
│  └─────────────────┘  └──────────────────┘            │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│                      Figma API                          │
└─────────────────────────────────────────────────────────┘
```

## 2. 主要コンポーネントの実装詳細

### A. Component Registry (`src/services/component-registry.ts`)

```typescript
import { ComponentMapping } from "../types/digital-agency.js";

export class ComponentRegistry {
  private components: Map<string, ComponentMapping>;
  
  constructor() {
    this.components = new Map();
    this.loadComponentMappings();
  }
  
  private loadComponentMappings(): void {
    // agent-docs/figma-pages-list.md から読み込み
    const mappings: ComponentMapping[] = [
      {
        name: "ボタン",
        englishName: "button",
        pageId: "8194:8625",
        description: "ユーザーのアクションを促すための基本的なボタンコンポーネント",
        variants: ["primary", "secondary", "tertiary", "danger"]
      },
      {
        name: "アコーディオン",
        englishName: "accordion",
        pageId: "8191:8077",
        description: "コンテンツを折りたたみ可能なセクションで表示",
        variants: ["default", "bordered"]
      },
      // ... 他のコンポーネント
    ];
    
    mappings.forEach(mapping => {
      this.components.set(mapping.name, mapping);
      this.components.set(mapping.englishName, mapping);
    });
  }
  
  getComponent(name: string): ComponentMapping | undefined {
    return this.components.get(name);
  }
  
  getAllComponents(): ComponentMapping[] {
    return Array.from(new Set(this.components.values()));
  }
}
```

### B. Token Manager (`src/services/token-manager.ts`)

```typescript
import { DesignTokens } from "../types/digital-agency.js";
import tokensData from "../../agent-docs/tokens.json" assert { type: "json" };

export class TokenManager {
  private tokens: DesignTokens;
  
  constructor() {
    this.tokens = tokensData as DesignTokens;
  }
  
  getTokens(type?: string): any {
    if (!type) return this.tokens;
    return this.tokens[type];
  }
  
  generateCSSVariables(): string {
    const cssVars: string[] = [":root {"];
    
    // Colors
    Object.entries(this.tokens.colors).forEach(([key, value]) => {
      if (typeof value === "string") {
        cssVars.push(`  --color-${key}: ${value};`);
      } else if (typeof value === "object") {
        Object.entries(value).forEach(([shade, color]) => {
          cssVars.push(`  --color-${key}-${shade}: ${color};`);
        });
      }
    });
    
    // Spacing
    Object.entries(this.tokens.spacing).forEach(([key, value]) => {
      cssVars.push(`  --spacing-${key}: ${value};`);
    });
    
    cssVars.push("}");
    return cssVars.join("\n");
  }
  
  mapTokensToComponent(component: any): any {
    // コンポーネントのスタイルプロパティをトークンにマッピング
    const mappedComponent = { ...component };
    
    // 色のマッピング
    if (component.fills?.length > 0) {
      component.fills.forEach((fill: any) => {
        if (fill.color) {
          const tokenKey = this.findMatchingColorToken(fill.color);
          if (tokenKey) {
            fill.tokenReference = tokenKey;
          }
        }
      });
    }
    
    return mappedComponent;
  }
  
  private findMatchingColorToken(color: any): string | null {
    // RGB値から最も近いトークンを検索
    // 実装の詳細は省略
    return null;
  }
}
```

### C. 新規MCPツールの実装 (`src/tools/digital-agency-tools.ts`)

```typescript
import { z } from "zod";
import { ComponentRegistry } from "../services/component-registry.js";
import { TokenManager } from "../services/token-manager.js";
import { FigmaService } from "../services/figma.js";

export function registerDigitalAgencyTools(
  server: McpServer,
  figmaService: FigmaService
): void {
  const componentRegistry = new ComponentRegistry();
  const tokenManager = new TokenManager();
  const FIGMA_FILE_ID = "9j4ZiexATdYbwkE4CBIMGM";
  
  // Tool 1: get_design_system_component
  server.tool(
    "get_design_system_component",
    "デジタル庁デザインシステムの特定のコンポーネントを取得",
    {
      componentName: z.string().describe("コンポーネント名（日本語または英語）"),
      includeVariants: z.boolean().optional().describe("バリアントを含めるか"),
      includeTokens: z.boolean().optional().describe("適用されているトークンを含めるか")
    },
    async ({ componentName, includeVariants = true, includeTokens = true }) => {
      const component = componentRegistry.getComponent(componentName);
      if (!component) {
        throw new Error(`コンポーネント "${componentName}" が見つかりません`);
      }
      
      // Figmaからコンポーネントデータを取得
      const figmaData = await figmaService.getNode(
        FIGMA_FILE_ID,
        component.pageId
      );
      
      // トークンのマッピング
      let enhancedData = figmaData;
      if (includeTokens) {
        enhancedData = tokenManager.mapTokensToComponent(figmaData);
      }
      
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            component: component,
            design: enhancedData,
            tokens: includeTokens ? tokenManager.getTokens() : undefined
          }, null, 2)
        }]
      };
    }
  );
  
  // Tool 2: get_design_tokens
  server.tool(
    "get_design_tokens",
    "デジタル庁デザインシステムのデザイントークンを取得",
    {
      tokenType: z.enum(["colors", "typography", "spacing", "all"]).optional(),
      format: z.enum(["css", "scss", "js", "json"]).optional()
    },
    async ({ tokenType = "all", format = "json" }) => {
      const tokens = tokenManager.getTokens(tokenType === "all" ? undefined : tokenType);
      
      let output: string;
      switch (format) {
        case "css":
          output = tokenManager.generateCSSVariables();
          break;
        case "scss":
          output = generateSCSSVariables(tokens);
          break;
        case "js":
          output = `export const tokens = ${JSON.stringify(tokens, null, 2)};`;
          break;
        default:
          output = JSON.stringify(tokens, null, 2);
      }
      
      return {
        content: [{ type: "text", text: output }]
      };
    }
  );
  
  // Tool 3: generate_component_code
  server.tool(
    "generate_component_code",
    "コンポーネントのコードを生成",
    {
      componentName: z.string(),
      framework: z.enum(["react", "vue", "html"]),
      includeStyles: z.boolean().optional(),
      useTokens: z.boolean().optional()
    },
    async ({ componentName, framework, includeStyles = true, useTokens = true }) => {
      const component = componentRegistry.getComponent(componentName);
      if (!component) {
        throw new Error(`コンポーネント "${componentName}" が見つかりません`);
      }
      
      const figmaData = await figmaService.getNode(
        FIGMA_FILE_ID,
        component.pageId
      );
      
      let code: string;
      switch (framework) {
        case "react":
          code = generateReactComponent(component, figmaData, useTokens);
          break;
        case "vue":
          code = generateVueComponent(component, figmaData, useTokens);
          break;
        case "html":
          code = generateHTMLComponent(component, figmaData, useTokens);
          break;
      }
      
      return {
        content: [{ type: "text", text: code }]
      };
    }
  );
}
```

## 3. 型定義 (`src/types/digital-agency.ts`)

```typescript
export interface ComponentMapping {
  name: string;
  englishName: string;
  pageId: string;
  description?: string;
  variants?: string[];
  examples?: ComponentExample[];
}

export interface ComponentExample {
  name: string;
  props: Record<string, any>;
  description?: string;
}

export interface DesignTokens {
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  elevation: ElevationTokens;
  borderRadius: BorderRadiusTokens;
  breakpoints: BreakpointTokens;
  grid: GridTokens;
  zIndex: ZIndexTokens;
  transition: TransitionTokens;
  components: ComponentTokens;
}

export interface ColorTokens {
  primary: string;
  secondary: string;
  [key: string]: string | Record<string, string>;
}

// ... 他のトークン型定義
```

## 4. 設定ファイルの構造

### `config/digital-agency-components.yaml`

```yaml
version: "2.4.0"
fileId: "9j4ZiexATdYbwkE4CBIMGM"
lastUpdated: "2025-05-29T06:40:36Z"

components:
  - name: ボタン
    englishName: button
    pageId: "8194:8625"
    category: action
    variants:
      - primary
      - secondary
      - tertiary
      - danger
    examples:
      - name: プライマリボタン
        props:
          variant: primary
          size: medium
          text: 送信する
      - name: キャンセルボタン
        props:
          variant: secondary
          size: medium
          text: キャンセル
    
  - name: アコーディオン
    englishName: accordion
    pageId: "8191:8077"
    category: navigation
    variants:
      - default
      - bordered
    
  # ... 他のコンポーネント
```

## 5. キャッシュ戦略

```typescript
export class ComponentCache {
  private cache: Map<string, CacheEntry>;
  private maxAge: number = 3600000; // 1時間
  
  set(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }
  
  get(key: string): any | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() - entry.timestamp > this.maxAge) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }
}
```

## 6. エラーハンドリング

```typescript
export class DigitalAgencyError extends Error {
  constructor(
    message: string,
    public code: string,
    public componentName?: string
  ) {
    super(message);
    this.name = "DigitalAgencyError";
  }
}

// 使用例
if (!component) {
  throw new DigitalAgencyError(
    `コンポーネントが見つかりません`,
    "COMPONENT_NOT_FOUND",
    componentName
  );
}
```

## 7. テスト戦略

```typescript
// src/tests/digital-agency.test.ts
describe("Digital Agency MCP Tools", () => {
  describe("get_design_system_component", () => {
    it("日本語名でコンポーネントを取得できる", async () => {
      const result = await getComponent("ボタン");
      expect(result.component.pageId).toBe("8194:8625");
    });
    
    it("英語名でコンポーネントを取得できる", async () => {
      const result = await getComponent("button");
      expect(result.component.pageId).toBe("8194:8625");
    });
  });
  
  describe("get_design_tokens", () => {
    it("CSS形式でトークンを出力できる", async () => {
      const result = await getTokens("colors", "css");
      expect(result).toContain("--color-primary: #0017C1");
    });
  });
});
```

この実装仕様により、デジタル庁デザインシステムに特化した機能を既存のMCPサーバーに統合できます。
