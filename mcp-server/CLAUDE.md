# CLAUDE.md

このファイルは、Claude CodeがこのリポジトリのMCPサーバーで作業する際のガイダンスを提供します。

## プロジェクト概要

**design-system-validator** - デジタル庁デザインシステム準拠性検証のためのMCPサーバー

quick-data-mcpの実践的設計パターンを参考に、シンプルで効果的なアーキテクチャを採用しています。

## アーキテクチャ

### 設計原則

1. **単一ファイル**: 全機能を`src/main.ts`に統合
2. **3つの要素の統合**: Tools + Resources + Prompts
3. **最小限の抽象化**: 必要最小限のコード

### ファイル構造

```
mcp-server/
├── src/
│   └── main.ts              # 全機能統合ファイル
├── tests/
│   └── main.test.ts         # 統合テスト
├── package.json
└── tsconfig.json
```

## 提供機能

### Resources（リソース）
```typescript
// デザイントークンデータの提供
"design-tokens://all"     - 全デザイントークン
"design-tokens://colors"  - カラートークン
"design-tokens://spacing" - スペーシングトークン
```

### Tools（ツール）
```typescript
// 検証・分析機能
"validate_design_tokens"      - CSS準拠性検証
"analyze_component_structure" - コンポーネント構造分析
```

### Prompts（プロンプト）
```typescript
// 再利用可能ワークフロー
"design_system_review" - 包括的準拠性レビュー
"component_audit"      - 構造監査
```

## コマンド

### 開発・テスト

```bash
# 開発モード（推奨）
npm run dev

# ビルド
npm run build

# 品質チェック（すべて実行）
npm run typecheck && npm run lint && npm test

# MCPインスペクターでテスト
npm run inspector
```

### 利用例

**プロンプトの活用:**
```bash
# デザインシステムレビューワークフロー
design_system_review(component_name="Button", css_content="...")

# コンポーネント監査ワークフロー  
component_audit(component_path="/path/to/component")
```

## 承認済みデザイントークン

### カラー
- **プライマリ**: `#0017C1`
- **テキスト**: `#1A1A1C`, `#595959`, `#767676`
- **背景**: `#FFFFFF`, `#F0F0F0`, `#D9D9D9`
- **セマンティック**: `#D32F2F`(エラー), `#FFC107`(警告), `#4CAF50`(成功)

### スペーシング
- **xs**: `4px`, **sm**: `8px`, **md**: `16px`, **lg**: `24px`, **xl**: `32px`

## 実装パターン

### バリデーション
```typescript
// シンプルな正規表現ベース検証
const colorMatches = css.matchAll(/#[0-9A-Fa-f]{6}/g);
const spacingMatches = css.matchAll(/\b\d+px\b/g);
```

### 構造分析
```typescript
// ファイル存在チェック
const hasStyles = files.some(f => f.includes('.css'));
const hasTests = files.some(f => f.includes('.test.'));
```

### プロンプトワークフロー
```typescript
// 手順化されたテンプレート
const instructions = `
## 1. ツール実行
\`validate_design_tokens\` でCSS検証

## 2. リソース確認  
\`design-tokens://colors\` で承認色確認

## 3. レポート生成
結果をまとめて改善提案
`;
```

## トラブルシューティング

### よくある問題

1. **デザイントークンが見つからない**
   ```bash
   # パス確認
   ls ../../../design-tokens/tokens.json
   ```

2. **型エラー**
   ```bash
   npm run typecheck
   ```

3. **MCP接続エラー**
   ```bash
   npm run inspector
   ```

## quick-data-mcpから学んだ改善点

1. **Tools, Resources, Promptsの統合活用**
2. **シンプルな単一ファイル構造**
3. **実践的なワークフローテンプレート**
4. **最小限の抽象化でメンテナンス性向上**

## 開発フロー

1. `src/main.ts`で機能追加・修正
2. `npm run typecheck && npm run lint && npm test`で品質確認
3. `npm run inspector`でMCP動作確認
4. 必要に応じてPrompts追加でワークフロー改善