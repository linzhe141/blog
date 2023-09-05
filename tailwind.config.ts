import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './mdx-components.tsx',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            // 限定在 .prose 类名下的 a 元素
            a: {
              textDecoration: 'underline dotted',
              color: 'rgba(74, 222, 128,1)',
              '&:hover': {},
            },
            code: {
              padding: '2px 4px',
              backgroundColor: 'red',
              color: 'white !important',
              '&::before': {
                display: 'none',
              },
              '&::after': {
                display: 'none',
              },
            },
          },
        },
      },
    },
    hljs: {
      theme: 'atom-one-dark',
    },
  },
  plugins: [typography, require('tailwind-highlightjs')],
  safelist: [
    {
      pattern: /hljs+/,
    },
  ],
}
export default config
