# 外部パッケージ一覧

このドキュメントは、プロジェクトで使用している主要な外部パッケージと、その選定理由をまとめたものです。

## web-v2ディレクトリ

### コアフレームワーク
- **Vite 6.3+**: 高速なビルドツール。開発サーバーの起動とHMRが高速
- **React 19**: 最新のReactでConcurrent Featuresをサポート
- **TypeScript 5.8+**: 型安全な開発環境

### スタイリング
- **Tailwind CSS 4.0**: ユーティリティファーストCSS（現在、従来のCSSアプローチで実装）
- **@tailwindcss/vite**: Tailwind CSS v4のVite統合（現在無効化中）
- **@tailwindcss/postcss**: PostCSS経由でのTailwind CSS処理

### UIライブラリ
- **shadcn/ui**: カスタマイズ可能なReactコンポーネント
- **lucide-react**: アイコンライブラリ
- **class-variance-authority (CVA)**: コンポーネントバリアント管理
- **clsx**: 条件付きクラス名の結合
- **tailwind-merge**: Tailwindクラスの競合解決

### 開発ツール
- **Storybook 9**: コンポーネントのドキュメント化とテスト
- **ESLint**: コード品質チェック
- **PostCSS**: CSS処理パイプライン
- **Autoprefixer**: ベンダープレフィックスの自動付与

## web ディレクトリ

### コアフレームワーク
- **Create React App**: Reactアプリケーションのボイラープレート
- **React 18**: 安定版のReact
- **TypeScript 4.9+**: 型安全な開発

### テスティング
- **Jest**: ユニットテストフレームワーク
- **@testing-library/react**: Reactコンポーネントのテスト
- **Playwright**: E2Eテストとビジュアルリグレッションテスト

### 開発ツール
- **Storybook 7**: コンポーネントカタログ
- **react-scripts**: CRAのビルドスクリプト

## mcp-server ディレクトリ

### MCPフレームワーク
- **@modelcontextprotocol/sdk**: Model Context Protocol SDK
- **zod**: スキーマ検証とバリデーション

### ビルドツール
- **TypeScript 5.6+**: 型安全な開発
- **tsx**: TypeScriptの直接実行
- **esbuild**: 高速なバンドラー

### テスティング
- **Jest**: ユニットテストフレームワーク
- **@types/jest**: Jestの型定義

## 選定基準

1. **パフォーマンス**: ビルド速度と実行時パフォーマンスを重視
2. **型安全性**: TypeScriptによる静的型付けを全面採用
3. **開発体験**: HMR、デバッグツール、エラーメッセージの質
4. **コミュニティ**: 活発なメンテナンスとドキュメントの充実
5. **互換性**: デジタル庁デザインシステムとの統合可能性

## 今後の検討事項

- Tailwind CSS v4の安定版リリース後の本格統合
- Vitest導入によるテスト実行の高速化
- Turborepoによるモノレポ管理の最適化