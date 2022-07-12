import React, { RefObject, useEffect, useState } from 'react'
import { useSetState } from 'react-use'
import { MIN_SELECT_RANGE } from '@/configs/canvas'
import { DrawPosition } from '@/types/edit'

export default (
  elementCreateRef: RefObject<HTMLDivElement>,
  insertElement: (drawPos: DrawPosition) => void
) => {
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [drawPos, setDrawPos] = useSetState({
    startPageX: 0,
    startPageY: 0,
    endPageX: 0,
    endPageY: 0
  })
  const [isCreateVisible, setIsCreateVisible] = useState(false)
  const [createPos, setCreatePos] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0
  })

  useEffect(() => {
    if (isMouseDown) {
      // 清空数据，防止mouseup时前一次数据生效
      setCreatePos({
        top: 0,
        left: 0,
        width: 0,
        height: 0
      })

      document.onmousemove = handleCreateMove
      document.onmouseup = handleCreateUp
    }
  }, [isMouseDown])

  useEffect(() => {
    if (isMouseDown) {
      document.onmouseup = handleCreateUp
    }
  }, [createPos])

  // mousedown时记录开始坐标
  const createElementArea = (e: React.MouseEvent) => {
    setIsMouseDown(true)

    setDrawPos({
      startPageX: e.pageX,
      startPageY: e.pageY
    })
  }

  const handleCreateMove = (e: MouseEvent) => {
    if (!isMouseDown || !elementCreateRef.current) {
      return
    }

    setDrawPos({
      endPageX: e.pageX,
      endPageY: e.pageY
    })

    const startPageX = drawPos.startPageX
    const startPageY = drawPos.startPageY
    const currentPageX = e.pageX
    const currentPageY = e.pageY

    const minX = Math.min(startPageX, currentPageX)
    const minY = Math.min(startPageY, currentPageY)
    const width = Math.abs(startPageX - currentPageX)
    const height = Math.abs(startPageY - currentPageY)

    const elementCreateRect = elementCreateRef.current.getBoundingClientRect()
    const left = minX - elementCreateRect.x
    const top = minY - elementCreateRect.y

    // 需大于最低框选大小范围
    if (width < MIN_SELECT_RANGE || height < MIN_SELECT_RANGE) {
      return
    }

    setCreatePos({
      left,
      top,
      width,
      height
    })

    setIsCreateVisible(true)
  }

  const handleCreateUp = () => {
    document.onmousemove = null
    document.onmouseup = null
    setIsMouseDown(false)
    setIsCreateVisible(false)

    if (!createPos.width || !createPos.height) {
      return
    }

    insertElement(drawPos)
  }

  return {
    createElementArea,
    createPos,
    isCreateVisible
  }
}
