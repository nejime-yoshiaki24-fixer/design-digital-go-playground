#!/usr/bin/env python3
"""
MCPサーバーの動作確認用スクリプト
"""

import sys

sys.path.append(".")

from mcp_server import (
    AnalyzeComponentArgs,
    CheckFigmaSyncArgs,
    analyze_component,
    check_all_figma_sync,
    check_figma_sync,
    get_component_info,
    get_design_tokens,
    list_components,
    quality_dashboard,
)


def test_server():
    print("=== MCPサーバー動作確認 ===\n")

    # 1. コンポーネント一覧の取得
    print("1. コンポーネント一覧:")
    print(list_components())
    print()

    # 2. 特定コンポーネントの情報取得
    print("2. Buttonコンポーネントの情報:")
    print(get_component_info("Button"))
    print()

    # 3. デザイントークンの取得
    print("3. デザイントークン:")
    print(get_design_tokens())
    print()

    # 4. コンポーネント分析
    print("4. Buttonコンポーネントの分析:")
    args = AnalyzeComponentArgs(name="Button")
    print(analyze_component(args))
    print()

    # 5. 品質ダッシュボード（新機能）
    print("5. 品質ダッシュボード:")
    print(quality_dashboard())
    print()

    # 6. Figma同期チェック（新機能）
    print("6. ButtonのFigma同期チェック:")
    sync_args = CheckFigmaSyncArgs(component_name="Button")
    print(check_figma_sync(sync_args))
    print()

    # 7. 全コンポーネントのFigma同期状態（新機能）
    print("7. 全コンポーネントのFigma同期状態:")
    print(check_all_figma_sync())
    print()

    print("=== 動作確認完了 ===")


if __name__ == "__main__":
    test_server()
