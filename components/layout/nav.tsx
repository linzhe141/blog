import NavItem from './navItem'
import { useEffect } from 'react'
import type { NavItemProps, NavPros } from './types'
import { usePathname, useRouter } from 'next/navigation'
import { useImmer } from 'use-immer'
export default function Nav({ beforeJump, data }: NavPros) {
  const pathname = usePathname()
  const router = useRouter()
  const [navList, setNavList] = useImmer(data as unknown as NavItemProps[])

  function setExpanded(data: NavItemProps[], nav: NavItemProps) {
    for (const item of data) {
      if (item.url === nav.url) {
        item.expanded = !item.expanded
      }
      if (item.children) {
        setExpanded(item.children, nav)
      }
    }
    return data
  }
  function expandChangeHandle(nav: NavItemProps) {
    setNavList((draft) => {
      setExpanded(draft, nav)
    })
  }
  function clickHandle(nav: NavItemProps) {
    if (nav.isLink) {
      router.push(nav.url)
    }
    beforeJump && beforeJump()
  }
  function setDefaultData(
    data: NavItemProps,
    parentNode: NavItemProps | null = null,
    level: number = 1
  ) {
    //! immutable copy
    const result = { ...data }
    result.expanded = false
    result.level = level
    //! 先进行递归，再从叶子节点一层层出来
    if (result.children) {
      //! immutable copy
      result.children = result.children.map((item) =>
        setDefaultData(item, result, result.level + 1)
      )
    }
    if (result.url === pathname) {
      if (parentNode) {
        parentNode.expanded = true
      }
    }
    if (result.children?.find((it) => it.expanded)) {
      result.expanded = true
    }
    return result
  }

  useEffect(() => {
    //! immutable
    const defaultData = (data as unknown as NavItemProps[]).map((item) =>
      setDefaultData(item)
    )
    setNavList(defaultData)
    //! error not immutable
    // setNavList(setDefaultData(data as unknown as NavItemProps[]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div>
      {navList.map((nav) => (
        <NavItem
          {...nav}
          key={nav.url}
          navList={navList as NavItemProps[]}
          expandChangeHandle={expandChangeHandle}
          clickHandle={clickHandle}
        />
      ))}
    </div>
  )
}
