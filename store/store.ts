import { create } from 'zustand'
import type { NavData } from '@/types'

interface Store {
  navList: NavData[]
  setNavList: (data: NavData[]) => void
}

export const useStore = create<Store>()((set) => ({
  navList: [],
  setNavList: (data) => set((state) => ({ navList: data })),
}))
