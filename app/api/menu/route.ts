import { NextResponse } from 'next/server'
import { prisma } from '@/prisma'
import { headers } from 'next/headers'

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
