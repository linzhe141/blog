import { create } from 'zustand'
import { type MenuData } from '@/types'

interface Store {
  menuList: MenuData[]
  setMenuList: (data: MenuData[]) => void
}

export const useMenuStore = create<Store>()((set) => ({
  menuList: [],
  setMenuList: (data) => set((state) => ({ menuList: data })),
}))
