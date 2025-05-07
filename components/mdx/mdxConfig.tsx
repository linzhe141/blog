import Underline from '@/components/underline'
import Image, { type ImageProps } from 'next/image'
import CodeBlock from '@/components/mdx/codeBlock'
import { MDXComponents } from 'mdx/types'
import { type MDXRemoteProps } from 'next-mdx-remote/rsc'
import rehypeMdxCodeProps from 'rehype-mdx-code-props'
import remarkGfm from 'remark-gfm'
import { ZoomImage } from '@/components/zoomImage'
export const components: MDXComponents = {
  Underline,
  Image: (props: ImageProps) => <ZoomImage {...props} />,
  h1: ({ children }: any) => <h1 id={generateId(children)}>{children}</h1>,
  h2: ({ children }: any) => <h2 id={generateId(children)}>{children}</h2>,
  pre: (props: any) => {
    const { children, filename, nowrapper } = props as any
    const language = getCodeLanguage(children)
    return (
      <CodeBlock
        nowrapper={!!nowrapper}
        filename={filename}
        code={children.props.children}
        language={language}
      ></CodeBlock>
    )
  },
}

function generateId(children: React.ReactNode) {
  return children as string
}
type MdxOptions = NonNullable<MDXRemoteProps['options']>['mdxOptions']

export const mdxOptions: MdxOptions = {
  remarkPlugins: [[remarkGfm]],
  rehypePlugins: [rehypeMdxCodeProps as any],
}

function getCodeLanguage(children: any) {
  if (!children.props.className) return ''
  const [_, language] = children.props.className?.split('language-')
  return language as string
}
