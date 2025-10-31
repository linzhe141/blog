'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import CursorFollow from '@/components/cursorFollow'
import Icon from '@/components/icon/Icon'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const targetUrl = '/readme'
export default function Home() {
  const router = useRouter()
  useEffect(() => {
    const handleSpace = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        router.push(targetUrl)
      }
    }
    window.addEventListener('keydown', handleSpace)
    return () => {
      window.removeEventListener('keydown', handleSpace)
    }
  }, [router])
  return (
    <div
      className={cn(
        'contrast-content',
        'h-screen',
        'flex items-center justify-center',
        'overflow-hidden bg-green-400 text-[#213547]'
      )}
    >
      <CursorFollow />
      <div className='flex flex-col items-center justify-center'>
        <Link href={targetUrl}>
          <div className='text-content relative flex flex-col items-center justify-center'>
            <div className='click-icon absolute right-0 top-0'>
              <Icon type='click' color='#213547' />
            </div>
            <h1 className='text-content mb-4 text-9xl'>blog</h1>
            <span className='text-content text-xl'>好记性不如烂笔头</span>
          </div>
          <div className={`gradient mt-2 h-2 w-[400px]`}></div>
        </Link>
        <Link href={targetUrl}>
          <div className='mt-12 flex w-[300px] items-center justify-center'>
            <div className='spacebar relative flex h-10 w-full items-center justify-center rounded-xl border-2 border-[#213547] text-[#213547]'>
              <div className='absolute inset-0 animate-pulse rounded-xl bg-[#213547]/5'></div>
              <span className='mb-10 text-5xl tracking-wider opacity-60'>
                ⎵
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
