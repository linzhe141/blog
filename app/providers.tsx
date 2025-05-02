'use client'
import { useShikiInit } from '@/hooks/useShikiInit'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  useShikiInit()
  return (
    <ThemeProvider
      defaultTheme={'dark'}
      attribute='class'
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
