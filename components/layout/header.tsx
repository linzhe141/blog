'use client'
import { useRouter, usePathname } from 'next/navigation'
import Icon from '@/components/icon/Icon'
import Image from 'next/image'
import Underline from '../underline'
type Props = {
  children: React.ReactNode
}
export default function Header({ children }: Props) {
  const router = useRouter()
  return (
    <div className='fixed top-0 flex w-full items-center justify-between border-b-[1px] bg-white p-4 shadow-md shadow-gray-400'>
      <div>
        <Underline>
          <div className=' flex items-center' onClick={() => router.push('/')}>
            <Image
              className='mr-2'
              width={24}
              height={24}
              src={'/logo.jpg'}
              alt='logo'
            />
            <span className='font-semibold'>linzhe-blog</span>
          </div>
        </Underline>
      </div>

      <div className='flex items-center'>
        {children}
        <a
          className='ml-4 cursor-pointer'
          href='https://github.com/linzhe141'
          title='linzhe141 github'
        >
          <Icon type='github' />
        </a>
      </div>
    </div>
  )
}
