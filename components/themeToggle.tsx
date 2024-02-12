'use client'
import Icon from '@/components/icon/Icon'
import { useToggleTheme } from '@/hooks/useToggleTheme'
export default function ThemeToggle() {
  const { theme: mode, setTheme: setMode } = useToggleTheme()
  function clickHandle() {
    if (mode === 'light') {
      setMode('dark')
    } else {
      setMode('light')
    }
  }
  return (
    <div className='cursor-pointer' onClick={clickHandle}>
      {mode === 'dark' ? (
        <Icon type='moon' color='#e2e8f0' />
      ) : (
        <Icon type='sun' color='#213547' />
      )}
    </div>
  )
}
