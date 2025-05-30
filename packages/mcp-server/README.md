# Design Digital Go Playground MCP Server

このMCPサーバーは、デジタル庁デザインシステムのコンポーネント情報を提供し、品質管理とFigma同期機能を備えています。

## アーキテクチャ

SOLID原則に基づいて設計されており、以下のモジュールで構成されています：

- `analyzers.py` - コンポーネント分析機能
- `validators.py` - デザイントークン検証機能
- `quality_metrics.py` - 品質メトリクス計算機能
- `figma_sync.py` - Figma同期チェック機能

## セットアップ

既にuvとMCP依存関係はインストール済みです。

## サーバーの起動方法

### 1. 開発モード（推奨）

```bash
cd mcp-server
uv run mcp dev mcp_server.py
```

これにより、MCPインスペクターが起動し、ブラウザでサーバーの機能をテストできます。

### 2. STDIOモード

```bash
cd mcp-server
uv run python mcp_server.py
```

### 3. SSEモード

```bash
cd mcp-server
uv run python mcp_server.py --transport sse --port 8000
```

## 提供される機能

### Resources（リソース）

1. **`components://list`** - 利用可能なコンポーネントの一覧
2. **`component://{name}/info`** - 特定のコンポーネントの詳細情報
3. **`design-tokens://colors`** - デザインシステムのカラートークン
4. **`quality://dashboard`** 🆕 - 全コンポーネントの品質ダッシュボード

### Tools（ツール）

1. **`analyze_component`** - コンポーネントの構造を分析
2. **`check_design_compliance`** - CSSがデザイントークンに準拠しているかチェック
3. **`check_figma_sync`** 🆕 - 特定コンポーネントのFigma同期状態をチェック
4. **`check_all_figma_sync`** 🆕 - 全コンポーネントのFigma同期状態をチェック

### Prompts（プロンプト）

1. **`create_component_prompt`** - 新しいコンポーネント作成のためのプロンプト
2. **`review_component_prompt`** - コンポーネントレビューのためのプロンプト

## 新機能の詳細

### 品質ダッシュボード

全コンポーネントの品質状態を一覧で確認できます：

- 総合品質スコア（0-100）
- 完全準拠コンポーネント数
- 改善が必要なコンポーネント
- 具体的な改善推奨事項

### Figma同期チェック

Figmaデザインと実装の同期状態を確認：

- 個別コンポーネントの同期状態
- 全体の同期率
- 具体的な差分の検出
- アクション必要項目のリスト

## Claude Desktopでの使用

```bash
cd mcp-server
uv run mcp install mcp_server.py --name "Design System MCP"
```

これにより、Claude DesktopからこのMCPサーバーを使用できるようになります。

## テスト方法

### 自動テスト

```bash
cd mcp-server
uv run pytest
```

### 手動テスト

```bash
cd mcp-server
uv run python test_server.py
```

### MCPインスペクター

開発モードで起動後、ブラウザで以下を試してください：

1. Resources タブで `quality://dashboard` を選択して品質状態を確認
2. Tools タブで `check_figma_sync` を選択し、コンポーネント名を入力
3. 同期状態と改善推奨事項を確認

## 注意事項

- このサーバーは親ディレクトリ（design-digital-go-playground）のファイルを参照します
- 実行時は必ず `mcp-server` ディレクトリから起動してください
- Figma同期機能は現在モックデータを使用しています（将来的にFigma MCPと統合予定）