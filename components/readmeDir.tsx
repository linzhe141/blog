'use client'
type Props = {
  data: any[]
  beforeJump?: (...args: any) => void
}
export default function ReadmeDir({ data, beforeJump }: Props) {
  function clickHandle() {
    beforeJump && beforeJump()
  }
  return (
    <div>
      {data.map((item) => (
        <div
          key={item}
          className='mb-4 text-sm'
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
