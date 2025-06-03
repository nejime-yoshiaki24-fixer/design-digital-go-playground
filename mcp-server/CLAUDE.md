# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

**design-system-validator** - デジタル庁デザインシステム準拠性検証のためのModel Context Protocol (MCP)サーバー

quick-data-mcpの実践的設計パターンを参考に、モジュラー構造で保守性と拡張性を実現しています。

## アーキテクチャ

### 設計原則

1. **モジュラー構造**: Tools, Resources, Promptsを独立したモジュールとして分離
2. **TypeScript型安全性**: `as const`アサーションとZodスキーマによる厳密な型定義
3. **統一エラーハンドリング**: DesignSystemErrorHandlerによる一貫性のあるエラー処理

### ファイル構造

```
mcp-server/
├── src/
│   ├── main.ts              # エントリーポイント（サーバー初期化）
│   ├── config.ts            # 設定管理（シングルトン）
│   ├── types.ts             # 共通型定義
│   ├── core/
│   │   ├── providers.ts     # DesignTokensProvider, Validator, Analyzer
│   │   └── utils.ts         # Logger, ErrorHandler
│   ├── prompts/             # MCPプロンプト
│   │   ├── design_system_review.ts
│   │   └── component_audit.ts
│   ├── resources/           # MCPリソース
│   │   └── index.ts        # デザイントークンリソース
│   └── tools/               # MCPツール
│       └── index.ts        # validate, analyze, health_check
├── tests/
│   ├── main.test.ts         # ユニットテスト
│   └── integration.test.ts  # MCP接続統合テスト
├── package.json
└── tsconfig.json
```

## 提供機能

### Resources（リソース）
```typescript
// デザイントークンデータの提供
"design-tokens://all"     - 全デザイントークン
"design-tokens://colors"  - カラートークン
"design-tokens://spacing" - スペーシングトークン
```

### Tools（ツール）
```typescript
// 検証・分析機能
"validate_design_tokens"      - CSS準拠性検証
"analyze_component_structure" - コンポーネント構造分析
```

### Prompts（プロンプト）
```typescript
// 再利用可能ワークフロー
"design_system_review" - 包括的準拠性レビュー
"component_audit"      - 構造監査
```

## コマンド

### 開発・テスト

```bash
# 開発モード（推奨） - ファイル変更を監視して自動再起動
npm run dev

# ビルド - TypeScriptをJavaScriptにコンパイル
npm run build

# 品質チェック（コミット前に推奨）
npm run typecheck && npm run lint && npm run test:all

# 型チェックのみ
npm run typecheck

# リンティングのみ
npm run lint

# コードフォーマット
npm run format

# テスト実行
npm run test              # すべてのテスト（Jest デフォルト）
npm run test:unit         # ユニットテストのみ（main.test.ts）
npm run test:integration  # 統合テストのみ（integration.test.ts）- MCP接続テスト
npm run test:all          # すべてのテスト（--runInBand で順次実行）

# MCPインスペクター（プロトコル検証）
npm run inspector-dev     # 開発モード（tsx直接実行）
npm run inspector         # 本番ビルド版
```

### 開発ワークフロー

1. **機能開発時**
   ```bash
   # 開発サーバー起動
   npm run dev
   
   # 別ターミナルでインスペクター起動
   npm run inspector-dev
   ```

2. **コミット前**
   ```bash
   # 品質チェック一式
   npm run typecheck && npm run lint && npm run test:all
   ```

3. **統合テスト確認**
   ```bash
   # MCP接続を含む完全なテスト
   npm run test:integration
   ```

## 承認済みデザイントークン

### カラー
- **プライマリ**: `#0017C1`
- **テキスト**: `#1A1A1C`, `#595959`, `#767676`
- **背景**: `#FFFFFF`, `#F0F0F0`, `#D9D9D9`
- **セマンティック**: `#D32F2F`(エラー), `#FFC107`(警告), `#4CAF50`(成功)

### スペーシング
- **xs**: `4px`, **sm**: `8px`, **md**: `16px`, **lg**: `24px`, **xl**: `32px`

## 主要モジュール

### main.ts（エントリーポイント）
- MCPサーバーの初期化と起動
- Tools, Resources, Promptsの登録
- 依存性注入によるモジュール連携

### core/providers.ts
- **DesignTokensProvider**: デザイントークンの読み込みと提供
- **DesignTokenValidator**: CSS準拠性検証ロジック
- **ComponentAnalyzer**: コンポーネント構造分析

### core/utils.ts
- **DesignSystemErrorHandler**: 統一エラーハンドリング（静的クラス）
- **Logger**: ロギングユーティリティ（シングルトン）

### config.ts
- **ConfigManager**: 設定管理（シングルトン）
- 環境変数とデフォルト設定の統合

## 実装パターン

### TypeScript型安全性
```typescript
// MCP SDK型エラー対策 - as const アサーション
return {
  content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
};
```

### エラーハンドリング
```typescript
// 統一エラーハンドラーの使用
return DesignSystemErrorHandler.handleToolError(
  async () => {
    // ツール実装
  },
  context
);
```

### Zodスキーマバリデーション
```typescript
// 入力検証とサニタイゼーション
schema: {
  css_content: z.string()
    .max(config.maxFileSize, `CSSコンテンツは${config.maxFileSize}文字以下である必要があります`)
    .describe("検証するCSSの内容"),
}
```

## トラブルシューティング

### よくある問題

1. **デザイントークンが見つからない**
   ```bash
   # パス確認
   ls ../../../design-tokens/tokens.json
   ```

2. **型エラー**
   ```bash
   npm run typecheck
   ```

3. **MCP接続エラー**
   ```bash
   npm run inspector
   ```

## テスト構造

### ユニットテスト（main.test.ts）
- 個別モジュールの機能テスト
- モックを使用した単体テスト
- 高速実行（CI/CD向け）

### 統合テスト（integration.test.ts）
- 実際のMCPサーバー接続テスト
- 21個のリソーステスト
- ツール実行の検証
- エラーハンドリングの確認
- `--runInBand`で順次実行（接続の安定性）

## 新機能追加ガイド

### 新しいツールの追加
1. `src/tools/index.ts`に新しい関数を追加
2. Zodスキーマで入力検証を定義
3. `DesignSystemErrorHandler.handleToolError`でラップ
4. `main.ts`でサーバーに登録

### 新しいリソースの追加
1. `src/resources/index.ts`のcreateDesignTokenResources関数を拡張
2. URIパターンを定義（例: `design-tokens://新リソース`）
3. ハンドラーで適切なデータを返す

### 新しいプロンプトの追加
1. `src/prompts/`に新しいファイルを作成
2. `createXxxPrompt`関数をエクスポート
3. `src/prompts/index.ts`からエクスポート
4. `main.ts`でサーバーに登録