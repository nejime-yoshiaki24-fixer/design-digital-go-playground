# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

```bash
# コンポーネントライブラリ
npm run dev:components    # 開発サーバー起動 (http://localhost:3000)
npm run dev:storybook     # Storybook起動 (http://localhost:6006)

# MCPサーバー
npm run dev:mcp          # MCPサーバー起動
```

### Build & Test

```bash
# コンポーネントライブラリ
npm run build:components      # 本番ビルド
npm run test:components       # Jestテスト実行（watchモード）
npm run test:visual           # 視覚的リグレッションテスト実行
npm run test:visual:update    # ベースライン画像を更新

# MCPサーバー
npm run test:mcp             # Pythonテスト実行

# モノレポ全体
npm run clean                # ビルド成果物削除
npm run install:all          # 全依存関係インストール
```

### 作業ディレクトリについて

このプロジェクトはモノレポ構造を採用しています：
- コンポーネント開発: `packages/components/`
- MCPサーバー開発: `packages/mcp-server/`
- ドキュメント: `docs/`

ルートディレクトリからnpmスクリプトで各パッケージのタスクを実行できます。

## Architecture

このプロジェクトはデジタル庁デザインシステムに準拠したReactコンポーネントライブラリです。Create React App (TypeScript)をベースとし、Storybookを使用したコンポーネント駆動開発を採用しています。

### 技術スタック

- **Framework**: React 19.1.0 + TypeScript 4.9.5
- **開発環境**: Create React App 5.0.1
- **コンポーネント開発**: Storybook 9.0.0
- **テスト**: Jest + React Testing Library + Playwright
- **デプロイ**: GitHub Pages
- **MCP Server**: Python 3.13 + FastMCP (Figma連携・品質管理)

### プロジェクト構造

```
design-digital-go/              # モノレポルート
├── packages/
│   ├── components/             # Reactコンポーネントライブラリ
│   │   ├── src/
│   │   │   ├── components/     # UIコンポーネント
│   │   │   ├── assets/         # 静的アセット
│   │   │   └── utils/          # ユーティリティ
│   │   ├── public/
│   │   ├── .storybook/
│   │   └── package.json
│   └── mcp-server/             # MCPサーバー
│       ├── mcp_server.py
│       ├── figma_sync.py
│       ├── quality_metrics.py
│       └── pyproject.toml
├── docs/                       # プロジェクトドキュメント
│   ├── architecture/
│   ├── components/
│   └── design-system/
├── .github/                    # GitHub Actions
│   └── workflows/
├── .claude/                    # Claude設定
│   └── CLAUDE.md
└── package.json               # ワークスペース設定
```

### コンポーネント構造

各コンポーネントは独立したディレクトリとして配置され、以下の構成を持ちます：

```
ComponentName/
├── ComponentName.tsx         # コンポーネント実装
├── ComponentName.css         # スタイリング
├── ComponentName.stories.tsx # Storybookストーリー
├── ComponentName.test.tsx    # ユニットテスト（任意）
└── index.ts                  # 再エクスポート
```

### 開発規約

#### TypeScript

- `strict: true`で厳密な型チェック
- インターフェースによる明確なProps定義
- 型推論を活用しつつ、必要に応じて明示的な型注釈

#### スタイリング

- BEM風のクラス命名規則（例：`button--primary`、`button__icon`）
- 各コンポーネントは独自のCSSファイルを持つ
- CSS変数によるデザイントークン管理
- デジタル庁デザインシステムのカラーパレット・スペーシング規則に準拠

#### コンポーネント設計

```typescript
interface ComponentNameProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  className?: string;
  // その他のプロパティ
}
```

#### Storybookストーリー

- `Meta`と`StoryObj`型を使用したType-safeなストーリー定義
- 各バリエーションを個別のストーリーとしてエクスポート
- argsを使用したプロパティの動的変更
- デザインシステムの全バリアントを網羅

### デザインシステム準拠

このプロジェクトはデジタル庁デザインシステムに準拠しています：

- **Figmaファイル**: ID `9j4ZiexATdYbwkE4CBIMGM`
- **カラーパレット**: 
  - プライマリ: #0017C1
  - セカンダリ: #1976D2
  - エラー: #D32F2F
  - 成功: #388E3C
  - 警告: #F57C00
  - グレースケール: #212121〜#FAFAFA
- **タイポグラフィ**: Noto Sans JP (400, 700)
- **スペーシング**: 4px単位のシステム (xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px)
- **ボーダー半径**: 4px（標準）、24px（丸型）
- **シャドウ**: 0 2px 4px（小）、0 4px 8px（中）、0 8px 16px（大）

デザイントークンは`src/utils/design-token-validator.ts`で管理され、実装との整合性を検証できます。

### 実装済みコンポーネント

- **Button**: プライマリ、セカンダリ、アウトライン、無効状態
- **Checkbox**: 基本、エラー、無効状態
- **Divider**: 実線、破線、太線
- **Accordion**: 折りたたみ可能なコンテンツパネル
- **Icons**: arrow_down、check、close、search
- **Table**: ソート、フィルタリング、ページネーション機能付き

### MCP Server機能

MCPサーバーは以下の機能を提供：

#### Resources
- `/design-system`: デザインシステム仕様
- `/component-status`: コンポーネント実装状況
- `/quality-dashboard`: 品質ダッシュボード

#### Tools
- `validate_design_compliance`: デザイン準拠検証
- `check_accessibility`: アクセシビリティチェック
- `generate_component`: コンポーネント生成
- `sync_figma_tokens`: Figmaトークン同期

#### Prompts
- `review_component`: コンポーネントレビュー
- `suggest_improvements`: 改善提案
- `check_design_consistency`: デザイン一貫性チェック

### 品質保証

- **ユニットテスト**: Jest + React Testing Library
- **視覚的リグレッションテスト**: Playwright によるスクリーンショット比較
- **デザイン準拠チェック**: design-token-validator によるトークン検証
- **アクセシビリティ**: WCAG 2.1 AA準拠
- **パフォーマンス**: Lighthouse CI統合（予定）

### CI/CD

- **GitHub Pages**: Storybookの自動デプロイ (`npm run deploy-storybook`)
- **視覚的テスト**: PRごとにPlaywrightテストを実行（CI環境での設定が必要）

## 開発ワークフロー

### 新規コンポーネント作成

1. `src/components/ComponentName/`ディレクトリを作成
2. 必須ファイルを作成（.tsx、.css、.stories.tsx、index.ts）
3. デザイントークンを使用してスタイリング
4. Storybookストーリーで全バリアントをカバー
5. 必要に応じてユニットテストを追加
6. 視覚的リグレッションテストのベースライン更新

### 変更の検証

1. `npm test`でユニットテスト実行
2. `npm run storybook`で視覚的確認
3. `npm run test:visual`で視覚的リグレッションテスト
4. MCPサーバーでデザイン準拠チェック

### リリースプロセス

1. PRを作成
2. CI/CDでテスト実行
3. レビュー承認後マージ
4. Storybookが自動的にGitHub Pagesにデプロイ

## トラブルシューティング

### よくある問題

- **npm start が失敗**: `node_modules`削除後、`npm install`実行
- **視覚的テストが失敗**: `npm run test:visual:update`でベースライン更新
- **MCPサーバーエラー**: `uv sync`で依存関係を再インストール

### デバッグ

- React Developer Tools使用推奨
- Storybook内でのコンポーネント検証
- Chrome DevToolsでCSSデバッグ

## 関連ドキュメント

- `README.md`: プロジェクト概要
- `docs/figma-design-tokens.md`: デザイントークン仕様
- `docs/visual-regression-testing-guide.md`: 視覚的テストガイド
- `mcp-server/README.md`: MCPサーバー詳細
- `CLAUDE-components.md`: コンポーネント実装状況