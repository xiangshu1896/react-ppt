import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { PPTElement, Slide } from '@/types/slides'
import { MIN_MOVE_RANGE } from '@/configs/canvas'
import _ from 'lodash'

export default () => {
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

  // 记录最新数据，保证数据为最新值
  const selectedElementIdListRef = useRef<string[]>()
  const canvasScaleRef = useRef<number>()
  const slidesRef = useRef<Slide[]>()
  const slideIndexRef = useRef<number>()
  const currentElementListRef = useRef<PPTElement[]>()

  useEffect(() => {
    selectedElementIdListRef.current = selectedElementIdList
    canvasScaleRef.current = canvasScale
    slidesRef.current = slides
    slideIndexRef.current = slideIndex
    currentElementListRef.current = slides[slideIndex].elements
  }, [selectedElementIdList, canvasScale, slides, slideIndex])

  const dragElement = (e: React.MouseEvent) => {
    let isMouseDown = false
    let startPageX = 0
    let startPageY = 0

    isMouseDown = true
    startPageX = e.pageX
    startPageY = e.pageY

    // 记录原始数据
    const currentElementListOrigin = _.cloneDeep(currentElementListRef.current)

    document.onmousemove = (e: MouseEvent) => {
      const currentPageX = e.pageX
      const currentPageY = e.pageY

      const isMissOperate =
        Math.abs(startPageX - currentPageX) < MIN_MOVE_RANGE &&
        Math.abs(startPageY - currentPageX) < MIN_MOVE_RANGE

      if (!isMouseDown || isMissOperate) {
        return
      }

      const moveX = (currentPageX - startPageX) / (canvasScaleRef.current || 1)
      const moveY = (currentPageY - startPageY) / (canvasScaleRef.current || 1)

      const resElementList = currentElementListOrigin?.map(oriElementItem => {
        if (selectedElementIdListRef.current?.includes(oriElementItem.id)) {
          return Object.assign({}, oriElementItem, {
            left: oriElementItem.left + moveX,
            top: oriElementItem.top + moveY
          })
        } else {
          return oriElementItem
        }
      })

      resElementList &&
        dispatch.slidesStore.SET_CURRENT_SLIDE_NEW_ELS(resElementList)
    }

    document.onmouseup = () => {
      isMouseDown = false

      document.onmousemove = null
      document.onmouseup = null
    }
  }

  return {
    dragElement
  }
}
