import fs from 'fs-extra'
import path from 'path'
import { NextResponse } from 'next/server'
import { prisma } from '@/prisma'
import { usePrisma } from '@/config'
import { headers } from 'next/headers'

const blogDirName = 'blog'
async function getBlogUrlList(
  dir: string,
  result: any[] = [],
  parent: any = null
) {
  for (const name of await fs.readdir(dir)) {
    const fileStat = await fs.stat(path.resolve(dir, name))
    const isDirectory = fileStat.isDirectory()
    let item: any = { label: name, name, url: name }
    if (item.url.indexOf(blogDirName) !== 1) {
      item.url = `/${blogDirName}/${item.url}`
    }
    if (parent) {
      item.url = parent.url + '/' + name
      if (isDirectory || name === 'page.tsx') {
        if (name === 'page.tsx') parent.linked = true
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

function getFlatList(
  data: any[],
  result: any[] = [],
  parentName: string | null = null
) {
  for (const item of data) {
    result.push({
      name: item.name,
      url: item.url,
      label: item.label,
      linked: item.linked,
      parentName,
    })
    if (item.children) {
      getFlatList(item.children, result, item.name)
    }
  }
  return result
}
async function add2DB(list: any[]) {
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
          name: menu.name,
          parentId: parentData ? parentData.id : 0,
        },
      })
    }
  }
}

function formatMenu(data: any[], result: any[] = [], map = new Map()) {
  for (const item of data) {
    let menu = {
      id: item.id,
      label: item.label,
      linked: item.linked,
      name: item.name,
      url: item.url,
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
    return NextResponse.json({ data: formatMenu(menuList) })
  } else {
    return NextResponse.json({ data: blogUrlList })
  }
}

// export async function POST(request: Request) {
//   const headersList = headers()
//   const requestKey = headersList.get('authorization')!
//   const target = await prisma.requsetKey.findFirst({
//     where: {
//       key: requestKey,
//     },
//   })
//   if (!target) {
//     return NextResponse.json({ code: 401, msg: '认证失败！' })
//   }
//   const { data } = await request.json()
//   await prisma.$transaction(
//     data.map((item: { id: number; label: string }) =>
//       prisma.menu.update({
//         where: { id: item.id },
//         data: {
//           label: item.label,
//         },
//       })
//     )
//   )
//   return NextResponse.json({ data: true })
// }