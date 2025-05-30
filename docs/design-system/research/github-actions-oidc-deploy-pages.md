# GitHub Actions の deploy-pages における OIDC と id-token:write 権限の技術的背景

## 概要

`actions/deploy-pages@v4` アクションが `id-token: write` 権限を必要とする理由は、GitHub Pages へのデプロイメントのセキュリティを強化するために、OpenID Connect (OIDC) を使用した認証メカニズムを採用しているためです。

## GitHub OIDC の仕組み

### 1. OIDC トークンの生成

GitHub Actions では、各ワークフロージョブの実行時に：
- GitHub の OIDC プロバイダーが自動的に一意の JSON Web Token (JWT) を生成
- このトークンは各ワークフロージョブごとにユニーク
- 短期間のみ有効（ジョブの実行期間中のみ）

### 2. トークンの構造

OIDC トークンには以下のような重要なクレームが含まれます：

```yaml
{
  "aud": "リポジトリオーナーのURL",
  "iss": "https://token.actions.githubusercontent.com",
  "sub": "ワークフローの検証可能なアイデンティティ",
  "job_workflow_ref": "ワークフローの参照",
  "environment": "デプロイ環境",
  "runner_environment": "ランナー環境",
  "actor": "実行者",
  "actor_id": "実行者ID",
  "ref": "ブランチ/リファレンス情報"
}
```

## deploy-pages での OIDC の使用

### 1. 検証プロセス

`deploy-pages` アクションは OIDC トークンを以下のように使用します：

1. **トークンの取得**: `id-token: write` 権限により、GitHub の OIDC プロバイダーからトークンを要求
2. **API への送信**: トークンは GitHub Pages デプロイメント API のリクエストペイロードの一部として送信
3. **内部検証**: API 側でトークンをデコードし、クレームを検証
4. **権限確認**: ワークフローが Pages へのデプロイを許可されているかを確認

### 2. 検証される内容

- ワークフローが GitHub Actions 経由で実行されているか
- 有効な環境をターゲットにしているか
- 有効なブランチからデプロイしているか
- ブランチ保護設定を遵守しているか

## id-token:write 権限の必要性

### 技術的な理由

1. **トークン生成の許可**: この権限により、ワークフローは GitHub の OIDC プロバイダーに JWT トークンを要求できる
2. **リソースへの書き込み権限ではない**: 重要な点として、この権限は実際のリソースへの書き込み権限を付与するものではない
3. **認証のみ**: 純粋に認証メカニズムのためのもの

### セキュリティ上の利点

1. **長期的な認証情報の不要化**: 
   - 従来の方法：長期的なサービスアカウントキーやトークンを GitHub Secrets に保存
   - OIDC：ジョブ実行時に動的に生成される短期トークンを使用

2. **最小権限の原則**:
   - トークンは特定のワークフロー実行に限定
   - ジョブ終了後は自動的に無効化

3. **監査性の向上**:
   - 各デプロイメントが誰によって、どのワークフローから実行されたかを追跡可能
   - ブランチ保護設定との統合により、承認されたブランチからのみデプロイ可能

## 実装例

```yaml
deploy:
  needs: build
  permissions:
    pages: write      # Pages へのデプロイ権限
    id-token: write   # OIDC トークン要求権限
  environment:
    name: github-pages
    url: ${{ steps.deployment.outputs.page_url }}
  runs-on: ubuntu-latest
  steps:
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v4
```

## よくある誤解

### 「id-token: write は危険な権限」という誤解

多くの開発者が「write」という文字から、この権限が何かを書き込む危険な権限だと誤解しています。しかし実際は：

- **実際の動作**: OIDC トークンを「生成する（write）」権限
- **影響範囲**: ワークフロー実行コンテキストに限定
- **リソースアクセス**: 他のリソースへのアクセス権限は一切付与されない

## ローカル環境での制限

`act` などのローカル GitHub Actions エミュレーターでは OIDC 機能がサポートされていないため、`deploy-pages` アクションはローカルでは動作しません。これは GitHub の OIDC プロバイダーとの通信が必要なためです。

## まとめ

`id-token: write` 権限は、GitHub Pages へのデプロイメントをより安全にするための重要なセキュリティメカニズムです。この権限により：

1. 動的な認証トークンの生成が可能
2. 長期的な認証情報の保存が不要
3. ブランチ保護設定との統合による安全なデプロイメント
4. デプロイメントの出所の検証が可能

これは「深く神秘的な追加権限」ではなく、現代的なセキュリティベストプラクティスに基づいた、より安全なデプロイメント方法を実現するための仕組みです。