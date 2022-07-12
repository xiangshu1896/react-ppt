import React, { useRef } from 'react'
import './index.scss'
import useCreateDraw from '../hooks/useCreateDraw'
import { DrawPosition } from '@/types/edit'

interface ElementCreateSelectionProps {
  insertElement: (drawPos: DrawPosition) => void
}

const ElementCreateSelection = (props: ElementCreateSelectionProps) => {
  const { insertElement } = props

  const elementCreateRef = useRef<HTMLDivElement>(null)

  const { createElementArea, createPos, isCreateVisible } = useCreateDraw(
    elementCreateRef,
    insertElement
  )

  const handleCreateSelMD = (e: React.MouseEvent) => {
    e.stopPropagation()
    createElementArea(e)
  }
  return (
    <div
      className="element-create-selection"
      onMouseDown={handleCreateSelMD}
      ref={elementCreateRef}
    >
      {isCreateVisible && <div className="selection" style={createPos}></div>}
    </div>
  )
}

export default ElementCreateSelection
