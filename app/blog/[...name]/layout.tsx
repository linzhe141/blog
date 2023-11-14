'use client'
import Menu from '@/components/layout/menu'
import ReadmeDir from '@/components/readmeDir'
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

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showMenu, setShowMenu] = useState(false)
  const [showReadmeDir, setShowReadmeDir] = useState(false)
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
        <Underline>
          <Link className='font-semibold' href='/'>
            home
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
      <div className='mt-[57px] flex h-10 items-center justify-between overflow-hidden border-b-[1px] px-2 xl:h-0 xl:border-b-0'>
        <div
          className='flex cursor-pointer items-center'
          onClick={() => setShowMenu(true)}
        >
          <Icon type='menu' />
          <span className='ml-2'>Menu</span>
        </div>
        <div
          className='flex cursor-pointer items-center'
          onClick={() => setShowReadmeDir(true)}
        >
          {dirStructure.length > 0 && (
            <>
              <span className='ml-2'>On this page </span>
              <Icon type='arrow' />
            </>
          )}
          <div
            className={`absolute left-8 right-8 top-[110px] z-10 rounded bg-white p-4 shadow-md shadow-gray-400 ${
              showReadmeDir ? 'scale-y-100' : 'scale-0 '
            } origin-top-right transition-all duration-300`}
          >
            <ReadmeDir
              beforeJump={() => {
                setShowReadmeDir(false)
              }}
              data={dirStructure}
            />
          </div>
          <div
            className={`fixed bottom-0 left-0 right-0 top-0 bg-gray-400 bg-opacity-30 transition-all duration-300 ${
              showReadmeDir ? 'scale-y-100' : 'scale-0'
            }`}
            onClick={(e) => {
              e.stopPropagation()
              setShowReadmeDir(false)
            }}
          ></div>
        </div>
      </div>
      <div className='flex h-0 flex-1 overflow-auto'>
        <div
          className={`fixed bottom-0 top-0 z-[1] overflow-auto border-r-[1px] bg-white xl:static xl:min-w-[380px] xl:px-[50px] ${
            showMenu ? 'left-0 right-0' : 'left-[-1000px] '
          } transition-[left] duration-300`}
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
            <Skeleton count={10} />
          )}
        </div>
        <div className='flex-1 overflow-auto p-5 xl:pr-[300px]'>
          <Content>{children}</Content>
        </div>
        <div
          className={`hidden bg-white xl:fixed xl:bottom-0 xl:right-[20px] xl:top-[57px] xl:block xl:w-[280px] xl:border-l-[1px] xl:px-[50px]`}
        >
          <div className='mb-4 hidden xl:block'></div>
          {dirStructureLoading ? (
            <Skeleton count={5} />
          ) : (
            <ReadmeDir data={dirStructure} />
          )}
        </div>
      </div>
    </main>
  )
}
