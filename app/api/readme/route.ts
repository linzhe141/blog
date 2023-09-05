import fs from 'fs-extra'
import path from 'path'
import matter from 'gray-matter'
import { NextResponse } from 'next/server'
import { remark } from 'remark'
import slug from 'remark-slug'

function getDirStructure(root: any) {
  // if(node.type)
  return root.children
    .filter((item: any) => item.type === 'heading' && item.depth === 3)
    .map((item: any) =>
      item.children.reduce((title: string, it: any) => (title += it.value), '')
    )
}
export async function GET(request: Request) {
  const searchParams = new URLSearchParams(request.url.split('?')[1])
  const url = searchParams.get('url')
  const readmeName = `${url}/readme.mdx`
  const readmePath = path.resolve(process.cwd(), 'app/' + readmeName)
  const fileContent = await fs.readFile(readmePath, 'utf-8')
  const { content } = matter(fileContent)
  const processor = remark().use(slug)
  //! mdx的 ast
  const tree = processor.parse(content)
  return NextResponse.json({
    data: getDirStructure(tree),
  })
}
