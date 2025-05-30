#!/usr/bin/env python3
"""
MCPサーバーのpytestテスト
"""

import pytest

from mcp_server import (
    AnalyzeComponentArgs,
    CheckDesignComplianceArgs,
    analyze_component,
    check_design_compliance,
    get_component_list,
)


class TestHelperFunctions:
    """ヘルパー関数のテスト"""

    def test_get_component_list(self):
        """コンポーネントリスト取得のテスト"""
        components = get_component_list()
        assert isinstance(components, list)
        assert len(components) > 0
        assert "Button" in components

    def test_analyze_component(self):
        """コンポーネント分析のテスト"""
        args = AnalyzeComponentArgs(name="Button")
        result = analyze_component(args)
        assert "分析結果" in result
        assert "✓" in result

    def test_check_design_compliance(self):
        """デザイン準拠チェックのテスト"""
        args = CheckDesignComplianceArgs(
            component_name="Button",
            css_content="color: #0017C1; padding: 8px;"
        )
        result = check_design_compliance(args)
        assert "準拠しています" in result or "違反" in result


class TestTools:
    """MCPツールのテスト"""

    def test_analyze_component_tool(self):
        """analyze_componentツールのテスト"""
        args = AnalyzeComponentArgs(name="Button")
        result = analyze_component(args)
        assert "分析結果" in result
        assert "✓" in result

    def test_analyze_nonexistent_component(self):
        """存在しないコンポーネントの分析"""
        args = AnalyzeComponentArgs(name="NonExistent")
        result = analyze_component(args)
        assert "エラー" in result


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
