'use client'
import Underline from '@/components/underline'
import { useStore } from '@/store/store'
import { getDefaultUrl } from '@/utils'
import Link from 'next/link'

export default function Home() {
  const navList = useStore((state) => state.navList)

  return (
    <div className='flex h-screen items-center justify-center bg-green-400 '>
      <div className='flex flex-col items-center justify-center'>
        <Underline height={8}>
          <Link
            href={getDefaultUrl(navList) ?? ''}
            className='flex flex-col items-center justify-center'
          >
            <h1 className='mb-4 text-9xl'>blog</h1>
            <span className='text-xl'>好记性不如烂笔头</span>
          </Link>
        </Underline>
      </div>
    </div>
  )
}
