'use client'
import { useThemeStore } from '@/store/themeStore'
import Icon from '@/components/icon/Icon'
import { useEffect } from 'react'
export default function ThemeToggle() {
  const [mode, setMode] = useThemeStore((state) => [state.mode, state.setMode])
  function clickHandle() {
    if (mode === 'light') {
      setMode('dark')
    } else {
      setMode('light')
    }
  }
  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [mode])
  useEffect(() => {
    useThemeStore.persist.rehydrate()
  }, [])
  return (
    <div className='cursor-pointer' onClick={clickHandle}>
      {mode === 'light' ? (
        <Icon type='sun' color='#213547' />
      ) : (
        <Icon type='moon' color='#e2e8f0' />
      )}
    </div>
  )
}
