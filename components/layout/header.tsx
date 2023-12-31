'use client'
import Link from 'next/link'
import Icon from '@/components/icon/Icon'
import Image from 'next/image'
import Underline from '../underline'
import ThemeToggle from '../themeToggle'
import { useThemeStore } from '@/store/themeStore'
import { useEffect } from 'react'

type Props = {
  children: React.ReactNode
}
export default function Header({ children }: Props) {
  const mode = useThemeStore((state) => state.mode)
  useEffect(() => {
    useThemeStore.persist.rehydrate()
  }, [])
  return (
    <div className='fixed top-0 z-10 flex w-full items-center justify-between border-b-[1px] bg-white p-4 shadow-md shadow-gray-400 dark:border-gray-800 dark:bg-black dark:shadow-none'>
      <div>
        <Underline>
          <Link className=' flex items-center' href='/'>
            <Image
              className='mr-2'
              width={24}
              height={24}
              src={'/logo.svg'}
              alt='logo'
              unoptimized
            />
            <span className='font-semibold'>linzhe-blog</span>
          </Link>
        </Underline>
      </div>

      <div className='flex items-center'>
        {children}
        <div className='ml-4'>
          <ThemeToggle />
        </div>
        <Link
          className='ml-4 cursor-pointer'
          href='https://github.com/linzhe141'
          title='linzhe141 github'
          target='_blank'
        >
          {mode === 'light' ? (
            <Icon type='github' />
          ) : (
            <Icon type='github' color='#e2e8f0' />
          )}
        </Link>
      </div>
    </div>
  )
}
