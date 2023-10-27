import MenuItem from './menuItem'
import { useEffect } from 'react'
import { type MenuItemProps, MenuProps } from '@/types'
import { usePathname } from 'next/navigation'
import { useImmer } from 'use-immer'
export default function Menu({ beforeJump, data }: MenuProps) {
  const pathname = usePathname()
  const [menuList, setMenuList] = useImmer(data as unknown as MenuItemProps[])

  function setExpanded(data: MenuItemProps[], menu: MenuItemProps) {
    for (const item of data) {
      if (item.url === menu.url) {
        item.expanded = !item.expanded
      }
      if (item.children) {
        setExpanded(item.children, menu)
      }
    }
    return data
  }
  function expandChangeHandle(menu: MenuItemProps) {
    setMenuList((draft) => {
      setExpanded(draft, menu)
    })
  }
  function clickHandle(menu: MenuItemProps) {
    if (menu.linked) {
      beforeJump && beforeJump()
    }
  }
  function setDefaultData(
    data: MenuItemProps,
    parentNode: MenuItemProps | null = null,
    level: number = 1
  ) {
    //! immutable copy
    const result = { ...data }
    result.expanded = false
    result.level = level
    //! 先进行递归，再从叶子节点一层层出来 类比 二叉树的后序遍历
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
    const defaultData = (data as unknown as MenuItemProps[]).map((item) =>
      setDefaultData(item)
    )
    setMenuList(defaultData)
    //! error not immutable
    // setMenuList(setDefaultData(data as unknown as MenuItemProps[]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div>
      {menuList.map((menu) => (
        <MenuItem
          {...menu}
          key={menu.url}
          menuList={menuList as MenuItemProps[]}
          expandChangeHandle={expandChangeHandle}
          clickHandle={clickHandle}
        />
      ))}
    </div>
  )
}
