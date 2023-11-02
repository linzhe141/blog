import { useEffect, useState } from 'react'
import { type Result } from '@/types'
type Props = {
  url: string
}
export function useReadme({ url }: Props) {
  const [dirStructure, setDirStructure] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  async function getDirStructure() {
    if (!url) return
    setLoading(true)
    const { data }: Result<string[]> = await (
      await fetch(`/api/readme?url=${url}`)
    ).json()
    setDirStructure(data)
    setLoading(false)
  }
  useEffect(() => {
    getDirStructure()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])
  return { dirStructure, loading }
}
