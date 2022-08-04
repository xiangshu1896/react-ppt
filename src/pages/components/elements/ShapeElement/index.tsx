import React from 'react'
import { PPTShapeElement } from '@/types/slides'
import './index.scss'
interface ShapeComponentProps {
  element: PPTShapeElement
}

const ShapeComponent: React.FC<ShapeComponentProps> = props => {
  const { element } = props

  return (
    <div
      className="element-shape-component"
      style={{
        top: element.top,
        left: element.left,
        width: element.width,
        height: element.height
      }}
    >
      <div className="rotate-wrapper">
        <div className="shape-content">
          <svg overflow="visible" width={element.width} height={element.height}>
            <g
              transform={`scale(${element.width / element.viewBox[0]}, ${
                element.height / element.viewBox[1]
              })`}
            >
              <path
                className="shape-path"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="butt"
                strokeMiterlimit="8"
                d={element.path}
                fill={element.fill}
                stroke={element.outlineColor}
                strokeWidth="1"
              ></path>
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default ShapeComponent
