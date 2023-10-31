import { type MenuData } from '@/types'
export function getDefaultUrl(data: MenuData[]): string | null {
  if (data.length) {
    const target = data[0]
    if (target.linked) {
      return target.url
    }
    if (target.children) {
      const result = getDefaultUrl(target.children)
      if (result) return result
    }
  }
  return null
}

export function getFlatList(
  data: MenuData[],
  result: (MenuData & { parentName: string | null })[] = [],
  parentName: string | null = null
) {
  for (const item of data) {
    result.push({
      id: 0,
      name: item.name,
      url: item.url,
      filePath: item.filePath,
      label: item.label,
      linked: item.linked,
      parentName,
    })
    if (item.children) {
      getFlatList(item.children, result, item.name)
    }
  }
  return result
}
