'use client'
type Props = {
  data: string[]
  beforeJump?: (...args: any) => void
}
import Underline from '@/components/underline';
export default function ReadmeDir({ data, beforeJump }: Props) {
  function clickHandle() {
    beforeJump && beforeJump()
  }
  return (
    <div>
      {data.map((item, i) => (
        <div
          key={item}
          className={`${i != 0 ? 'mt-4' : ''} text-sm`}
          onClick={(e) => {
            e.stopPropagation()
            clickHandle()
          }}
        >
          <Underline>
            <a href={`#${item}`}>{item}</a>
          </Underline>
        </div>
      ))}
    </div>
  )
}
