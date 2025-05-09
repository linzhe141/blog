'use client'
import Header from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
export default function NotFound() {
  const router = useRouter()
  return (
    <div className='flex flex-col items-center justify-center'>
      <Header></Header>
      <div className='h-screen'>
        <div className='mt-[200px] space-x-20 text-5xl text-black dark:text-white'>
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </div>
        <div className='mt-10 text-center'>
          <Button
            onClick={() => router.back()}
            variant='outline'
            className='mb-4'
          >
            <span className='mr-8'>返</span>回
          </Button>
        </div>
      </div>
    </div>
  )
}
