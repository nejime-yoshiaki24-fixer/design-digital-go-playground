# Visual Regression Testing ガイド

## 概要

Visual Regression Testingは、UIコンポーネントの視覚的な変更を自動的に検出するシステムです。
Playwright + pixelmatchを使用して、Storybookのコンポーネントのスクリーンショットを撮影し、ベースライン画像と比較します。

## セットアップ

### 必要なパッケージ（インストール済み）
- `@playwright/test`: ブラウザ自動化とテストフレームワーク
- `pixelmatch`: 画像比較ライブラリ
- `pngjs`: PNG画像の読み書き

## 使用方法

### 1. 初回実行（ベースライン作成）

```bash
# Storybookが起動していることを確認
npm run storybook

# 別のターミナルでVisual Regression Testを実行
npm run test:visual
```

初回実行時は、すべてのスクリーンショットがベースラインとして保存されます。

### 2. 変更検出

コンポーネントを変更した後、再度テストを実行します：

```bash
npm run test:visual
```

差分が検出された場合：
- `screenshots/diff/` フォルダに差分画像が保存されます
- テストが失敗し、差分の詳細が表示されます

### 3. ベースライン更新

意図的な変更の場合、ベースラインを更新します：

```bash
# 現在のスクリーンショットをベースラインにコピー
cp screenshots/current/*.png screenshots/baseline/
```

または、特定のコンポーネントのみ更新：

```bash
cp screenshots/current/button-*.png screenshots/baseline/
```

### 4. レポート表示

```bash
npm run test:visual:report
```

## ディレクトリ構造

```
screenshots/
├── baseline/      # ベースライン画像（正解とする画像）
├── current/       # 現在のスクリーンショット
├── diff/          # 差分画像（差異がある場合のみ生成）
└── figma/         # Figmaからエクスポートした画像（オプション）
```

## テスト対象コンポーネント

現在、以下のコンポーネントとバリエーションがテストされます：

### Button
- default (Solid, Large)
- outline
- small
- disabled

### Checkbox
- default (unchecked)
- checked
- disabled
- with-error

### Divider
- default (solid, thin)
- dashed
- thick

### Accordion
- default (collapsed)
- expanded

## 閾値の調整

`src/visual-tests/visual-regression.test.ts` の `threshold` パラメータで感度を調整できます：

```typescript
const result = await compareScreenshots(baselinePath, currentPath, diffPath, 0.1);
// 0.1 = 10%の差異まで許容
```

## トラブルシューティング

### テストがタイムアウトする
- Storybookが起動していることを確認
- `playwright.config.ts` の `webServer.timeout` を増やす

### フォントレンダリングの差異
- OSやブラウザによってフォントレンダリングが異なる場合があります
- 閾値を調整するか、CI環境でのみテストを実行することを検討

### アニメーションによる差異
- スクリーンショット撮影時にアニメーションは無効化されていますが、
  トランジションが完了するまで待機時間を調整する必要がある場合があります

## Figmaデザインとの比較

Figmaからエクスポートした画像と比較する場合：

1. Figma MCPを使用して画像をダウンロード
2. `screenshots/figma/` フォルダに配置
3. `Figma Design Comparison` テストが自動的に実行されます

## CI/CDでの使用

GitHub Actionsなどで使用する場合：

```yaml
- name: Install Playwright Browsers
  run: npx playwright install chromium

- name: Run Visual Regression Tests
  run: npm run test:visual
  
- name: Upload diff images
  if: failure()
  uses: actions/upload-artifact@v3
  with:
    name: visual-diff
    path: screenshots/diff/
```

## ベストプラクティス

1. **定期的なベースライン更新**: 意図的な変更後は必ずベースラインを更新
2. **レビュープロセス**: PRで差分画像を確認してから承認
3. **環境の統一**: 開発者間で同じOS/ブラウザバージョンを使用
4. **選択的テスト**: 変更したコンポーネントのみテストして高速化