import { cn } from '@/lib/utils'
import Link from 'next/link'
import CursorFollow from '@/components/cursorFollow'
import Icon from '@/components/icon/Icon'

export default async function Home() {
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
        <Link href='/readme'>
          <div className='text-content relative flex flex-col items-center justify-center'>
            <div className='click-icon absolute right-0 top-0'>
              <Icon type='click' color='#213547' />
            </div>
            <h1 className='text-content mb-4 text-9xl'>blog</h1>
            <span className='text-content text-xl'>好记性不如烂笔头</span>
          </div>
          <div className={`gradient mt-2 h-2 w-[400px]`}></div>
        </Link>
      </div>
    </div>
  )
}
