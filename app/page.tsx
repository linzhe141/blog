'use client'
import { useStore } from '@/store/store'
import { getDefaultUrl } from '@/utils'
import Link from 'next/link'

export default function Home() {
  const menuList = useStore((state) => state.menuList)

  return (
    <div className='contrast-content flex h-screen items-center justify-center bg-green-400'>
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
