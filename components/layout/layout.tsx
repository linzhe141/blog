'use client'
import { useEffect } from 'react'
import { useMenuStore } from '@/store/menuStore'
import { Next13ProgressBar } from 'next13-progressbar'
import { type Result, MenuData, MenuItemProps } from '@/types'
import { useToggleTheme } from '@/hooks/useToggleTheme'
import { SkeletonTheme } from 'react-loading-skeleton'

export default function Layout({ children }: { children: React.ReactNode }) {
  const setMenuList = useMenuStore((state) => state.setMenuList)
  const { theme: mode } = useToggleTheme()
  useEffect(() => {
    function setDefaultData(
      data: MenuItemProps,
      parentNode: MenuItemProps | null = null,
      level: number = 1
    ) {
      data.expanded = false
      data.level = level
      //! 先进行递归，再从叶子节点一层层出来 类比 二叉树的后序遍历
      if (data.children) {
        data.children.forEach((item) =>
          setDefaultData(item, data, data.level + 1)
        )
      }
      if (data.url === location.pathname) {
        if (parentNode) {
          parentNode.expanded = true
        }
      }
      if (data.children?.find((it) => it.expanded)) {
        data.expanded = true
      }
      return data
    }
    async function init() {
      const res: Result<MenuData[]> = await (await fetch('/api/menu')).json()
      const data = res.data as unknown as MenuItemProps[]
      const formatData = data.map((item) => setDefaultData(item)) as any
      setMenuList(formatData)
    }
    init()
  }, [setMenuList])
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
