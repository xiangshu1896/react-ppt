import { RefObject, useEffect, useState, useRef } from 'react'
import { useSetState } from 'react-use'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { MIN_SELECT_RANGE } from '@/configs/canvas'
import { PPTElement } from '@/types/slides'
import { getElementRange } from '@/utils/element'

export default (viewportRef: RefObject<HTMLDivElement>) => {
  const [isSelectVisible, setIsSelectVisible] = useState(false)
  const [selectPosition, setSelectPosition] = useSetState({
    top: 0,
    left: 0,
    width: 0,
    height: 0
  })

  const dispatch = useDispatch<Dispatch>()
  const canvasScale = useSelector(
    (state: RootState) => state.mainStore.canvasScale
  )
  const slides = useSelector((state: RootState) => state.slidesStore.slides)
  const slideIndex = useSelector(
    (state: RootState) => state.slidesStore.slideIndex
  )

  const elementListRef = useRef<PPTElement[]>()
  const canvasScaleRef = useRef<number>()
  const selectPositionRef = useRef<typeof selectPosition>()

  useEffect(() => {
    elementListRef.current = slides[slideIndex].elements
    canvasScaleRef.current = canvasScale
    selectPositionRef.current = selectPosition
  }, [slides, slideIndex, canvasScale, selectPosition])

  // mousedown时触发更新选中范围操作
  const updateSelectArea = (e: React.MouseEvent) => {
    let isMouseDown = true
    const startPos = {
      startPageX: e.pageX,
      startPageY: e.pageY
    }

    setSelectPosition({
      top: 0,
      left: 0,
      width: 0,
      height: 0
    })

    document.onmousemove = (e: MouseEvent) => {
      if (!isMouseDown || !viewportRef.current) {
        return
      }

      const startPageX = startPos.startPageX
      const startPageY = startPos.startPageY
      const currentPageX = e.pageX
      const currentPageY = e.pageY

      const minX = Math.min(startPageX, currentPageX)
      const minY = Math.min(startPageY, currentPageY)
      const width =
        Math.abs(startPageX - currentPageX) / (canvasScaleRef.current || 1)
      const height =
        Math.abs(startPageY - currentPageY) / (canvasScaleRef.current || 1)

      const viewportRect = viewportRef.current.getBoundingClientRect()
      const left = (minX - viewportRect.x) / (canvasScaleRef.current || 1)
      const top = (minY - viewportRect.y) / (canvasScaleRef.current || 1)

      // 需大于最低框选大小范围
      if (width < MIN_SELECT_RANGE || height < MIN_SELECT_RANGE) {
        return
      }

      setSelectPosition({
        left,
        top,
        width,
        height
      })

      setIsSelectVisible(true)
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      isMouseDown = false
      setIsSelectVisible(false)

      const selectPosition = selectPositionRef.current

      if (!selectPosition?.width || !selectPosition?.height) {
        return
      }

      const inRangeElementList: PPTElement[] = []

      elementListRef.current?.forEach(element => {
        const selectPosWidth = selectPosition.width
        const selectPosHeight = selectPosition.height
        const selectPosTop = selectPosition.top
        const selectPosLeft = selectPosition.left

        const { minX, maxX, minY, maxY } = getElementRange(element)

        const isInclude =
          minX > selectPosLeft &&
          maxX < selectPosLeft + selectPosWidth &&
          minY > selectPosTop &&
          maxY < selectPosTop + selectPosHeight

        if (isInclude) {
          inRangeElementList.push(element)
        }
      })

      const inRangeElementIdList = inRangeElementList.map(element => element.id)
      if (inRangeElementIdList.length) {
        dispatch.mainStore.SET_SELECTED_ELEMENT_ID_LIST(inRangeElementIdList)
      }
    }
  }

  return {
    isSelectVisible,
    selectPosition,
    updateSelectArea
  }
}
