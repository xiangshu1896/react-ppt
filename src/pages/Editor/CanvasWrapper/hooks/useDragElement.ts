import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { PPTElement } from '@/types/slides'
import { MIN_MOVE_RANGE } from '@/configs/canvas'
import _ from 'lodash'
import useOperateSlide from '@/hooks/useOperateSlide'

export default () => {
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [startPageX, setStartPageX] = useState(0)
  const [startPageY, setStartPageY] = useState(0)

  const { setCurrentSlideNewEls } = useOperateSlide()
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
      document.onmousemove = handleMoveElement
      document.onmouseup = handleUpElement
    }
  }, [isMouseDown])

  const dragElement = (e: React.MouseEvent) => {
    setIsMouseDown(true)

    setStartPageX(e.pageX)
    setStartPageY(e.pageY)
  }

  const handleMoveElement = (e: MouseEvent) => {
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
        return Object.assign({}, oriElementItem, {
          left: oriElementItem.left + moveX,
          top: oriElementItem.top + moveY
        })
      } else {
        return oriElementItem
      }
    })

    setCurrentSlideNewEls(resElementList)
  }

  const handleUpElement = () => {
    setIsMouseDown(false)

    document.onmousemove = null
    document.onmouseup = null
  }

  return {
    dragElement
  }
}
