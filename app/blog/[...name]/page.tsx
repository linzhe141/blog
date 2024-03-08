import Blog from '@/components/blog'
import fs from 'fs-extra'
import matter from 'gray-matter'
import path from 'path'
import { notFound } from 'next/navigation'
import MdxDisplayRsc from '@/components/mdx/mdxDisplayRsc'

export default async function Page({ params }: { params: { name: string[] } }) {
  const url = params.name.join('/')
  const { content } = await getMdx(`blog/${url}`)
  if (content === null) notFound()
  return (
    <Blog>
      <MdxDisplayRsc content={content} />
    </Blog>
  )
}

async function getMdx(url: string) {
  const cwd = process.cwd()
  const result = path.resolve(cwd, `app/${url}/readme.mdx`)
  try {
    const source = await fs.readFile(result, 'utf-8')
    const { content } = matter(source)
    return {
      content,
    }
  } catch (error) {
    return {
      content: null,
    }
  }
}
