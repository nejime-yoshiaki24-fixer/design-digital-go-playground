#!/usr/bin/env node

/**
 * Figmaからデザイントークンを同期する実用的なスクリプト
 */

require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');

const FIGMA_FILE_KEY = '9j4ZiexATdYbwkE4CBIMGM';
const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;

// 色の抽出に必要なノードID
const COLOR_NODES = {
  blue900: '3859:14144',      // #0017C1
  blue1000: '3859:14154',     // #00118F
  neutralGray900: '3865:13637', // #1A1A1C
  semanticError: '6:2346',
  linkColors: '2676:5785'
};

async function fetchNodeData(nodeId) {
  const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/nodes?ids=${nodeId}&depth=5`;
  const response = await fetch(url, {
    headers: {
      'X-Figma-Token': FIGMA_ACCESS_TOKEN
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch node ${nodeId}: ${response.status}`);
  }

  const data = await response.json();
  return data.nodes[nodeId];
}

function extractColorFromNode(node) {
  if (node.fills && node.fills.length > 0) {
    const fill = node.fills[0];
    if (fill.type === 'SOLID' && fill.color) {
      const { r, g, b } = fill.color;
      const toHex = (val) => Math.round(val * 255).toString(16).padStart(2, '0');
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
    }
  }
  
  // 子ノードも探索
  if (node.children) {
    for (const child of node.children) {
      const color = extractColorFromNode(child);
      if (color) return color;
    }
  }
  
  return null;
}

async function syncDesignTokens() {
  console.log('🔄 Figmaからデザイントークンを同期します...\n');

  try {
    // 現在のトークンを読み込み
    const tokensPath = path.join(__dirname, '../design-tokens/tokens.json');
    const currentTokens = JSON.parse(await fs.readFile(tokensPath, 'utf-8'));
    
    // Figmaから最新の色を取得
    const updates = {};
    
    // Primary colors
    console.log('🎨 プライマリカラーを取得中...');
    const blue900Node = await fetchNodeData(COLOR_NODES.blue900);
    if (blue900Node && blue900Node.document) {
      const primaryColor = extractColorFromNode(blue900Node.document);
      if (primaryColor) {
        updates.primary = primaryColor;
        console.log(`  ✅ Primary: ${primaryColor}`);
      }
    }
    
    const blue1000Node = await fetchNodeData(COLOR_NODES.blue1000);
    if (blue1000Node && blue1000Node.document) {
      const secondaryColor = extractColorFromNode(blue1000Node.document);
      if (secondaryColor) {
        updates.secondary = secondaryColor;
        console.log(`  ✅ Secondary: ${secondaryColor}`);
      }
    }

    // 差分をチェック
    console.log('\n📊 差分チェック:');
    let hasChanges = false;
    
    if (updates.primary && updates.primary !== currentTokens.colors.primary) {
      console.log(`  Primary: ${currentTokens.colors.primary} → ${updates.primary}`);
      hasChanges = true;
    }
    
    if (updates.secondary && updates.secondary !== currentTokens.colors.secondary) {
      console.log(`  Secondary: ${currentTokens.colors.secondary} → ${updates.secondary}`);
      hasChanges = true;
    }
    
    if (!hasChanges) {
      console.log('  ✅ 変更はありません');
      return;
    }
    
    // 更新を適用
    console.log('\n📝 トークンを更新中...');
    
    if (updates.primary) {
      currentTokens.colors.primary = updates.primary;
    }
    if (updates.secondary) {
      currentTokens.colors.secondary = updates.secondary;
    }
    
    // ファイルに保存
    await fs.writeFile(tokensPath, JSON.stringify(currentTokens, null, 2));
    console.log('✅ トークンファイルを更新しました');
    
    // 差分レポートを生成
    const report = {
      timestamp: new Date().toISOString(),
      changes: {
        primary: updates.primary ? {
          old: currentTokens.colors.primary,
          new: updates.primary
        } : null,
        secondary: updates.secondary ? {
          old: currentTokens.colors.secondary,
          new: updates.secondary
        } : null
      }
    };
    
    const reportPath = path.join(__dirname, '../design-tokens/sync-report.json');
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    console.log(`✅ 同期レポートを保存しました: ${reportPath}`);
    
  } catch (error) {
    console.error('❌ エラーが発生しました:', error);
    process.exit(1);
  }
}

// 実行
if (require.main === module) {
  syncDesignTokens();
}