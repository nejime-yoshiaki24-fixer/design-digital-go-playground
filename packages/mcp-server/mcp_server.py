#!/usr/bin/env python3
"""
Design Digital Go Playground MCP Server

デジタル庁デザインシステムのコンポーネント情報を提供するMCPサーバー
SOLID原則に基づいて設計
"""

import json
from pathlib import Path

from mcp.server.fastmcp import FastMCP
from mcp.server.fastmcp.prompts import base
from pydantic import BaseModel, Field

# 内部モジュールのインポート
from analyzers import FileAnalyzer, StructureAnalyzer
from figma_sync import ComponentSyncChecker, MockFigmaConnector
from quality_metrics import ComponentQuality, QualityAggregator
from validators import DesignTokenValidator

# Constants
PROJECT_ROOT = Path(__file__).parent.parent
COMPONENTS_DIR = PROJECT_ROOT / "components" / "src" / "components"

# Design tokens
DESIGN_TOKENS = {
    "colors": {
        "primary": "#0017C1",
        "text": {
            "primary": "#1A1A1C",
            "secondary": "#595959",
            "disabled": "#B8B8B8",
        },
        "background": {
            "primary": "#FFFFFF",
            "secondary": "#F5F5F5",
            "tertiary": "#EBEBEB",
        },
        "border": {"default": "#D9D9D9", "focused": "#0017C1"},
        "error": "#D32F2F",
    },
    "spacing": {"xs": "4px", "sm": "8px", "md": "16px", "lg": "24px", "xl": "32px"},
}

VALID_COLORS = {
    "#0017C1",
    "#1A1A1C",
    "#595959",
    "#B8B8B8",
    "#FFFFFF",
    "#F5F5F5",
    "#EBEBEB",
    "#D9D9D9",
    "#D32F2F",
}
VALID_SPACING = {"4px", "8px", "16px", "24px", "32px"}

# Initialize MCP server
mcp = FastMCP("Design Digital Go Playground")

# 依存性注入: 各機能を初期化
structure_analyzer = StructureAnalyzer()
file_analyzer = FileAnalyzer()
design_validator = DesignTokenValidator(VALID_COLORS, VALID_SPACING)
quality_aggregator = QualityAggregator()
figma_connector = MockFigmaConnector()
sync_checker = ComponentSyncChecker(figma_connector)


# Pydantic models for type safety
class AnalyzeComponentArgs(BaseModel):
    name: str = Field(description="分析するコンポーネントの名前")


class CheckDesignComplianceArgs(BaseModel):
    component_name: str = Field(description="チェックするコンポーネントの名前")
    css_content: str = Field(description="チェックするCSSの内容")


class CreateComponentPromptArgs(BaseModel):
    name: str = Field(description="作成するコンポーネントの名前")
    description: str = Field(description="コンポーネントの説明")


class ReviewComponentPromptArgs(BaseModel):
    name: str = Field(description="レビューするコンポーネントの名前")


class CheckFigmaSyncArgs(BaseModel):
    component_name: str = Field(description="同期チェックするコンポーネント名")


# Helper functions
def get_component_list() -> list[str]:
    """コンポーネントディレクトリから利用可能なコンポーネントのリストを取得"""
    if not COMPONENTS_DIR.exists():
        return []

    components = []
    for item in COMPONENTS_DIR.iterdir():
        if item.is_dir() and not item.name.startswith("."):
            components.append(item.name)

    return sorted(components)


# Resources
@mcp.resource("components://list")
def list_components() -> str:
    """利用可能なコンポーネントの一覧を提供"""
    components = get_component_list()

    return json.dumps(
        {"components": components, "total": len(components)},
        indent=2,
        ensure_ascii=False,
    )


@mcp.resource("component://{name}/info")
def get_component_info(name: str) -> str:
    """特定のコンポーネントの詳細情報を提供"""
    component_dir = COMPONENTS_DIR / name

    if not component_dir.exists():
        return json.dumps(
            {"error": f"Component '{name}' not found"}, ensure_ascii=False
        )

    file_info = file_analyzer.analyze(component_dir)

    return json.dumps(
        {"name": name, "files": file_info["files"]}, indent=2, ensure_ascii=False
    )


@mcp.resource("design-tokens://colors")
def get_design_tokens() -> str:
    """デジタル庁デザインシステムのカラートークンを提供"""
    return json.dumps(DESIGN_TOKENS, indent=2)


@mcp.resource("quality://dashboard")
def quality_dashboard() -> str:
    """全コンポーネントの品質ダッシュボード（新機能）"""
    components = get_component_list()
    quality_list: list[ComponentQuality] = []

    for component_name in components:
        component_path = COMPONENTS_DIR / component_name
        structure = structure_analyzer.analyze(component_path)

        # CSS検証（簡易版）
        css_file = component_path / f"{component_name}.css"
        has_design_issues = False
        if css_file.exists():
            css_content = css_file.read_text()
            issues = design_validator.validate(css_content)
            has_design_issues = len(issues) > 0

        quality = quality_aggregator.aggregate_component_quality(
            component_name, structure, has_design_issues
        )
        quality_list.append(quality)

    dashboard = quality_aggregator.create_dashboard(quality_list)
    return json.dumps(dashboard, indent=2, ensure_ascii=False)


# Tools
@mcp.tool()
def analyze_component(args: AnalyzeComponentArgs) -> str:
    """コンポーネントの構造を分析"""
    name = args.name
    component_dir = COMPONENTS_DIR / name

    if not component_dir.exists():
        return f"エラー: コンポーネント '{name}' が見つかりません"

    analysis = structure_analyzer.analyze(component_dir)

    # 不足ファイルのチェック
    missing = []
    if not analysis["has_styles"]:
        missing.append("スタイルファイル")
    if not analysis["has_tests"]:
        missing.append("テストファイル")
    if not analysis["has_stories"]:
        missing.append("Storybookストーリー")

    # 結果の生成
    result = f"コンポーネント '{name}' の分析結果:\n"
    result += f"- スタイル: {'✓' if analysis['has_styles'] else '✗'}\n"
    result += f"- テスト: {'✓' if analysis['has_tests'] else '✗'}\n"
    result += f"- Storybook: {'✓' if analysis['has_stories'] else '✗'}\n"
    result += f"- index.ts: {'✓' if analysis['has_index'] else '✗'}\n"

    if missing:
        result += f"\n不足しているファイル: {', '.join(missing)}"

    return result


@mcp.tool()
def check_design_compliance(args: CheckDesignComplianceArgs) -> str:
    """CSSがデザイントークンに準拠しているかチェック"""
    issues = design_validator.validate(args.css_content)

    if issues:
        return (
            f"コンポーネント '{args.component_name}' のデザイン準拠チェック:\n"
            + "\n".join([f"- {issue}" for issue in issues])
        )
    else:
        return (
            f"コンポーネント '{args.component_name}' は"
            "デザイントークンに準拠しています ✓"
        )


@mcp.tool()
def check_figma_sync(args: CheckFigmaSyncArgs) -> str:
    """Figmaとの同期状態をチェック（新機能）"""
    component_name = args.component_name
    component_path = COMPONENTS_DIR / component_name

    if not component_path.exists():
        return json.dumps(
            {"error": f"Component '{component_name}' not found"}, ensure_ascii=False
        )

    # CSSファイルを読み込む
    css_file = component_path / f"{component_name}.css"
    css_content = ""
    if css_file.exists():
        css_content = css_file.read_text()

    # 同期状態をチェック
    sync_status = sync_checker.check_sync_status(
        component_name, css_content, component_path
    )

    # 単一コンポーネントのレポート
    report = {
        "component": component_name,
        "is_synced": sync_status.is_synced,
        "needs_update": sync_status.needs_update,
        "differences": sync_status.differences,
        "recommendation": (
            "Figmaと同期されています ✓"
            if sync_status.is_synced
            else "Figmaの最新デザインに合わせて更新してください"
        ),
    }

    return json.dumps(report, indent=2, ensure_ascii=False)


@mcp.tool()
def check_all_figma_sync() -> str:
    """全コンポーネントのFigma同期状態をチェック（新機能）"""
    components = get_component_list()
    statuses = []

    for component_name in components:
        component_path = COMPONENTS_DIR / component_name
        css_file = component_path / f"{component_name}.css"
        css_content = ""
        if css_file.exists():
            css_content = css_file.read_text()

        status = sync_checker.check_sync_status(
            component_name, css_content, component_path
        )
        statuses.append(status)

    report = sync_checker.generate_sync_report(statuses)
    return json.dumps(report, indent=2, ensure_ascii=False)


# Prompts
@mcp.prompt()
def create_component_prompt(args: CreateComponentPromptArgs) -> str:
    """新しいコンポーネント作成のためのプロンプト"""
    return (
        "デジタル庁デザインシステムに準拠した新しい"
        f"Reactコンポーネントを作成してください。\n\n"
        f"コンポーネント名: {args.name}\n"
        f"説明: {args.description}\n\n"
        "要件:\n"
        "1. TypeScriptを使用\n"
        "2. デザイントークンに準拠したスタイリング\n"
        "3. アクセシビリティを考慮\n"
        "4. Storybookストーリーを含む\n"
        "5. 必要に応じてテストを含む\n\n"
        "ファイル構成:\n"
        f"- {args.name}.tsx (コンポーネント実装)\n"
        f"- {args.name}.css (スタイル)\n"
        f"- {args.name}.stories.tsx (Storybook)\n"
        f"- {args.name}.test.tsx (テスト - 必要に応じて)\n"
        "- index.ts (再エクスポート)"
    )


@mcp.prompt()
def review_component_prompt(args: ReviewComponentPromptArgs) -> list[base.Message]:
    """コンポーネントレビューのためのプロンプト"""
    return [
        base.UserMessage(
            f"コンポーネント '{args.name}' のコードレビューをお願いします。"
        ),
        base.UserMessage("以下の観点でレビューしてください:"),
        base.UserMessage(
            """
1. デジタル庁デザインシステムへの準拠
2. アクセシビリティ
3. パフォーマンス
4. コードの可読性とメンテナンス性
5. TypeScriptの型安全性
        """
        ),
        base.AssistantMessage(
            "了解しました。これらの観点でコンポーネントをレビューします。コンポーネントのコードを確認させてください。"
        ),
    ]


if __name__ == "__main__":
    mcp.run()
