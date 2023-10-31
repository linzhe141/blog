export type MenuItemProps = {
  label: string
  url: string
  level: number
  expanded: boolean
  linked: boolean
  expandChangeHandle?: (menu: MenuItemProps) => void
  clickHandle?: (menu: MenuItemProps) => void
  children?: MenuItemProps[]
  menuList?: MenuItemProps[]
}
export type MenuData = {
  id: number
  linked: boolean
  label: string
  name: string
  url: string
  filePath: string
  children?: MenuData[]
}
export type MenuProps = {
  data: MenuData[]
  beforeJump?: (...args: any) => void
}

export type Result<T> = {
  code: 200 | 400 | 401
  msg?: string
  data: T
}
