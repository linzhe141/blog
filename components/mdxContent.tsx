import Underline from '@/components/underline'
import langDockerfile from 'highlight.js/lib/languages/dockerfile'
import langNginx from 'highlight.js/lib/languages/nginx'
import { MDXComponents } from 'mdx/types'
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'
import Image, { type ImageProps } from 'next/image'
import rehypeHighlight from 'rehype-highlight'
import rehypeMdxCodeProps from 'rehype-mdx-code-props'
import CodeBlock from '@/components/codeBlock1'
type Props = {
  content: string
}
const components: MDXComponents = {
  Underline,
  Image: (props: ImageProps) => <Image {...props} />,
  h1: ({ children }) => <h1 id={generateId(children)}>{children}</h1>,
  h3: ({ children }) => <h3 id={generateId(children)}>{children}</h3>,
  pre: (props) => {
    const { children, filename } = props as any
    return <CodeBlock filename={filename}>{children}</CodeBlock>
  },
}
const MDXOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    remarkPlugins: [],
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
  },
}

export default function MdxContent({ content }: Props) {
  return (
    <MDXRemote source={content} components={components} options={MDXOptions} />
  )
}

function generateId(children: React.ReactNode) {
  return children as string
}
