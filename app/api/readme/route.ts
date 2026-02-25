import fs from 'fs-extra'
import path from 'path'
import matter from 'gray-matter'
import { NextResponse } from 'next/server'
import { remark } from 'remark'
import slug from 'rehype-slug'
import { type Result } from '@/types'
function extractText(node: any): string {
  if (node.value) {
    return node.value
  }

  if (Array.isArray(node.children)) {
    return node.children.map(extractText).join('')
  }
  return ''
}
function getDirStructure(root: any) {
  return root.children
    .filter((item: any) => item.type === 'heading' && item.depth === 2)
    .map((item: any) => item.children.map(extractText).join('')) as string[]
}
export async function GET(request: Request) {
  const searchParams = new URLSearchParams(request.url.split('?')[1])
  const url = searchParams.get('url')
  const readmeName = `${url}/readme.mdx`
  try {
    const readmePath = path.resolve(process.cwd(), 'posts/' + readmeName)
    const fileContent = await fs.readFile(readmePath, 'utf-8')
    const { content } = matter(fileContent)
    const processor = remark().use(slug)
    //! mdx的 ast
    const tree = processor.parse(content)
    const result: Result<string[]> = { code: 200, data: getDirStructure(tree) }
    return NextResponse.json(result)
  } catch (error) {
    const result: Result<string[]> = { code: 400, data: [] }
    return NextResponse.json(result)
  }
}
