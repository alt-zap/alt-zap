import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wyw from '@wyw-in-js/vite'

const config: StorybookConfig = {
  stories: ['../src/components/stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-viewport'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      plugins: [
        react(),
        wyw({
          include: ['**/*.{ts,tsx}'],
          babelOptions: {
            presets: ['@babel/preset-typescript', '@babel/preset-react'],
          },
        }),
      ],
    })
  },
}

export default config
