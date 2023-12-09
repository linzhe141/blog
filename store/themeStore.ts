import { create } from 'zustand'

type themeType = 'light' | 'dark'
interface Store {
  mode: themeType
  setMode: (data: themeType) => void
}

export const useThemeStore = create<Store>()((set) => ({
  mode: 'light',
  setMode: (data) => set((state) => ({ mode: data })),
}))
