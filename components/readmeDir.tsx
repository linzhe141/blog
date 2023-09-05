'use client'
import { useReadme } from '@/hooks/useReadme'
type Props = {
  url: string
  beforeJump?: (...args: any) => void
}
export default function ReadmeDir({ url, beforeJump }: Props) {
  const { dirStructure } = useReadme({ url })
  function clickHandle() {
    beforeJump && beforeJump()
  }
  return (
    <div>
      {dirStructure.map((item) => (
        <div
          key={item}
          className='text-sm mb-4'
          onClick={(e) => {
            e.stopPropagation()
            clickHandle()
          }}
        >
          <a href={`#${item}`}>{item}</a>
        </div>
      ))}
    </div>
  )
}
