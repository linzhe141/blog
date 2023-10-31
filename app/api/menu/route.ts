import fs from 'fs-extra'
import path from 'path'
import { NextResponse } from 'next/server'
import { prisma } from '@/db/prisma'
import { usePrisma } from '@/config'
import { headers } from 'next/headers'
import { type MenuData, Result } from '@/types'
import { type Menu } from '@prisma/client'
import { getFlatList } from '@/utils'

export const dynamic = 'force-dynamic'
export const revalidate = 0

//? vercel中使用fs读取不到page.tsx
const markFileName = 'readme.mdx'
const blogDirName = 'blog'
async function getBlogUrlList(
  dir: string,
  result: MenuData[] = [],
  parent: MenuData | null = null
) {
  for (const name of await fs.readdir(dir)) {
    if (name === '[name]') continue
    const fileStat = await fs.stat(path.resolve(dir, name))
    const isDirectory = fileStat.isDirectory()
    const item = { label: name, name, url: name, filePath: name } as MenuData
    if (item.url.indexOf(blogDirName) !== 1) {
      item.url = `/${blogDirName}/${item.url}`
      item.filePath = `/${blogDirName}/${item.filePath}`
    }
    if (parent) {
      // item.url = parent.url + '/' + name
      item.filePath = parent.filePath + '/' + name
      if (isDirectory || name === markFileName) {
        if (name === markFileName) parent.linked = true
        if (!parent.children) parent.children = []
        parent.children.push(item)
      }
    } else {
      result.push(item)
    }
    if (isDirectory) {
      await getBlogUrlList(path.resolve(dir, name), result, item)
      if (item.children) {
        const target = item.children.find((it) => it.url.includes(markFileName))
        if (target) {
          // @ts-ignore 作为标记临时使用
          item.mark = true
        }
        // @ts-ignore 作为标记临时使用
        if (item.mark) {
          if (parent) {
            // @ts-ignore 作为标记临时使用
            parent.mark = true
          }
        }
        // @ts-ignore 作为标记临时使用
        item.children = item.children.filter((it) => it.mark === true)
      }
    }
  }
  return result
}

async function add2DB(list: (MenuData & { parentName: string | null })[]) {
  for (const menu of list) {
    const data = await prisma.menu.findUnique({ where: { name: menu.name } })
    let parentData = null
    if (menu.parentName) {
      parentData = await prisma.menu.findUnique({
        where: { name: menu.parentName },
      })
    }
    if (!data) {
      await prisma.menu.create({
        data: {
          label: menu.label,
          linked: !!menu.linked,
          url: menu.url,
          filePath: menu.filePath,
          name: menu.name,
          parentId: parentData ? parentData.id : 0,
        },
      })
    }
  }
}

function formatMenu(data: Menu[], result: MenuData[] = [], map = new Map()) {
  for (const item of data) {
    let menu = {
      id: item.id,
      label: item.label,
      linked: item.linked,
      name: item.name,
      url: item.url,
      filePath: item.filePath,
      children: [],
    }
    if (item.parentId === 0) {
      result.push(menu)
    } else {
      const parentMenu = map.get(item.parentId)
      parentMenu.children.push(menu)
    }
    map.set(item.id, menu)
  }
  return result
}

export async function GET(request: Request) {
  const blogPath = path.resolve(process.cwd(), 'app/' + blogDirName)
  const blogUrlList = await getBlogUrlList(blogPath)
  if (usePrisma) {
    // vercel pgsql 使用
    const flatList = getFlatList(blogUrlList)
    await add2DB(flatList)
    const menuList = await prisma.menu.findMany({
      orderBy: {
        id: 'asc',
      },
    })
    const result: Result<MenuData[]> = { code: 200, data: formatMenu(menuList) }
    return NextResponse.json(result)
  } else {
    const result: Result<MenuData[]> = {
      code: 200,
      data: blogUrlList,
    }
    return NextResponse.json(result)
  }
}
export async function POST(request: Request) {
  const headersList = headers()
  const requestKey = headersList.get('authorization') ?? ''
  const target = await prisma.requsetKey.findFirst({
    where: {
      key: requestKey,
    },
  })
  if (!target) {
    const result: Result<boolean> = {
      code: 401,
      msg: '认证失败！',
      data: false,
    }
    return NextResponse.json(result)
  }
  const { data } = await request.json()
  await prisma.$transaction(
    data.map((item: { id: number; label: string }) =>
      prisma.menu.update({
        where: { id: item.id },
        data: {
          label: item.label,
        },
      })
    )
  )
  const result: Result<boolean> = {
    code: 200,
    data: true,
  }
  return NextResponse.json(result)
}
