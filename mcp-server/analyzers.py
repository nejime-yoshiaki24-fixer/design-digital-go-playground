"""
コンポーネント分析機能
単一責任の原則: 分析に関する責任のみを持つ
"""

from abc import ABC, abstractmethod
from pathlib import Path
from typing import Any


class ComponentAnalyzer(ABC):
    """コンポーネント分析の抽象基底クラス"""

    @abstractmethod
    def analyze(self, component_path: Path) -> dict[str, Any]:
        """コンポーネントを分析"""
        pass


class StructureAnalyzer(ComponentAnalyzer):
    """コンポーネント構造の分析"""

    def analyze(self, component_path: Path) -> dict[str, bool]:
        """ファイル構造を分析"""
        component_name = component_path.name

        return {
            "has_styles": (component_path / f"{component_name}.css").exists(),
            "has_tests": (component_path / f"{component_name}.test.tsx").exists(),
            "has_stories": (component_path / f"{component_name}.stories.tsx").exists(),
            "has_index": (component_path / "index.ts").exists(),
        }


class FileAnalyzer(ComponentAnalyzer):
    """コンポーネントのファイル情報を分析"""

    def analyze(self, component_path: Path) -> dict[str, Any]:
        """ファイル情報を収集"""
        files = []

        if component_path.exists():
            for file in component_path.iterdir():
                if file.is_file():
                    files.append(
                        {
                            "name": file.name,
                            "type": file.suffix,
                            "size": file.stat().st_size,
                        }
                    )

        return {"files": files}
