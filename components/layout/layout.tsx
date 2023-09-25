'use client'
import { usePathname } from 'next/navigation'
import BlogLayout from '@/components/layout/blogLayout'
import { useEffect } from 'react'
import { useStore } from '@/store/store'
import type { Result, NavData } from '@/types'
const otherLayoutList = ['/', '/setting']
export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const setNavList = useStore((state) => state.setNavList)

  async function init() {
    const data: Result<NavData[]> = await (await fetch('/api/nav')).json()
    setNavList(data.data)
  }
  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return otherLayoutList.includes(pathname) ? (
    children
  ) : (
    <BlogLayout>{children}</BlogLayout>
  )
}
