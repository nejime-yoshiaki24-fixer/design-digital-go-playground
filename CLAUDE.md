# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

```bash
npm start          # 開発サーバー起動 (http://localhost:3000)
npm run storybook  # Storybook起動 (http://localhost:6006)
```

### Build & Test

```bash
npm run build                 # 本番ビルド
npm test                      # Jestテスト実行（watchモード）
npm test -- --coverage        # カバレッジレポート付きテスト
npm run build-storybook       # Storybookの静的ビルド
npm run deploy-storybook      # StorybookをGitHub Pagesにデプロイ
```

### Visual Regression Testing

```bash
npm run test:visual           # 視覚的リグレッションテスト実行
npm run test:visual:update    # ベースライン画像を更新
npm run test:visual:report    # テストレポートを表示
```

## Architecture

このプロジェクトはデジタル庁デザインシステムに準拠したReactコンポーネントライブラリです。Create React App (TypeScript)をベースとし、Storybookを使用したコンポーネント駆動開発を採用しています。

### 技術スタック

- **Framework**: React 19.1.0 + TypeScript 4.9.5
- **開発環境**: Create React App 5.0.1
- **コンポーネント開発**: Storybook 9.0.0
- **テスト**: Jest + React Testing Library + Playwright
- **デプロイ**: GitHub Pages

### プロジェクト構造

```
src/
├── components/           # UIコンポーネント
│   ├── Accordion/
│   ├── Button/
│   ├── Checkbox/
│   └── Divider/
├── utils/               # ユーティリティ関数
│   └── design-token-validator.ts
└── tests/               # テスト関連
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
- **カラーパレット**: プライマリ (#0017C1)、グレースケール、エラー (#D32F2F)
- **タイポグラフィ**: Noto Sans JP (400, 700)
- **スペーシング**: 4px単位のシステム (xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px)

デザイントークンは`src/utils/design-token-validator.ts`で管理され、実装との整合性を検証できます。

### 品質保証

- **ユニットテスト**: Jest + React Testing Library
- **視覚的リグレッションテスト**: Playwright によるスクリーンショット比較
- **デザイン準拠チェック**: design-token-validator によるトークン検証
- **ESLint**: react-app設定 + Storybook推奨設定

### CI/CD

- **GitHub Pages**: Storybookの自動デプロイ (`npm run deploy-storybook`)
- **視覚的テスト**: PRごとにPlaywrightテストを実行（CI環境での設定が必要）

## 注意事項

- コンポーネントの実装・修正時は必ずデジタル庁デザインシステムとの整合性を確認
- 新規コンポーネント追加時は既存のディレクトリ構造・命名規則に従う
- 視覚的変更を伴う場合は`npm run test:visual:update`でベースライン更新
- Storybookストーリーは実装のドキュメントとしても機能するため、網羅的に作成