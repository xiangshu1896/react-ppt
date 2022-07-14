import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { MIN_MOVE_RANGE, MIN_ELEMENT_SIZE } from '@/configs/canvas'
import { PPTElement } from '@/types/slides'

export default () => {
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [startPageX, setStartPageX] = useState(0)
  const [startPageY, setStartPageY] = useState(0)
  const [resizePos, setResizePos] = useState('')

  const dispatch = useDispatch<Dispatch>()
  const selectedElementIdList = useSelector(
    (state: RootState) => state.mainStore.selectedElementIdList
  )
  const canvasScale = useSelector(
    (state: RootState) => state.mainStore.canvasScale
  )
  const slides = useSelector((state: RootState) => state.slidesStore.slides)
  const slideIndex = useSelector(
    (state: RootState) => state.slidesStore.slideIndex
  )

  const currentElementList = slides[slideIndex].elements

  useEffect(() => {
    if (isMouseDown) {
      document.onmousemove = handleMoveResizeBox
      document.onmouseup = handleUpResizeBox
    }
  }, [isMouseDown])

  const dragResizeBox = (e: React.MouseEvent, pos: string) => {
    setIsMouseDown(true)
    dispatch.mainStore.SET_IS_SCALING(true)
    setResizePos(pos)
    setStartPageX(e.pageX)
    setStartPageY(e.pageY)
  }

  // 根据resizeBox的className和移动的位置，来计算元素resize变化的数值
  const calResizeData = (
    resizePos: string,
    moveX: number,
    moveY: number,
    element: PPTElement,
    isShift: boolean
  ) => {
    let left = element.left,
      top = element.top,
      width = element.width,
      height = element.height

    // 计算变化后的宽高
    switch (resizePos) {
      case 'top-left':
        width = element.width - moveX
        height = element.height - moveY
        break
      case 'top-center':
        height = element.height - moveY
        break
      case 'top-right':
        width = element.width + moveX
        height = element.height - moveY
        break
      case 'center-left':
        width = element.width - moveX
        break
      case 'center-right':
        width = element.width + moveX
        break
      case 'bottom-left':
        width = element.width - moveX
        height = element.height + moveY
        break
      case 'bottom-center':
        height = element.height + moveY
        break
      case 'bottom-right':
        width = element.width + moveX
        height = element.height + moveY
        break
      default:
        break
    }

    // 按住shift等比例缩放
    if (isShift) {
      const scale = element.height / element.width
      const simulateHeight = width * scale
      const simulateWidth = height / scale
      // 位于中间的四个resizeBox不需对比直接根据比例变更，其他四个resizeBox对比后变更
      if (resizePos === 'top-center' || resizePos === 'bottom-center') {
        width = simulateWidth
      } else if (resizePos === 'center-left' || resizePos === 'center-right') {
        height = simulateHeight
      } else {
        if (simulateHeight > height) {
          height = simulateHeight
        } else {
          width = simulateWidth
        }
      }
    }

    // 保证元素的最小宽高
    if (width < MIN_ELEMENT_SIZE) {
      width = MIN_ELEMENT_SIZE
    }
    if (height < MIN_ELEMENT_SIZE) {
      height = MIN_ELEMENT_SIZE
    }

    // 计算宽高变化后元素的top和left
    switch (resizePos) {
      case 'top-left':
        left = element.left - (width - element.width)
        top = element.top - (height - element.height)
        break
      case 'top-center':
        left = element.left - (width - element.width) / 2
        top = element.top - (height - element.height)
        break
      case 'top-right':
        top = element.top - (height - element.height)
        break
      case 'center-left':
        left = element.left - (width - element.width)
        top = element.top - (height - element.height) / 2
        break
      case 'center-right':
        top = element.top - (height - element.height) / 2
        break
      case 'bottom-left':
        left = element.left - (width - element.width)
        break
      default:
        break
    }

    return {
      left,
      top,
      width,
      height
    }
  }

  const handleMoveResizeBox = (e: MouseEvent) => {
    const currentPageX = e.pageX
    const currentPageY = e.pageY

    const isMissOperate =
      Math.abs(startPageX - currentPageX) < MIN_MOVE_RANGE &&
      Math.abs(startPageY - currentPageX) < MIN_MOVE_RANGE

    if (!isMouseDown || isMissOperate) {
      return
    }

    const moveX = (currentPageX - startPageX) / canvasScale
    const moveY = (currentPageY - startPageY) / canvasScale

    const resElementList = currentElementList.map(oriElementItem => {
      if (selectedElementIdList.includes(oriElementItem.id)) {
        const { left, top, width, height } = calResizeData(
          resizePos,
          moveX,
          moveY,
          oriElementItem,
          e.shiftKey
        )

        return Object.assign({}, oriElementItem, {
          left,
          top,
          width,
          height
        })
      } else {
        return oriElementItem
      }
    })

    dispatch.slidesStore.SET_CURRENT_SLIDE_NEW_ELS(resElementList)
  }

  const handleUpResizeBox = () => {
    setIsMouseDown(false)
    dispatch.mainStore.SET_IS_SCALING(false)

    document.onmousemove = null
    document.onmouseup = null
  }

  return {
    dragResizeBox
  }
}
