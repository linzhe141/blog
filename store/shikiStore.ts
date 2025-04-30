import { create } from 'zustand'
import type { Highlighter } from 'shiki'
interface Store {
  highlighter: Highlighter | null
  setHighlighter: (data: Highlighter) => void
}

export const useHighlighter = create<Store>()((set) => ({
  highlighter: null,
  setHighlighter: (data) => set((state) => ({ highlighter: data })),
}))
