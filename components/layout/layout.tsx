'use client'
import { usePathname } from 'next/navigation'
import BlogLayout from '@/components/layout/blogLayout'
import { useEffect } from 'react'
import { useStore } from '@/store/store'
import { Next13ProgressBar } from 'next13-progressbar'
import { type Result, MenuData } from '@/types'
const otherLayoutList = ['/', '/setting']
export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const setMenuList = useStore((state) => state.setMenuList)

  async function init() {
    const data: Result<MenuData[]> = await (await fetch('/api/menu')).json()
    setMenuList(data.data)
  }
  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      {otherLayoutList.includes(pathname) ? (
        children
      ) : (
        <BlogLayout>{children}</BlogLayout>
      )}
      <Next13ProgressBar
        height='4px'
        color='rgba(187, 247, 208, 1)'
        options={{ showSpinner: true }}
        showOnShallow
      />
    </>
  )
}
