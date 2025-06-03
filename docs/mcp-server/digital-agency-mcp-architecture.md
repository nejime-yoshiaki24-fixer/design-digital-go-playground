# デジタル庁（Digital Agency）デザインシステムMCPサーバー アーキテクチャ設計

## 1. MCPの基本概念に基づく設計

### Resources（リソース）とTools（ツール）の明確な分離

MCPの設計原則に基づき、読み取り専用のデータアクセス（Resources）とアクション実行（Tools）を明確に分離します。

## 2. Resources（リソース）の定義

### 2.1 `da-design-system://components`

**目的**: デザインシステムの全コンポーネント一覧を提供

```typescript
{
  uri: "da-design-system://components",
  name: "Digital Agency Design System Components",
  description: "デジタル庁デザインシステムの全コンポーネント一覧",
  mimeType: "application/json"
}
```

**返却データ例**:

```json
{
  "version": "2.4.0",
  "components": [
    {
      "id": "button",
      "name": "ボタン",
      "englishName": "Button",
      "pageId": "8194:8625",
      "category": "action",
      "variants": ["primary", "secondary", "tertiary", "danger"]
    },
    {
      "id": "accordion",
      "name": "アコーディオン",
      "englishName": "Accordion",
      "pageId": "8191:8077",
      "category": "navigation",
      "variants": ["default", "bordered"]
    }
  ]
}
```

### 2.2 `da-design-system://components/{componentId}`

**目的**: 特定コンポーネントの詳細情報を提供

```typescript
{
  uri: "da-design-system://components/button",
  name: "Button Component Details",
  description: "ボタンコンポーネントの詳細情報",
  mimeType: "application/json"
}
```

### 2.3 `da-design-system://tokens`

**目的**: デザイントークンデータを提供

```typescript
{
  uri: "da-design-system://tokens?type={tokenType}",
  name: "Design Tokens",
  description: "色、タイポグラフィ、スペーシング等のデザイントークン",
  mimeType: "application/json"
}
```

**パラメータ**:

- `type`: colors | typography | spacing | all（省略時はall）

### 2.4 `da-design-system://docs/{componentId}`

**目的**: コンポーネントのドキュメントを提供

```typescript
{
  uri: "da-design-system://docs/button",
  name: "Component Documentation",
  description: "コンポーネントの使用方法とベストプラクティス",
  mimeType: "text/markdown"
}
```

## 3. Tools（ツール）の定義

### 3.1 `fetch_component_from_figma`

**目的**: Figmaから最新のコンポーネントデータを取得

```typescript
{
  name: "fetch_component_from_figma",
  description: "Figmaから指定されたコンポーネントの最新データを取得",
  inputSchema: {
    componentName: string, // "ボタン" or "button"
    includeVariants?: boolean,
    depth?: number
  }
}
```

### 3.2 `export_design_tokens`

**目的**: デザイントークンを指定形式でエクスポート

```typescript
{
  name: "export_design_tokens",
  description: "デザイントークンを指定されたフォーマットでエクスポート",
  inputSchema: {
    tokenType?: "colors" | "typography" | "spacing" | "all",
    format: "css" | "scss" | "js" | "json",
    outputPath?: string
  }
}
```

### 3.3 `generate_component_code`

**目的**: コンポーネントのコードを生成

```typescript
{
  name: "generate_component_code",
  description: "指定されたフレームワーク用のコンポーネントコードを生成",
  inputSchema: {
    componentName: string,
    framework: "react" | "vue" | "html",
    includeStyles?: boolean,
    useTokens?: boolean,
    outputPath?: string
  }
}
```

### 3.4 `validate_component_usage`

**目的**: コンポーネントの使用方法を検証

```typescript
{
  name: "validate_component_usage",
  description: "コードがデザインシステムのガイドラインに準拠しているか検証",
  inputSchema: {
    code: string,
    componentName: string,
    framework: string
  }
}
```

## 4. 実装アーキテクチャ

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
│  │   Resources      │  │     Tools         │            │
│  ├─────────────────┤  ├──────────────────┤            │
│  │ • components     │  │ • fetch_component │            │
│  │ • tokens        │  │ • export_tokens   │            │
│  │ • docs          │  │ • generate_code   │            │
│  └─────────────────┘  │ • validate_usage  │            │
│                       └──────────────────┘            │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────┐          │
│  │           Core Services                   │          │
│  ├─────────────────────────────────────────┤          │
│  │ • Component Registry                     │          │
│  │ • Token Manager                          │          │
│  │ • Code Generator                         │          │
│  │ • Documentation Provider                 │          │
│  └─────────────────────────────────────────┘          │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌──────────────────┐            │
│  │  Cache Layer    │  │  Data Sources    │            │
│  │ • Memory Cache  │  │ • Figma API      │            │
│  │ • File Cache   │  │ • Local Files    │            │
│  └─────────────────┘  └──────────────────┘            │
└─────────────────────────────────────────────────────────┘
```

## 5. セキュリティとベストプラクティス

### 5.1 リソースの設計原則

- **読み取り専用**: Resourcesは副作用を持たない
- **URIスキーム**: `da-design-system://` を使用して名前空間を明確化
- **キャッシュ可能**: 頻繁にアクセスされるデータはキャッシュ

### 5.2 ツールの設計原則

- **明確な責任**: 各ツールは単一の明確な目的を持つ
- **入力検証**: zodスキーマによる厳格な入力検証
- **エラーハンドリング**: 詳細なエラーメッセージと復旧可能性

### 5.3 パフォーマンス最適化

- **遅延読み込み**: 必要になるまでデータを読み込まない
- **増分更新**: 全体ではなく変更部分のみを更新
- **並列処理**: 独立したリクエストは並列で処理

## 6. 使用例

### LLMとの対話例

**ユーザー**: 「デジタル庁のボタンコンポーネントを使ってReactコンポーネントを作成して」

**LLMの処理フロー**:

1. Resource `da-design-system://components/button` を読み取り
2. Resource `da-design-system://tokens?type=colors` を読み取り
3. Tool `generate_component_code` を実行
4. 生成されたコードをユーザーに返却

### 実装コード例

```typescript
// Resources の実装例
server.resource(
  "da-design-system://components",
  "Digital Agency Design System Components",
  async () => {
    const registry = await componentRegistry.getAllComponents();
    return {
      mimeType: "application/json",
      text: JSON.stringify(registry, null, 2)
    };
  }
);

// Tools の実装例
server.tool(
  "generate_component_code",
  "指定されたフレームワーク用のコンポーネントコードを生成",
  {
    componentName: z.string(),
    framework: z.enum(["react", "vue", "html"]),
    includeStyles: z.boolean().optional().default(true),
    useTokens: z.boolean().optional().default(true)
  },
  async (params) => {
    const component = await componentRegistry.getComponent(params.componentName);
    const code = await codeGenerator.generate(component, params);
    return {
      content: [{ type: "text", text: code }]
    };
  }
);
```

この設計により、MCPの原則に従った、明確で保守可能なデジタル庁デザインシステムMCPサーバーを実現できます。
