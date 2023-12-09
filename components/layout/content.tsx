export default function Content({ children }: { children?: React.ReactNode }) {
  return (
    <div>
      <div className='rounded bg-slate-100 p-4 dark:bg-black'>{children}</div>
    </div>
  )
}
