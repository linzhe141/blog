import { MDXRemote } from 'next-mdx-remote'
import { components } from './mdxConfig'
export function MdxDisplay({ source }: any) {
  return <MDXRemote {...source} components={components} />
}
