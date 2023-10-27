import { usePathname } from 'next/navigation'
import { type MenuItemProps } from '@/types'
import Icon from '../icon/Icon'
import Link from 'next/link'

import Underline from '../underline'
// 虽然MenuItem是递归组件，但是如果多余两层实在太丑了
export default function MenuItem(props: MenuItemProps) {
  const {
    label,
    url,
    level,
    children,
    linked,
    expanded,
    expandChangeHandle,
    clickHandle,
    menuList,
  } = props
  const pathname = usePathname()
  const subMenuheight = getExpandCount() * 40
  function findMenu(data: MenuItemProps[]): MenuItemProps | null {
    for (const item of data) {
      if (item.url === url) {
        return item
      }
      if (item.children) {
        const target = findMenu(item.children)
        if (target) return target
      }
    }
    return null
  }
  function getExpandCount() {
    const target = findMenu(menuList!)
    if (!target) return 0
    const getExpandedItems = (
      data: MenuItemProps[],
      result: MenuItemProps[] = []
    ) => {
      for (const item of data) {
        if (item.expanded) {
          result.push(item)
        }
        if (item.children) {
          getExpandedItems(item.children, result)
        }
      }
      return result
    }
    const allExpanded = getExpandedItems(
      (target.children ?? []).filter((item) => item.expanded)
    ).reduce((sum, item) => (sum += item.children?.length ?? 0), 0)

    return allExpanded + (target.children?.length ?? 0)
  }
  function clickHandler(linked: boolean) {
    clickHandle && clickHandle(props)
    if (!linked) {
      expandChangeHandle && expandChangeHandle(props)
    }
  }
  return (
    <div>
      <div
        className={`flex cursor-pointer items-center justify-between pr-4 leading-10 ${
          pathname === url ? 'text-green-400' : ''
        } transition-all duration-300 ${
          level !== 1 && pathname === url ? 'border-l-2 border-green-400' : ''
        }`}
        style={{ paddingLeft: 12 * level + 'px' }}
        onClick={() => clickHandler(linked)}
      >
        {linked ? (
          <Underline offset={-8}>
            <Link className='block w-full' href={url}>
              {label}
            </Link>
          </Underline>
        ) : (
          <div>{label}</div>
        )}
        <div>
          {(children?.length ?? 0) > 0 && (
            <div
              onClick={(e) => {
                e.stopPropagation()
                expandChangeHandle && expandChangeHandle(props)
              }}
              className={`flex h-4 w-4 items-center justify-center p-4 text-green-400 transition-all duration-300 ${
                expanded ? 'rotate-90' : ''
              }`}
            >
              <Icon type='triangle' />
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          height: (expanded ? subMenuheight : 0) + 'px',
        }}
        className={`${
          level === 1 ? 'ml-[20px] border-l-[1px]' : ''
        } overflow-hidden transition-all duration-300`}
      >
        {children?.map((subMenu) => (
          <MenuItem
            {...subMenu}
            key={subMenu.url}
            menuList={menuList}
            expandChangeHandle={expandChangeHandle}
            clickHandle={clickHandle}
          />
        ))}
      </div>
    </div>
  )
}
