import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { DrawPosition } from '@/types/edit'
import useCreateElement from '@/hooks/useCreateElement'
import { useEffect, useRef } from 'react'
import { CreatingElement } from '@/types/edit'

export default (viewportRef: React.RefObject<HTMLDivElement>) => {
  const { createTextElement, createShapeElement } = useCreateElement()

  const creatingElement = useSelector(
    (state: RootState) => state.mainStore.creatingElement
  )
  const canvasScale = useSelector(
    (state: RootState) => state.mainStore.canvasScale
  )

  const creatingElementRef = useRef<CreatingElement | null>()
  const canvasScaleRef = useRef<number>()

  useEffect(() => {
    creatingElementRef.current = creatingElement
    canvasScaleRef.current = canvasScale
  }, [creatingElement, canvasScale])

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
    const left = (minX - viewportRect.x) / canvasScaleRef.current!
    const top = (minY - viewportRect.y) / canvasScaleRef.current!

    const type = creatingElementRef.current?.type
    if (type === 'text') {
      createTextElement({ left, top, width, height }, '新增测试数据')
    }
    if (type === 'shape' && creatingElementRef.current?.data) {
      createShapeElement(
        { left, top, width, height },
        creatingElementRef.current.data
      )
    }
  }

  return {
    insertElement
  }
}
