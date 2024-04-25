import './globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { type Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import Layout from '@/components/layout/layout'
import { Providers } from './providers'
const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'linzhe-blog',
  description: '个人笔记汇总',
  icons: {
    icon: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if (localStorage.getItem('theme') === 'dark') {
              document.documentElement.classList.add('dark')
            } else {
              document.documentElement.classList.remove('dark')
            }`,
          }}
        ></script>
      </head>
      <body className={fontSans.variable}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
