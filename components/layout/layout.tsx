'use client'
import { useEffect } from 'react'
import { useMenuStore } from '@/store/menuStore'
import { Next13ProgressBar } from 'next13-progressbar'
import { type Result, MenuData } from '@/types'
import { useToggleTheme } from '@/hooks/useToggleTheme'
import { SkeletonTheme } from 'react-loading-skeleton'

export default function Layout({ children }: { children: React.ReactNode }) {
  const setMenuList = useMenuStore((state) => state.setMenuList)
  const { theme: mode } = useToggleTheme()
  async function init() {
    const data: Result<MenuData[]> = await (await fetch('/api/menu')).json()
    setMenuList(data.data)
  }
  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  let baseColor = 'transparent'
  let highlightColor = 'transparent'
  if (mode === 'dark') {
    baseColor = '#202020'
    highlightColor = '#444'
  }
  if (mode === 'light') {
    baseColor = ''
    highlightColor = ''
  }
  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
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
