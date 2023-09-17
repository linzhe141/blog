import { NextResponse } from 'next/server'
import { prisma } from '@/prisma'
import { headers } from 'next/headers'
import type { Result } from '@/types'
//? 拆分出来就可以了，难道一个route只能写一个请求处理函数?
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
