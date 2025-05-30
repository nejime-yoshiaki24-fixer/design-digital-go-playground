# ビジュアルリグレッションテストのセットアップ

## 推奨アプローチ

### 1. **Chromatic (Storybook公式ツール)**
```bash
npm install --save-dev chromatic
```

メリット：
- Storybookと完全統合
- 自動的にすべてのストーリーをキャプチャ
- ピクセル単位の差分検出
- GitHubとの連携

### 2. **Percy**
```bash
npm install --save-dev @percy/cli @percy/storybook
```

### 3. **Playwright + カスタムスクリプト**
```bash
npm install --save-dev @playwright/test
```

## 実装手順

### Step 1: Figmaデザインのエクスポート

```typescript
// Figma MCPを使用してコンポーネントの画像をダウンロード
import { downloadFigmaImages } from '@mcp/figma';

const componentsToDownload = [
  { nodeId: '8392:32301', fileName: 'button-large-solid.png' },
  { nodeId: '62:19726', fileName: 'checkbox-medium-checked.png' },
  // ... 他のコンポーネント
];
```

### Step 2: Storybookのスクリーンショット撮影

```typescript
// playwright-screenshot.ts
import { test } from '@playwright/test';

test('capture button component', async ({ page }) => {
  await page.goto('http://localhost:6006/iframe.html?id=components-button--default');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ 
    path: 'screenshots/button-default.png',
    clip: { x: 0, y: 0, width: 200, height: 60 }
  });
});
```

### Step 3: 画像比較

```typescript
// compare-images.ts
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import fs from 'fs';

function compareImages(figmaPath: string, storybookPath: string) {
  const figmaImg = PNG.sync.read(fs.readFileSync(figmaPath));
  const storybookImg = PNG.sync.read(fs.readFileSync(storybookPath));
  
  const diff = new PNG({ width: figmaImg.width, height: figmaImg.height });
  
  const numDiffPixels = pixelmatch(
    figmaImg.data,
    storybookImg.data,
    diff.data,
    figmaImg.width,
    figmaImg.height,
    { threshold: 0.1 }
  );
  
  return {
    match: numDiffPixels === 0,
    diffPixels: numDiffPixels,
    diffPercentage: (numDiffPixels / (figmaImg.width * figmaImg.height)) * 100
  };
}
```

## 検証項目チェックリスト

### 視覚的検証
- [ ] 色が正確に一致しているか（#0017C1など）
- [ ] フォントファミリーが正しいか（Noto Sans JP）
- [ ] サイズ・余白が正確か
- [ ] hover/focus状態のスタイル
- [ ] アニメーションの動作

### 構造的検証
- [ ] コンポーネントの階層構造
- [ ] アクセシビリティ属性（aria-*）
- [ ] レスポンシブ対応

### 自動化可能な検証
1. **CSS計算値の比較**
   ```javascript
   const computedStyle = window.getComputedStyle(element);
   expect(computedStyle.backgroundColor).toBe('rgb(0, 23, 193)');
   ```

2. **デザイントークンのJSONスキーマ検証**
   ```javascript
   const tokens = extractTokensFromCSS();
   validateAgainstFigmaTokens(tokens);
   ```

3. **スナップショットテスト**
   ```javascript
   expect(component).toMatchSnapshot();
   ```

## 推奨ワークフロー

1. **開発時**: Storybook上で視覚的に確認
2. **PR時**: 自動的にビジュアルリグレッションテスト実行
3. **定期的**: Figmaの最新デザインと同期確認

## 注意点

- Figmaのレンダリングとブラウザのレンダリングは完全に一致しない場合がある
- フォントのレンダリングはOS/ブラウザによって異なる
- アンチエイリアシングの差異を考慮する必要がある