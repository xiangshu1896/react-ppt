import React from 'react'
import { PPTElementOutline } from '@/types/slides'

interface ElementOutlineProps {
  width?: number
  height?: number
  outline?: PPTElementOutline
}

const ElementOutline: React.FC<ElementOutlineProps> = props => {
  const { width, height, outline } = props

  const outlineColor = outline?.color || '#d14424'
  const outlineStyle = outline?.style || 'solid'
  const outlineWidth = outline?.width || 0

  return (
    <>
      {outline && (
        <svg className="element-outline" width={width} height={height}>
          <path
            vector-effect="non-scaling-stroke"
            stroke-linecap="butt"
            stroke-miterlimit="8"
            fill="transparent"
            d={`M0,0 L${width},0 L${width},${height} L0,${height} Z`}
            stroke={outlineColor}
            strokeWidth={outlineWidth}
            strokeDasharray={outlineStyle}
          ></path>
        </svg>
      )}
    </>
  )
}

export default ElementOutline
