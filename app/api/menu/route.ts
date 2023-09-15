import { NextResponse } from 'next/server'
import { prisma } from '@/prisma'
import { headers } from 'next/headers'

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
    return NextResponse.json({ code: 401, msg: '认证失败！' })
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
  return NextResponse.json({ data: true })
}
