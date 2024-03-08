'use client'
import Blog from '@/components/blog'
import Editor from '@monaco-editor/react'
import { type MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useState } from 'react'
import { MdxDisplay } from '../../components/mdx/mdxDisplay'
import { mdxOptions } from '@/components/mdx/mdxConfig'
export default function Page() {
  const [content, setContent] = useState<MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  > | null>(null)
  return (
    <div className='flex h-screen w-screen'>
      <Editor
        width='50%'
        defaultLanguage='markdown'
        defaultValue=''
        onChange={async (value) => {
          const mdxSource = await serialize(value!, {
            mdxOptions: {
              ...mdxOptions,
              development: process.env.NODE_ENV === 'development',
            },
          })
          setContent(mdxSource)
        }}
      />
      <div className='flex-1 overflow-auto p-4'>
        <Blog>{content && <MdxDisplay source={content} />}</Blog>
      </div>
    </div>
  )
}
