import { z } from "zod";

// ===== Component Audit Prompt =====
export function createComponentAuditPrompt() {
  return {
    schema: {
      component_path: z.string().optional().describe("監査するコンポーネントパス")
    },
    handler: async ({ component_path }: { component_path?: string }) => {
      const instructions = `
# コンポーネント構造監査

以下の手順でコンポーネント構造を監査してください：

## 1. 構造分析
\`analyze_component_structure\` ツールを使用して構造を分析

## 2. ベストプラクティス確認
- ファイル命名規則
- ディレクトリ構成
- 必須ファイルの存在

## 3. 改善提案
具体的な改善アクションプランを提示

## 4. 優先度評価
- 🔴 高優先度（必須）
- 🟡 中優先度（推奨）
- 🟢 低優先度（任意）

${component_path ? `\n対象パス: ${component_path}` : ""}
`;

      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: instructions,
            },
          },
        ],
      };
    }
  };
}