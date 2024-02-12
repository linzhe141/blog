import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function useToggleTheme() {
  const { theme, setTheme } = useTheme()
  const [themeValue, setThemeValue] = useState<string>()

  useEffect(() => setThemeValue(theme), [theme])

  return { theme: themeValue, setTheme }
}
