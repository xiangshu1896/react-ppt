import React from 'react'
import './index.scss'

interface ElementCreateSelectionProps {}

const ElementCreateSelection = (props: ElementCreateSelectionProps) => {
  const handleCreateSelMD = (e: React.MouseEvent) => {
    e.stopPropagation()
  }
  return (
    <div className="element-create-selection" onMouseDown={handleCreateSelMD}>
      <div className="create-sele"></div>
    </div>
  )
}

export default ElementCreateSelection
