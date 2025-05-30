"""
バリデーション機能
単一責任の原則: 検証に関する責任のみを持つ
"""

import re
from abc import ABC, abstractmethod


class Validator(ABC):
    """バリデーターの抽象基底クラス"""

    @abstractmethod
    def validate(self, content: str) -> list[str]:
        """コンテンツを検証し、問題のリストを返す"""
        pass


class DesignTokenValidator(Validator):
    """デザイントークンの準拠を検証"""

    def __init__(self, valid_colors: set[str], valid_spacing: set[str]):
        """依存性逆転の原則: 具象ではなく抽象に依存"""
        self.valid_colors = {color.upper() for color in valid_colors}
        self.valid_spacing = valid_spacing

    def validate(self, css_content: str) -> list[str]:
        """CSSがデザイントークンに準拠しているか検証"""
        issues = []

        # 色の検証
        issues.extend(self._validate_colors(css_content))

        # スペーシングの検証
        issues.extend(self._validate_spacing(css_content))

        return issues

    def _validate_colors(self, css_content: str) -> list[str]:
        """色の検証（プライベートメソッド）"""
        issues = []
        color_pattern = r"#[0-9A-Fa-f]{6}"
        colors_in_css = re.findall(color_pattern, css_content.upper())

        for color in colors_in_css:
            if color not in self.valid_colors:
                issues.append(f"未承認の色が使用されています: {color}")

        return issues

    def _validate_spacing(self, css_content: str) -> list[str]:
        """スペーシングの検証（プライベートメソッド）"""
        issues = []
        spacing_pattern = r"\b\d+px\b"
        spacings_in_css = re.findall(spacing_pattern, css_content)

        for spacing in spacings_in_css:
            if spacing not in self.valid_spacing and spacing != "0px":
                issues.append(f"標準外のスペーシングが使用されています: {spacing}")

        return issues
