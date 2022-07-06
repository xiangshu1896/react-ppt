import { RefObject, useEffect, useState } from 'react'
import { useSetState } from 'react-use'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { MIN_SELECT_RANGE } from '@/configs/canvas'
import _ from 'lodash'
import { PPTElement } from '@/types/slides'
import { getElementRange } from '@/utils/element'

export default (
  elementList: PPTElement[],
  viewportRef: RefObject<HTMLDivElement>
) => {
  const [isSelectVisible, setIsSelectVisible] = useState(false)
  const [selectQuadrant, setSelectQuadrant] = useState(4)
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

  let isMouseDown = false

  // mousedown时触发更新选中范围操作
  const updateSelectArea = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!viewportRef.current) {
      return
    }

    isMouseDown = true
    const viewportRect = viewportRef.current.getBoundingClientRect()

    const startPageX = e.pageX
    const startPageY = e.pageY

    const left = (startPageX - viewportRect.x) / canvasScale
    const top = (startPageY - viewportRect.y) / canvasScale

    // 确定选择框起始位置
    setSelectPosition(() => ({
      top,
      left,
      width: 0,
      height: 0
    }))

    setIsSelectVisible(false)

    document.onmousemove = _.throttle((e: MouseEvent) => {
      if (!isMouseDown) {
        return
      }

      const currentPageX = e.pageX
      const currentPageY = e.pageY

      const offsetWidth = (currentPageX - startPageX) / canvasScale
      const offsetHeight = (currentPageY - startPageY) / canvasScale

      // 选择框宽高需要取绝对值
      const width = Math.abs(offsetWidth)
      const height = Math.abs(offsetHeight)

      // 需大于最低框选大小范围
      if (width < MIN_SELECT_RANGE || height < MIN_SELECT_RANGE) {
        return
      }

      // 根据偏移正负值设置框选出现的象限
      let quadrant = 0
      if (offsetWidth > 0 && offsetHeight > 0) {
        quadrant = 4
      }
      if (offsetWidth < 0 && offsetHeight < 0) {
        quadrant = 2
      }
      if (offsetWidth > 0 && offsetHeight < 0) {
        quadrant = 1
      }
      if (offsetWidth < 0 && offsetHeight > 0) {
        quadrant = 3
      }

      setSelectPosition({
        width,
        height
      })

      setSelectQuadrant(quadrant)

      setIsSelectVisible(true)
    }, 10)
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    isMouseDown = false

    const inRangeElementList: PPTElement[] = []

    elementList.forEach(element => {
      const selectPosWidth = selectPosition.width
      const selectPosHeight = selectPosition.height
      const selectPosTop = selectPosition.top
      const selectPosLeft = selectPosition.left

      const { minX, maxX, minY, maxY } = getElementRange(element)

      let isInclude = false
      if (selectQuadrant === 4) {
        isInclude =
          minX > selectPosLeft &&
          maxX < selectPosWidth + selectPosLeft &&
          minY > selectPosTop &&
          maxX < selectPosHeight + selectPosTop
      } else if (selectQuadrant === 1) {
        isInclude =
          minX > selectPosLeft &&
          maxX < selectPosWidth + selectPosLeft &&
          minY > selectPosTop - selectPosHeight &&
          maxY < selectPosTop
      } else if (selectQuadrant === 2) {
        isInclude =
          minX > selectPosLeft - selectPosWidth &&
          maxX < selectPosLeft &&
          minY > selectPosTop - selectPosHeight &&
          maxY < selectPosTop
      } else if (selectQuadrant === 3) {
        isInclude =
          minX > selectPosLeft - selectPosWidth &&
          maxX < selectPosLeft &&
          minY > selectPosTop &&
          maxX < selectPosHeight + selectPosTop
      }

      if (isInclude) {
        inRangeElementList.push(element)
      }
    })

    const inRangeElementIdList = inRangeElementList.map(element => element.id)
    if (inRangeElementIdList.length) {
      dispatch.mainStore.SET_SELECTED_ELEMENT_ID_LIST(inRangeElementIdList)
    }

    setIsSelectVisible(false)
  }

  return {
    isSelectVisible,
    selectQuadrant,
    selectPosition,
    updateSelectArea
  }
}
