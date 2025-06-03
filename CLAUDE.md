# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

このプロジェクトは、デジタル庁デザインシステムに準拠したMCPサーバーを提供します。

## コマンド

### 開発サーバー

```bash
# MCPサーバー開発モード
npm run dev
```

### テスト

```bash
# MCPサーバーテスト
npm run test
```

### ビルド

```bash
# MCPサーバービルド
npm run build
```

### 品質チェック

```bash
# TypeScript型チェック
npm run typecheck

# リンティング
npm run lint

# フォーマット
npm run format
```

### セットアップ

```bash
# パッケージのインストール
npm install
```

## アーキテクチャ

### プロジェクト構成

- **mcp-server/**: デザインシステム検証MCPサーバー
  - TypeScript + Node.js
  - Model Context Protocol実装
  - デザイントークン検証・コンポーネント分析機能

### MCPサーバーの機能

**リソース提供:**

- `design-tokens://all` - 全デザイントークン
- `design-tokens://colors` - カラートークン
- `design-tokens://spacing` - スペーシング
- `design-tokens://typography` - タイポグラフィ
- `design-tokens://elevation` - エレベーション
- `design-tokens://layout` - レイアウト

**検証ツール:**

- `validate_design_tokens` - CSSのデザイントークン準拠性検証
- `analyze_component_structure` - コンポーネント構造分析
- `validate_accessibility` - アクセシビリティチェック

### デザイントークン標準

**承認済みカラー:**

- プライマリ: #0017C1
- グレー: #1A1A1C, #595959, #767676, #D9D9D9, #F0F0F0, #FFFFFF
- セマンティック: #D32F2F(エラー), #FFC107(警告), #4CAF50(成功)

**スペーシング:**

- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px

### CI/CD

- **パス検出**: 変更されたパッケージのみテスト実行
- **ビジュアルテスト**: components変更時のみ実行
- **Storybookデプロイ**: mainブランチへのプッシュ時にGitHub Pagesにデプロイ
- **キャッシュ**: node_modules、Playwrightブラウザ、ビジュアルテスト基準画像

## 開発フロー

### MCPサーバー開発

1. `mcp-server/src/tools/`に新しい検証ツールを実装
2. `npm run typecheck && npm run lint && npm test`で品質チェック
3. `npm run dev`で動作確認
4. MCPインスペクターでプロトコル検証

## 環境要件

- Node.js 18以上
- npm 9以上
