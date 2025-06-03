# デジタル庁デザインシステムMCPサーバー

このプロジェクトは、デジタル庁デザインシステムの検証と分析を行うModel Context Protocol (MCP)サーバーを提供します。

## 🗂 プロジェクト構造

```
design-system-mcp-playground/
├── mcp-server/        # Model Context Protocolサーバー
├── design-tokens/     # デザイントークン定義
├── docs/              # プロジェクトドキュメント
├── scripts/           # ユーティリティスクリプト
└── .github/           # GitHub Actions CI/CD
```

## 🚀 クイックスタート

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# テスト実行
npm run test

# ビルド
npm run build
```

## 📦 MCPサーバーの機能

### リソース提供

- `design-tokens://all` - 全デザイントークン
- `design-tokens://colors` - カラートークン
- `design-tokens://spacing` - スペーシング
- `design-tokens://typography` - タイポグラフィ
- `design-tokens://elevation` - エレベーション
- `design-tokens://layout` - レイアウト

### 検証ツール

- `validate_design_tokens` - CSSのデザイントークン準拠性検証
- `analyze_component_structure` - コンポーネント構造分析
- `validate_accessibility` - アクセシビリティチェック

## 🛠 開発

### 必要な環境

- Node.js 18以上
- npm 9以上

### コマンド一覧

```bash
# 開発
npm run dev             # MCPサーバー開発モード

# ビルド
npm run build           # 本番ビルド

# テスト
npm run test            # テスト実行

# 品質チェック
npm run typecheck       # TypeScript型チェック
npm run lint            # リンティング
npm run format          # コードフォーマット

# その他
npm run sync:tokens     # デザイントークン同期
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