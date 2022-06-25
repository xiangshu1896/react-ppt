import { RefObject, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useSetState } from 'react-use'
import { MIN_SELECT_RANGE } from '@/configs/canvas'
import _ from 'lodash'

export default (viewportRef: RefObject<HTMLDivElement>) => {
  const [isSelectVisible, setIsSelectVisible] = useState(false)
  const [selectQuadrant, setSelectQuadrant] = useState(4)
  const [selectPosition, setSelectPosition] = useSetState({
    top: 0,
    left: 0,
    width: 0,
    height: 0
  })

  const canvasScale = useSelector(
    (state: RootState) => state.mainStore.canvasScale
  )

  // mousedown时触发更新选中范围操作
  const updateSelectArea = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!viewportRef.current) {
      return
    }

    let isMouseDown = true
    const viewportRect = viewportRef.current.getBoundingClientRect()

    const startPageX = e.pageX
    const startPageY = e.pageY

    const left = (startPageX - viewportRect.x) / canvasScale
    const top = (startPageY - viewportRect.y) / canvasScale

    // 确定选择框起始位置
    setSelectPosition({
      top,
      left
    })

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

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      isMouseDown = false
      setIsSelectVisible(false)
    }
  }

  return {
    isSelectVisible,
    selectQuadrant,
    selectPosition,
    updateSelectArea
  }
}
