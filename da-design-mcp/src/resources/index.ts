import { DesignTokensProvider } from "../core/providers.js";

// ===== Design Token Resources =====
export function createDesignTokenResources(tokensProvider: DesignTokensProvider) {
  return [
    {
      name: "design-tokens-all",
      uri: "design-tokens://all",
      handler: async (uri: URL) => ({
        contents: [
          {
            uri: uri.href,
            text: JSON.stringify(tokensProvider.getTokens(), null, 2),
          },
        ],
      }),
    },
    {
      name: "design-tokens-colors",
      uri: "design-tokens://colors",
      handler: async (uri: URL) => ({
        contents: [
          {
            uri: uri.href,
            text: JSON.stringify(tokensProvider.getColors(), null, 2),
          },
        ],
      }),
    },
    {
      name: "design-tokens-spacing",
      uri: "design-tokens://spacing",
      handler: async (uri: URL) => ({
        contents: [
          {
            uri: uri.href,
            text: JSON.stringify(tokensProvider.getSpacing(), null, 2),
          },
        ],
      }),
    }
  ];
}