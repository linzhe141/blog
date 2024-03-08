import { MDXRemote } from 'next-mdx-remote/rsc'
import { components, mdxOptions } from './mdxConfig'
type Props = {
  content: string
}
export default function MdxDisplayRsc({ content }: Props) {
  return (
    <MDXRemote
      source={content}
      components={components}
      options={{ mdxOptions }}
    />
  )
}
