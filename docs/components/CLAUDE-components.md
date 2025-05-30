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
npm run build             # 本番ビルド
npm test                  # Jestテスト実行（watchモード）
npm test -- --coverage    # カバレッジレポート付きテスト
npm run build-storybook   # Storybookの静的ビルド
```

## Architecture

このプロジェクトはCreate React App (TypeScript)をベースとしたコンポーネントライブラリです。Storybookを使用したコンポーネント駆動開発を採用しています。

### コンポーネント構造

各コンポーネントは`src/components/`配下に独立したディレクトリとして配置され、以下の構成を持ちます：

```
ComponentName/
├── ComponentName.tsx        # コンポーネント実装
├── ComponentName.css        # スタイリング
├── ComponentName.stories.tsx # Storybookストーリー
└── index.ts                 # 再エクスポート
```

### スタイリング規約

- BEM風のクラス命名規則を使用（例：`button--primary`）
- 各コンポーネントは独自のCSSファイルを持つ
- CSS変数による一貫したデザイントークン管理

### 型定義パターン

```typescript
interface ComponentNameProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}
```

### Storybookストーリー

- `Meta`と`StoryObj`型を使用したType-safe なストーリー定義
- 各バリエーションを個別のストーリーとしてエクスポート
- argsを使用したプロパティの動的変更
