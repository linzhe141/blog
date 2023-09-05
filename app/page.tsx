'use client'
import Underline from '@/components/underline'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useStore } from '@/store/store'
import { NavData } from '@/components/layout/types'
export default function Home() {
  const router = useRouter()
  const navList = useStore((state) => state.navList)
  function getDefaultUrl(data: NavData[]) {
    if (data.length) {
      const target = data[0]
      return target.url
    }
    return null
  }
  return (
    <div className='flex h-screen items-center justify-center bg-green-400'>
      <div className='flex flex-col items-center justify-center'>
        <Underline height={8}>
          <div onClick={() => router.push(getDefaultUrl(navList) ?? '')} className='flex flex-col justify-center items-center'>
            <Image
              className='mr-2 rounded-full'
              width={120}
              height={120}
              src={'/logo.jpg'}
              alt='logo'
            />
            <h1 className='mb-4 cursor-pointer text-9xl'>blog</h1>
          </div>
        </Underline>
      </div>
    </div>
  )
}
