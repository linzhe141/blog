'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useImmer } from 'use-immer'
import {
  DndContext,
  closestCenter,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  DragMoveEvent,
  Active,
  Over,
} from '@dnd-kit/core'
import {
  AnimateLayoutChanges,
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers'
import Icon from '@/components/icon/Icon'
function formatData(data: any[]) {
  const stack: any[] = []
  function foo(data: any[], level = 1) {
    data.forEach((i, index) => {
      i.isDragging = false
      i.level = level
      i.isLastChild = index === data.length - 1
      i.forward = 0
      if (stack.length) {
        const prev = stack[stack.length - 1]
        i.backward = prev.level - i.level + 1
      } else {
        i.backward = 0
      }
      stack.push(i)
      i.children = i.children ?? []
      if (i.children && i.children.length) {
        foo(i.children, level + 1)
      }
    })
    return data
  }
  const result = foo(data)
  for (let i = 0; i < stack.length - 1; i++) {
    const item = stack[i]
    if (item.isLastChild) {
      for (let j = i + 1; j < stack.length; j++) {
        const next = stack[j]
        if (next.level < item.level) {
          item.forward = item.level - next.level
          break
        }
      }
    }
  }
  return result
}

export default function App() {
  const [menuData, setMenuData] = useImmer(
    formatData([
      { id: '1', label: 'test1' },
      {
        id: '3',
        label: 'test3',
        children: [
          {
            id: '3-1',
            label: 'test3-1',
            children: [
              { id: '3-1-1', label: 'test3-1-1' },
              { id: '3-1-2', label: 'test3-1-2' },
            ],
          },
          { id: '3-2', label: 'test3-2' },
          {
            id: '3-3',
            label: 'test3-3',
            children: [{ id: '3-3-1', label: 'test3-3-1' }],
          },
        ],
      },
      { id: '4', label: 'test4' },
    ])
  )
  const [activeNode, setActiveNode] = useState<any>(null)
  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveNode(getNodeByID(menuData, active.id as string))
    setMenuData((draft) => {
      function foo(data: any[]) {
        for (const item of data) {
          item.isDragging = item.id === active.id
          if (item.children && item.children.length) {
            foo(item.children)
          }
        }
      }
      foo(draft)
    })
  }
  const handleDragCancel = () => setActiveNode(null)
  const [offsetLeft, setOffsetLeft] = useState(0)
  function handleDragMove({ delta, active, over }: DragMoveEvent) {}
  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id
    if (!overId) {
      return
    }
    // setMenuData((draft) => {
    //   remove(draft, active.id as string)
    // })
  }

  function handleDragEnd({ active, over, delta }: DragEndEvent) {
    if (!over || over.id === 'tree-container') {
      setActiveNode(null)
      return
    }
    const distanceX = delta.x
    const overTop = over.rect.top
    const activeTop = active.rect.current.initial!.top
    const direction: Direction = activeTop >= overTop ? 'up' : 'down'
    setMenuData((draft) => {
      if (active.id != over.id) {
        console.log(over.id, direction)
        changeData(draft, active, over)
        // cloneActiveNode 表示 拖动后变化真正位置的active节点也就是目前的蓝色节点
      }
      for (let i = 0; i <= activeNode.backward; i++) {
        if (distanceX > 20 * i) {
          // paddingLeft.current = 20 * i
        }
      }
      for (let i = 0; i <= activeNode.forward; i++) {
        if (distanceX < -20 * i) {
          // paddingLeft.current = -20 * i
        }
      }
    })
    // const overNode = getNodeByID(menuData, over.id as string)
    // for (let i = 1; i <= overNode.backward; i++) {
    //   if (distanceX > 20 * i) {
    //     setMenuData((draft) => {
    //       const activeNode = getNodeByID(draft, active.id as string)
    //       let parent = getParentNodeByID(draft, over.id as string) || {
    //         children: draft,
    //       }
    //       const targetIndex =
    //         parent.children.findIndex((i: any) => i.id === over.id) - 1
    //       const targetNode = parent.children[targetIndex]
    //       remove(draft, active.id as string)
    //       targetNode.children.push(activeNode)
    //       formatData(draft)
    //     })
    //   }
    // }
    setActiveNode(null)
    setMenuData((draft) => {
      formatData(draft)
    })
  }
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null
  return (
    <DndContext
      id='builder-dnd'
      // modifiers={[restrictToVerticalAxis]}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
    >
      <div className='mx-4 mt-4 w-1/4'>
        {/* <Container
          id='tree-container'
          items={getIds(menuData)}
          data={menuData}
        /> */}
        <SortableContext
          id='tree-container'
          items={getIds(menuData)}
          strategy={verticalListSortingStrategy}
        >
          {menuData.map((i) => (
            <SortableTreeItem data={menuData} node={i} key={i.id} />
          ))}
        </SortableContext>
      </div>
      <DragOverlay>
        {activeNode ? (
          <div
            // style={{ marginLeft: 20 * (activeNode.level - 1) + 'px' }}
            className='mb-1 flex h-10 w-60 items-center rounded-lg border-2 border-dashed border-green-400 bg-green-200 px-2 opacity-70'
          >
            <span className='mr-2 h-4 w-4 cursor-all-scroll'>
              <Icon type='rank' />
            </span>
            <span>{activeNode.label}</span>
          </div>
        ) : // <div>xxx</div>
        null}
      </DragOverlay>
    </DndContext>
  )
}
function getIds(data: any[], result = []) {
  for (const item of data) {
    // @ts-expect-error
    result.push(item.id)
    if (item.children && item.children.length) {
      getIds(item.children, result)
    }
  }
  return result
}
function remove(data: any[], id: string) {
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (item.id === id) {
      data.splice(i, 1)
    }
    if (item.children && item.children.length) {
      remove(item.children, id)
    }
  }
}
function getNodeByID(data: any[], id: string): any | null {
  for (const item of data) {
    if (item.id === id) {
      return item
    }
    if (item.children && item.children.length) {
      const target = getNodeByID(item.children, id)
      if (target) {
        return target
      }
    }
  }
  return null
}
type Direction = 'up' | 'down'
function insert(direction: Direction, data: any[], id: string, value: any) {
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (item.id === id) {
      const index = direction === 'up' ? 0 : 1
      data.splice(i + index, 0, value)
      return
    }
    if (item.children && item.children.length) {
      insert(direction, item.children, id, value)
    }
  }
}

function getParentNodeByID(data: any[], id: string): any | null {
  for (const item of data) {
    if (item.children && item.children.length) {
      if (item.children.find((i: any) => i.id === id)) {
        return item
      }
      const target = getParentNodeByID(item.children, id)
      if (target) {
        return target
      }
    }
  }
  return null
}

import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/utils'
const animateLayoutChanges: AnimateLayoutChanges = ({
  isSorting,
  wasDragging,
}) => (isSorting || wasDragging ? false : true)
function SortableTreeItem({ node, data }: any) {
  const { level, id } = node
  // 用于在拖拽时，直接更新树，并得到更新后的树的相关信息
  const cloneData = useRef(JSON.parse(JSON.stringify(data)))
  useEffect(() => {
    cloneData.current = JSON.parse(JSON.stringify(data))
  }, [data])

  const {
    attributes,
    isDragging,
    isSorting,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition,
    active,
    over,
  } = useSortable({
    id,
    animateLayoutChanges,
  })
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  }
  const currentPadding = useRef(20 * (level - 1))

  const paddingLeft = useRef(0)
  if (
    over &&
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
      // cloneActiveNode 表示 拖动后变化真正位置的active节点也就是目前的蓝色节点
      const cloneActiveNode = getNodeByID(
        cloneData.current,
        active.id as string
      )
      currentPadding.current = 20 * (cloneActiveNode.level - 1)
    } else {
      currentPadding.current = 20 * (level - 1)
    }

    const distanceX =
      active.rect.current.translated.left - active.rect.current.initial.left
    const activeNode = getNodeByID(cloneData.current, active.id as string)
    for (let i = 0; i <= activeNode.backward; i++) {
      if (distanceX > 20 * i) {
        paddingLeft.current = 20 * i
      }
    }
    for (let i = 0; i <= activeNode.forward; i++) {
      if (distanceX < -20 * i) {
        paddingLeft.current = -20 * i
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
      >
        <div
          style={{ ...style }}
          className={cn('mb-3 flex h-10 items-center rounded-lg px-2', {
            'bg-blue-200': isDragging,
            'bg-green-400': !isDragging,
          })}
          ref={setDraggableNodeRef}
        >
          <div className='mr-2 h-4 w-4' {...attributes} {...listeners}>
            <Icon type='rank'></Icon>
          </div>
          <span>
            {node.label}-level:{node.level}-backward: {node.backward}
            -forward: {node.forward}
          </span>
        </div>
      </div>
      {!node.isDragging &&
        node.children.map((i: any) => (
          <SortableTreeItem data={data} node={i} key={i.id} />
        ))}
    </>
  )
}

// active != over
function changeData(data: any, active: Active, over: Over) {
  const overTop = over.rect.top
  const activeTop = active.rect.current.initial!.top
  const direction: Direction = activeTop >= overTop ? 'up' : 'down'
  const overNode = getNodeByID(data, over.id as string)
  const activeNode = getNodeByID(data, active.id as string)
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
  formatData(data)
  return data
}
