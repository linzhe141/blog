import Link from 'next/link'
import Underline from '@/components/underline'
import Header from '@/components/layout/header'
import { toUrl } from '@/app/api'
import { type MenuData, type Result } from '@/types'
import { getDefaultUrl } from '@/utils'
export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: menuList }: Result<MenuData[]> = await (
    await fetch(toUrl('/api/menu'))
  ).json()
  return (
    <main className='flex flex-col'>
      <Header>
        <Underline>
          <Link className='font-semibold' href={getDefaultUrl(menuList) ?? ''}>
            blog
          </Link>
        </Underline>
      </Header>
      <div className='mx-auto mt-[90px] p-5'>{children}</div>
    </main>
  )
}
