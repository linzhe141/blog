import { type Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
const { fontFamily } = require('tailwindcss/defaultTheme')
const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './mdx-components.tsx',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      colors: {
        // black: '#020420',
        black: '#000',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
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
  },
  plugins: [typography, require('tailwindcss-animate')],
  // 默认情况下，Tailwind 的 JIT 编译器只会为内容中使用的类生成 css。
  // 为确保生成Higlight.js主题样式，您需要确保将它们添加到 safelist
  // 这将保留以 开头的所有 hljs 类
  //! 现在使用shiki进行highlight
  // safelist: [
  //   {
  //     pattern: /hljs+/,
  //   },
  // ],
}
export default config
