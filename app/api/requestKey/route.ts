import { NextResponse } from 'next/server'
import { prisma } from '@/db/prisma'
import type { Result } from '@/types'
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
  const result: Result<boolean> = { code: 200, data: success }
  return NextResponse.json(result)
}
