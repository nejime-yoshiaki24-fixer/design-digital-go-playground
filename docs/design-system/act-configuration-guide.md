# act設定ファイルガイド

## act（nektos/act）とは

actは、GitHub ActionsをローカルのDocker環境で実行するためのツールです。GitHubにpushする前にワークフローをテストできます。

## .actrc設定ファイル

### 概要
`.actrc`はact専用の設定ファイルで、デフォルトのコマンドラインオプションを保存します。

### 読み込み順序
1. `~/.config/act/actrc`（XDG仕様）
2. `~/.actrc`（ホームディレクトリ）
3. `./.actrc`（プロジェクトディレクトリ）

### 形式
- 1行に1つのコマンドライン引数
- コメントは**サポートされていません**

### 設定例
```
# 中サイズのDockerイメージを使用（高速化）
-P ubuntu-latest=catthehacker/ubuntu:act-latest

# アーティファクトアップロードをスキップ
--action-offline-mode

# コンテナを再利用（高速化）
--reuse

# デフォルトのイベントファイル
--eventpath .github/workflows/push-event.json
```

### 主な設定オプション

| オプション | 説明 |
|----------|------|
| `-P` | プラットフォームのDockerイメージマッピング |
| `--reuse` | コンテナの再利用（高速化） |
| `--action-offline-mode` | オフラインモード（アーティファクト系をスキップ） |
| `--platform` | コンテナアーキテクチャ（Apple Silicon用） |
| `-W` | 特定のワークフローファイル |
| `-j` | 特定のジョブのみ実行 |

## event.jsonファイル

### 概要
GitHubのWebhookイベントペイロードをシミュレートするJSONファイルです。

### pushイベントの例
```json
{
  "push": {
    "ref": "refs/heads/main",
    "repository": {
      "name": "design-system-mcp-playground",
      "owner": {
        "login": "nejime-yoshiaki24-fixer"
      }
    }
  }
}
```

### pull_requestイベントの例
```json
{
  "pull_request": {
    "number": 123,
    "action": "opened",
    "head": {
      "ref": "feature-branch"
    },
    "base": {
      "ref": "main"
    }
  }
}
```

### act環境の判定
ワークフロー内で`${{ env.ACT }}`を使用してact環境を判定できます：

```yaml
- name: Upload artifact
  if: ${{ !env.ACT }}  # actでは実行しない
  uses: actions/upload-artifact@v4
```

## トラブルシューティング

### よくある問題

1. **ACTIONS_RUNTIME_TOKENエラー**
   - 原因：GitHub固有の環境変数が存在しない
   - 対策：`--action-offline-mode`を使用

2. **大きなDockerイメージ**
   - 原因：デフォルトは18GBのフルイメージ
   - 対策：`-P ubuntu-latest=catthehacker/ubuntu:act-latest`

3. **遅い実行**
   - 原因：毎回新しいコンテナを作成
   - 対策：`--reuse`オプションを使用

## 参考リンク

- [act公式ドキュメント](https://github.com/nektos/act)
- [act公式サイト](https://nektosact.com/)
- [GitHub Actions イベントドキュメント](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)