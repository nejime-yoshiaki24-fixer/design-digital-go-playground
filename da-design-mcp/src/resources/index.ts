import { DesignTokensProvider } from "../core/providers.js";

// ===== Resource Helper Functions =====
function createResourceHandler(dataProvider: () => unknown) {
  return async (uri: URL) => ({
    contents: [
      {
        uri: uri.href,
        text: JSON.stringify(dataProvider(), null, 2),
      },
    ],
  });
}

interface DesignTokenResource {
  name: string;
  uri: string;
  handler: (uri: URL) => Promise<{
    contents: Array<{ uri: string; text: string }>;
  }>;
}

// ===== Design Token Resources =====
export function createDesignTokenResources(tokensProvider: DesignTokensProvider): DesignTokenResource[] {
  const resourceConfigs = [
    {
      name: "design-tokens-all",
      uri: "design-tokens://all",
      dataProvider: () => tokensProvider.getTokens(),
    },
    {
      name: "design-tokens-colors", 
      uri: "design-tokens://colors",
      dataProvider: () => tokensProvider.getColors(),
    },
    {
      name: "design-tokens-spacing",
      uri: "design-tokens://spacing", 
      dataProvider: () => tokensProvider.getSpacing(),
    },
  ] as const;

  return resourceConfigs.map(({ name, uri, dataProvider }) => ({
    name,
    uri,
    handler: createResourceHandler(dataProvider),
  }));
}