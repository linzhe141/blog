import Link from 'next/link'
import Underline from '@/components/underline'
import Header from '@/components/layout/header'
export default async function BlogLayout({
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
      </Header>
      <div className='mx-auto mt-[90px] p-5 xl:w-[920px]'>{children}</div>
    </main>
  )
}
