# Anthropic推奨 MCP Server エラーハンドリング ガイド

## 概要

このドキュメントは、AnthropicがModel Context Protocol (MCP) サーバーにおいて推奨するエラーハンドリング方法について、公式ドキュメント、実装例、セキュリティガイドラインを基に徹底調査した結果をまとめています。

## 基本原則

### 1. 階層化されたエラーハンドリング

MCPサーバーでは以下の3層でエラーハンドリングを実装することが推奨されています：

#### プロトコル層

JSON-RPC 2.0標準に準拠したエラー応答

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32602,
    "message": "Invalid params",
    "data": { "details": "具体的なエラー詳細" }
  }
}
```

#### アプリケーション層

`isError`フラグによる業務エラー処理

```json
{
  "jsonrpc": "2.0", 
  "id": 2,
  "result": {
    "content": [{ 
      "type": "text", 
      "text": "エラー: APIレート制限に達しました" 
    }],
    "isError": true
  }
}
```

#### トランスポート層

接続・通信レベルのエラー管理

```typescript
async function handleTransportError(error: Error) {
  console.error("Transport error:", error.message);
  // 再接続やフェイルオーバー処理
  await reconnectWithBackoff();
}
```

### 2. 一貫性のあるエラー応答形式

すべてのエラーレスポンスで統一された形式を使用：

```typescript
interface StandardErrorResponse {
  success: boolean;
  error?: {
    code: string;
    message: string;
    context?: string;
    timestamp: string;
  };
  data?: any;
}
```

## Claude Desktop統合におけるセキュリティ要件

### APIキー管理

```typescript
// 推奨パターン: 環境変数からの安全な読み込み
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  throw new Error("ANTHROPIC_API_KEY is not set");
}

// セキュア初期化
const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY,
});
```

### エラー情報の秘匿

```typescript
// 内部エラーを安全に公開
try {
  const result = await sensitiveOperation();
  return { content: [{ type: "text", text: result }] };
} catch (error) {
  // 内部詳細を隠蔽し、安全なメッセージのみ返却
  return {
    content: [{ 
      type: "text", 
      text: "処理中にエラーが発生しました。管理者にお問い合わせください。" 
    }],
    isError: true
  };
}
```

### プライバシー保護

- 個人情報を含むエラーメッセージの回避
- ログ出力時の機密情報マスキング
- エラー詳細の適切な抽象化

## Anthropicサンプル実装のパターン

### try-catchの一貫した使用

```typescript
async chatLoop(): Promise<void> {
  const askQuestion = () => {
    rl.question("\nQuery: ", async (query: string) => {
      try {
        if (query.toLowerCase() === "quit") {
          await this.cleanup();
          rl.close();
          return;
        }

        const response = await this.processQuery(query);
        console.log("\n" + response);
        askQuestion();
      } catch (error) {
        console.error("\nError:", error);
        askQuestion(); // 継続可能なエラー処理
      }
    });
  };
}
```

### Claude API統合のエラーハンドリング

```typescript
async processQuery(query: string): Promise<string> {
  if (!this.client) {
    throw new Error("Client not connected");
  }
  
  // Claude APIとの安全な通信
  try {
    const response = await this.anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1000,
      messages,
      tools: availableTools,
    });
    // 処理続行...
  } catch (error) {
    // Claude API固有のエラー処理
    throw new Error(`Claude API error: ${error.message}`);
  }
}
```

### サンプリング機能の堅牢な実装

```typescript
// サンプリングサポート確認
if (exchange.getClientCapabilities().sampling() == null) {
  return new CallToolResult(
    "Client does not support AI capabilities", 
    false
  );
}
```

## セキュリティ・プライバシー観点の要件

### 機密情報の保護

#### 1. 環境変数による設定

```json
{
  "mcpServers": {
    "secure-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-secure"],
      "env": {
        "API_KEY": "※実際のキーは環境変数から",
        "DATABASE_URL": "※機密情報は設定ファイルから除外"
      }
    }
  }
}
```

#### 2. ログの安全な出力

```typescript
// ログレベルの適切な使用
server.loggingNotification(LoggingMessageNotification.builder()
  .level(LoggingLevel.INFO)  // 機密情報は DEBUG レベル以下で出力
  .logger("mcp-server")
  .data("操作完了")  // 具体的な内容は含めない
  .build());
```

### データ検証とサニタイゼーション

```typescript
// 入力検証の強化
server.tool(
  "secure_operation",
  {
    user_input: z.string()
      .min(1)
      .max(1000)
      .refine(input => !input.includes('<script'), {
        message: "不正な文字が含まれています"
      })
  },
  async ({ user_input }) => {
    // 安全な処理...
  }
);
```

## Claude Code統合推奨パターン

### 開発環境での適切なエラー報告

```typescript
// 開発時の詳細なエラー情報
const isDevelopment = process.env.NODE_ENV === 'development';

catch (error) {
  const errorMessage = isDevelopment 
    ? `詳細エラー: ${error.stack}` 
    : "エラーが発生しました";
    
  return {
    content: [{ type: "text", text: errorMessage }],
    isError: true
  };
}
```

### リソースアクセスの権限管理

```typescript
// ファイルアクセスの安全な制限
server.tool("read_file", { path: z.string() }, async ({ path }) => {
  const allowedPaths = ['/allowed/directory', '/project/root'];
  const absolutePath = path.resolve(path);
  
  if (!allowedPaths.some(allowed => absolutePath.startsWith(allowed))) {
    throw new Error("アクセス権限がありません");
  }
  
  // 安全な処理続行...
});
```

## 実装ガイドライン

### Level 1: 基本設計原則

1. **Fail Fast**: 早期のエラー検出と報告
2. **Graceful Degradation**: 部分的な障害でも継続可能な設計
3. **Security by Default**: デフォルトで安全な設定

### Level 2: 実装パターン

#### 統一エラーハンドラー

```typescript
class AnthropicMCPErrorHandler {
  static async handleToolError<T>(
    operation: () => Promise<T>,
    context: string,
    fallbackValue?: T
  ) {
    try {
      return await operation();
    } catch (error) {
      // 構造化ログ出力
      console.error(`[${context}] Error:`, {
        message: error.message,
        timestamp: new Date().toISOString(),
        context
      });
      
      if (fallbackValue !== undefined) {
        return fallbackValue;
      }
      
      return {
        content: [{
          type: "text",
          text: "処理中にエラーが発生しました。"
        }],
        isError: true
      };
    }
  }
}
```

#### リトライ機能付きClaude API呼び出し

```typescript
async function callClaudeWithRetry(
  anthropic: Anthropic,
  params: any,
  maxRetries: number = 3
) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await anthropic.messages.create(params);
    } catch (error) {
      if (attempt === maxRetries) throw error;
      
      const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

### Level 3: モニタリング・観測性

#### ヘルスチェック機能

```typescript
server.tool("health_check", {}, async () => {
  const health = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    anthropic_api: await checkAnthropicAPI(),
    database: await checkDatabase(),
    dependencies: await checkDependencies()
  };
  
  return {
    content: [{ type: "text", text: JSON.stringify(health, null, 2) }]
  };
});
```

## 現在プロジェクトへの適用推奨事項

### 即座に実装すべき改善

#### 1. 統一エラーハンドラーの導入

```typescript
// mcp-server/src/main.ts への追加
class DesignSystemErrorHandler {
  static handleValidationError(error: Error, component: string) {
    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          component,
          error: error.message,
          timestamp: new Date().toISOString(),
          type: "validation_error"
        }, null, 2)
      }],
      isError: true
    };
  }
  
  static handleComponentAnalysisError(error: Error, path: string) {
    console.error(`[ComponentAnalysis] Error analyzing ${path}:`, error.message);
    
    if (error.code === 'ENOENT') {
      return {
        content: [{
          type: "text",
          text: `コンポーネントパス '${path}' が見つかりません`
        }],
        isError: true
      };
    }
    
    return {
      content: [{
        type: "text",
        text: "コンポーネント分析中にエラーが発生しました"
      }],
      isError: true
    };
  }
}
```

#### 2. セキュアな設定管理

```typescript
// 環境変数による設定の安全な読み込み
const config = {
  tokensPath: process.env.DESIGN_TOKENS_PATH || 
              join(currentDir, "../../design-tokens/tokens.json"),
  logLevel: process.env.LOG_LEVEL || "INFO",
  allowedPaths: process.env.ALLOWED_PATHS?.split(',') || [],
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || "1048576") // 1MB
};

// 設定検証
if (!existsSync(config.tokensPath)) {
  console.error(`Design tokens file not found: ${config.tokensPath}`);
  process.exit(1);
}
```

#### 3. ツール実装の改善例

```typescript
server.tool(
  "validate_design_tokens",
  {
    css_content: z.string().max(100000, "CSSコンテンツが大きすぎます"),
    component_name: z.string().optional().describe("コンポーネント名")
  },
  async ({ css_content, component_name }) => {
    return DesignSystemErrorHandler.handleToolError(
      async () => {
        const issues = designValidator.validate(css_content);
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              component: component_name || "Unknown",
              is_compliant: issues.length === 0,
              issues,
              summary: issues.length === 0 
                ? "デザイントークンに完全に準拠しています ✓"
                : `${issues.length}件の準拠違反が見つかりました`,
              timestamp: new Date().toISOString()
            }, null, 2)
          }]
        };
      },
      "validate_design_tokens"
    );
  }
);
```

## まとめ

Anthropicが推奨するMCPサーバーのエラーハンドリングは以下の特徴があります：

### 主要な推奨事項

1. **階層化アプローチ**: プロトコル・アプリケーション・トランスポート各層での適切な処理
2. **セキュリティファースト**: APIキー保護、エラー情報の適切な秘匿
3. **Claude統合最適化**: Claude APIとの堅牢な連携パターン
4. **開発者体験重視**: 明確なエラーメッセージと診断情報

### 実装の鍵

- 一貫したエラー形式の使用
- 機密情報の適切な保護
- フォールバック機能による可用性確保
- 構造化ログによる運用性向上

これらの推奨事項を段階的に適用することで、Anthropicの基準に準拠した堅牢なMCPサーバーを構築できます。
