import Link from 'next/link'
import Underline from '@/components/underline'
import Header from '@/components/layout/header'
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='flex flex-col'>
      <Header>
        <Underline>
          <Link className='font-semibold' href={'/blog'}>
            blog
          </Link>
        </Underline>
        <Underline className=' ml-4'>
          <Link className='font-semibold' href='/readme'>
            readme
          </Link>
        </Underline>
      </Header>
      <div className='mt-[4rem]'>{children}</div>
    </main>
  )
}
