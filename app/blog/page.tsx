import Content from '@/components/layout/content'
import fs from 'node:fs'
import fg from 'fast-glob'
import Underline from '@/components/underline'
import Link from 'next/link'

export default async function Page() {
  const filesInfo = fg
    .sync('posts/**/readme.mdx', {
      cwd: process.cwd(),
      absolute: true,
    })
    .map((filePath) => {
      const stats = fs.statSync(filePath)
      const fileText = fs.readFileSync(filePath, 'utf-8')
      let title = ''
      const titleTarget = fileText.split('\n').find((i) => i.startsWith('#'))
      if (titleTarget) title = titleTarget
      const [_, path] = filePath.split('posts/')

      return {
        path: path.replace('/readme.mdx', ''),
        title: title,
        createdAt: stats.birthtime,
        updatedAt: stats.mtime,
      }
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
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
