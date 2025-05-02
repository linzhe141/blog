import { cn } from '@/lib/utils'
import { Signature } from '../signature'

export default function Content({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn(className)}>
      <div className='rounded bg-slate-100 p-4 dark:bg-[#181818]'>
        {children}
      </div>
      <div className='h-[100px]'>
        <Signature className='ml-auto mr-0 mt-[40px]' />
      </div>
    </div>
  )
}
