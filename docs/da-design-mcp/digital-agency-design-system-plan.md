# デジタル庁デザインシステム特化型MCPサーバー拡張計画書

## 1. 現状分析

### 既存のFigma Context MCPサーバーの機能

- 汎用的なFigmaファイル/ノードデータの取得
- 画像（SVG/PNG）のダウンロード
- データの簡素化によるLLM向け最適化

### デジタル庁デザインシステムの特徴

- **バージョン**: v2.4.0 (Community)
- **ファイルID**: 9j4ZiexATdYbwkE4CBIMGM
- **コンポーネント数**: 31種類の標準UIコンポーネント
- **デザイントークン**: 体系的に定義された色、タイポグラフィ、スペーシング等

## 2. 拡張の目的と目標

### 主な目的

1. デジタル庁デザインシステムのコンポーネントへの効率的なアクセス
2. デザイントークンとコンポーネントの統合的な活用
3. 日本の行政サービス開発における標準化支援

### 具体的な目標

- コンポーネント名での直接アクセス（例: "ボタン"、"アコーディオン"）
- デザイントークンの自動適用
- コンポーネントの使用例とベストプラクティスの提供
- 日本語での自然な対話サポート

## 3. 技術的な実装方針

### A. 新規ツールの追加

#### 1. `get_design_system_component`

特定のコンポーネントを名前で取得

```typescript
{
  componentName: string, // "ボタン", "アコーディオン"等
  includeVariants?: boolean,
  includeTokens?: boolean
}
```

#### 2. `get_design_tokens`

デザイントークンの取得と変換

```typescript
{
  tokenType?: "colors" | "typography" | "spacing" | "all",
  format?: "css" | "scss" | "js" | "json"
}
```

#### 3. `generate_component_code`

コンポーネントのコード生成

```typescript
{
  componentName: string,
  framework: "react" | "vue" | "html",
  includeStyles?: boolean,
  useTokens?: boolean
}
```

### B. データ構造の拡張

#### コンポーネントマッピング

```typescript
interface ComponentMapping {
  name: string;          // 日本語名
  englishName: string;   // 英語名
  pageId: string;        // Figma Page ID
  description?: string;  // 使用方法の説明
  variants?: string[];   // バリエーション一覧
}
```

#### トークン統合

```typescript
interface EnhancedComponent {
  ...SimplifiedDesign;
  appliedTokens: {
    colors: string[];
    typography: string[];
    spacing: string[];
  };
  semanticRole?: string; // "primary-action", "navigation"等
}
```

### C. 設定ファイルの追加

`config/digital-agency.json`:

```json
{
  "figmaFileId": "9j4ZiexATdYbwkE4CBIMGM",
  "version": "2.4.0",
  "components": {
    "button": {
      "pageId": "8194:8625",
      "variants": ["primary", "secondary", "tertiary"],
      "tokens": {
        "colors": ["primary", "secondary"],
        "spacing": ["sm", "md", "lg"]
      }
    }
  }
}
```

## 4. 具体的な機能追加案

### Phase 1: 基本機能（1-2週間）

1. コンポーネントマッピングの実装
2. デザイントークンの読み込みと管理
3. 日本語名でのコンポーネント検索

### Phase 2: 高度な機能（2-3週間）

1. コンポーネントとトークンの自動マッチング
2. フレームワーク別コード生成
3. バリアント情報の統合

### Phase 3: 最適化と拡張（1-2週間）

1. キャッシュシステムの実装
2. コンポーネント間の関連性分析
3. 使用例とベストプラクティスの統合

## 5. 実装における考慮事項

### パフォーマンス

- 頻繁にアクセスされるコンポーネントのキャッシュ
- トークン情報のメモリ内保持

### 保守性

- デザインシステムのバージョン管理
- コンポーネントIDの変更に対する対応

### 拡張性

- 新しいコンポーネントの追加を容易に
- 他の日本政府系デザインシステムへの対応

## 6. 期待される成果

1. **開発効率の向上**: コンポーネント名での直接アクセスにより、開発時間を50%短縮
2. **一貫性の確保**: デザイントークンの自動適用により、デザインの一貫性を保証
3. **学習コストの削減**: 日本語での自然な対話により、新規開発者の学習時間を削減

## 7. 次のステップ

1. プロトタイプの作成（コンポーネントマッピング機能）
2. デジタル庁デザインシステムチームとの連携確認
3. ユーザーテストの実施
4. 本格的な実装開始

---

この計画書は、既存のFigma Context MCPサーバーをデジタル庁デザインシステムに特化させることで、日本の行政サービス開発をより効率的かつ標準化されたものにすることを目指しています。
