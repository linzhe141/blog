export default function Content({ children }: { children?: React.ReactNode }) {
  return (
    <div>
      <div className='m-2 rounded bg-slate-50 p-2'>{children}</div>
    </div>
  )
}
