import Blog from '@/components/blog'
import Underline from '@/components/underline'
import fs from 'fs-extra'
import matter from 'gray-matter'
import langDockerfile from 'highlight.js/lib/languages/dockerfile'
import langNginx from 'highlight.js/lib/languages/nginx'
import { MDXComponents } from 'mdx/types'
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'
import Image, { type ImageProps } from 'next/image'
import path from 'path'
import rehypeHighlight from 'rehype-highlight'
import { notFound } from 'next/navigation'

const languages = {
  nginx: langNginx,
  dockerfile: langDockerfile,
}
const MDXOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [
      [
        rehypeHighlight,
        {
          ignoreMissing: true,
          languages,
        },
      ],
    ],
  },
}
const components: MDXComponents = {
  Underline,
  Image: (props: ImageProps) => <Image {...props} />,
  h1: ({ children }) => <h1 id={generateId(children)}>{children}</h1>,
  h3: ({ children }) => <h3 id={generateId(children)}>{children}</h3>,
  pre: ({ children }) => (
    <pre className='relative'>
      <div className='absolute right-5'>{getCodeLanguage(children)}</div>
      {children}
    </pre>
  ),
}
export default async function Page({ params }: { params: { name: string[] } }) {
  const url = params.name.join('/')
  const { content } = await getMdx(`blog/${url}`)
  if (content === null) notFound()
  return (
    <Blog>
      <MDXRemote
        source={content}
        components={components}
        options={MDXOptions}
      />
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

function generateId(children: React.ReactNode) {
  return children as string
}
function getCodeLanguage(children: any) {
  const [_, language] = children?.props.className.split('language-')
  return language as string
}
