import './globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import Layout from '@/components/layout/layout'
const inter = Inter({ subsets: ['latin'] })

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
            if (JSON.parse(localStorage.getItem('theme'))?.state?.mode === 'dark') {
              document.documentElement.classList.add('dark')
            } else {
              document.documentElement.classList.remove('dark')
            }`,
          }}
        ></script>
      </head>
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
