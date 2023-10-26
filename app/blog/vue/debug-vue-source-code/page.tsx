'use client'
import Blog from '@/components/blog'
import Readme from './readme.mdx'

export default function Page() {
  return (
    <div>
      <Blog>
        <Readme />
      </Blog>
    </div>
  )
}
