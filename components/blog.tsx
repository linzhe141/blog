import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Blog = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string }
>(({ children, className }, ref) => {
  return (
    <div ref={ref} className={cn('prose max-w-full', className)}>
      {children}
    </div>
  )
})

Blog.displayName = 'Blog'

export default Blog
