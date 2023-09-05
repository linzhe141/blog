import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Layout from '@/components/layout/layout'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'linzhe-blog',
  description: '个人笔记汇总',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
