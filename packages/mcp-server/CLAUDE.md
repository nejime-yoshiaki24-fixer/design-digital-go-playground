# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

```bash
# 開発モードで起動（推奨）
npm run dev

# ビルド
npm run build

# プロダクションモードで起動
npm start
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

このMCPサーバーは、デジタル庁デザインシステムの検証に特化したModel Context Protocol (MCP)サーバーです。TypeScriptで実装され、デザイントークン準拠性、アクセシビリティ、コンポーネント構造の検証機能を提供します。

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

### 提供機能

**Resources:**
- `design-tokens://all` - すべてのデザイントークン
- `design-tokens://colors` - カラートークン
- `design-tokens://spacing` - スペーシングトークン
- `design-tokens://typography` - タイポグラフィトークン

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