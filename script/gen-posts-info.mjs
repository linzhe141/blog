import fs from 'node:fs'
import fg from 'fast-glob'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)
const filesInfo = fg
  .sync('posts/**/readme.mdx', {
    cwd: process.cwd(),
    absolute: true,
  })
  .map((filePath) => {
    const stats = fs.statSync(filePath)
    const fileText = fs.readFileSync(filePath, 'utf-8')
    let title = ''
    const titleTarget = fileText.split('\n').find((i) => i.startsWith('#'))
    if (titleTarget) title = titleTarget
    const [_, path] = filePath.split('posts/')

    return {
      path: path.replace('/readme.mdx', ''),
      title: title,
      createdAt: stats.birthtime,
      updatedAt: stats.mtime,
    }
  })
  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

fs.writeFileSync(
  path.resolve(__dirname, '../public/filesInfo.json'),
  JSON.stringify(filesInfo, null, 2)
)
