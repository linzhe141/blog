'use client'
import { Next13ProgressBar } from 'next13-progressbar'
import { useToggleTheme } from '@/hooks/useToggleTheme'
import { SkeletonTheme } from 'react-loading-skeleton'
import { usePathname } from 'next/navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme: mode } = useToggleTheme()
  const pathname = usePathname()

  let baseColor = 'transparent'
  let highlightColor = 'transparent'
  if (mode === 'dark') {
    baseColor = '#202020'
    highlightColor = '#444'
  }
  if (mode === 'light') {
    baseColor = ''
    highlightColor = ''
  }
  const currentYear = new Date().getFullYear()
  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      <div className='dark:bg-black'>
        {children}
        <Next13ProgressBar
          height='4px'
          color='rgba(187, 247, 208, 1)'
          options={{ showSpinner: true }}
          showOnShallow
        />
      </div>
      {pathname !== '/' && (
        <footer className='border-t border-border bg-background py-6'>
          <div className='container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row'>
            <p className='text-center text-sm text-muted-foreground'>
              © {currentYear} <span className='mx-2'>linzhe. </span>All rights
              reserved.
            </p>
            <div className='flex items-center gap-4'></div>
          </div>
        </footer>
      )}
    </SkeletonTheme>
  )
}
