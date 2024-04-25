import { cn } from '@/lib/utils'

export default function Blog({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('prose max-w-full', className)}>
      <div>{children}</div>
    </div>
  )
}
