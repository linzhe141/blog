import { create } from 'zustand'
import { persist } from 'zustand/middleware'
type ThemeType = 'light' | 'dark'
interface Store {
  mode: ThemeType
  setMode: (data: ThemeType) => void
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
