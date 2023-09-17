export type NavItemProps = {
  label: string
  url: string
  level: number
  expanded: boolean
  linked: boolean
  expandChangeHandle?: (nav: NavItemProps) => void
  clickHandle?: (nav: NavItemProps) => void
  children?: NavItemProps[]
  navList?: NavItemProps[]
}
export type NavData = {
  id: number
  linked: boolean
  label: string
  name: string
  url: string
  children?: NavData[]
}
export type NavPros = {
  data: NavData[]
  beforeJump?: (...args: any) => void
}

export type Result<T> = {
  code: 200 | 401
  msg?: string
  data: T
}
