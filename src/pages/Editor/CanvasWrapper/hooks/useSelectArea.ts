import { RefObject, useEffect, useState } from 'react'
import { useSetState } from 'react-use'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { MIN_SELECT_RANGE } from '@/configs/canvas'
import { PPTElement } from '@/types/slides'
import { getElementRange } from '@/utils/element'

export default (
  elementList: PPTElement[],
  viewportRef: RefObject<HTMLDivElement>
) => {
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [startPos, setStartPos] = useState({
    startPageX: 0,
    startPageY: 0
  })
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

  useEffect(() => {
    if (isMouseDown) {
      // 清空数据，防止mouseup时前一次数据生效
      setSelectPosition({
        top: 0,
        left: 0,
        width: 0,
        height: 0
      })

      document.onmousemove = handleMove
      document.onmouseup = handleUp
    }
  }, [isMouseDown])

  useEffect(() => {
    if (isMouseDown) {
      document.onmouseup = handleUp
    }
  }, [selectPosition])

  // mousedown时触发更新选中范围操作
  const updateSelectArea = (e: React.MouseEvent) => {
    setIsMouseDown(true)

    setStartPos({
      startPageX: e.pageX,
      startPageY: e.pageY
    })
  }

  const handleMove = (e: MouseEvent) => {
    if (!isMouseDown || !viewportRef.current) {
      return
    }

    const startPageX = startPos.startPageX
    const startPageY = startPos.startPageY
    const currentPageX = e.pageX
    const currentPageY = e.pageY

    const minX = Math.min(startPageX, currentPageX)
    const minY = Math.min(startPageY, currentPageY)
    const width = Math.abs(startPageX - currentPageX) / canvasScale
    const height = Math.abs(startPageY - currentPageY) / canvasScale

    const viewportRect = viewportRef.current.getBoundingClientRect()
    const left = (minX - viewportRect.x) / canvasScale
    const top = (minY - viewportRect.y) / canvasScale

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

  const handleUp = () => {
    document.onmousemove = null
    document.onmouseup = null
    setIsMouseDown(false)
    setIsSelectVisible(false)

    if (!selectPosition.width || !selectPosition.height) {
      return
    }

    const inRangeElementList: PPTElement[] = []

    elementList.forEach(element => {
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

  return {
    isSelectVisible,
    selectPosition,
    updateSelectArea
  }
}
