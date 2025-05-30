import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

// テスト対象のコンポーネントとストーリー
const components = [
  {
    name: 'Button',
    stories: [
      { id: 'components-button--default', name: 'default' },
      { id: 'components-button--outline', name: 'outline' },
      { id: 'components-button--small', name: 'small' },
      { id: 'components-button--disabled', name: 'disabled' },
    ],
  },
  {
    name: 'Checkbox',
    stories: [
      { id: 'components-checkbox--default', name: 'default' },
      { id: 'components-checkbox--checked', name: 'checked' },
      { id: 'components-checkbox--disabled', name: 'disabled' },
      { id: 'components-checkbox--with-error', name: 'with-error' },
    ],
  },
  {
    name: 'Divider',
    stories: [
      { id: 'components-divider--default', name: 'default' },
      { id: 'components-divider--dashed', name: 'dashed' },
      { id: 'components-divider--thick', name: 'thick' },
    ],
  },
  {
    name: 'Accordion',
    stories: [
      { id: 'components-accordion--default', name: 'default' },
      { id: 'components-accordion--default-expanded', name: 'expanded' },
    ],
  },
  {
    name: 'Table',
    stories: [
      { id: 'components-table--default', name: 'default' },
      { id: 'components-table--striped', name: 'striped' },
      { id: 'components-table--compact', name: 'compact' },
      { id: 'components-table--with-custom-render', name: 'with-custom-render' },
      { id: 'components-table--empty', name: 'empty' },
      { id: 'components-table--loading', name: 'loading' },
    ],
  },
];

// スクリーンショットを比較する関数
async function compareScreenshots(
  baselinePath: string,
  currentPath: string,
  diffPath: string,
  threshold = 0.1
): Promise<{ match: boolean; diffPixels: number; diffPercentage: number }> {
  if (!fs.existsSync(baselinePath)) {
    // ベースラインディレクトリが存在しない場合は作成
    const baselineDir = path.dirname(baselinePath);
    if (!fs.existsSync(baselineDir)) {
      fs.mkdirSync(baselineDir, { recursive: true });
    }
    // ベースラインが存在しない場合は、現在のスクリーンショットをベースラインとして保存
    fs.copyFileSync(currentPath, baselinePath);
    return { match: true, diffPixels: 0, diffPercentage: 0 };
  }

  const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
  const current = PNG.sync.read(fs.readFileSync(currentPath));
  const { width, height } = baseline;

  const diff = new PNG({ width, height });
  
  const diffPixels = pixelmatch(
    baseline.data,
    current.data,
    diff.data,
    width,
    height,
    { threshold }
  );

  if (diffPixels > 0) {
    // diffディレクトリが存在しない場合は作成
    const diffDir = path.dirname(diffPath);
    if (!fs.existsSync(diffDir)) {
      fs.mkdirSync(diffDir, { recursive: true });
    }
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
  }

  const totalPixels = width * height;
  const diffPercentage = (diffPixels / totalPixels) * 100;

  return { match: diffPixels === 0, diffPixels, diffPercentage };
}

// 各コンポーネントのテスト
components.forEach(component => {
  test.describe(`Visual Regression: ${component.name}`, () => {
    component.stories.forEach(story => {
      test(`${story.name}`, async ({ page }) => {
        // Storybookのiframeに直接アクセス
        const url = `http://localhost:6006/iframe.html?id=${story.id}&viewMode=story`;
        await page.goto(url);

        // コンポーネントがレンダリングされるまで待機
        await page.waitForTimeout(2000);
        // await page.waitForLoadState('networkidle'); // タイムアウトを避けるためコメントアウト

        // スクリーンショットのパス
        const screenshotName = `${component.name.toLowerCase()}-${story.name}.png`;
        const baselinePath = path.join('screenshots', 'baseline', screenshotName);
        const currentPath = path.join('screenshots', 'current', screenshotName);
        const diffPath = path.join('screenshots', 'diff', screenshotName);

        // currentディレクトリが存在しない場合は作成
        const currentDir = path.dirname(currentPath);
        if (!fs.existsSync(currentDir)) {
          fs.mkdirSync(currentDir, { recursive: true });
        }

        // スクリーンショットを撮影
        await page.screenshot({
          path: currentPath,
          fullPage: false,
          animations: 'disabled',
        });

        // 画像を比較
        const result = await compareScreenshots(baselinePath, currentPath, diffPath);

        // 差分が1%以上ある場合はテスト失敗
        expect(result.diffPercentage).toBeLessThan(1);

        // 結果をコンソールに出力
        if (!result.match) {
          console.log(`Visual difference detected in ${component.name} - ${story.name}:`);
          console.log(`  Diff pixels: ${result.diffPixels}`);
          console.log(`  Diff percentage: ${result.diffPercentage.toFixed(2)}%`);
        }
      });
    });
  });
});

// Figmaデザインとの比較テスト（オプション）
test.describe('Figma Design Comparison', () => {
  test('Button matches Figma design', async ({ page }) => {
    // このテストは、Figmaからエクスポートした画像と比較する場合に使用
    const figmaImagePath = path.join('screenshots', 'figma', 'button-solid.png');
    
    if (fs.existsSync(figmaImagePath)) {
      await page.goto('http://localhost:6006/iframe.html?id=components-button--default&viewMode=story');
      await page.waitForTimeout(1000);
      
      const currentPath = path.join('screenshots', 'current', 'button-figma-comparison.png');
      await page.screenshot({ path: currentPath });
      
      // Figma画像と比較
      const diffPath = path.join('screenshots', 'diff', 'button-figma-diff.png');
      const result = await compareScreenshots(figmaImagePath, currentPath, diffPath, 0.2);
      
      console.log(`Figma comparison - Button:`);
      console.log(`  Match: ${result.match}`);
      console.log(`  Diff percentage: ${result.diffPercentage.toFixed(2)}%`);
    }
  });
});