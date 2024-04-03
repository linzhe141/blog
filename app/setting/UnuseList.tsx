import { DraggableItem } from './DraggableItem'
import { MenuData } from './utils'

interface Props {
  unuseList: MenuData[]
}
export function UnuseList({ unuseList }: Props) {
  return (
    <div className='mt-4 rounded-lg border p-4'>
      {unuseList.map((i) => (
        <DraggableItem key={i.id} node={i} />
      ))}
    </div>
  )
}
