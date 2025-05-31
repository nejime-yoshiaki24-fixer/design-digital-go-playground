# デザイントークン

このディレクトリには、デジタル庁デザインシステム v2.4.0 に準拠したデザイントークンが含まれています。

## ファイル構成

- `tokens.json` - 完全なデザイントークン定義
- `figma-detailed-colors.json` - Figma APIから抽出した詳細カラー情報

## トークン構造

### カラーパレット

11種類のカラーパレット、各最大13段階の階調：

- **Blue**: プライマリカラー (#0017C1 = Blue-900)
- **Light Blue**: 情報・リンク
- **Cyan**: アクセント
- **Green**: 成功・完了
- **Lime**: 補助
- **Yellow**: 警告
- **Orange**: アラート
- **Red**: エラー・危険
- **Magenta**: 特殊用途
- **Purple**: 訪問済みリンク
- **Neutral**: グレースケール（テキスト・背景・ボーダー）

### タイポグラフィ

- **Standard**: 通常のテキスト（xlarge〜small）
- **Dense**: コンパクトなレイアウト用
- **Oneline**: 単一行表示用
- **Mono**: 等幅フォント
- **Link**: リンクテキスト

### スペーシング

10段階のスペーシングシステム（2px〜120px）

### コンポーネント固有トークン

7種類のコンポーネントに対する専用トークン：

- **Button**: パディング、ボーダー半径、最小高さ、フォントサイズ
- **Input**: パディング、ボーダー、最小高さ
- **Checkbox**: サイズ、ボーダー半径、チェックマーク幅
- **Radio**: サイズ、内側サイズ、ボーダー幅
- **Table**: セルパディング、ヘッダー背景色
- **Divider**: 太さ、スタイル
- **Accordion**: パディング、ボーダー、アイコンサイズ

## 使用方法

### JavaScript/TypeScriptでの使用

```javascript
import tokens from './design-tokens/tokens.json';

// カラーの使用
const primaryColor = tokens.colors.primary; // #0017C1
const errorBg = tokens.colors.semantic.error.background; // #FDEEEE

// コンポーネントトークンの使用
const buttonPadding = tokens.components.button.padding.medium; // 12px 24px
const inputBorderRadius = tokens.components.input.borderRadius; // 8px
```

### CSSでの使用

CSSカスタムプロパティとして定義：

```css
:root {
  /* カラーパレット */
  --color-primary: #0017C1;
  --color-secondary: #00118F;
  
  /* コンポーネント固有 */
  --button-padding-medium: 12px 24px;
  --button-min-height-medium: 40px;
  --button-font-size-medium: 16px;
  
  /* スペーシング */
  --spacing-md: 16px;
  --spacing-lg: 24px;
}
```

## 更新履歴

- 2025年5月31日: Figma APIから完全なトークンを生成（11種類のカラーパレット、コンポーネント固有トークン追加）
- 2024年5月31日: 初版作成（デジタル庁デザインシステム v2.4.0準拠）