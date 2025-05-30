#!/usr/bin/env python3
"""
MCPサーバーのpytestテスト
"""

import pytest

from mcp_server import (
    AnalyzeComponentArgs,
    analyze_component,
    analyze_component_structure,
    check_css_compliance,
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

    def test_analyze_component_structure(self):
        """コンポーネント構造分析のテスト"""
        analysis = analyze_component_structure("Button")
        assert analysis["has_styles"] is True
        assert analysis["has_index"] is True

    def test_check_css_compliance(self):
        """CSS準拠チェックのテスト"""
        # 有効なCSS
        valid_css = "color: #0017C1; padding: 8px;"
        issues = check_css_compliance(valid_css)
        assert len(issues) == 0

        # 無効なCSS
        invalid_css = "color: #123456; padding: 7px;"
        issues = check_css_compliance(invalid_css)
        assert len(issues) == 2


class TestTools:
    """MCPツールのテスト"""

    def test_analyze_component(self):
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
