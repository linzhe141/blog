import { useEffect, useState } from 'react'

type Props = {
  url: string
}
export function useReadme({ url }: Props) {
  const [dirStructure, setDirStructure] = useState([])
  async function getDirStructure() {
    const { data } = await (await fetch(`/api/readme?url=${url}`)).json()
    setDirStructure(data)
  }
  useEffect(() => {
    getDirStructure()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])
  return { dirStructure }
}
