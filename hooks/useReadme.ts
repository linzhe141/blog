import { useEffect, useState } from 'react'
import { type Result } from '@/types'
type Props = {
  url: string
}
export function useReadme({ url }: Props) {
  const [dirStructure, setDirStructure] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getDirStructure() {
      if (!url) return
      const postPath = url.replace('blog', '')
      setLoading(true)
      const { data }: Result<string[]> = await (
        await fetch(`/api/readme?url=${postPath}`)
      ).json()
      setDirStructure(data)
      setLoading(false)
    }
    getDirStructure()
  }, [url])
  return { dirStructure, loading }
}
