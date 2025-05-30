# GitHub Pages デプロイメントガイド

## 概要

このプロジェクトのStorybookをGitHub Pagesで公開するための設定が完了しています。

## セットアップ手順

### 1. GitHub リポジトリの設定

1. GitHubリポジトリの「Settings」タブを開く
2. 左側メニューの「Pages」を選択
3. 「Source」セクションで「GitHub Actions」を選択

### 2. 自動デプロイ

以下の条件で自動的にStorybookがデプロイされます：

- `main`ブランチへのプッシュ時
- GitHub Actionsの手動実行時

### 3. 手動デプロイ

ローカルから手動でデプロイする場合：

```bash
npm run deploy-storybook
```

注意: この方法を使用する場合は、リポジトリのPagesソースを「Deploy from a branch」に設定し、`gh-pages`ブランチを選択する必要があります。

## GitHub Actions ワークフロー

`.github/workflows/deploy-storybook.yml`ファイルが以下の処理を実行します：

1. Node.js 20のセットアップ
2. 依存関係のインストール（`npm ci`）
3. Storybookのビルド（`npm run build-storybook`）
4. GitHub Pagesへのアーティファクトのアップロードとデプロイ

## デプロイ後のURL

デプロイが成功すると、以下のURLでStorybookにアクセスできます：

```
https://<username>.github.io/<repository-name>/
```

## トラブルシューティング

### ビルドエラーが発生する場合

1. Node.jsのバージョンを確認（v20を推奨）
2. `npm ci`で依存関係をクリーンインストール
3. ローカルで`npm run build-storybook`が成功することを確認

### ページが404エラーになる場合

1. GitHub Pagesが有効になっているか確認
2. デプロイが完了するまで数分待つ
3. ブラウザのキャッシュをクリア

### デプロイは成功するがコンテンツが表示されない場合

1. `storybook-static`ディレクトリに`index.html`が存在することを確認
2. GitHub Actionsのログでエラーがないか確認
