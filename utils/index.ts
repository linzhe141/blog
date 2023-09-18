import type { NavData } from '@/types'
export function getDefaultUrl(data: NavData[]): string | null {
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
