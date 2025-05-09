import Content from '@/components/layout/content'
import Underline from '@/components/underline'
import Link from 'next/link'
import filesInfo from '@/public/filesInfo.json'
export default async function Page() {
  return (
    <Content className='flex-1 p-5 xl:mx-auto xl:w-1/2'>
      <div className='space-y-8'>
        {filesInfo.map((i) => (
          <Underline className='ml-4' key={i.path}>
            <Link className='group font-semibold' href={`/blog/${i.path}`}>
              <span>{i.title}</span>
              <span className='ml-2 text-xs text-green-400 opacity-80 group-hover:text-green-400 group-hover:opacity-80 xl:text-green-100 xl:opacity-10'>
                {i.path}
              </span>
            </Link>
          </Underline>
        ))}
      </div>
    </Content>
  )
}
