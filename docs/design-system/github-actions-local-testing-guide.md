# GitHub Actions ローカルテストガイド

このガイドでは、GitHub Actionsワークフローをプッシュ前にローカルで検証する方法を説明します。

## 推奨ツール

### 1. actionlint - 静的解析ツール（最優先）

GitHub Actions専用の静的解析ツールで、構文エラーや型エラーを検出します。

#### インストール方法

**方法1: Goを使用（推奨）**

```bash
# Goのインストール（Ubuntu/Debian）
sudo apt update
sudo apt install golang-go

# actionlintのインストール
go install github.com/rhysd/actionlint/cmd/actionlint@latest

# PATHに追加（.bashrcまたは.zshrcに追加）
export PATH="$HOME/go/bin:$PATH"
```

**方法2: バイナリを直接ダウンロード**

```bash
# Linux (amd64)の場合
curl -s https://api.github.com/repos/rhysd/actionlint/releases/latest | \
  grep "browser_download_url.*linux.*amd64" | \
  cut -d '"' -f 4 | \
  xargs curl -L -o actionlint.tar.gz

tar xf actionlint.tar.gz
sudo mv actionlint /usr/local/bin/
rm actionlint.tar.gz
```

#### 使用方法

```bash
# 単一ファイルをチェック
actionlint .github/workflows/ci.yml

# すべてのワークフローをチェック
actionlint

# 詳細な出力
actionlint -verbose
```

### 2. act - ローカルでActionsを実行

Dockerを使用してGitHub Actions環境をエミュレートします。

#### インストール方法

**方法1: GitHub CLI拡張機能（推奨）**

```bash
# GitHub CLIがインストール済みの場合
gh extension install nektos/gh-act

# 使用例
gh act -l
gh act
```

**方法2: システム全体にインストール**

```bash
# /usr/local/binにインストール
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash -s -- -b /usr/local/bin

# 確認
act --version
```

**方法3: プロジェクトローカルにインストール（非推奨）**

```bash
# カレントディレクトリのbin/にインストール
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | bash

# 使用例
./bin/act --version
```

#### 前提条件

- Dockerがインストールされていること
- 初回実行時に大きなDockerイメージ（約18GB）をダウンロード

#### 使用方法

```bash
# デフォルトのpushイベントを実行
act

# 特定のジョブを実行
act -j test-components
act -j build-storybook

# 特定のワークフローを実行
act -W .github/workflows/ci.yml

# ドライラン（実行せずに計画を表示）
act -n

# 小さいDockerイメージを使用（機能制限あり）
act -P ubuntu-latest=catthehacker/ubuntu:act-latest
```

### 3. yamllint - YAML構文チェッカー

基本的なYAML構文の検証を行います。

#### インストール方法

```bash
# pip3を使用
pip3 install --user yamllint

# または apt を使用
sudo apt install yamllint
```

#### 使用方法

```bash
yamllint .github/workflows/ci.yml
```

## プロジェクト固有の検証手順

このプロジェクトでは以下の順序で検証することを推奨します：

### 1. 構文チェック（必須）

```bash
# actionlintで静的解析
actionlint .github/workflows/ci.yml

# YAML構文チェック
yamllint .github/workflows/ci.yml
```

### 2. ローカル実行（オプション）

```bash
# コンポーネントテストのみ実行
act -j test-components

# ビルドジョブのみ実行
act -j build-storybook

# すべてのジョブを実行（時間がかかる）
act
```

### 3. 特定の問題の確認

#### パーミッション関連

```bash
# パーミッション設定を確認
grep -A5 "permissions:" .github/workflows/ci.yml
```

#### パス関連

```bash
# working-directoryとパスの整合性を確認
grep -E "(working-directory:|path:)" .github/workflows/ci.yml
```

## トラブルシューティング

### actionlintのエラー例と対処法

1. **シェルスクリプトのエラー**

   ```
   shellcheck reported issue in this script: SC2086
   ```

   → シェルスクリプトで変数を引用符で囲む

2. **式の構文エラー**

   ```
   syntax error: unexpected token
   ```

   → `${{ }}`式の構文を確認

3. **アクションのバージョンエラー**

   ```
   input "foo" is not defined in action
   ```

   → アクションのドキュメントで入力パラメータを確認

### actの制限事項

- GitHub固有の機能（GITHUB_TOKEN、Secrets等）は手動設定が必要
- 一部のアクション（特にGitHub Pages関連）は完全に再現できない
- マトリックスビルドは部分的なサポート

## 検証チェックリスト

プッシュ前に以下を確認：

- [ ] actionlintでエラーがないこと
- [ ] yamllintで構文エラーがないこと
- [ ] 必要に応じてactで主要なジョブが成功すること
- [ ] パーミッション設定が適切であること
- [ ] パスとworking-directoryが整合していること

## 参考リンク

- [actionlint公式ドキュメント](https://github.com/rhysd/actionlint)
- [act公式ドキュメント](https://github.com/nektos/act)
- [GitHub Actions公式ドキュメント](https://docs.github.com/en/actions)
