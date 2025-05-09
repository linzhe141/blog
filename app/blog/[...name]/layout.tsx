'use client'
import BlogDir from '@/components/blogDir'
import { useReadme } from '@/hooks/useReadme'
import Content from '@/components/layout/content'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import Icon from '@/components/icon/Icon'
import Underline from '@/components/underline'
import Header from '@/components/layout/header'
import Skeleton from 'react-loading-skeleton'
import { cn } from '@/lib/utils'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showBlogDir, setShowBlogDir] = useState(false)
  const pathname = usePathname()

  const { dirStructure, loading: dirStructureLoading } = useReadme({
    url: pathname,
  })

  return (
    <main className={cn('flex flex-col')}>
      <Header>
        <Underline className=' ml-4'>
          <Link className='font-semibold' href='/readme'>
            readme
          </Link>
        </Underline>
      </Header>
      <div className='sticky top-[57px] z-10 flex h-10 items-center justify-between overflow-hidden border-b-[1px] border-t-[1px] bg-white px-2 dark:border-[#2f3336] dark:bg-black xl:hidden xl:border-b-0'>
        <div
          className='flex cursor-pointer items-center'
          onClick={() => setShowBlogDir(true)}
        >
          {dirStructure.length > 0 && (
            <>
              <span className='ml-2'>On this page </span>
              <Icon type='arrow' />
            </>
          )}
          <div
            className={`absolute left-8 right-8 top-[110px] z-10 rounded bg-white p-4 shadow-md shadow-gray-400 dark:bg-black dark:shadow-gray-800 ${
              showBlogDir ? 'scale-y-100' : 'scale-0 '
            } origin-top-right transition-all duration-300`}
          >
            <BlogDir
              beforeJump={() => {
                setShowBlogDir(false)
              }}
              data={dirStructure}
            />
          </div>
          <div
            className={`fixed bottom-0 left-0 right-0 top-0 z-[1] bg-gray-400 bg-opacity-30 transition-all duration-300 ${
              showBlogDir ? 'scale-y-100' : 'scale-0'
            }`}
            onClick={(e) => {
              e.stopPropagation()
              setShowBlogDir(false)
            }}
          ></div>
        </div>
      </div>
      <div className='sticky top-[100px] ml-10 hidden w-[120px] xl:block'>
        <Underline className=' ml-4'>
          <Link className='inline-flex items-center' href='/blog'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-arrow-left mr-1 h-4 w-4'
            >
              <path d='m12 19-7-7 7-7'></path>
              <path d='M19 12H5'></path>
            </svg>
            Back to Blog
          </Link>
        </Underline>
      </div>
      <div className='mx-auto mt-0 flex xl:w-[1120px]'>
        <div className='min-h-screen flex-1'>
          <Content className='p-5'>{children}</Content>
        </div>
        <aside className='hidden dark:border-[#2f3336]  xl:block xl:w-[200px] xl:border-l-[1px] xl:px-4'>
          <div className={`xl:sticky xl:top-[100px]`}>
            <div className='mb-4 hidden xl:block'></div>
            {dirStructure.length > 0 && (
              <div className='mb-4'>On this page</div>
            )}
            {dirStructureLoading ? (
              <Skeleton count={5} />
            ) : (
              <BlogDir data={dirStructure} />
            )}
          </div>
        </aside>
      </div>
    </main>
  )
}
