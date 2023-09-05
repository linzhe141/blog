import { create } from 'zustand'
import { NavData } from '../components/layout/types'

interface Store {
  navList: NavData[]
  setNavList: (data: NavData[]) => void
}

export const useStore = create<Store>()((set) => ({
  navList: [],
  setNavList: (data) => set((state) => ({ navList: data })),
}))
