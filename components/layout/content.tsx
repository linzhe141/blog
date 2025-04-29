import { cn } from '@/lib/utils'

export default function Content({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn(className)}>
      <div className='rounded bg-slate-100 p-4 dark:bg-black'>{children}</div>
    </div>
  )
}
