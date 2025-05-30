"""
品質メトリクス計算機能
開放閉鎖の原則: 新しいメトリクスの追加に対して開いている
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Any


@dataclass
class ComponentQuality:
    """コンポーネントの品質情報"""

    name: str
    completeness_score: float  # 0-100
    design_compliance: bool
    test_coverage: bool
    documentation: bool
    accessibility_ready: bool

    @property
    def overall_score(self) -> float:
        """総合スコアを計算"""
        scores = [
            self.completeness_score,
            100 if self.design_compliance else 0,
            100 if self.test_coverage else 0,
            100 if self.documentation else 0,
            100 if self.accessibility_ready else 0,
        ]
        return sum(scores) / len(scores)


class MetricCalculator(ABC):
    """メトリクス計算の抽象基底クラス"""

    @abstractmethod
    def calculate(self, component_data: dict[str, Any]) -> float:
        """メトリクスを計算"""
        pass


class CompletenessCalculator(MetricCalculator):
    """完全性スコアの計算"""

    def calculate(self, structure: dict[str, bool]) -> float:
        """必須ファイルの存在に基づいてスコアを計算"""
        required_files = ["has_styles", "has_tests", "has_stories", "has_index"]
        present_files = sum(1 for key in required_files if structure.get(key, False))

        return (present_files / len(required_files)) * 100


class QualityAggregator:
    """品質メトリクスの集約"""

    def __init__(self):
        self.completeness_calc = CompletenessCalculator()

    def aggregate_component_quality(
        self, name: str, structure: dict[str, bool], has_design_issues: bool = False
    ) -> ComponentQuality:
        """コンポーネントの品質を集約"""
        return ComponentQuality(
            name=name,
            completeness_score=self.completeness_calc.calculate(structure),
            design_compliance=not has_design_issues,
            test_coverage=structure.get("has_tests", False),
            documentation=structure.get("has_stories", False),
            accessibility_ready=True,  # 将来的に実装
        )

    def create_dashboard(self, components: list[ComponentQuality]) -> dict[str, Any]:
        """品質ダッシュボードを作成"""
        total_components = len(components)

        if total_components == 0:
            return {"error": "No components found"}

        avg_score = sum(c.overall_score for c in components) / total_components

        return {
            "summary": {
                "total_components": total_components,
                "average_quality_score": round(avg_score, 2),
                "fully_compliant": sum(1 for c in components if c.overall_score == 100),
                "needs_attention": sum(1 for c in components if c.overall_score < 60),
            },
            "components": [
                {
                    "name": c.name,
                    "overall_score": round(c.overall_score, 2),
                    "completeness": round(c.completeness_score, 2),
                    "design_compliance": c.design_compliance,
                    "test_coverage": c.test_coverage,
                    "documentation": c.documentation,
                }
                for c in components
            ],
            "recommendations": self._generate_recommendations(components),
        }

    def _generate_recommendations(
        self, components: list[ComponentQuality]
    ) -> list[str]:
        """改善推奨事項を生成"""
        recommendations = []

        # テストがないコンポーネント
        no_tests = [c.name for c in components if not c.test_coverage]
        if no_tests:
            recommendations.append(
                f"テストを追加すべきコンポーネント: {', '.join(no_tests)}"
            )

        # ドキュメントがないコンポーネント
        no_docs = [c.name for c in components if not c.documentation]
        if no_docs:
            recommendations.append(f"Storybook追加推奨: {', '.join(no_docs)}")

        # 品質が低いコンポーネント
        low_quality = [c.name for c in components if c.overall_score < 60]
        if low_quality:
            recommendations.append(f"優先的に改善が必要: {', '.join(low_quality)}")

        return recommendations
