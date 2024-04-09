import Icon from '@/components/icon/Icon'
import { cn } from '@/utils'
import { Active, Over, useDraggable } from '@dnd-kit/core'
import {
  Direction,
  MenuData,
  getNodeByID,
  getParentNodeByID,
  remove,
} from './utils'
export function DraggableItem({ node }: any) {
  const { id } = node
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id,
    data: {
      unuseful: true,
    },
  })

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      <div
        className={cn(
          'mb-3 flex h-10 items-center rounded-lg bg-yellow-300 px-2'
        )}
      >
        <span className='mr-2 h-4 w-4 cursor-all-scroll'>
          <Icon type='rank' />
        </span>
        {node.label}
      </div>
    </div>
  )
}

export function changeOverData(
  data: MenuData[],
  unuseList: MenuData[],
  active: Active,
  over: Over
) {
  const direction: Direction =
    active.rect.current.translated!.top < over.rect.top + over.rect.height
      ? 'up'
      : 'down'
  const overNode = getNodeByID(data, over.id as string)!
  const activeNode = JSON.parse(
    JSON.stringify(unuseList.find((i) => i.id === active.id)!)
  )
  remove(data, active.id as string)
  // 如果active 在over的上面
  if (direction === 'up') {
    const overParent = getParentNodeByID(data, over.id as string) ?? {
      children: data,
    }
    const overIndex = overParent.children.findIndex(
      (i: any) => i.id === over.id
    )
    // 就比activeNode 插入到over 前面
    overParent.children.splice(overIndex, 0, activeNode)
  }
  // 如果active 在over的下面
  else {
    // 如果over存在子节点
    if (overNode.children.length) {
      // 就比activeNode 插入到over子节点的第一个
      overNode.children.unshift(activeNode)
    } else {
      // 如果over不存在子节点
      const overParent = getParentNodeByID(data, over.id as string) ?? {
        children: data,
      }
      const overIndex = overParent.children.findIndex(
        (i: any) => i.id === over.id
      )
      // 就比activeNode 插入到over 后面
      overParent.children.splice(overIndex + 1, 0, activeNode)
    }
  }
  return data
}
