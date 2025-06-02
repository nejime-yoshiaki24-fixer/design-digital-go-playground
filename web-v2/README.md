# Design System v2

デジタル庁デザインシステムに準拠した最新のReactウェブアプリケーション

## 技術スタック

- **Vite 6.3+** - 高速なビルドツール
- **React 19** - UIライブラリ
- **TypeScript 5.8+** - 型安全な開発
- **Tailwind CSS v4** - ユーティリティファーストCSS
- **shadcn/ui** - カスタマイズ可能なUIコンポーネント
- **Lucide React** - アイコンライブラリ

## 主な特徴

- 🎨 デジタル庁デザイントークンを完全統合
- ⚡ Viteによる高速な開発環境
- 🔒 TypeScriptによる型安全性
- 🎯 CSS変数ベースのテーマシステム
- ♿ アクセシビリティを重視した実装
- 📱 レスポンシブデザイン対応

## 開発を始める

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# Storybookの起動
npm run storybook

# プロダクションビルド
npm run build

# Storybookのビルド
npm run build-storybook

# ビルドのプレビュー
npm run preview
```

### ルートディレクトリからの起動

```bash
# アプリケーション開発サーバー
npm run dev:v2

# Storybook開発サーバー
npm run dev:v2:storybook
```

## プロジェクト構造

```
web-v2/
├── src/
│   ├── components/      # UIコンポーネント
│   │   ├── ui/         # 基本UIコンポーネント
│   │   └── layout/     # レイアウトコンポーネント
│   ├── lib/            # ユーティリティ関数
│   ├── styles/         # グローバルスタイル
│   │   ├── design-tokens.css  # デザイントークン定義
│   │   └── tailwind-theme.css # Tailwindテーマ設定
│   ├── App.tsx         # メインアプリケーション
│   └── main.tsx        # エントリーポイント
├── public/             # 静的ファイル
└── vite.config.ts      # Vite設定
```

## デザイントークン

すべてのコンポーネントは、デジタル庁デザインシステムのトークンに基づいています：

- **カラー**: プライマリ、グレースケール、セマンティックカラー
- **スペーシング**: 4pxベースのスペーシングシステム
- **タイポグラフィ**: フォントサイズ、ウェイト、行間
- **シャドウ**: 深度を表現するシャドウシステム
- **角丸**: 一貫性のある角丸値

## コンポーネント

### ボタン (Button)

```tsx
<Button variant="default">デフォルト</Button>
<Button variant="outline">アウトライン</Button>
<Button variant="secondary">セカンダリ</Button>
```

### カード (Card)

```tsx
<Card>
  <CardHeader>
    <CardTitle>タイトル</CardTitle>
    <CardDescription>説明文</CardDescription>
  </CardHeader>
  <CardContent>
    コンテンツ
  </CardContent>
</Card>
```

### アラート (Alert)

```tsx
<AlertWithIcon variant="info">
  <AlertDescription>
    情報メッセージ
  </AlertDescription>
</AlertWithIcon>
```

## ライセンス

MIT
