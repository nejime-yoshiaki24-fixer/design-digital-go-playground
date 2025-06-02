# Design System v2

デジタル庁デザインシステムに準拠した最新のReactウェブアプリケーション

## 技術スタック

- **Next.js 15** - The React Framework（App Router）
- **React 19** - UIライブラリ
- **TypeScript 5.8+** - 型安全な開発
- **Tailwind CSS v4** - ユーティリティファーストCSS
- **shadcn/ui** - カスタマイズ可能なUIコンポーネント
- **Lucide React** - アイコンライブラリ

## 主な特徴

- 🎨 デジタル庁デザイントークンを完全統合
- ⚡ Next.js App Routerによる高速なルーティング
- 🔒 TypeScriptによる型安全性
- 🎯 CSS変数ベースのテーマシステム
- ♿ アクセシビリティを重視した実装
- 📱 レスポンシブデザイン対応
- 🎭 専用コンポーネント展示ページ

## 開発を始める

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動（http://localhost:3000）
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバーの起動
npm start

# Lintの実行
npm run lint
```

### ルートディレクトリからの起動

```bash
# アプリケーション開発サーバー
npm run dev:v2
```

## プロジェクト構造

```
web-v2/
├── app/                 # Next.js App Router
│   ├── layout.tsx       # ルートレイアウト
│   ├── page.tsx         # ホームページ
│   └── components/      # コンポーネント展示ページ
│       ├── page.tsx     # コンポーネント一覧
│       ├── button/      # Buttonコンポーネント詳細
│       ├── card/        # Cardコンポーネント詳細
│       └── alert/       # Alertコンポーネント詳細
├── src/
│   ├── components/      # UIコンポーネント
│   │   ├── ui/         # 基本UIコンポーネント
│   │   └── layout/     # レイアウトコンポーネント
│   ├── lib/            # ユーティリティ関数
│   ├── styles/         # グローバルスタイル
│   │   ├── design-tokens.css  # デザイントークン定義
│   │   └── tailwind-theme.css # Tailwindテーマ設定
│   └── global.css      # グローバルCSS
├── public/             # 静的ファイル
├── next.config.mjs     # Next.js設定
└── postcss.config.js   # PostCSS設定
```

## ページ構成

- `/` - ホームページ（デザインシステムの概要）
- `/components` - コンポーネント一覧
- `/components/button` - Buttonコンポーネントの詳細と使用例
- `/components/card` - Cardコンポーネントの詳細と使用例
- `/components/alert` - Alertコンポーネントの詳細と使用例

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