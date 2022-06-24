import { RefObject, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useSetState } from 'react-use'
import _ from 'lodash'

export default (viewportRef: RefObject<HTMLDivElement>) => {
  const [isSelectVisible, setIsSelectVisible] = useState(false)
  const [selectPosition, setSelectPosition] = useSetState({
    top: 0,
    left: 0,
    width: 0,
    height: 0
  })

  const canvasScale = useSelector(
    (state: RootState) => state.mainStore.canvasScale
  )

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

      const width = Math.abs(offsetWidth)
      const height = Math.abs(offsetHeight)

      setSelectPosition({
        width,
        height
      })

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
    selectPosition,
    updateSelectArea
  }
}
