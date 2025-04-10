import Underline from '@/components/underline'
import Image, { type ImageProps } from 'next/image'
import CodeBlock from '@/components/mdx/codeBlock'
import { MDXComponents } from 'mdx/types'
import { type MDXRemoteProps } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import rehypeMdxCodeProps from 'rehype-mdx-code-props'
import remarkGfm from 'remark-gfm'
import langDockerfile from 'highlight.js/lib/languages/dockerfile'
import langNginx from 'highlight.js/lib/languages/nginx'
import { ZoomImage } from '@/components/zoomImage'
export const components: MDXComponents = {
  Underline,
  Image: (props: ImageProps) => <ZoomImage {...props} />,
  h1: ({ children }: any) => <h1 id={generateId(children)}>{children}</h1>,
  h2: ({ children }: any) => <h2 id={generateId(children)}>{children}</h2>,
  pre: (props: any) => {
    const { children, filename } = props as any
    return <CodeBlock filename={filename}>{children}</CodeBlock>
  },
}

function generateId(children: React.ReactNode) {
  return children as string
}
type MdxOptions = NonNullable<MDXRemoteProps['options']>['mdxOptions']

export const mdxOptions: MdxOptions = {
  remarkPlugins: [[remarkGfm]],
  rehypePlugins: [
    [
      rehypeHighlight,
      {
        ignoreMissing: true,
        languages: {
          nginx: langNginx,
          dockerfile: langDockerfile,
        },
      },
    ],
    rehypeMdxCodeProps as any,
  ],
}
