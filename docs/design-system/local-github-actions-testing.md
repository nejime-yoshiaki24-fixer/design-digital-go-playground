# ローカルでのGitHub Actions実行手順

## actコマンドの使用方法

### 1. 前提条件
- Dockerがインストールされ、起動していること
- GitHub CLIがインストールされていること（gh act使用時）

### 2. インストール済みの確認
```bash
# GitHub CLI拡張機能として使用
gh act --version
```

### 3. 基本的な使用例

```bash
# ワークフローの確認（実行せずに表示）
gh act -l

# ドライラン（実行せずに計画を表示）
gh act -n

# 特定のジョブだけ実行（推奨）
gh act -j test-components
gh act -j test-visual
gh act -j test-mcp-server

# CI全体を実行（時間がかかる）
gh act -W .github/workflows/ci.yml
```

### 4. このプロジェクトで設定済みの最適化

#### .actrcファイル
プロジェクトルートに`.actrc`を配置済み：
- 中サイズのDockerイメージを使用（高速化）
- アーティファクトアップロードをスキップ（エラー回避）
- コンテナの再利用（高速化）

#### CI.ymlの最適化
- Playwrightブラウザのキャッシュ追加
- act環境でのアーティファクトアップロード無効化（今後追加予定）

### 5. よくあるエラーと対処法

#### ACTIONS_RUNTIME_TOKENエラー
```
::error::Unable to get the ACTIONS_RUNTIME_TOKEN env variable
```
→ 正常な動作です。ローカルではアーティファクトアップロードは利用できません。

#### Dockerエラー
```
Error: Cannot connect to the Docker daemon
```
→ Dockerを起動してください：`sudo service docker start`

### 6. 実行時間を短縮するコツ

1. **特定のジョブのみ実行**
   ```bash
   gh act -j test-components  # コンポーネントテストのみ
   ```

2. **--reuse オプション**（.actrcで設定済み）
   コンテナを再利用して起動時間を短縮

3. **小さいDockerイメージ**（.actrcで設定済み）
   catthehacker/ubuntu:act-latestを使用

### 7. 推奨ワークフロー

開発中の確認：
```bash
# 1. 構文チェック
actionlint

# 2. 特定のジョブをローカル実行
gh act -j test-components

# 3. 問題がなければpush
git push
```

### 注意事項

- GitHub Pages関連のデプロイジョブはローカルでは実行できません
- シークレットが必要な場合は`.secrets`ファイルを作成（.gitignoreに追加済み）
- 初回実行時はDockerイメージのダウンロードに時間がかかります