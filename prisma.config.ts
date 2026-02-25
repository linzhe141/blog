import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrations: {
    path: './prisma/migrations',
  },
  datasource: {
    // url: env('POSTGRES_PRISMA_URL'),
    url: process.env.POSTGRES_PRISMA_URL!,
  },
})
