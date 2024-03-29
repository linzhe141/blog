'use client'
import Blog from '@/components/blog'
import { BlogEditor } from '@/components/blogEditor'
import Header from '@/components/layout/header'
import { mdxOptions } from '@/components/mdx/mdxConfig'
import { MdxDisplay } from '@/components/mdx/mdxDisplay'
import { type MDXRemoteSerializeResult as BlogSource } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useState } from 'react'

export default function Page() {
  const [blogSource, setBlogSource] = useState<BlogSource | null>(null)
  const [error, setError] = useState(false)
  async function renderMdx(value: string | undefined) {
    try {
      const mdxSource = await serialize(value!, {
        mdxOptions: {
          ...mdxOptions,
          development: process.env.NODE_ENV === 'development',
        },
      })
      setBlogSource(mdxSource)
      setError(false)
    } catch (e) {
      setError(true)
    }
  }
  return (
    <div className='flex h-screen w-screen flex-col'>
      <Header></Header>
      <div className='mt-[60px] flex h-0 flex-1'>
        <BlogEditor width='50%' renderMdx={renderMdx} />
        <div className='flex-1 overflow-auto p-4'>
          {error ? (
            <div className='rounded bg-gray-200 p-4 text-red-500'>
              🚨内容格式错误!
            </div>
          ) : (
            <Blog>{blogSource && <MdxDisplay source={blogSource} />}</Blog>
          )}
        </div>
      </div>
    </div>
  )
}
