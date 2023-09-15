import { NextResponse } from 'next/server'
import { prisma } from '@/prisma'

export async function POST(request: Request) {
  const data = await request.json()
  const target = await prisma.requsetKey.findFirst({
    where: {
      key: data.key,
    },
  })
  let success = false
  if (target) {
    success = true
  }
  return NextResponse.json({ data: success })
}
