'use client'
import Blog from '@/components/blog'
import { BlogEditor } from '@/components/blogEditor'
import Header from '@/components/layout/header'
import { mdxOptions } from '@/components/mdx/mdxConfig'
import { MdxDisplay } from '@/components/mdx/mdxDisplay'
import { getHtmlString } from '@/utils'
import { serialize } from 'next-mdx-remote/serialize'
import { useEffect, useRef, useState } from 'react'

export default function Page() {
  const [error, setError] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeContentHtml, setIframeContentHtml] = useState('')
  async function renderMdx(value: string | undefined) {
    try {
      const mdxSource = await serialize(value!, {
        mdxOptions: {
          ...mdxOptions,
          development: process.env.NODE_ENV === 'development',
        },
      })
      const html = getHtmlString(
        <Blog>
          <MdxDisplay source={mdxSource} />
        </Blog>
      )
      setIframeContentHtml(html)
      setError(false)
    } catch (e) {
      console.error(e)
      setError(true)
    }
  }
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const doc = iframe.contentDocument
    if (!doc) return
    if (doc.head.children.length === 0) {
      const styleLink = doc.createElement('link')
      styleLink.rel = 'stylesheet'
      styleLink.href = '/output.css'
      doc.head.appendChild(styleLink)

      const script = doc.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4'
      doc.head.appendChild(script)
    }
    doc.body.innerHTML = iframeContentHtml
  }, [iframeContentHtml])

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
              <iframe ref={iframeRef} className='h-full w-full'></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
