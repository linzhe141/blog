import MenuItem from './menuItem'
import { type MenuItemProps, MenuProps } from '@/types'

import { useImmer } from 'use-immer'
export default function Menu({ beforeJump, data }: MenuProps) {
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
