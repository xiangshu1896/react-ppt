import { PPTElement } from '@/types/slides'

/**
 * 计算元素在画布中的位置信息
 */
export const getElementRange = (element: PPTElement) => {
  const minX = element.left
  const maxX = element.width + element.left
  const minY = element.top
  const maxY = element.height + element.top

  return {
    minX,
    maxX,
    minY,
    maxY
  }
}
