import Link from 'next/link'
import Underline from '@/components/underline'
import Header from '@/components/layout/header'
import { cn } from '@/lib/utils'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className={cn('flex flex-col')}>
      <Header>
        <Underline className=' ml-4'>
          <Link className='font-semibold' href='/readme'>
            readme
          </Link>
        </Underline>
      </Header>
      <div className='mt-[60px] flex'>
        <div className='min-h-screen flex-1'>{children}</div>
      </div>
    </main>
  )
}
