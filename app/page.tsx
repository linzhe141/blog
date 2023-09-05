'use client'
import Underline from '@/components/underline'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/store'
import { NavData } from '@/components/layout/types'
export default function Home() {
  const router = useRouter()
  const navList = useStore((state) => state.navList)
  // function getDefaultUrl(data: NavData[]) {
  //   if (data.length) {
  //     const target = data[0]
  //     if (!target.children || target.children?.length === 0) return target.url
  //     if (target.children) {
  //       return getDefaultUrl(target.children)
  //     }
  //   }
  //   return null
  // }
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
          <h1
            className='mb-4 cursor-pointer text-9xl'
            onClick={() => router.push(getDefaultUrl(navList) ?? '')}
          >
            blog
          </h1>
        </Underline>
      </div>
    </div>
  )
}
