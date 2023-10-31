import { useEffect, useState } from 'react'
import { type Result } from '@/types'
type Props = {
  filePath: string
}
export function useReadme({ filePath }: Props) {
  const [dirStructure, setDirStructure] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  async function getDirStructure() {
    if (!filePath) return
    setLoading(true)
    const { data }: Result<string[]> = await (
      await fetch(`/api/readme?filePath=${filePath}`)
    ).json()
    setDirStructure(data)
    setLoading(false)
  }
  useEffect(() => {
    getDirStructure()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath])
  return { dirStructure, loading }
}
