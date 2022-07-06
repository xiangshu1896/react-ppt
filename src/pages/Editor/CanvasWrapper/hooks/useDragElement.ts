import React from 'react'
import { PPTElement } from '@/types/slides'
import { MIN_MOVE_RANGE } from '@/configs/canvas'
import _ from 'lodash'
import useOperateSlide from '@/hooks/useOperateSlide'

export default (currentElementList: PPTElement[], canvasScale: number) => {
  const { setCurrentSlideNewEls } = useOperateSlide()

  const dragElement = (e: React.MouseEvent, element: PPTElement) => {
    let isMouseDown = true

    const startPageX = e.pageX
    const startPageY = e.pageY

    const elOriginLeft = element.left
    const elOriginTop = element.top

    const handleMouseMove = (e: MouseEvent) => {
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

      const targetLeft = elOriginLeft + moveX
      const targetTop = elOriginTop + moveY

      const resElementList = currentElementList.map(oriElementItem => {
        if (oriElementItem.id === element.id) {
          return Object.assign({}, element, {
            left: targetLeft,
            top: targetTop
          })
        } else {
          return oriElementItem
        }
      })

      setCurrentSlideNewEls(resElementList)
    }

    const handleMouseUp = (e: MouseEvent) => {
      isMouseDown = false

      document.onmousemove = null
      document.onmouseup = null
    }

    document.onmousemove = handleMouseMove
    document.onmouseup = handleMouseUp
  }

  return {
    dragElement
  }
}
