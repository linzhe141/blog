import Blog from '@/components/blog'
import fs from 'fs-extra'
// import matter from 'gray-matter'
import path from 'path'
import { notFound } from 'next/navigation'
import MdxDisplayRsc from '@/components/mdx/mdxDisplayRsc'
import Link from 'next/link'
export const dynamic = 'force-dynamic'
export default async function Page({ params }: { params: { name: string[] } }) {
  const url = params.name.join('/')
  const { content } = await getMdx(`blog/${url}`)
  if (content === null) notFound()
  function getBlogBase64Url() {
    const base64 = btoa(unescape(encodeURIComponent(content!)))
    const url = '/editor#' + base64
    return url
  }

  return (
    <Blog className='relative'>
      <Link
        className='absolute right-0 cursor-pointer text-xs no-underline'
        href={getBlogBase64Url()}
      >
        <span className='rounded bg-[#ffbd2a] px-2 py-1 text-white'>
          TODO:编辑
        </span>
      </Link>

      <MdxDisplayRsc content={content} />
    </Blog>
  )
}

async function getMdx(url: string) {
  const cwd = process.cwd()
  const result = path.resolve(cwd, `app/${url}/readme.mdx`)
  try {
    const source = await fs.readFile(result, 'utf-8')
    // const { content } = matter(source)
    return {
      content: source,
    }
  } catch (error) {
    return {
      content: null,
    }
  }
}
