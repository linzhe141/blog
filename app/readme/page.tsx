import fs from 'fs-extra'
import path from 'path'
import MdxDisplayRsc from '@/components/mdx/mdxDisplayRsc'
import CursorFollow from '@/components/cursorFollow'
export default async function Page() {
  const { content } = await getReadmeContent()
  return (
    <div className='prose dark:prose-invert'>
      <CursorFollow color='rgba(134, 239, 172, 1)' />
      <MdxDisplayRsc content={content} />
    </div>
  )
}
async function getReadmeContent() {
  const cwd = process.cwd()
  const result = path.resolve(cwd, `readme.md`)
  const source = await fs.readFile(result, 'utf-8')
  return {
    content: source,
  }
}
