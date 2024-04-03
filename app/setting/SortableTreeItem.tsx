import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/utils'
import {
  Direction,
  INTERVAL,
  changeData,
  formatData,
  getNodeByID,
} from './utils'
import { useEffect, useRef } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import Icon from '@/components/icon/Icon'

export function SortableTreeItem({ node, data, onRemove }: any) {
  const { level, id } = node
  // 用于在拖拽时，直接更新树，并得到更新后的树的相关信息
  const cloneData = useRef(JSON.parse(JSON.stringify(data)))
  useEffect(() => {
    cloneData.current = JSON.parse(JSON.stringify(data))
  }, [data])

  const {
    attributes,
    isDragging,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition,
    active,
    over,
  } = useSortable({ id })
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  }
  const currentPadding = useRef(INTERVAL * (level - 1))

  const paddingLeft = useRef(0)
  if (
    over &&
    over.id !== 'tree-container' &&
    over.id !== 'tree-container' &&
    active &&
    active.rect.current.translated &&
    active.rect.current.initial &&
    active.id === id
  ) {
    const overTop = over.rect.top
    const activeTop = active.rect.current.initial!.top
    const direction: Direction = activeTop >= overTop ? 'up' : 'down'
    if (active.id != over.id) {
      console.log(over.id, direction, cloneData.current)
      cloneData.current = changeData(cloneData.current, active, over)
    } else {
      // 如果又回到原始位置，需要还原对应原始的值
      cloneData.current = JSON.parse(JSON.stringify(data))
    }
    formatData(cloneData.current)
    // cloneActiveNode 表示 拖动后变化真正位置的active节点也就是目前的蓝色节点
    const cloneActiveNode = getNodeByID(cloneData.current, active.id as string)!
    currentPadding.current = INTERVAL * (cloneActiveNode.level! - 1)

    const distanceX =
      active.rect.current.translated.left - active.rect.current.initial.left
    const activeNode = getNodeByID(cloneData.current, active.id as string)!
    for (let i = 0; i <= activeNode.backward!; i++) {
      if (distanceX > INTERVAL * i) {
        paddingLeft.current = INTERVAL * i
      }
    }
    for (let i = 0; i <= activeNode.forward!; i++) {
      if (distanceX < -INTERVAL * i) {
        paddingLeft.current = -INTERVAL * i
      }
    }
  }

  return (
    <>
      <div
        ref={setDroppableNodeRef}
        style={{
          paddingLeft: currentPadding.current + paddingLeft.current + 'px',
        }}
        {...attributes}
      >
        <div
          style={{ ...style }}
          className={cn('mb-3 flex h-10 items-center rounded-lg px-2', {
            'bg-blue-200': isDragging,
            'bg-green-400': !isDragging,
          })}
          ref={setDraggableNodeRef}
        >
          <div className='mr-2 h-4 w-4' {...listeners}>
            <Icon type='rank'></Icon>
          </div>
          <span className='flex-1'>
            {node.label}-level:{node.level}-backward: {node.backward}
            -forward: {node.forward}
          </span>
          <span
            className='cursor-pointer rounded-full transition-all duration-200 hover:rotate-180 hover:bg-green-100'
            onClick={() => {
              onRemove(node)
            }}
          >
            <Icon type='close'></Icon>
          </span>
        </div>
      </div>
      {!node.isDragging &&
        node.children.map((i: any) => (
          <SortableTreeItem
            data={data}
            node={i}
            key={i.id}
            onRemove={onRemove}
          />
        ))}
    </>
  )
}
