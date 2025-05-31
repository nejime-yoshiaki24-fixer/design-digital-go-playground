# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

このMCPサーバーは、デジタル庁デザインシステムの検証に特化したModel Context Protocol (MCP)サーバーです。TypeScriptで実装され、デザイントークン準拠性、アクセシビリティ、コンポーネント構造の検証機能を提供します。

## Commands

### Development

```bash
# 開発モードで起動（推奨）
npm run dev

# ビルド
npm run build

# プロダクションモードで起動
npm start

# MCPインスペクターでテスト
npx @modelcontextprotocol/inspector dist/index.js
```

### Quality Checks

```bash
# 型チェック
npm run typecheck

# リンティング
npm run lint

# フォーマット
npm run format

# テスト実行
npm test

# すべてのチェックを実行
npm run typecheck && npm run lint && npm test
```

## Architecture

### ディレクトリ構成

```
mcp-server/
├── src/
│   ├── index.ts         # MCPサーバーのエントリーポイント
│   ├── core/            # 共通機能
│   │   ├── constants/   # 定数定義
│   │   ├── types/       # 型定義
│   │   └── utils/       # ユーティリティ関数
│   ├── resources/       # MCPリソース
│   │   └── tokens/      # デザイントークンプロバイダー
│   └── tools/          # MCP検証ツール
│       ├── analyze/    # コンポーネント構造分析
│       └── validate/   # デザイントークン検証
├── shared/             # 共有リソース
│   └── design-tokens.json # デザイントークン定義
└── tests/              # テストファイル
```

### 提供機能

**Resources:**
- `design-tokens://all` - すべてのデザイントークン
- `design-tokens://colors` - カラートークン
- `design-tokens://spacing` - スペーシングトークン
- `design-tokens://typography` - タイポグラフィトークン
- `design-tokens://elevation` - エレベーション（影）定義
- `design-tokens://layout` - レイアウト・グリッド・ブレークポイント定義

**Tools:**
- `validate_design_tokens` - CSSのデザイントークン準拠性検証
- `analyze_component_structure` - コンポーネント構造の分析
- `validate_accessibility` - 基本的なアクセシビリティチェック

### 重要な制約

1. **検証特化**: このサーバーは検証機能に特化しており、コンポーネント生成や同期機能は含まれません
2. **TypeScript専用**: すべての実装はTypeScriptで行われています
3. **デザイントークン**: デジタル庁の承認済みトークンのみを基準として使用

### デザイントークン

**承認済みカラー:**
- プライマリ: #0017C1
- グレースケール: #1A1A1C, #595959, #767676, #D9D9D9, #F0F0F0, #FFFFFF
- セマンティック: #D32F2F (エラー), #FFC107 (警告), #4CAF50 (成功)

**標準スペーシング:**
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px

### 開発フロー

1. 検証機能の追加・修正時は対応するtoolsモジュールを編集
2. `npm run typecheck`で型チェック
3. `npm run lint`でリンティング
4. `npm test`でテスト実行
5. `npm run dev`で動作確認

## MCP Server実装詳細

### サーバー初期化

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "design-system-validator",
  version: "1.0.0",
});
```

### リソース定義

```typescript
server.resource(
  "design-tokens-all",
  "design-tokens://all",
  async (uri) => ({
    contents: [{
      uri: uri.href,
      text: JSON.stringify(tokensProvider.getTokens(), null, 2),
    }],
  }),
);
```

### ツール定義

```typescript
server.tool(
  "validate_design_tokens",
  {
    css_content: z.string().describe("検証するCSSの内容"),
    component_name: z.string().optional().describe("コンポーネント名"),
  },
  async ({ css_content, component_name }) => {
    // 検証ロジック
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  },
);
```

## Claude Desktopでの使用

```json
{
  "mcpServers": {
    "design-system-validator": {
      "command": "node",
      "args": ["/path/to/mcp-server/dist/bin/server.js"]
    }
  }
}
```

## トラブルシューティング

1. **ビルドエラー**: `npm run build`でTypeScriptコンパイルエラーが出る場合は、`npm run typecheck`で詳細を確認
2. **実行時エラー**: `console.error`でデバッグメッセージを出力して確認
3. **MCP接続エラー**: MCPインスペクターでサーバーの応答を確認