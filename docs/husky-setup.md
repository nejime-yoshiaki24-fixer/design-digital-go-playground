# Husky & Lint-staged セットアップガイド

## 概要

このプロジェクトでは、コード品質を保つためにHuskyとlint-stagedを使用しています。
pre-commitフックで自動的にコードフォーマットが実行されます。

## 現在の設定

### 基本設定（.lintstagedrc.json）
- **Prettier**: 全てのJS/JSX/TS/TSX/JSON/MD/CSSファイルを自動フォーマット
- シンプルで高速な設定

### 包括的な設定（.lintstagedrc.full.json）
より厳格なチェックを行いたい場合は、以下のコマンドで切り替えられます：

```bash
cp .lintstagedrc.full.json .lintstagedrc.json
```

この設定には以下が含まれます：
- Prettier（コードフォーマット）
- ESLint（コード品質チェック）
- TypeScript（型チェック）

## Prettier設定

`.prettierrc.json`:
```json
{
  "semi": false,              // セミコロンなし
  "singleQuote": true,        // シングルクォート使用
  "tabWidth": 2,              // タブ幅2
  "trailingComma": "es5",     // ES5準拠の末尾カンマ
  "printWidth": 100,          // 1行の最大文字数
  "arrowParens": "always",    // アロー関数の引数に括弧を付ける
  "endOfLine": "lf",          // 改行コードLF
  "bracketSpacing": true,     // オブジェクトの括弧内にスペース
  "jsxSingleQuote": false,    // JSXはダブルクォート
  "plugins": ["prettier-plugin-tailwindcss"]  // Tailwind CSSクラスの自動ソート
}
```

## 使用方法

### 通常のコミット
```bash
git add .
git commit -m "feat: 新機能の追加"
```

コミット時に自動的に：
1. ステージングされたファイルがPrettierでフォーマットされます
2. フォーマット後のファイルがコミットに含まれます

### フォーマットをスキップしたい場合
```bash
git commit -m "メッセージ" --no-verify
```

## トラブルシューティング

### ESLintエラーが出る場合
web-v2ディレクトリで以下を実行：
```bash
npm run lint -- --fix
```

### TypeScriptエラーが出る場合
web-v2ディレクトリで以下を実行：
```bash
npm run typecheck
```

### Huskyが動作しない場合
```bash
npx husky
```

## 開発のヒント

1. **VSCode拡張機能の推奨**
   - Prettier - Code formatter
   - ESLint
   - TypeScript and JavaScript Language Features

2. **保存時の自動フォーマット**
   VSCodeの設定（.vscode/settings.json）：
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode"
   }
   ```

3. **手動フォーマット**
   ```bash
   cd web-v2
   npx prettier --write "src/**/*.{js,jsx,ts,tsx,css,md}"
   ```