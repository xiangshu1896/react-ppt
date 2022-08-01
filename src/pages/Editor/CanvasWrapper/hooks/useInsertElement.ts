import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { DrawPosition } from '@/types/edit'
import useCreateElement from '@/hooks/useCreateElement'

export default (viewportRef: React.RefObject<HTMLDivElement>) => {
  const { createTextElement, createShapeElement } = useCreateElement()

  const creatingElement = useSelector(
    (state: RootState) => state.mainStore.creatingElement
  )
  const canvasScale = useSelector(
    (state: RootState) => state.mainStore.canvasScale
  )

  const insertElement = (drawPos: DrawPosition) => {
    if (!viewportRef.current) {
      return
    }

    // 计算元素位置
    const minX = Math.min(drawPos.startPageX, drawPos.endPageX)
    const minY = Math.min(drawPos.startPageY, drawPos.endPageY)
    const width = Math.abs(drawPos.startPageX - drawPos.endPageX) / canvasScale
    const height = Math.abs(drawPos.startPageY - drawPos.endPageY) / canvasScale

    const viewportRect = viewportRef.current.getBoundingClientRect()
    const left = (minX - viewportRect.x) / canvasScale
    const top = (minY - viewportRect.y) / canvasScale

    const type = creatingElement?.type
    if (type === 'text') {
      createTextElement({ left, top, width, height }, '新增测试数据')
    }
    if (type === 'shape' && creatingElement?.data) {
      createShapeElement({ left, top, width, height }, creatingElement.data)
    }
  }

  return {
    insertElement
  }
}
