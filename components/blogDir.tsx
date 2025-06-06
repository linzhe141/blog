'use client'
type Props = {
  data: string[]
  beforeJump?: (...args: any) => void
}
import Underline from '@/components/underline'
export default function BlogDir({ data, beforeJump }: Props) {
  function clickHandle(url: string) {
    beforeJump && beforeJump()
    const item = document.getElementById(url)
    if (item) {
      item.style.scrollMargin = '100px'
      item.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  return (
    <div>
      {data.map((item, i) => (
        <div
          key={item}
          className={`${i != 0 ? 'mt-4' : ''} text-sm`}
          onClick={(e) => {
            e.stopPropagation()
            clickHandle(item)
          }}
        >
          <Underline>
            <a>{item}</a>
          </Underline>
        </div>
      ))}
    </div>
  )
}
