'use client'
import Icon from '@/components/icon/Icon'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { useImmer } from 'use-immer'
import { Container } from './Container'
import { changeOverData } from './DraggableItem'
import { UnuseList } from './UnuseList'
import {
  INTERVAL,
  MenuData,
  changeData,
  formatData,
  getBackwardAfterTargetNode,
  getForwardAfterTargetNode,
  getNodeByID,
  getParentNodeByID,
  remove
} from './utils'

export default function App() {
  const [unuseList, setUnuseList] = useImmer<
    Pick<MenuData, 'id' | 'label' | 'children'>[]
  >([])
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
    ] as MenuData[])
  )
  const [activeNode, setActiveNode] = useState<MenuData | null>(null)
  const handleDragStart = ({ active }: DragStartEvent) => {
    if (active.data.current && active.data.current.unuseful) {
      setActiveNode(unuseList.find((i) => i.id === active.id)!)
    } else {
      setActiveNode(getNodeByID(menuData, active.id as string))
      setMenuData((draft) => {
        function foo(data: MenuData[]) {
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
  }
  const handleDragCancel = () => setActiveNode(null)
  const handleDragOver = (e: DragOverEvent) => {
    const { active, over, delta } = e
    console.log('xxxx', over?.id)
    if (!over) {
      return
    }
    if (over.id === 'tree-container' && menuData.length === 0) {
      setMenuData((draft) => {
        if (active.id != over.id) {
          changeOverData(draft, unuseList, active, over)
          const activeNode = JSON.parse(
            JSON.stringify(unuseList.find((i) => i.id === active.id)!)
          )
          draft.push(activeNode)
          formatData(draft)
        }
      })
    }
    if (active.data.current && active.data.current.unuseful) {
      const distanceX = delta.x
      setMenuData((draft) => {
        console.log(active.id, over)
        if (active.id != over.id) {
          changeOverData(draft, unuseList, active, over)
          formatData(draft)
        }
        // 每次垂直方向的拖动 都已经生成了确定后的树了
        // cloneActiveNode 表示 拖动后变化真正位置的active节点也就是目前的蓝色节点
        // const cloneActiveNode = getNodeByID(draft, active.id as string)!

        // const parent = getParentNodeByID(draft, active.id as string) ?? {
        //   children: draft,
        // }
        // const cloneActiveIndex = parent.children.findIndex(
        //   (i) => i.id === active.id
        // )
        // const targetNode = parent.children[cloneActiveIndex - 1]
        // for (let i = 1; i <= cloneActiveNode.backward!; i++) {
        //   if (distanceX > INTERVAL * i) {
        //     remove(draft, active.id as string)
        //     const result = getBackwardAfterTargetNode(targetNode, i)
        //     result.children.push(cloneActiveNode)
        //   }
        // }
        // for (let i = 1; i <= cloneActiveNode.forward!; i++) {
        //   if (distanceX < -INTERVAL * i) {
        //     const { id } = getForwardAfterTargetNode(draft, cloneActiveNode, i)
        //     remove(draft, active.id as string)
        //     const grandParent = getParentNodeByID(draft, id) ?? {
        //       children: draft,
        //     }
        //     const index = grandParent.children.findIndex((i) => i.id === id)
        //     grandParent.children.splice(index + 1, 0, cloneActiveNode)
        //   }
        // }
        // formatData(draft)
      })
    }
  }
  function handleDragEnd({ active, over, delta }: DragEndEvent) {
    if (!over || over.id === 'tree-container') {
      setActiveNode(null)
      return
    }
    if (active.data.current && active.data.current.unuseful) {
      const x = active
    } else {
      const distanceX = delta.x
      setMenuData((draft) => {
        if (active.id != over.id) {
          changeData(draft, active, over)
          formatData(draft)
        }
        // 每次垂直方向的拖动 都已经生成了确定后的树了
        // cloneActiveNode 表示 拖动后变化真正位置的active节点也就是目前的蓝色节点
        const cloneActiveNode = getNodeByID(draft, active.id as string)!

        const parent = getParentNodeByID(draft, active.id as string) ?? {
          children: draft,
        }
        const cloneActiveIndex = parent.children.findIndex(
          (i) => i.id === active.id
        )
        const targetNode = parent.children[cloneActiveIndex - 1]
        for (let i = 1; i <= cloneActiveNode.backward!; i++) {
          if (distanceX > INTERVAL * i) {
            remove(draft, active.id as string)
            const result = getBackwardAfterTargetNode(targetNode, i)
            result.children.push(cloneActiveNode)
          }
        }
        for (let i = 1; i <= cloneActiveNode.forward!; i++) {
          if (distanceX < -INTERVAL * i) {
            const { id } = getForwardAfterTargetNode(draft, cloneActiveNode, i)
            remove(draft, active.id as string)
            const grandParent = getParentNodeByID(draft, id) ?? {
              children: draft,
            }
            const index = grandParent.children.findIndex((i) => i.id === id)
            grandParent.children.splice(index + 1, 0, cloneActiveNode)
          }
        }
        formatData(draft)
      })
      setUnuseList((draft) => {
        const index = draft.findIndex((i) => i.id === active.id)
        if (index > -1) {
          draft.splice(index, 1)
        }
      })
      setActiveNode(null)
    }
  }
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  function onRemove(node: MenuData) {
    console.log(node)
    setMenuData((draft) => {
      remove(draft, node.id)
    })
    setUnuseList((draft) => {
      // draft.push(node)
      function foo(node: MenuData, result: MenuData[] = []) {
        result.push(node)
        if (node.children) {
          node.children.forEach((i) => foo(i, result))
        }
        return result
      }
      const result = foo(node).map((i) => ({
        ...i,
        id: i.id,
        label: i.label,
        children: [],
      }))
      for (const item of result) {
        draft.push(item)
      }
    })
  }

  if (!isMounted) return null
  return (
    <div className='flex justify-between p-20'>
      <DndContext
        id='builder-dnd'
        // modifiers={[restrictToVerticalAxis]}
        // collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragOver={handleDragOver}
        // onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
      >
        <Container menuData={menuData} onRemove={onRemove} />
        {/* <div className='mt-4 rounded-lg border p-4'>
          {unuseList.map((i) => (
            <DraggableItem key={i.id} node={i} />
          ))}
        </div> */}
        <UnuseList unuseList={unuseList} />
        <DragOverlay>
          {activeNode ? (
            <div
              // style={{ marginLeft: INTERVAL * (activeNode.level - 1) + 'px' }}
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
    </div>
  )
}
