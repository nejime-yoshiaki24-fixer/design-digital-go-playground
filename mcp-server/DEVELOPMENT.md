# MCP Server Development Guide

## アーキテクチャ

```
mcp-server/
├── mcp_server.py      # メインサーバー実装
├── test_server.py     # ローカルテスト用スクリプト
├── pyproject.toml     # プロジェクト設定
├── README.md          # 使用方法
└── DEVELOPMENT.md     # 開発ガイド（このファイル）
```

## コード構造

### 定数定義

- `PROJECT_ROOT`: プロジェクトのルートディレクトリ
- `COMPONENTS_DIR`: コンポーネントディレクトリ
- `DESIGN_TOKENS`: デジタル庁デザイントークン
- `VALID_COLORS`: 承認済みカラーコード
- `VALID_SPACING`: 標準スペーシング値

### Pydanticモデル

すべてのツールとプロンプトの引数は型安全性のためPydanticモデルを使用：

- `AnalyzeComponentArgs`
- `CheckDesignComplianceArgs`
- `CreateComponentPromptArgs`
- `ReviewComponentPromptArgs`

### ヘルパー関数

共通ロジックを関数として切り出し：

- `get_component_list()`: コンポーネント一覧取得
- `get_component_files()`: ファイル情報取得
- `analyze_component_structure()`: 構造分析
- `check_css_compliance()`: CSS準拠チェック

## 開発プロセスの最適化

### 1. 型チェック（Pyright）

今回のエラーはpyrightで検出可能でした：

```bash
uv run pyright mcp_server.py
```

**重要な設定（pyproject.toml）**:

```toml
[tool.pyright]
pythonVersion = "3.13"
typeCheckingMode = "strict"  # 厳密な型チェック
```

### 2. リンティングとフォーマット（Ruff）

```bash
# チェック
uv run ruff check mcp_server.py

# 自動修正
uv run ruff check mcp_server.py --fix

# フォーマット
uv run ruff format mcp_server.py
```

### 3. テスト駆動開発

```bash
# ユニットテスト
uv run pytest

# インテグレーションテスト（MCPインスペクター）
uv run mcp dev mcp_server.py
```

## エラーを防ぐためのチェックリスト

### ✅ 開発前チェック

1. **Pydanticモデルの定義**

   ```python
   class ToolArgs(BaseModel):
       param: str = Field(description="パラメータの説明")
   ```

2. **型アノテーション**

   ```python
   def my_function(args: ToolArgs) -> str:
       # 明示的な型注釈
       results: list[str] = []
   ```

### ✅ 開発中チェック

1. **定期的な型チェック**

   ```bash
   # ファイル保存時に実行
   uv run pyright --watch
   ```

2. **MCPインスペクターでの動作確認**
   - 引数の検証
   - レスポンスの確認
   - エラーログのチェック

### ✅ コミット前チェック

```bash
# 全チェックを実行するスクリプト
uv run pyright mcp_server.py && \
uv run ruff check mcp_server.py && \
uv run pytest
```

## FastMCP特有の注意点

1. **すべてのツール/プロンプトにPydanticモデル必須**

   ```python
   @mcp.tool()
   def my_tool(args: MyArgs) -> str:  # argsは必ずBaseModelを継承
   ```

2. **プロンプトの戻り値**

   ```python
   # 文字列または base.Message のリスト
   def prompt(args: Args) -> str | list[base.Message]:
   ```

3. **リソースは引数が文字列のみ**

   ```python
   @mcp.resource("resource://{param}")
   def resource(param: str) -> str:  # 単純な文字列引数
   ```

## VS Code推奨設定

`.vscode/settings.json`:

```json
{
  "python.linting.enabled": false,
  "python.analysis.typeCheckingMode": "strict",
  "[python]": {
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.organizeImports": true
    }
  },
  "ruff.lint.run": "onType",
  "ruff.format.enable": true
}
```

## 継続的インテグレーション

GitHub Actionsの例:

```yaml
- name: Type Check
  run: uv run pyright

- name: Lint
  run: uv run ruff check .

- name: Test
  run: uv run pytest
```

## 新機能の追加方法

### 新しいリソースの追加

```python
@mcp.resource("resource://path")
def new_resource() -> str:
    """リソースの説明"""
    # 実装
    return json.dumps(data, indent=2, ensure_ascii=False)
```

### 新しいツールの追加

```python
class NewToolArgs(BaseModel):
    param: str = Field(description="パラメータの説明")

@mcp.tool()
def new_tool(args: NewToolArgs) -> str:
    """ツールの説明"""
    # 実装
    return result
```

### 新しいプロンプトの追加

```python
class NewPromptArgs(BaseModel):
    param: str = Field(description="パラメータの説明")

@mcp.prompt()
def new_prompt(args: NewPromptArgs) -> str:
    """プロンプトの説明"""
    # 実装
    return prompt_text
```

## デバッグ

### ローカルテスト

```bash
cd mcp-server
uv run python test_server.py
```

### MCPインスペクター

```bash
cd mcp-server
uv run mcp dev mcp_server.py
# ブラウザで http://localhost:6274 を開く
```

### ログ確認

MCPインスペクターのLogsタブでサーバーログを確認

## トラブルシューティング

### Pydanticバリデーションエラー

- Field()で必須/オプショナルを明確に
- 型ヒントが正しいか確認
- デフォルト値の設定を検討

### ファイルパスの問題

- PROJECT_ROOTが正しく設定されているか確認
- 相対パスではなく絶対パスを使用
- Path.exists()で存在確認

### エンコーディングの問題

- json.dumps()で`ensure_ascii=False`を使用
- UTF-8エンコーディングを前提に設計

このプロセスに従うことで、実行時エラーを事前に防ぎ、高品質なMCPサーバーを開発できます。
