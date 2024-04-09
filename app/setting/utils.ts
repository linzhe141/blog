import { Active, Over } from '@dnd-kit/core'
export type MenuData = {
  id: string
  label: string
  isDragging?: boolean
  level?: number
  isLastChild?: boolean
  parentId?: string | null
  forward?: number
  backward?: number
  children: MenuData[]
}
export type Direction = 'up' | 'down'
export const INTERVAL = 20 as const
// active != over
export function changeData(data: MenuData[], active: Active, over: Over) {
  const overTop = over.rect.top
  const activeTop = active.rect.current.initial!.top
  const direction: Direction = activeTop >= overTop ? 'up' : 'down'
  const overNode = getNodeByID(data, over.id as string)!
  const activeNode = getNodeByID(data, active.id as string)!
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

export function formatData(data: MenuData[]) {
  const stack: MenuData[] = []
  function foo(data: MenuData[], level = 1, parentId: string | null = null) {
    data.forEach((i, index) => {
      i.isDragging = false
      i.level = level
      i.isLastChild = index === data.length - 1
      i.forward = 0
      i.parentId = parentId
      if (stack.length) {
        const prev = stack[stack.length - 1]
        i.backward = prev.level! - i.level + 1
      } else {
        i.backward = 0
      }
      stack.push(i)
      i.children = i.children ?? []
      if (i.children && i.children.length) {
        foo(i.children, level + 1, i.id)
      }
    })
    return data
  }
  const result = foo(data)
  for (let i = 0; i < stack.length; i++) {
    const item = stack[i]
    if (item.isLastChild) {
      let isEnd = false
      for (let j = i + 1; j < stack.length; j++) {
        const next = stack[j]
        if (next.level! < item.level!) {
          item.forward = item.level! - next.level!
          break
        }
        if (j === stack.length - 1) {
          isEnd = true
        }
      }
      if (isEnd || i === stack.length - 1) {
        item.forward = item.level! - 1
      }
    }
  }
  return result
}

export function getIds(data: MenuData[], result: string[] = []) {
  for (const item of data) {
    result.push(item.id)
    if (item.children && item.children.length) {
      getIds(item.children, result)
    }
  }
  return result
}
export function remove(data: MenuData[], id: string) {
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
export function getNodeByID(data: MenuData[], id: string): MenuData | null {
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

export function getParentNodeByID(
  data: MenuData[],
  id: string
): MenuData | null {
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

export function getBackwardAfterTargetNode(
  targetNode: MenuData,
  backwardLevel: number
) {
  let result = null
  let current = targetNode
  while (backwardLevel) {
    if (backwardLevel > 1) {
      current = current.children[current.children.length - 1]
    }
    result = current
    backwardLevel--
  }
  return result!
}
export function getForwardAfterTargetNode(
  data: MenuData[],
  targetNode: MenuData,
  forwardLevel: number
) {
  let current = targetNode
  while (forwardLevel) {
    const parent = getNodeByID(data, current.parentId!)!
    current = parent
    forwardLevel--
  }

  return current
}
