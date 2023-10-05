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
            <h1 className='mb-4 cursor-pointer text-9xl'>blog</h1>
          </Link>
        </Underline>
      </div>
    </div>
  )
}
