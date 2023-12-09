'use client'
import { useEffect } from 'react'
import { useMenuStore } from '@/store/menuStore'
import { Next13ProgressBar } from 'next13-progressbar'
import { type Result, MenuData } from '@/types'
import { useThemeStore } from '@/store/themeStore'
import { SkeletonTheme } from 'react-loading-skeleton'

export default function Layout({ children }: { children: React.ReactNode }) {
  const setMenuList = useMenuStore((state) => state.setMenuList)
  const mode = useThemeStore((state) => state.mode)

  async function init() {
    const data: Result<MenuData[]> = await (await fetch('/api/menu')).json()
    setMenuList(data.data)
  }
  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <SkeletonTheme
      baseColor={mode === 'dark' ? '#202020' : ''}
      highlightColor={mode === 'dark' ? '#444' : ''}
    >
      <div className='dark:bg-black'>
        {children}
        <Next13ProgressBar
          height='4px'
          color='rgba(187, 247, 208, 1)'
          options={{ showSpinner: true }}
          showOnShallow
        />
      </div>
    </SkeletonTheme>
  )
}
