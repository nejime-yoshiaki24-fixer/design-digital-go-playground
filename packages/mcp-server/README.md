# Design System Validator MCP Server

デジタル庁デザインシステムの検証に特化したModel Context Protocol (MCP)サーバーです。

## 概要

このMCPサーバーは、Reactコンポーネントやスタイルシートがデジタル庁デザインシステムに準拠しているかを検証するための専用ツールです。デザイントークンの適用状況、アクセシビリティ基準への準拠、コンポーネント構造の適切性などを自動的にチェックできます。

## 主な機能

### Resources（静的データ提供）
- **design-tokens://all** - すべてのデザイントークン
- **design-tokens://colors** - カラーパレット定義
- **design-tokens://spacing** - スペーシング定義
- **design-tokens://typography** - タイポグラフィ定義
- **design-tokens://elevation** - エレベーション（影）定義
- **design-tokens://layout** - レイアウト・グリッド・ブレークポイント定義

### Tools（検証機能）
- **validate_design_tokens** - CSSがデザイントークンに準拠しているか検証
- **analyze_component_structure** - コンポーネントの構造を分析して問題を検出
- **validate_accessibility** - 基本的なアクセシビリティチェック（JIS X 8341-3:2016準拠）

## インストール

```bash
# 依存関係のインストール
npm install

# TypeScriptのビルド
npm run build
```

## 使用方法

### 開発モード

```bash
npm run dev
```

### MCPインスペクターでのテスト

```bash
npx @modelcontextprotocol/inspector dist/bin/server.js
```

### Claude Desktopでの使用

`claude_desktop_config.json`に以下を追加：

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

### コマンドラインでの使用

```bash
# ビルド後
npm start

# または直接実行
node dist/bin/server.js
```

## 開発

### ディレクトリ構成

```
mcp-server/
├── bin/
│   └── server.ts         # MCPサーバーのエントリーポイント
├── src/
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

### 開発コマンド

```bash
# 型チェック
npm run typecheck

# リンティング
npm run lint

# フォーマット
npm run format

# テスト実行
npm test
```

## 検証例

### デザイントークン検証

```javascript
// MCPクライアントから呼び出し
const result = await client.callTool("validate_design_tokens", {
  css_content: ".button { color: #0017C1; padding: 8px; }",
  component_name: "Button"
});
```

### コンポーネント構造分析

```javascript
const result = await client.callTool("analyze_component_structure", {
  component_path: "/path/to/components/Button"
});
```

### アクセシビリティ検証

```javascript
const result = await client.callTool("validate_accessibility", {
  html_content: "<button>クリック</button>",
  component_name: "Button"
});
```

## 技術スタック

- **TypeScript** - 型安全な開発
- **MCP SDK** - Model Context Protocol実装
- **Zod** - スキーマ検証
- **Jest** - テストフレームワーク

## ライセンス

MIT