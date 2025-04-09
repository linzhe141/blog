'use client'
import Blog from '@/components/blog'
import { BlogEditor } from '@/components/blogEditor'
import Header from '@/components/layout/header'
import { mdxOptions } from '@/components/mdx/mdxConfig'
import { MdxDisplay } from '@/components/mdx/mdxDisplay'
import { getHtmlString } from '@/utils'
import { serialize } from 'next-mdx-remote/serialize'
import { useState } from 'react'

export default function Page() {
  const [error, setError] = useState(false)
  const [srcDoc, setSrcDoc] = useState('')
  async function renderMdx(value: string | undefined) {
    try {
      const mdxSource = await serialize(value!, {
        mdxOptions: {
          ...mdxOptions,
          development: process.env.NODE_ENV === 'development',
        },
      })

      setSrcDoc(
        getHtml(
          getHtmlString(
            <Blog>
              <MdxDisplay source={mdxSource} />
            </Blog>
          )
        )
      )
      setError(false)
    } catch (e) {
      console.error(e)
      setError(true)
    }
  }

  const getHtml = (srcDoc: string) => {
    if (srcDoc) {
      return `
      <!DOCTYPE html>
      <html>
        <head>
          <link href="/output.css" rel="stylesheet" />
          <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        </head>
        <body>
          ${srcDoc}
        </body>
      </html>
    `
    }
    return ''
  }
  return (
    <div className='flex h-screen w-screen flex-col'>
      <Header></Header>
      <div className='mt-[60px] flex h-0 flex-1'>
        <BlogEditor width='50%' renderMdx={renderMdx} />
        <div className='h-full flex-1 overflow-auto p-4'>
          {error ? (
            <div className='rounded bg-gray-200 p-4 text-red-500'>
              🚨内容格式错误!
            </div>
          ) : (
            <div className='h-full'>
              <iframe
                srcDoc={srcDoc}
                className='h-full w-full'
                sandbox='allow-scripts'
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
