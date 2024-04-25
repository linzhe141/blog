import { type MenuData } from '@/types'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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

export function convertMd2Html(mdSource: string) {
  const checkedInput = '<input type="checkbox" disabled checked />'
  const uncheckedInput = '<input type="checkbox" disabled />'
  // 将 [x] 替换为 '<input type="checkbox" disabled checked />'
  mdSource = mdSource.replace(/\[x\]/g, checkedInput)
  // 将 [ ] 替换为 '<input type="checkbox" disabled />'
  mdSource = mdSource.replace(/\[\s\]/g, uncheckedInput)
  // 将 ~~xxx~~ 替换为 '<del>xxx</del>'
  mdSource = mdSource.replace(/~~(.*?)~~/g, '<del>$1</del>')
  return mdSource
}
