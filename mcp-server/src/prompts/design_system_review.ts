import { z } from "zod";

// ===== Design System Review Prompt =====
export function createDesignSystemReviewPrompt() {
  return {
    schema: {
      component_name: z.string().optional().describe("コンポーネント名"),
      css_content: z.string().optional().describe("検証するCSS内容")
    },
    handler: async ({ component_name, css_content }: { component_name?: string; css_content?: string }) => {
      const instructions = `
# デザインシステム準拠性レビュー

以下の手順でコンポーネントを包括的に検証してください：

## 1. デザイントークン検証
\`validate_design_tokens\` ツールを使用してCSSの準拠性を確認

## 2. 承認済みカラーパレット確認
\`design-tokens://colors\` リソースで承認済みカラーを確認

## 3. レポート生成
以下の形式でレポートを作成：

### ✅ 準拠項目
- 使用されている承認済みトークン

### ⚠️ 改善推奨項目  
- 未承認トークンの代替案
- 修正具体例

### 📋 チェックリスト
- [ ] カラートークン準拠
- [ ] スペーシング準拠
- [ ] タイポグラフィ準拠

${component_name ? `\n対象コンポーネント: ${component_name}` : ""}
${css_content ? `\n\nCSS:\n\`\`\`css\n${css_content}\n\`\`\`` : ""}
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