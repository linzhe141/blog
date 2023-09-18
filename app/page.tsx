'use client'
import Underline from '@/components/underline'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/store'
import { getDefaultUrl } from '@/utils'
export default function Home() {
  const router = useRouter()
  const navList = useStore((state) => state.navList)

  return (
    <div className='flex h-screen items-center justify-center bg-green-400'>
      <div className='flex flex-col items-center justify-center'>
        <Underline height={8}>
          <div
            onClick={() => router.push(getDefaultUrl(navList) ?? '')}
            className='flex flex-col items-center justify-center'
          >
            <h1 className='mb-4 cursor-pointer text-9xl'>blog</h1>
          </div>
        </Underline>
      </div>
    </div>
  )
}
