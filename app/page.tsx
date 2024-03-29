import { cn, getDefaultUrl } from '@/utils'
import Link from 'next/link'
import { toUrl } from './api'
import { type MenuData, type Result } from '@/types'
import CursorFollow from '@/components/cursorFollow'

export default async function Home() {
  const { data: menuList }: Result<MenuData[]> = await (
    await fetch(toUrl('/api/menu'), { next: { revalidate: 0 } })
  ).json()
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
        <Link href={getDefaultUrl(menuList) ?? ''}>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-content mb-4 text-9xl'>blog</h1>
            <span className='text-content text-xl'>好记性不如烂笔头</span>
          </div>
          <div className={`gradient mt-2 h-2 w-[400px]`}></div>
        </Link>
      </div>
    </div>
  )
}
