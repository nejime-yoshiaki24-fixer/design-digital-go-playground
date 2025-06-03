# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

デジタル庁デザインシステム準拠性検証のためのModel Context Protocol (MCP)サーバー。quick-data-mcpの実践的設計パターンを採用し、単一ファイルアーキテクチャで効率的な開発を実現。

## 重要なアーキテクチャ変更

**2024年後期**: プロジェクトをquick-data-mcpパターンに基づいて大幅にリファクタリング
- 複雑な階層構造を`mcp-server/src/main.ts`に統合
- Tools, Resources, Promptsの3要素を単一ファイルで実装
- webプロジェクトを別リポジトリに分離、MCPサーバー専用化

## コマンド

### 基本開発フロー
```bash
# セットアップ
npm install

# 開発モード（推奨）
npm run dev

# 品質チェック（推奨：コミット前に実行）
npm run typecheck && npm run lint && npm run test:all

# ビルド
npm run build

# MCPインスペクターでプロトコル検証（開発用）
cd mcp-server && npm run inspector-dev

# または（本番ビルド版）
cd mcp-server && npm run inspector
```

### 個別コマンド
```bash
# TypeScript型チェック
npm run typecheck

# リンティング  
npm run lint

# フォーマット
npm run format

# テスト実行
npm run test              # すべてのテスト
npm run test:unit         # ユニットテストのみ
npm run test:integration  # 統合テスト（MCP接続テスト）のみ
npm run test:all          # すべてのテスト（並列実行なし）

# デザイントークン同期（Figmaから）
npm run sync:tokens
```

## アーキテクチャ

### プロジェクト構成

```
design-system-mcp-playground/
├── mcp-server/           # MCPサーバー（メイン実装）
│   ├── src/main.ts      # 全機能統合ファイル（quick-data-mcpパターン）
│   └── tests/main.test.ts
├── design-tokens/       # デザイントークン定義
│   └── tokens.json     # デジタル庁標準トークン
├── docs/               # プロジェクトドキュメント
├── quick-data-mcp/     # 参考実装（学習用）
└── scripts/            # ユーティリティスクリプト
```

### MCP Server アーキテクチャ（main.ts）

**単一ファイル統合型** - quick-data-mcpパターンを採用:

1. **Resources（リソース）**: デザイントークンデータ提供
   - `design-tokens://all` - 全デザイントークン
   - `design-tokens://colors` - カラートークン  
   - `design-tokens://spacing` - スペーシングトークン

2. **Tools（ツール）**: 検証・分析機能
   - `validate_design_tokens` - CSS準拠性検証
   - `analyze_component_structure` - コンポーネント構造分析

3. **Prompts（プロンプト）**: 再利用可能ワークフロー
   - `design_system_review` - 包括的準拠性レビュー
   - `component_audit` - コンポーネント構造監査

### 設計原則

- **最小限の抽象化**: 不要な階層化を避け、理解しやすさを重視
- **統合型実装**: Tools, Resources, Promptsを`main.ts`で統合管理
- **実践的パターン**: quick-data-mcpの効果的な設計パターンを継承

## デザイントークン標準

### 承認済みカラー
- **プライマリ**: `#0017C1`（デジタル庁ブルー）
- **グレースケール**: `#1A1A1C`, `#595959`, `#767676`, `#D9D9D9`, `#F0F0F0`, `#FFFFFF`
- **セマンティック**: `#D32F2F`(エラー), `#FFC107`(警告), `#4CAF50`(成功)

### スペーシング
- **xs**: `4px`, **sm**: `8px`, **md**: `16px`, **lg**: `24px`, **xl**: `32px`

## 重要な開発パターン

### MCP検証ワークフロー
```bash
# 1. 機能追加・修正
# main.tsを編集

# 2. 品質チェック
npm run typecheck && npm run lint && npm run test:all

# 3. MCP接続テスト
npm run test:integration

# 4. MCP動作確認
cd mcp-server && npm run inspector

# 5. プロンプトワークフロー活用
# design_system_review や component_audit を使用
```

### ファイル構造の制約
- **単一エントリーポイント**: すべての機能は`src/main.ts`に実装
- **ユニットテスト**: `tests/main.test.ts`で基本機能テスト  
- **統合テスト**: `tests/integration.test.ts`でMCP接続テスト
- **設定の一元化**: `package.json`でスクリプト管理

### MCP接続テスト詳細

統合テストでは以下の機能を包括的にテストします：

**サーバー接続**
- MCPサーバーへの実際の接続確立
- 接続安定性の検証

**Resources（21個のテスト）**
- `design-tokens://all` - 全デザイントークンの取得
- `design-tokens://colors` - カラートークンの取得  
- `design-tokens://spacing` - スペーシング設定の取得

**Tools**
- `validate_design_tokens` - CSS準拠性検証の実行
- `analyze_component_structure` - コンポーネント構造分析の実行

**Prompts**
- `design_system_review` - レビューワークフローの取得
- `component_audit` - 監査ワークフローの取得

**エラーハンドリング**
- 無効なリソースURIの処理
- 無効なツール名の処理
- 無効なプロンプト名の処理

**パフォーマンス**
- 複数同時リクエストの処理
- 接続の安定性確認

## 参考リソース

### quick-data-mcp学習
- `quick-data-mcp/` - 参考実装（Python版）
- MCP 3要素統合パターンの実例
- プロンプト駆動ワークフローの設計例

### ドキュメント
- `docs/design-system/` - デザインシステム仕様
- `docs/components/` - コンポーネント設計指針  
- `docs/design-system/research/mcp-server-architecture.md` - アーキテクチャ詳細

## トラブルシューティング

### よくある問題
1. **デザイントークンパスエラー**: `design-tokens/tokens.json`の存在確認
2. **MCP接続エラー**: `npm run inspector`で接続テスト
3. **型エラー**: `npm run typecheck`で詳細確認

### 開発時の注意点
- 機能追加時は`main.ts`の該当セクション（Tools/Resources/Prompts）を編集
- テスト追加時は`tests/main.test.ts`を更新
- プロンプト機能を積極活用してワークフロー効率化を図る

## 環境要件

- Node.js 18以上
- npm 9以上
- TypeScript 5.5以上
- Model Context Protocol SDK 1.0.5以上