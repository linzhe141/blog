export default function Underline({
  children,
  offset = 4,
  height = 4,
}: {
  children: React.ReactNode
  offset?: number
  height?: number
}) {
  return (
    <div className='group relative w-full cursor-pointer'>
      {children}
      <div
        style={{ height: height + 'px', marginTop: offset + 'px' }}
        className={`absolute w-0 bg-gradient-to-r from-green-400 to-white transition-all duration-300 group-hover:w-full`}
      ></div>
    </div>
  )
}
