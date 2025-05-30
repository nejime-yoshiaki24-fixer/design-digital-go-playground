# MCPサーバー開発アーキテクチャガイド

## 概要

Model Context Protocol (MCP) は、LLMアプリケーションとツール・データソース間の標準化された通信プロトコルです。本ガイドでは、MCPサーバー開発における推奨アーキテクチャとベストプラクティスを解説します。

## アーキテクチャ概要

### コアコンポーネント

MCPは以下の主要コンポーネントで構成されます：

1. **MCPホスト**
   - Claude Desktop、IDE、AIツールなどのアプリケーション
   - 複数のMCPクライアントを管理

2. **MCPクライアント**
   - ホストアプリケーション内のプロトコルハンドラ
   - サーバーとの1:1接続を維持

3. **MCPサーバー**
   - 特定の機能を公開する軽量プログラム
   - 標準化されたプロトコルでやり取り

4. **データソース**
   - ローカルファイル、データベース、外部APIなど
   - MCPサーバーが安全にアクセス

### 通信フロー

```
[LLM/ホスト] <-> [MCPクライアント] <-> [MCPサーバー] <-> [データソース/API]
```

## 推奨アーキテクチャパターン

### 1. レイヤードアーキテクチャ

```
┌─────────────────────────────┐
│   プレゼンテーション層      │ (MCP Protocol Handler)
├─────────────────────────────┤
│      ビジネスロジック層      │ (Tools, Resources, Prompts)
├─────────────────────────────┤
│    データアクセス層          │ (External APIs, DB)
└─────────────────────────────┘
```

### 2. プロジェクト構造

#### TypeScript

```
mcp-server/
├── src/
│   ├── index.ts           # エントリーポイント
│   ├── server.ts          # MCPサーバー設定
│   ├── tools/             # ツール実装
│   │   └── calculator.ts
│   ├── resources/         # リソース実装
│   │   └── data.ts
│   ├── prompts/           # プロンプトテンプレート
│   │   └── templates.ts
│   └── utils/             # ユーティリティ
├── package.json
├── tsconfig.json
└── README.md
```

#### Python

```
mcp-server/
├── src/
│   ├── __init__.py
│   ├── main.py            # エントリーポイント
│   ├── server.py          # MCPサーバー設定
│   ├── tools/             # ツール実装
│   │   ├── __init__.py
│   │   └── calculator.py
│   ├── resources/         # リソース実装
│   │   └── data.py
│   ├── prompts/           # プロンプトテンプレート
│   │   └── templates.py
│   └── utils/             # ユーティリティ
├── requirements.txt
└── README.md
```

## 実装例

### TypeScript実装

```typescript
// src/index.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "example-server",
  version: "1.0.0"
});

// ツールの登録
server.tool({
  name: "calculate",
  description: "数値計算を実行",
  inputSchema: {
    type: "object",
    properties: {
      operation: { type: "string", enum: ["add", "subtract", "multiply", "divide"] },
      a: { type: "number" },
      b: { type: "number" }
    },
    required: ["operation", "a", "b"]
  }
}, async ({ operation, a, b }) => {
  switch (operation) {
    case "add": return { result: a + b };
    case "subtract": return { result: a - b };
    case "multiply": return { result: a * b };
    case "divide": 
      if (b === 0) throw new Error("Division by zero");
      return { result: a / b };
  }
});

// サーバー起動
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Python実装（FastMCP使用）

```python
# src/main.py
from fastmcp import FastMCP

mcp = FastMCP("計算サーバー")

@mcp.tool()
def add(a: int, b: int) -> int:
    """二つの数値を加算"""
    return a + b

@mcp.tool()
def multiply(a: int, b: int) -> int:
    """二つの数値を乗算"""
    return a * b

@mcp.resource("data://calculations/history")
def get_calculation_history():
    """計算履歴を取得"""
    return {"history": [{"operation": "add", "result": 10}]}

if __name__ == "__main__":
    mcp.run()
```

## ベストプラクティス

### 1. セキュリティ

#### 認証・認可

- **stdioトランスポート**: プロセス実行のセキュリティコンテキストに依存
- **HTTPトランスポート**: OAuth 2.0/2.1ベースの認証を実装
  - Authorization Code with PKCE フローを使用
  - 動的クライアント登録をサポート
  - スコープベースのアクセス制御

#### 入力検証

```typescript
// パストラバーサル防止
import { resolve, normalize } from 'path';

function validatePath(userPath: string, basePath: string): string {
  const resolved = resolve(basePath, userPath);
  if (!resolved.startsWith(basePath)) {
    throw new Error("Invalid path");
  }
  return resolved;
}
```

#### データ保護

- TLS/HTTPSを必須化（ネットワークトランスポート）
- 機密データの暗号化
- ロギングでの機密情報マスキング

### 2. エラーハンドリング

```typescript
class MCPError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number
  ) {
    super(message);
  }
}

// 使用例
throw new MCPError(
  "リソースが見つかりません",
  "RESOURCE_NOT_FOUND",
  404
);
```

### 3. レート制限

```python
from functools import wraps
import time

def rate_limit(calls: int, period: int):
    def decorator(func):
        calls_made = []
        
        @wraps(func)
        def wrapper(*args, **kwargs):
            now = time.time()
            calls_made[:] = [c for c in calls_made if c > now - period]
            
            if len(calls_made) >= calls:
                raise Exception("Rate limit exceeded")
            
            calls_made.append(now)
            return func(*args, **kwargs)
        
        return wrapper
    return decorator

@mcp.tool()
@rate_limit(calls=10, period=60)  # 1分間に10回まで
def external_api_call():
    pass
```

### 4. 非同期処理

```typescript
// 非同期リソース取得
server.resource({
  uri: "data://async/resource",
  name: "非同期リソース",
  mimeType: "application/json"
}, async () => {
  // 外部APIコール
  const data = await fetch('https://api.example.com/data');
  return await data.json();
});
```

### 5. テスト

```typescript
// Jest を使用したテスト例
describe('Calculator Tool', () => {
  let server: McpServer;
  
  beforeEach(() => {
    server = new McpServer({ name: "test", version: "1.0.0" });
  });
  
  test('加算が正しく動作する', async () => {
    const result = await server.callTool('add', { a: 2, b: 3 });
    expect(result).toEqual({ result: 5 });
  });
});
```

## トランスポート選択

| トランスポート | 用途 | メリット | デメリット |
|--------------|-----|--------|----------|
| stdio | ローカル実行 | シンプル、高速 | リモート不可 |
| HTTP/SSE | リモートアクセス | スケーラブル | 認証が複雑 |
| WebSocket | リアルタイム通信 | 双方向、低レイテンシ | 接続管理が必要 |

## デプロイメント

### ローカルサーバー

```json
// Claude Desktop 設定
{
  "mcpServers": {
    "calculator": {
      "command": "node",
      "args": ["./build/index.js"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### リモートサーバー（Cloudflare）

- OAuth統合が組み込み済み
- 自動スケーリング
- グローバルエッジネットワーク

## パフォーマンス最適化

1. **キャッシング戦略**
   - リソースの適切なキャッシュ
   - 計算結果のメモ化

2. **バッチ処理**
   - 複数リクエストの効率的処理
   - データベースクエリの最適化

3. **接続プーリング**
   - データベース接続の再利用
   - 外部API接続の管理

## まとめ

MCPサーバー開発では、セキュリティ、スケーラビリティ、保守性を考慮したアーキテクチャが重要です。標準化されたプロトコルに従いながら、各言語の特性を活かした実装を行うことで、堅牢で再利用可能なMCPサーバーを構築できます。
