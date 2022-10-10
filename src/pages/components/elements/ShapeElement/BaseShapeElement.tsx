import React from 'react'
import { PPTShapeElement } from '@/types/slides'
import './BaseShapeElement.scss'

interface BaseShapeElementProps {
  element: PPTShapeElement
}

const BaseShapeElement: React.FC<BaseShapeElementProps> = props => {
  const { element } = props

  return (
    <div
      className="base-shape-element"
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

export default BaseShapeElement
