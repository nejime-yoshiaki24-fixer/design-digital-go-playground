# デジタル庁デザインシステム準拠UIコンポーネントライブラリ

このプロジェクトは、デジタル庁デザインシステムに準拠したReactコンポーネントライブラリとMCPサーバーを提供するモノレポジトリです。

## 🗂 プロジェクト構造

```
design-system-mcp-playground/
├── web/               # Reactウェブサイト（旧components）
├── mcp-server/        # Model Context Protocolサーバー
├── docs/              # プロジェクトドキュメント
├── .claude/           # Claude Code設定
└── .github/           # GitHub Actions CI/CD
```

## 🚀 クイックスタート

### 全体のセットアップ

```bash
# 依存関係のインストール
npm run install:all
```

### コンポーネントライブラリ

```bash
# 開発サーバー起動
npm run dev:components

# Storybook起動
npm run dev:storybook

# テスト実行
npm run test:components

# ビジュアルリグレッションテスト
npm run test:visual
```

### MCPサーバー

```bash
# サーバー起動
npm run dev:mcp

# テスト実行
npm run test:mcp
```

## 📦 パッケージ

### web

デジタル庁デザインシステムに準拠したReactウェブサイト。

- **Button**: プライマリ、セカンダリ、アウトライン
- **Checkbox**: 基本、エラー、無効状態
- **Divider**: 実線、破線、太線
- **Accordion**: 折りたたみ可能なコンテンツ
- **Icons**: システムアイコンセット
- **Table**: ソート、フィルタリング、ページネーション対応

[Storybookデモ](https://napnel.github.io/design-system-mcp-playground/)

### mcp-server

Figma連携と品質管理を提供するModel Context Protocolサーバー。

- デザイントークン同期
- コンポーネント品質チェック
- アクセシビリティ検証
- 自動コンポーネント生成

## 🛠 開発

### 必要な環境

- Node.js 18以上
- npm 9以上

### コマンド一覧

```bash
# 開発
npm run dev:components    # React開発サーバー
npm run dev:storybook     # Storybook
npm run dev:mcp          # MCPサーバー

# ビルド
npm run build:components  # 本番ビルド

# テスト
npm run test:components   # Jestテスト
npm run test:visual      # ビジュアルテスト
npm run test:mcp         # Pythonテスト

# クリーンアップ
npm run clean            # ビルド成果物削除
```

## 📚 ドキュメント

- [アーキテクチャ設計](docs/architecture/)
- [コンポーネント仕様](docs/components/)
- [デザインシステム](docs/design-system/)
- [開発ガイド](docs/guides/)

## 🤝 コントリビューション

プルリクエストは歓迎します。大きな変更の場合は、まずissueを作成して変更内容を議論してください。

## 📄 ライセンス

[MIT](LICENSE)