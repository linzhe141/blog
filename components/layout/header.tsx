'use client'
import Link from 'next/link'
import Icon from '@/components/icon/Icon'
import Image from 'next/image'
import Underline from '../underline'
type Props = {
  children: React.ReactNode
}
export default function Header({ children }: Props) {
  return (
    <div className='fixed top-0 flex w-full items-center justify-between border-b-[1px] bg-white p-4 shadow-md shadow-gray-400'>
      <div>
        <Underline>
          <Link className=' flex items-center' href='/'>
            <Image
              className='mr-2'
              width={24}
              height={24}
              src={'/logo.jpg'}
              alt='logo'
            />
            <span className='font-semibold'>linzhe-blog</span>
          </Link>
        </Underline>
      </div>

      <div className='flex items-center'>
        {children}
        <Link
          className='ml-4 cursor-pointer'
          href='https://github.com/linzhe141'
          title='linzhe141 github'
          target='_blank'
        >
          <Icon type='github' />
        </Link>
      </div>
    </div>
  )
}
