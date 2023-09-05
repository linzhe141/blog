'use client'
export default function Blog({ children }: { children: React.ReactNode }) {
  return (
    <div className='prose max-w-full'>
      <div>{children}</div>
    </div>
  )
}
