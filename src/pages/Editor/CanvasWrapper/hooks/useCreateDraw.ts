import React, { RefObject, useEffect, useRef, useState } from 'react'
import { useSetState } from 'react-use'
import { MIN_SELECT_RANGE } from '@/configs/canvas'
import { DrawPosition } from '@/types/edit'

export default (
  elementCreateRef: RefObject<HTMLDivElement>,
  insertElement: (drawPos: DrawPosition) => void
) => {
  const [isCreateVisible, setIsCreateVisible] = useState(false)
  const [createPos, setCreatePos] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0
  })

  const createPosRef = useRef<typeof createPos>()
  useEffect(() => {
    createPosRef.current = createPos
  }, [createPos])

  // mousedown时记录开始坐标
  const createElementArea = (e: React.MouseEvent) => {
    let isMouseDown = true
    const drawPos = {
      startPageX: e.pageX,
      startPageY: e.pageY,
      endPageX: 0,
      endPageY: 0
    }

    document.onmousemove = (e: MouseEvent) => {
      if (!isMouseDown || !elementCreateRef.current) {
        return
      }

      drawPos.endPageX = e.pageX
      drawPos.endPageY = e.pageY

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

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      isMouseDown = false
      setIsCreateVisible(false)

      if (!createPosRef.current?.width || !createPosRef.current?.height) {
        return
      }

      insertElement(drawPos)
    }
  }

  return {
    createElementArea,
    createPos,
    isCreateVisible
  }
}
