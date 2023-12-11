import { create } from 'zustand'
import { persist } from 'zustand/middleware'
type themeType = 'light' | 'dark'
interface Store {
  mode: themeType
  setMode: (data: themeType) => void
}

export const useThemeStore = create<Store>()(
  persist(
    (set) => ({
      mode: 'light',
      setMode: (data) => set((state) => ({ mode: data })),
    }),
    { name: 'theme', skipHydration: true }
  )
)
