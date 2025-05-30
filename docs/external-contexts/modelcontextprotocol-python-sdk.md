# Model Context Protocol Python SDK Documentation

このドキュメントは、Model Context Protocol (MCP) Python SDKの公式ドキュメントから取得したコンテキスト情報です。

## 概要

Model Context Protocol Python SDKは、MCPサーバーとクライアントを実装するための公式Pythonライブラリです。

- **リポジトリ**: <https://github.com/modelcontextprotocol/python-sdk>
- **コードスニペット数**: 37
- **信頼スコア**: 7.8

## インストール

### uvを使用する場合

```bash
uv init mcp-server-demo
cd mcp-server-demo
uv add "mcp[cli]"
```

### pipを使用する場合

```bash
pip install "mcp[cli]"
```

## MCPサーバーの実装

### 1. シンプルなMCPサーバー（FastMCP使用）

```python
# server.py
from mcp.server.fastmcp import FastMCP

# MCPサーバーを作成
mcp = FastMCP("Demo")

# 足し算ツールを追加
@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b

# 動的なグリーティングリソースを追加
@mcp.resource("greeting://{name}")
def get_greeting(name: str) -> str:
    """Get a personalized greeting"""
    return f"Hello, {name}!"
```

### 2. エコーサーバーの実装

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Echo")

@mcp.resource("echo://{message}")
def echo_resource(message: str) -> str:
    """Echo a message as a resource"""
    return f"Resource echo: {message}"

@mcp.tool()
def echo_tool(message: str) -> str:
    """Echo a message as a tool"""
    return f"Tool echo: {message}"

@mcp.prompt()
def echo_prompt(message: str) -> str:
    """Create an echo prompt"""
    return f"Please process this message: {message}"
```

### 3. SQLiteエクスプローラーの実装

```python
import sqlite3
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("SQLite Explorer")

@mcp.resource("schema://main")
def get_schema() -> str:
    """Provide the database schema as a resource"""
    conn = sqlite3.connect("database.db")
    schema = conn.execute("SELECT sql FROM sqlite_master WHERE type='table'").fetchall()
    return "\n".join(sql[0] for sql in schema if sql[0])

@mcp.tool()
def query_data(sql: str) -> str:
    """Execute SQL queries safely"""
    conn = sqlite3.connect("database.db")
    try:
        result = conn.execute(sql).fetchall()
        return "\n".join(str(row) for row in result)
    except Exception as e:
        return f"Error: {str(e)}"
```

## MCPクライアントの実装

### 基本的なクライアント実装

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# stdioコネクション用のサーバーパラメータを作成
server_params = StdioServerParameters(
    command="python",  # 実行可能ファイル
    args=["example_server.py"],  # オプショナルなコマンドライン引数
    env=None,  # オプショナルな環境変数
)

# オプション: サンプリングコールバックを作成
async def handle_sampling_message(
    message: types.CreateMessageRequestParams,
) -> types.CreateMessageResult:
    return types.CreateMessageResult(
        role="assistant",
        content=types.TextContent(
            type="text",
            text="Hello, world! from model",
        ),
        model="gpt-3.5-turbo",
        stopReason="endTurn",
    )

async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write, sampling_callback=handle_sampling_message
        ) as session:
            # コネクションを初期化
            await session.initialize()

            # 利用可能なプロンプトをリスト
            prompts = await session.list_prompts()

            # プロンプトを取得
            prompt = await session.get_prompt(
                "example-prompt", arguments={"arg1": "value"}
            )

            # 利用可能なリソースをリスト
            resources = await session.list_resources()

            # 利用可能なツールをリスト
            tools = await session.list_tools()

            # リソースを読み取る
            content, mime_type = await session.read_resource("file://some/path")

            # ツールを呼び出す
            result = await session.call_tool("tool-name", arguments={"arg1": "value"})

if __name__ == "__main__":
    import asyncio
    asyncio.run(run())
```

## 高度な機能

### 1. ライフサイクル管理

```python
from contextlib import asynccontextmanager
from collections.abc import AsyncIterator
from dataclasses import dataclass
from fake_database import Database  # 実際のDBタイプに置き換え
from mcp.server.fastmcp import Context, FastMCP

mcp = FastMCP("My App")

@dataclass
class AppContext:
    db: Database

@asynccontextmanager
async def app_lifespan(server: FastMCP) -> AsyncIterator[AppContext]:
    """型安全なコンテキストでアプリケーションライフサイクルを管理"""
    # 起動時に初期化
    db = await Database.connect()
    try:
        yield AppContext(db=db)
    finally:
        # シャットダウン時にクリーンアップ
        await db.disconnect()

# サーバーにライフスパンを渡す
mcp = FastMCP("My App", lifespan=app_lifespan)

# ツール内で型安全なライフスパンコンテキストにアクセス
@mcp.tool()
def query_db(ctx: Context) -> str:
    """初期化されたリソースを使用するツール"""
    db = ctx.request_context.lifespan_context.db
    return db.query()
```

### 2. コンテキストを使用した進捗報告

```python
from mcp.server.fastmcp import FastMCP, Context

mcp = FastMCP("My App")

@mcp.tool()
async def long_task(files: list[str], ctx: Context) -> str:
    """進捗追跡付きで複数ファイルを処理"""
    for i, file in enumerate(files):
        ctx.info(f"Processing {file}")
        await ctx.report_progress(i, len(files))
        data, mime_type = await ctx.read_resource(f"file://{file}")
    return "Processing complete"
```

### 3. 画像処理

```python
from mcp.server.fastmcp import FastMCP, Image
from PIL import Image as PILImage

mcp = FastMCP("My App")

@mcp.tool()
def create_thumbnail(image_path: str) -> Image:
    """画像からサムネイルを作成"""
    img = PILImage.open(image_path)
    img.thumbnail((100, 100))
    return Image(data=img.tobytes(), format="png")
```

## サーバーの実行

### 開発モード

```bash
mcp dev server.py

# 依存関係を追加
mcp dev server.py --with pandas --with numpy

# ローカルコードをマウント
mcp dev server.py --with-editable .
```

### 直接実行

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("My App")

if __name__ == "__main__":
    mcp.run()
```

```bash
python server.py
# または
mcp run server.py
```

### Claude Desktopへのインストール

```bash
mcp install server.py

# カスタム名
mcp install server.py --name "My Analytics Server"

# 環境変数
mcp install server.py -v API_KEY=abc123 -v DB_URL=postgres://...
mcp install server.py -f .env
```

## トランスポートオプション

### STDIOトランスポート（デフォルト）

```bash
uv run mcp-simple-tool
```

### SSEトランスポート

```bash
uv run mcp-simple-tool --transport sse --port 8000
```

## 低レベルサーバー実装

より詳細な制御が必要な場合の低レベルAPI使用例：

```python
import mcp.server.stdio
import mcp.types as types
from mcp.server.lowlevel import NotificationOptions, Server
from mcp.server.models import InitializationOptions

# サーバーインスタンスを作成
server = Server("example-server")

@server.list_prompts()
async def handle_list_prompts() -> list[types.Prompt]:
    return [
        types.Prompt(
            name="example-prompt",
            description="An example prompt template",
            arguments=[
                types.PromptArgument(
                    name="arg1", description="Example argument", required=True
                )
            ],
        )
    ]

@server.get_prompt()
async def handle_get_prompt(
    name: str, arguments: dict[str, str] | None
) -> types.GetPromptResult:
    if name != "example-prompt":
        raise ValueError(f"Unknown prompt: {name}")

    return types.GetPromptResult(
        description="Example prompt",
        messages=[
            types.PromptMessage(
                role="user",
                content=types.TextContent(type="text", text="Example prompt text"),
            )
        ],
    )

async def run():
    async with mcp.server.stdio.stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name="example",
                server_version="0.1.0",
                capabilities=server.get_capabilities(
                    notification_options=NotificationOptions(),
                    experimental_capabilities={},
                ),
            ),
        )

if __name__ == "__main__":
    import asyncio
    asyncio.run(run())
```

## 開発ガイドライン

### 依存関係のインストール

```bash
uv sync --frozen --all-extras --dev
```

### テスト実行

```bash
uv run pytest
```

### 型チェック

```bash
uv run pyright
```

### リンティングとフォーマット

```bash
uv run ruff check .
uv run ruff format .
```

### Gitコミットのトレーラー

```bash
# GitHub Issueを関連付ける
git commit --trailer "Github-Issue:#<number>"

# レポーターを記録
git commit --trailer "Reported-by:<name>"
```

## まとめ

Model Context Protocol Python SDKは、LLMとの統合を簡単にするための強力なツールセットを提供します。FastMCPを使用することで、最小限のコードでMCPサーバーを実装でき、リソース、ツール、プロンプトを通じてLLMに機能を公開できます。また、ライフサイクル管理、進捗報告、画像処理などの高度な機能もサポートしています。
