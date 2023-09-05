import fs from 'fs-extra'
import path from 'path'
import { NextResponse } from 'next/server'
const blogDirName = 'blog'
async function getBlogUrlList(
  dir: string,
  result: any[] = [],
  parent: any = null
) {
  for (const name of await fs.readdir(dir)) {
    const fileStat = await fs.stat(path.resolve(dir, name))
    const isDirectory = fileStat.isDirectory()
    let item: any = { label: name, url: name }
    if (item.url.indexOf(blogDirName) !== 1) {
      item.url = `/${blogDirName}/${item.url}`
    }
    if (parent) {
      item.url = parent.url + '/' + name
      if (isDirectory || name === 'page.tsx') {
        if (name === 'page.tsx') parent.isLink = true
        if (!parent.children) parent.children = []
        parent.children.push(item)
      }
    } else {
      result.push(item)
    }
    if (isDirectory) {
      await getBlogUrlList(path.resolve(dir, name), result, item)
      if (item.children) {
        const target = item.children.find((it: any) =>
          it.url.includes('page.tsx')
        )
        if (target) {
          item.flag = true
          if (parent) {
            parent.flag = true
          }
        }
        item.children = item.children.filter((it: any) => it.flag === true)
      }
    }
  }
  return result
}

export async function GET(request: Request) {
  const blogPath = path.resolve(process.cwd(), 'app/' + blogDirName)
  const result = await getBlogUrlList(blogPath)
  return NextResponse.json({ data: result })
}
