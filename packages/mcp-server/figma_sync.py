"""
Figma同期チェック機能
インターフェース分離の原則: 必要な機能のみを公開
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any


@dataclass
class DesignToken:
    """デザイントークンの表現"""

    name: str
    value: str
    category: str  # color, spacing, typography, etc.


@dataclass
class SyncStatus:
    """同期状態の表現"""

    component_name: str
    is_synced: bool
    last_figma_update: datetime | None
    last_code_update: datetime | None
    differences: list[str]

    @property
    def needs_update(self) -> bool:
        """更新が必要かどうか"""
        return not self.is_synced and len(self.differences) > 0


class FigmaConnector(ABC):
    """Figma接続の抽象インターフェース"""

    @abstractmethod
    def get_component_tokens(self, component_name: str) -> list[DesignToken]:
        """コンポーネントのデザイントークンを取得"""
        pass

    @abstractmethod
    def get_last_modified(self, component_name: str) -> datetime | None:
        """最終更新日時を取得"""
        pass


class MockFigmaConnector(FigmaConnector):
    """開発用のモックコネクター"""

    def __init__(self, figma_data_path: Path | None = None):
        """モックデータの初期化"""
        self.figma_data_path = figma_data_path
        # 実際のFigma MCPとの統合時はここでデータを読み込む
        self.mock_data = {
            "Button": {
                "tokens": [
                    DesignToken("primary-color", "#0017C1", "color"),
                    DesignToken("padding", "8px", "spacing"),
                    DesignToken("border-radius", "4px", "spacing"),
                ],
                "last_modified": datetime.now(),
            },
            "Checkbox": {
                "tokens": [
                    DesignToken("check-color", "#0017C1", "color"),
                    DesignToken("size", "16px", "spacing"),
                ],
                "last_modified": datetime.now(),
            },
        }

    def get_component_tokens(self, component_name: str) -> list[DesignToken]:
        """モックデータからトークンを返す"""
        if component_name in self.mock_data:
            return self.mock_data[component_name]["tokens"]
        return []

    def get_last_modified(self, component_name: str) -> datetime | None:
        """モックデータから最終更新日時を返す"""
        if component_name in self.mock_data:
            return self.mock_data[component_name]["last_modified"]
        return None


class ComponentSyncChecker:
    """コンポーネントの同期状態をチェック"""

    def __init__(self, figma_connector: FigmaConnector):
        """依存性注入でコネクターを受け取る"""
        self.figma_connector = figma_connector

    def check_sync_status(
        self, component_name: str, css_content: str, component_path: Path
    ) -> SyncStatus:
        """同期状態をチェック"""
        # Figmaからトークンを取得
        figma_tokens = self.figma_connector.get_component_tokens(component_name)
        figma_modified = self.figma_connector.get_last_modified(component_name)

        # コードの最終更新日時を取得
        code_modified = None
        css_file = component_path / f"{component_name}.css"
        if css_file.exists():
            code_modified = datetime.fromtimestamp(css_file.stat().st_mtime)

        # 差分を検出
        differences = self._detect_differences(figma_tokens, css_content)

        return SyncStatus(
            component_name=component_name,
            is_synced=len(differences) == 0,
            last_figma_update=figma_modified,
            last_code_update=code_modified,
            differences=differences,
        )

    def _detect_differences(
        self, figma_tokens: list[DesignToken], css_content: str
    ) -> list[str]:
        """Figmaトークンと実装の差分を検出"""
        differences = []

        for token in figma_tokens:
            if token.category == "color":
                if token.value not in css_content:
                    differences.append(
                        f"Figmaの色 '{token.name}' ({token.value}) が"
                        "CSSに見つかりません"
                    )
            elif token.category == "spacing":
                if token.value not in css_content:
                    differences.append(
                        f"Figmaのスペーシング '{token.name}' "
                        f"({token.value}) がCSSに見つかりません"
                    )

        return differences

    def generate_sync_report(self, statuses: list[SyncStatus]) -> dict[str, Any]:
        """同期レポートを生成"""
        total = len(statuses)
        synced = sum(1 for s in statuses if s.is_synced)
        needs_update = [s for s in statuses if s.needs_update]

        return {
            "summary": {
                "total_components": total,
                "synced": synced,
                "out_of_sync": total - synced,
                "sync_percentage": round((synced / total * 100) if total > 0 else 0, 2),
            },
            "components": [
                {
                    "name": s.component_name,
                    "is_synced": s.is_synced,
                    "differences_count": len(s.differences),
                    "differences": s.differences[:3],  # 最初の3つの差分のみ
                }
                for s in statuses
            ],
            "action_required": [
                {
                    "component": s.component_name,
                    "action": "Figmaの最新デザインに合わせて更新してください",
                    "differences": s.differences,
                }
                for s in needs_update
            ],
        }
