# デジタル庁デザインシステム Reactコンポーネント実装ガイド

このドキュメントは、デジタル庁デザインシステムに準拠したReactコンポーネントの実装指示書です。

## 🎯 実装の目的

Figmaで定義されたデジタル庁デザインシステム v2.4.0をReactコンポーネントとして実装します。

**重要な原則:**

- アクセシビリティファースト（WCAG 2.1 AA準拠）
- デザイントークンの厳密な適用
- TypeScriptによる型安全性の確保

## 📁 作業ディレクトリ

```
/home/napnel/Workspaces/design-system-mcp-playground/
├── web/src/components/        # ← ここにコンポーネントを実装
└── design-tokens/tokens.json  # ← デザイントークン定義
```

## プロジェクト構成

- **web/**: Reactウェブサイト（Create React App + TypeScript）
- **Storybook**: コンポーネントのドキュメントとビジュアルテスト
- **Playwright**: ビジュアルリグレッションテスト
- **Jest**: ユニットテスト

## 🎨 デザイントークンの使い方

**重要:** すべてのスタイリングは `design-tokens/tokens.json` のトークンを使用してください。

### トークンファイルの場所

```bash
/home/napnel/Workspaces/design-system-mcp-playground/design-tokens/tokens.json
```

### CSS変数への変換例

```css
:root {
  /* Colors */
  --color-primary: #0017C1;
  --color-secondary: #00118F;
  --color-text-primary: #333333;
  
  /* Component specific */
  --button-padding-medium: 12px 24px;
  --button-min-height-medium: 40px;
  
  /* Spacing */
  --spacing-md: 16px;
}
```

### カラートークン

```javascript
// プライマリカラー
colors.primary: "#0017C1"     // Blue-900
colors.secondary: "#00118F"   // Blue-1000

// カラーパレット（11種類、各13段階）
colors.blue: { 50: "#E8F1FE", ..., 900: "#0017C1", 1000: "#00118F", ..., 1200: "#000060" }
colors.lightBlue: { 50: "#F0F9FF", ..., 900: "#0055AD", ..., 1200: "#00234B" }
colors.cyan: { 50: "#E9F7F9", ..., 900: "#006F83", ..., 1200: "#003741" }
colors.green: { 50: "#E6F5EC", ..., 600: "#259D63", ..., 1200: "#032213" }
colors.lime: { 50: "#EBFAD9", ..., 700: "#6FA104", ..., 1200: "#1E2D00" }
colors.yellow: { 50: "#FBF5E0", ..., 700: "#B78F00", ..., 1200: "#604B00" }
colors.orange: { 50: "#FFEEE2", ..., 600: "#FB5B01", ..., 1200: "#541E00" }
colors.red: { 50: "#FDEEEE", ..., 900: "#CE0000", ..., 1200: "#620000" }
colors.magenta: { 50: "#F3E5F4", ..., 900: "#8B008B", ..., 1200: "#3B003B" }
colors.purple: { 50: "#F1EAFA", ..., 900: "#5109AD", ..., 1200: "#21004B" }
colors.neutral: { 0: "#FFFFFF", 50: "#F2F2F2", ..., 900: "#1A1A1C", 1000: "#000000" }

// テキストカラー
colors.text.primary: "#333333"    // Neutral-800
colors.text.secondary: "#595959"  // Neutral-700
colors.text.tertiary: "#767676"   // Neutral-600
colors.text.disabled: "#B8B8B8"   // Neutral-400
colors.text.onDark: "#FFFFFF"     // Neutral-0
colors.text.mono: "#1A1A1C"       // Neutral-900
colors.text.link: {
  default: "#0017C1",   // Blue-900
  hover: "#00118F",     // Blue-1000
  visited: "#5109AD",   // Purple-900
  active: "#CE0000"     // Red-900
}

// 背景カラー
colors.background.primary: "#FFFFFF"   // Neutral-0
colors.background.secondary: "#F5F5F5"
colors.background.tertiary: "#F2F2F2"  // Neutral-50
colors.background.surface: "#F0F0F0"   // Neutral-100

// ボーダーカラー
colors.border.default: "#D9D9D9"  // Neutral-300
colors.border.focused: "#0017C1"  // Blue-900
colors.border.divider: "#949494"  // Neutral-500

// セマンティックカラー（背景色も含む）
colors.semantic.error: {
  main: "#CE0000",         // Red-900
  light: "#FB5B01",        // Orange-600
  dark: "#EC0000",         // Red-800
  background: "#FDEEEE"    // Red-50
}
colors.semantic.warning: {
  main: "#B78F00",         // Yellow-700
  light: "#FFC700",        // Yellow-400
  dark: "#927200",         // Yellow-900
  background: "#FBF5E0"    // Yellow-50
}
colors.semantic.success: {
  main: "#259D63",         // Green-600
  light: "#51B883",        // Green-400
  dark: "#197A4B",         // Green-800
  background: "#E6F5EC"    // Green-50
}
colors.semantic.info: {
  main: "#008BF2",         // Light Blue-600
  light: "#57B8FF",        // Light Blue-400
  dark: "#0066BE",         // Light Blue-800
  background: "#F0F9FF"    // Light Blue-50
}
```

### スペーシングトークン

```javascript
spacing.xxs: "2px"
spacing.xs: "4px"
spacing.sm: "8px"
spacing.md: "16px"
spacing.lg: "24px"
spacing.xl: "32px"
spacing.xxl: "48px"
spacing.xxxl: "64px"
```

### タイポグラフィトークン

```javascript
// フォントファミリー
typography.fontFamily.primary: "Noto Sans JP"

// 標準タイポグラフィ
typography.standard.xlarge: { fontSize: "32px", lineHeight: "1.5", fontWeight: 700 }
typography.standard.large: { fontSize: "28px", lineHeight: "1.5", fontWeight: 700 }
typography.standard.medium: { fontSize: "20px", lineHeight: "1.5", fontWeight: 700 }
typography.standard.base: { fontSize: "16px", lineHeight: "1.7", fontWeight: 400 }
typography.standard.small: { fontSize: "14px", lineHeight: "1.5", fontWeight: 400 }

// コンパクトタイポグラフィ
typography.dense.base: { fontSize: "14px", lineHeight: "1.5", fontWeight: 400 }

// リンクタイポグラフィ
typography.link.standard: { fontSize: "16px", lineHeight: "1.7", textDecoration: "underline" }
```

### その他のトークン

```javascript
// ボーダーラジウス
borderRadius.xs: "4px"
borderRadius.sm: "8px"
borderRadius.md: "12px"

// エレベーション（シャドウ）
elevation.level1: "0px 1px 5px 0px rgba(0, 0, 0, 0.3), 0px 2px 8px 1px rgba(0, 0, 0, 0.1)"
elevation.simple: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"

// トランジション
transition.duration.fast: "150ms"
transition.duration.normal: "250ms"
transition.easing.easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)"
```

## デザイン原則

### ユーザー中心設計

- ユーザーに情報の意味や操作方法を伝える
- 直感的で分かりやすいインターフェース
- 一貫性のある操作感

### アクセシビリティファースト

- すべてのユーザーが使えるデザイン
- 多様なデバイス・環境での利用を考慮
- 支援技術への対応

### パフォーマンス

- 軽量で高速なレンダリング
- 最適化されたアセット
- 効率的なコード

## 📋 コンポーネント実装詳細

### 1. Button コンポーネント（最初に実装）

#### 完全な実装例

#### バリアント

- **Style**: Solid Fill（塗りつぶし）、Outlined（アウトライン）、Text（テキスト）
- **Size**: Large、Medium、Small、X-Small
- **State**: Default、Hover、Active、Focus、Disabled

#### Button.tsx の完全実装

```typescript
import React from 'react';
import './Button.css';

export interface ButtonProps {
  variant?: 'solid' | 'outlined' | 'text';
  size?: 'large' | 'medium' | 'small' | 'x-small';
  disabled?: boolean;
  leadIcon?: React.ReactNode;
  trailIcon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  size = 'medium',
  disabled = false,
  leadIcon,
  trailIcon,
  children,
  onClick,
  ariaLabel,
  type = 'button',
  className = ''
}) => {
  const buttonClasses = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    disabled ? 'button--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-disabled={disabled}
    >
      {leadIcon && <span className="button__icon button__icon--lead">{leadIcon}</span>}
      <span className="button__text">{children}</span>
      {trailIcon && <span className="button__icon button__icon--trail">{trailIcon}</span>}
    </button>
  );
};
```

#### スタイリングルール

- **パディング**:
  - Large: 16px 32px (components.button.padding.large)
  - Medium: 12px 24px (components.button.padding.medium)
  - Small: 8px 16px (components.button.padding.small)
  - X-Small: 7px 8px

- **ボーダーラジウス**: 8px (components.button.borderRadius)

- **最小高さ**:
  - Large: 48px (components.button.minHeight.large)
  - Medium: 40px (components.button.minHeight.medium)
  - Small: 32px (components.button.minHeight.small)
  
- **フォント**:
  - フォントウェイト: 700 (typography.fontWeight.bold)
  - フォントサイズ:
    - Large: 18px (components.button.fontSize.large)
    - Medium: 16px (components.button.fontSize.medium)
    - Small: 14px (components.button.fontSize.small)
  - レタースペーシング: 2%

- **カラー** (Solid Fill):
  - Default: 背景#0017C1、テキスト#FFFFFF
  - Hover: 背景#00118F
  - Active: 背景#000060
  - Disabled: 背景#B3B3B3

### 2. Accordion コンポーネント

#### Accordion.tsx

```typescript
import React, { useState } from 'react';
import './Accordion.css';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
  className = ''
}) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds(prev =>
        prev.includes(id)
          ? prev.filter(itemId => itemId !== id)
          : [...prev, id]
      );
    } else {
      setOpenIds(prev => prev.includes(id) ? [] : [id]);
    }
  };

  return (
    <div className={`accordion ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="accordion__item">
            <button
              className="accordion__trigger"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
            >
              <span className="accordion__title">{item.title}</span>
              <svg 
                className={`accordion__icon ${isOpen ? 'accordion__icon--open' : ''}`}
                width="24" 
                height="24" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </button>
            <div
              id={`accordion-panel-${item.id}`}
              className={`accordion__panel ${isOpen ? 'accordion__panel--open' : ''}`}
              role="region"
              aria-labelledby={`accordion-trigger-${item.id}`}
            >
              <div className="accordion__content">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
```

### 3. Checkbox コンポーネント

#### Checkbox.tsx

```typescript
import React from 'react';
import './Checkbox.css';

export interface CheckboxProps {
  id?: string;
  size?: 'large' | 'medium' | 'small';
  label?: string;
  error?: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  size = 'medium',
  label,
  error,
  checked = false,
  indeterminate = false,
  disabled = false,
  onChange,
  className = ''
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${checkboxId}-error` : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <div className={`checkbox-wrapper checkbox-wrapper--${size} ${className}`}>
      <div className="checkbox-container">
        <input
          type="checkbox"
          id={checkboxId}
          className="checkbox__input"
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          aria-describedby={errorId}
          aria-invalid={!!error}
          ref={(el) => {
            if (el) el.indeterminate = indeterminate;
          }}
        />
        <label htmlFor={checkboxId} className="checkbox__label">
          <span className="checkbox__box">
            <svg 
              className="checkbox__checkmark" 
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path 
                d="M13.5 4.5L6 12L2.5 8.5" 
                stroke="currentColor" 
                strokeWidth="3" 
                fill="none"
              />
            </svg>
          </span>
          {label && <span className="checkbox__text">{label}</span>}
        </label>
      </div>
      {error && (
        <div id={errorId} className="checkbox__error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};
```

### 4. Table コンポーネント

#### Table.tsx

```typescript
import React from 'react';
import './Table.css';

export interface TableColumn<T = any> {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  onRowClick?: (record: T, index: number) => void;
}

export function Table<T extends Record<string, any>>({
  columns,
  data,
  striped = false,
  hoverable = true,
  compact = false,
  loading = false,
  emptyMessage = 'データがありません',
  className = '',
  onRowClick
}: TableProps<T>) {
  const tableClasses = [
    'table',
    striped ? 'table--striped' : '',
    hoverable ? 'table--hoverable' : '',
    compact ? 'table--compact' : '',
    loading ? 'table--loading' : '',
    className
  ].filter(Boolean).join(' ');

  if (loading) {
    return (
      <div className={tableClasses}>
        <div className="table__loading">
          読み込み中...
        </div>
      </div>
    );
  }

  return (
    <div className={tableClasses}>
      <table className="table__element">
        <thead className="table__header">
          <tr className="table__row">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`table__header-cell table__header-cell--${column.align || 'left'}`}
                style={{ width: column.width }}
                scope="col"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table__body">
          {data.length === 0 ? (
            <tr className="table__row table__row--empty">
              <td 
                className="table__cell table__cell--empty" 
                colSpan={columns.length}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((record, rowIndex) => (
              <tr
                key={rowIndex}
                className="table__row"
                onClick={() => onRowClick?.(record, rowIndex)}
                style={{ cursor: onRowClick ? 'pointer' : 'default' }}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`table__cell table__cell--${column.align || 'left'}`}
                  >
                    {column.render
                      ? column.render(record[column.key], record, rowIndex)
                      : record[column.key]
                    }
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
```

### 5. Divider コンポーネント

#### Divider.tsx

```typescript
import React from 'react';
import './Divider.css';

export interface DividerProps {
  type?: 'solid' | 'dashed' | 'dotted';
  orientation?: 'horizontal' | 'vertical';
  thickness?: 'thin' | 'medium' | 'thick';
  spacing?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  type = 'solid',
  orientation = 'horizontal',
  thickness = 'thin',
  spacing = 'md',
  color,
  className = ''
}) => {
  const dividerClasses = [
    'divider',
    `divider--${orientation}`,
    `divider--${type}`,
    `divider--${thickness}`,
    `divider--spacing-${spacing}`,
    className
  ].filter(Boolean).join(' ');

  const style: React.CSSProperties = {};
  if (color) {
    style.borderColor = color;
  }

  return (
    <div 
      className={dividerClasses}
      style={style}
      role="separator"
      aria-orientation={orientation}
    />
  );
};
```

### コンポーネント固有トークン

```javascript
// ボタン
components.button: {
  padding: { small: "8px 16px", medium: "12px 24px", large: "16px 32px" },
  borderRadius: "8px",
  minHeight: { small: "32px", medium: "40px", large: "48px" },
  fontSize: { small: "14px", medium: "16px", large: "18px" }
}

// 入力フィールド
components.input: {
  padding: "12px 16px",
  borderRadius: "8px",
  borderWidth: "1px",
  minHeight: "48px",
  fontSize: "16px"
}

// チェックボックス
components.checkbox: {
  size: "20px",
  borderRadius: "4px",
  borderWidth: "2px",
  checkmarkWidth: "3px"
}

// テーブル
components.table: {
  cellPadding: "16px",
  borderWidth: "1px",
  headerBackground: "#F0F0F0",  // Neutral-100
  stripedBackground: "#F2F2F2"  // Neutral-50
}

// アコーディオン
components.accordion: {
  padding: "16px",
  borderRadius: "8px",
  borderWidth: "1px",
  iconSize: "24px"
}

// ディバイダー
components.divider: {
  thickness: { thin: "1px", medium: "2px", thick: "4px" },
  style: { solid: "solid", dashed: "dashed", dotted: "dotted" }
}
```

## 🚀 実装手順（必ずこの順番で実行）

### ステップ1: Figmaデザインの確認

```typescript
// Figmaデザインシステムの参照URL:
// https://www.figma.com/file/9j4ZiexATdYbwkE4CBIMGM/

// 主要コンポーネントのNode ID（参考情報）:
// ボタン: 8194:8625
// アコーディオン: 8191:8077
// チェックボックス: 8194:8617
// テーブル: 9729:186
// ディバイダー: 8194:8618
```

### ステップ2: ファイル構成の作成

**必須ファイル構成:**

```
web/src/components/Button/
├── Button.tsx          # メインコンポーネント
├── Button.css          # スタイル（CSS-in-JSは禁止）
├── Button.stories.tsx  # Storybookストーリー
├── Button.test.tsx     # Jestテスト
└── index.ts           # export { Button } from './Button';
```

### ステップ3: 実装の開始

各コンポーネントは以下の順序で実装してください：

1. **Button** → 最も基本的なコンポーネント
2. **Checkbox** → フォーム要素の基本
3. **Table** → データ表示の基本
4. **Accordion** → インタラクティブ要素
5. **Divider** → レイアウト補助

### ステップ4: CSSの実装

**重要ルール:**

- CSS-in-JSは使用禁止
- BEM命名規則を使用
- デザイントークンはCSS変数経由で参照
- レスポンシブ対応必須

```css
/* Button.css */
.button {
  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-bold);
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-duration-fast) var(--transition-easing-ease-in-out);
  cursor: pointer;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
}

/* Solid variant */
.button--solid {
  background-color: var(--color-primary);
  color: var(--color-text-on-dark);
}

.button--solid:hover:not(:disabled) {
  background-color: var(--color-secondary);
}

.button--solid:active:not(:disabled) {
  background-color: #000060;
}

.button--solid:disabled {
  background-color: var(--color-text-disabled);
  cursor: not-allowed;
}

/* Focus state */
.button:focus-visible {
  outline: 3px solid var(--color-border-focused);
  outline-offset: 2px;
}

/* Size variations */
.button--large {
  padding: var(--button-padding-large);
  min-height: var(--button-min-height-large);
  font-size: var(--button-font-size-large);
}

.button--medium {
  padding: var(--button-padding-medium);
  min-height: var(--button-min-height-medium);
  font-size: var(--button-font-size-medium);
}

.button--small {
  padding: var(--button-padding-small);
  min-height: var(--button-min-height-small);
  font-size: var(--button-font-size-small);
}

.button--x-small {
  padding: 7px var(--spacing-sm);
  font-size: var(--typography-standard-small-font-size);
}
```

### ステップ5: アクセシビリティの実装

**必須要件（WCAG 2.1 AA準拠）:**

✅ **コントラスト比**

- 通常テキスト: 4.5:1以上
- 大きいテキスト（18px以上）: 3:1以上
- 検証方法: Chrome DevToolsのLighthouse

✅ **タッチターゲット**

- 最小サイズ: 44x44px
- ボタンの最小高さで確保済み

✅ **フォーカスインジケーター**

- アウトライン: 3px solid #0017C1
- outline-offset: 2px

- **ARIA属性**

  ```jsx
  // ボタン
  aria-label（アイコンのみのボタンの場合）
  aria-pressed（トグルボタンの場合）
  aria-disabled（無効状態）
  
  // アコーディオン
  aria-expanded
  aria-controls
  role="region"
  
  // チェックボックス
  aria-checked
  aria-describedby（エラーメッセージとの関連付け）
  
  // テーブル
  role="table"
  scope="col"/"row"
  aria-sort
  ```

- **キーボードナビゲーション**
  - Tabキー: フォーカス移動
  - Enter/Spaceキー: アクション実行
  - 矢印キー: ラジオボタン、メニュー内の移動
  - Escapeキー: モーダル、ポップアップの閉じる

- **スクリーンリーダー対応**
  - 適切なラベルテキスト
  - 状態変化の通知（aria-live、role="alert"）
  - フォームフィールドとラベルの関連付け

### ステップ6: テストの実装

#### Button.test.tsx の例

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me').closest('button')).toBeDisabled();
  });
});
```

#### テストコマンド

```bash
# ユニットテスト
npm run test:components

# ビジュアルテスト（Playwright）
npm run test:visual
```

## ✅ 完了チェックリスト

各コンポーネントの実装後、以下をすべて確認してください：

### 1. コード品質チェック

```bash
# TypeScript型チェック（webディレクトリで実行）
cd web && npx tsc --noEmit
```

### 2. テスト実行

```bash
# ユニットテスト
npm run test:components

# ビジュアルテスト
npm run test:visual

# すべてパスするまで修正を繰り返す
```

### 3. Storybook確認

```bash
npm run dev:storybook
# http://localhost:6006 で全バリエーションを確認
```

### 4. デザイントークン準拠性

```bash
# CSSファイルがデザイントークンを使用していることを手動で確認
# すべての色、スペーシング、サイズ値がCSS変数を使用していること
```

## ⚠️ 絶対に守るべきルール

### 禁止事項

❌ **型の回避**

```typescript
// 禁止
const props: any = { ... }
const element = ref as HTMLDivElement

// 正しい
const props: ButtonProps = { ... }
const element = ref.current
```

❌ **エラーの無視**

```typescript
// 禁止
// @ts-ignore
// eslint-disable-next-line

// 正しい: エラーの原因を修正する
```

❌ **デザイントークン以外の値**

```css
/* 禁止 */
.button { 
  color: #333; /* 直接指定 */
  padding: 12px; /* マジックナンバー */
}

/* 正しい */
.button {
  color: var(--color-text-primary);
  padding: var(--spacing-sm);
}
```

### 必須事項

✅ すべてのエラーを解決するまで実装を続ける
✅ アクセシビリティ要件をすべて満たす
✅ デザイントークンを厳密に使用する

## 📚 クイックリファレンス

### 重要なファイルパス

```bash
# デザイントークン
/home/napnel/Workspaces/design-system-mcp-playground/design-tokens/tokens.json

# コンポーネント実装先
/home/napnel/Workspaces/design-system-mcp-playground/web/src/components/

# プロジェクトドキュメント
/home/napnel/Workspaces/design-system-mcp-playground/CLAUDE.md
```

### よく使うコマンド

```bash
# 開発サーバー起動
npm run dev:components      # React開発サーバー
npm run dev:storybook      # Storybook

# テスト実行
npm run test:components    # ユニットテスト
npm run test:visual       # ビジュアルテスト
```

### トラブルシューティング

**Q: CSS変数が適用されない**
A: index.cssでCSS変数が定義されているか確認。design-tokens/tokens.jsonの値と一致しているか確認。

**Q: TypeScriptエラーが解決できない**
A: `any`や`as`を使わず、適切な型定義を追加。不明な場合はReact.ReactNodeやReact.FCなどの汎用型を使用。

**Q: テストが失敗する**
A: data-testid属性を追加してテストしやすくする。アクセシビリティ属性（aria-label等）でも要素を特定可能。

---

## 📦 共通CSS変数の定義

`web/src/index.css`に以下のCSS変数を定義してください：

```css
:root {
  /* Colors */
  --color-primary: #0017C1;
  --color-secondary: #00118F;
  --color-text-primary: #333333;
  --color-text-secondary: #595959;
  --color-text-tertiary: #767676;
  --color-text-disabled: #B8B8B8;
  --color-text-on-dark: #FFFFFF;
  --color-border-default: #D9D9D9;
  --color-border-focused: #0017C1;
  --color-background-primary: #FFFFFF;
  --color-background-surface: #F0F0F0;
  --color-error-main: #CE0000;
  --color-warning-main: #B78F00;
  --color-success-main: #259D63;
  
  /* Spacing */
  --spacing-xxs: 2px;
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 48px;
  
  /* Typography */
  --font-family-primary: 'Noto Sans JP', sans-serif;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  
  /* Components */
  --button-padding-large: 16px 32px;
  --button-padding-medium: 12px 24px;
  --button-padding-small: 8px 16px;
  --button-min-height-large: 48px;
  --button-min-height-medium: 40px;
  --button-min-height-small: 32px;
  --button-font-size-large: 18px;
  --button-font-size-medium: 16px;
  --button-font-size-small: 14px;
  --button-border-radius: 8px;
  
  --checkbox-size: 20px;
  --checkbox-border-radius: 4px;
  --checkbox-border-width: 2px;
  
  --table-cell-padding: 16px;
  --table-header-background: #F0F0F0;
  --table-striped-background: #F2F2F2;
  
  --accordion-padding: 16px;
  --accordion-border-radius: 8px;
  --accordion-icon-size: 24px;
  
  /* Transitions */
  --transition-duration-fast: 150ms;
  --transition-duration-normal: 250ms;
  --transition-easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Shadows */
  --elevation-level1: 0px 1px 5px 0px rgba(0, 0, 0, 0.3), 0px 2px 8px 1px rgba(0, 0, 0, 0.1);
  --elevation-simple: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  
  /* Border Radius */
  --border-radius-xs: 4px;
  --border-radius-sm: 8px;
  --border-radius-md: 12px;
}
```

## 🎯 実装開始

**実装順序：**

1. 🔢 **Button** - 基本的なUI要素
2. ✅ **Checkbox** - フォーム要素
3. 📊 **Table** - データ表示
4. 📂 **Accordion** - 折り畳みUI
5. — **Divider** - 区切り線

各コンポーネントについて、上記の完全な実装例を参考に、すべてのチェックリストをクリアしてください。

成功を祈ります！
