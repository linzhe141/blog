'use client'
import Menu from '@/components/layout/menu'
import BlogDir from '@/components/blogDir'
import { useReadme } from '@/hooks/useReadme'
import Content from '@/components/layout/content'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Icon from '@/components/icon/Icon'
import Underline from '@/components/underline'
import { useMenuStore } from '@/store/menuStore'
import { usePrisma } from '@/config'
import Header from '@/components/layout/header'
import Skeleton from 'react-loading-skeleton'
import { cn } from '@/lib/utils'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showMenu, setShowMenu] = useState(false)
  const [showBlogDir, setShowBlogDir] = useState(false)
  const menuList = useMenuStore((state) => state.menuList)
  const pathname = usePathname()

  const { dirStructure, loading: dirStructureLoading } = useReadme({
    url: pathname,
  })

  function closeMenu() {
    if (showMenu) {
      setShowMenu(false)
    }
  }
  function resizeHandle() {
    closeMenu()
  }
  function beforeJumpHandle() {
    closeMenu()
  }
  function keydownHandle(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeMenu()
    }
  }
  useEffect(() => {
    window.addEventListener('resize', resizeHandle)
    window.addEventListener('keydown', keydownHandle)
    return () => {
      window.removeEventListener('resize', resizeHandle)
      window.removeEventListener('keydown', keydownHandle)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMenu])
  return (
    <main className='flex h-screen flex-col'>
      <Header>
        <Underline className=' ml-4'>
          <Link className='font-semibold' href='/readme'>
            readme
          </Link>
        </Underline>
        {usePrisma && (
          <Underline className='ml-4'>
            <Link className='font-semibold' href='/setting'>
              setting
            </Link>
          </Underline>
        )}
      </Header>
      <div className='mt-[57px] flex h-10 items-center justify-between overflow-hidden border-b-[1px] px-2 dark:border-[#2f3336] xl:h-0 xl:border-b-0'>
        <div
          className='flex cursor-pointer items-center'
          onClick={() => setShowMenu(true)}
        >
          <Icon type='menu' />
          <span className='ml-2'>Menu</span>
        </div>
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
      <div className='flex h-0 flex-1 overflow-auto'>
        <div
          className={cn(
            'overflow-auto border-r-[1px] bg-white transition-[left] duration-300 dark:border-[#2f3336] dark:bg-black',
            'fixed bottom-0 top-0 z-[100]',
            'xl:static xl:z-[0] xl:min-w-[380px] xl:px-[50px]',
            {
              'left-0 right-0': showMenu,
              'left-[-1000px]': !showMenu,
            }
          )}
        >
          <div className='flex flex-row-reverse px-4 py-2 xl:hidden'>
            <div
              onClick={closeMenu}
              className='cursor-pointer rounded-full p-1 transition-all duration-200 hover:rotate-180 hover:bg-green-100 hover:text-green-400'
            >
              <Icon type='close' />
            </div>
          </div>
          <div className='mb-4 hidden xl:block'></div>
          {menuList.length > 0 ? (
            <Menu beforeJump={beforeJumpHandle} data={menuList} />
          ) : (
            <div className='p-4'>
              <Skeleton style={{ height: '30px' }} count={10} />
            </div>
          )}
        </div>
        <div className='flex flex-1 overflow-auto p-5'>
          <Content className='flex-1'>{children}</Content>
          <div
            className={`hidden dark:border-[#2f3336] xl:sticky xl:top-0 xl:block xl:w-[270px] xl:border-l-[1px] xl:px-[50px]`}
          >
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
        </div>
      </div>
    </main>
  )
}
