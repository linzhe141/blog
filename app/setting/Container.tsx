import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { MenuData, getIds } from './utils'
import { useDroppable } from '@dnd-kit/core'
import { SortableTreeItem } from './SortableTreeItem'

interface Props {
  menuData: MenuData[]
  onRemove: Function
}
export function Container({ menuData, onRemove }: Props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { setNodeRef } = useDroppable({
    id: 'drop-container',
  })
  return (
    <div className='w-[600px] rounded-lg border p-4'>
      <SortableContext
        id='tree-container'
        items={getIds(menuData)}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className='h-full'>
          {menuData.map((i) => (
            <SortableTreeItem
              onRemove={onRemove}
              data={menuData}
              node={i}
              key={i.id}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}
