import { type Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './mdx-components.tsx',
  ],
  theme: {
    extend: {
      colors: {
        // black: '#020420',
        black: '#1a1a1a',
      },
      typography: {
        DEFAULT: {
          css: {
            // 限定在 .prose 类名下的 a 元素
            '--tw-prose-bullets': '#777',
            '#TODO + ul': {
              paddingLeft: 0,
              listStyle: 'none',
            },
            input: {
              marginRight: '8px',
              marginTop: '0px',
              marginBottom: '0px',
            },
            a: {
              textDecoration: 'underline',
              color: 'rgba(74, 222, 128,1)',
              '&:hover': {},
            },
            'p > code, h3 > code, li > code': {
              margin: '0px 4px',
              padding: '2px 4px',
              borderRadius: '6px',
              backgroundColor: '#fff',
              border: '1px solid',
              color: 'rgba(74, 222, 128,1) !important',
              '&::before': {
                display: 'none',
              },
              '&::after': {
                display: 'none',
              },
            },
            '.hljs-comment': {
              color: 'red !important',
            },
            ul: {
              // listStyleType: 'disclosure-closed',
            },
            '.tips-wrapper p, .tips-wrapper img': {
              marginTop: '0.5rem !important',
              marginBottom: '0.5rem !important',
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
