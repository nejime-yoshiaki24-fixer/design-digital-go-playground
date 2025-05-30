# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

```bash
# MCPインスペクターで開発（推奨）
cd mcp-server
uv run mcp dev mcp_server.py

# STDIOモードで起動
uv run python mcp_server.py

# SSEモードで起動
uv run python mcp_server.py --transport sse --port 8000
```

### Quality Checks

```bash
# 型チェック（strict mode）
uv run pyright mcp_server.py

# リンティング
uv run ruff check mcp_server.py --fix

# フォーマット
uv run ruff format mcp_server.py

# テスト実行
uv run pytest

# すべてのチェックを実行
uv run pyright mcp_server.py && uv run ruff check mcp_server.py && uv run ruff format mcp_server.py && uv run pytest
```

## Architecture

このMCPサーバーは、デジタル庁デザインシステムのReactコンポーネントを管理するためのModel Context Protocol (MCP)サーバーです。SOLID原則に基づいた設計で、品質分析とFigma同期機能を提供します。

### モジュール構成

- **mcp_server.py**: メインサーバー実装、すべてのリソース・ツール・プロンプトを統合
- **analyzers.py**: コンポーネントの構造分析（StructureAnalyzer, FileAnalyzer）
- **validators.py**: デザイントークン準拠性検証（DesignTokenValidator）
- **quality_metrics.py**: 品質メトリクス計算（ComponentQuality, CompletenessCalculator, QualityAggregator）
- **figma_sync.py**: Figma同期状態チェック（ComponentSyncChecker, MockFigmaConnector）

### 提供機能

**Resources:**

- `components://list` - コンポーネント一覧
- `component://{name}/info` - 個別コンポーネント情報
- `design-tokens://colors` - 承認済みカラートークン
- `quality://dashboard` - 品質ダッシュボード

**Tools:**

- `analyze_component` - コンポーネント構造分析
- `check_design_compliance` - デザイン準拠チェック
- `check_figma_sync` - Figma同期チェック
- `check_all_figma_sync` - 全コンポーネント同期状態

**Prompts:**

- `create_component_prompt` - 新規コンポーネント作成支援
- `review_component_prompt` - コードレビュー支援

### 重要な制約

1. **Pydantic型定義必須**: すべてのツールとプロンプトの引数はPydanticのBaseModelで定義
2. **実行ディレクトリ**: 必ず`mcp-server`ディレクトリから起動（親ディレクトリのコンポーネントを参照）
3. **デザイントークン**: 承認済みの色とスペーシングのみ使用可能

### デザイントークン

**承認済みカラー:**

- プライマリ: #0017C1
- グレースケール: #1A1A1C, #595959, #767676, #D9D9D9, #F0F0F0, #FFFFFF
- セマンティック: #D32F2F (エラー), #FFC107 (警告), #4CAF50 (成功)

**標準スペーシング:**

- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px

### 開発フロー

1. 機能追加・修正時は対応するモジュールを編集
2. Pydanticモデルで型定義を追加
3. `uv run pyright`で型チェック
4. `uv run ruff check --fix`でリンティング
5. `uv run pytest`でテスト実行
6. MCPインスペクターで動作確認
