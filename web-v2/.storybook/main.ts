import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    // Tailwind CSS v4プラグインを確実に含める
    const tailwindcss = await import('@tailwindcss/vite').then(m => m.default)
    
    return mergeConfig(config, {
      plugins: [tailwindcss()]
    })
  },
}

export default config