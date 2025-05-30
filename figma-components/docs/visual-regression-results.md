# Visual Regression Testing 導入結果

## 概要

Visual Regression Testingが正常に導入され、すべてのコンポーネントのベースライン画像が作成されました。

## 実装内容

### 使用技術
- **Playwright**: ブラウザ自動化とテストフレームワーク
- **pixelmatch**: ピクセル単位での画像比較
- **pngjs**: PNG画像の処理

### 特徴
- 外部サービス不要（完全ローカル実行）
- Storybookと完全統合
- 自動的なベースライン作成
- 差分の視覚化

## テスト結果

### 初回実行結果
- **実行時間**: 約42秒
- **テスト数**: 14個
- **結果**: すべて合格（ベースライン作成）

### 作成されたベースライン画像

#### Button コンポーネント (4枚)
- `button-default.png` - 標準のボタン (Solid, Large)
- `button-outline.png` - アウトラインボタン
- `button-small.png` - 小サイズボタン
- `button-disabled.png` - 無効状態のボタン

#### Checkbox コンポーネント (4枚)
- `checkbox-default.png` - 未選択状態
- `checkbox-checked.png` - 選択状態
- `checkbox-disabled.png` - 無効状態
- `checkbox-with-error.png` - エラー表示付き

#### Divider コンポーネント (3枚)
- `divider-default.png` - 標準の区切り線
- `divider-dashed.png` - 破線
- `divider-thick.png` - 太い線

#### Accordion コンポーネント (2枚)
- `accordion-default.png` - 閉じた状態
- `accordion-expanded.png` - 展開状態

## 使用方法

### 1. 変更検出テスト
```bash
npm run test:visual
```

### 2. テスト結果の確認
差分が検出された場合:
- `screenshots/diff/` フォルダに差分画像が生成
- ピクセル差分の割合が表示

### 3. ベースライン更新
意図的な変更の場合:
```bash
# すべて更新
cp screenshots/current/*.png screenshots/baseline/

# 特定のコンポーネントのみ
cp screenshots/current/button-*.png screenshots/baseline/
```

### 4. HTMLレポート表示
```bash
npm run test:visual:report
```

## 画像比較の仕組み

```typescript
// 閾値10%での比較
const result = await compareScreenshots(
  baselinePath,
  currentPath,
  diffPath,
  0.1 // 10%の差異まで許容
);

// 1%以上の差分でテスト失敗
expect(result.diffPercentage).toBeLessThan(1);
```

## 今後の拡張案

### 1. Figmaデザインとの直接比較
```typescript
// screenshots/figma/ フォルダに配置
const figmaImagePath = 'screenshots/figma/button-solid.png';
```

### 2. CI/CD統合
```yaml
# GitHub Actions例
- name: Visual Regression Test
  run: npm run test:visual
  
- name: Upload Diff Images
  if: failure()
  uses: actions/upload-artifact@v3
  with:
    name: visual-diff
    path: screenshots/diff/
```

### 3. 複数ブラウザ対応
```typescript
projects: [
  { name: 'chromium', use: devices['Desktop Chrome'] },
  { name: 'firefox', use: devices['Desktop Firefox'] },
  { name: 'webkit', use: devices['Desktop Safari'] },
]
```

## メリット

1. **視覚的な変更を自動検出**
   - 意図しないスタイル変更を防ぐ
   - リファクタリング時の安全性向上

2. **デザインシステムの一貫性保証**
   - Figmaデザインとの乖離を防ぐ
   - コンポーネント間の統一性維持

3. **レビュープロセスの効率化**
   - 差分画像で変更内容を確認
   - 議論の根拠として活用

## 注意事項

- フォントレンダリングはOS/ブラウザで異なる可能性
- アニメーション中のキャプチャを避けるため2秒の待機時間設定
- ベースライン画像はGit管理推奨（LFS使用）