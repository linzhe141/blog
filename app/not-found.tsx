'use client'
import Header from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
export default function NotFound() {
  const router = useRouter()
  return (
    <div className='flex flex-col items-center justify-center'>
      <Header></Header>
      <Image
        className='mt-20'
        src='/404.svg'
        alt='404'
        width={550}
        height={470}
      />
      <Button onClick={() => router.back()} variant='outline'>
        返回
      </Button>
    </div>
  )
}
