'use client'
import BlogDir from '@/components/blogDir'
import { useReadme } from '@/hooks/useReadme'
import Content from '@/components/layout/content'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Underline from '@/components/underline'
import Header from '@/components/layout/header'
import Skeleton from 'react-loading-skeleton'
import { cn } from '@/lib/utils'

const BackIcon = () => (
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
)

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const { dirStructure, loading: dirStructureLoading } = useReadme({
    url: pathname,
  })

  return (
    <main className={cn('flex flex-col')}>
      <div className='sticky top-[63px]  z-10 mb-4 flex h-[50px] items-center border-b bg-white shadow-md shadow-gray-400 dark:border-[#2f3336] dark:bg-black dark:shadow-none xl:hidden'>
        <Underline className=' ml-4 w-[120px]'>
          <Link className='inline-flex items-center' href='/blog'>
            <BackIcon />
            Back to Blog
          </Link>
        </Underline>
      </div>
      <div className='sticky top-[70px]  ml-10 hidden w-[120px] opacity-30 hover:opacity-100 md:hidden xl:block 2xl:hidden'>
        <Link className='inline-flex items-center' href='/blog'>
          <BackIcon />
          <span
            style={{
              transform: 'rotate(90deg) translateX(30px)',
              transformOrigin: 'left top',
            }}
          >
            Back to Blog
          </span>
        </Link>
      </div>
      <div className='sticky top-[70px]  ml-10 hidden w-[120px] opacity-30 hover:opacity-100 md:hidden 2xl:block'>
        <Underline className=' ml-4'>
          <Link className='inline-flex items-center' href='/blog'>
            <BackIcon />
            Back to Blog
          </Link>
        </Underline>
      </div>
      <div className='mx-auto mt-0 flex w-full xl:w-[1120px]'>
        <div className='min-h-screen flex-1'>
          <Content className='p-5'>{children}</Content>
        </div>
        <aside className='hidden dark:border-[#2f3336]  xl:block xl:w-[200px] xl:border-l-[1px] xl:px-4'>
          <div
            className={`opacity-30 hover:opacity-100 xl:sticky xl:top-[100px]`}
          >
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
