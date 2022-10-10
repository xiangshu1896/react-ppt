import React from 'react'
import { PPTImageElement } from '@/types/slides'
import './BaseImageElement.scss'

interface BaseImageElementProps {
  element: PPTImageElement
}

const BaseImageElement: React.FC<BaseImageElementProps> = props => {
  const { element } = props

  return (
    <div
      className="base-image-element"
      style={{
        top: element.top,
        left: element.left,
        width: element.width,
        height: element.height
      }}
    >
      <div className="rotate-wrapper">
        <img className="image-self" src={element.url} draggable={false} />
      </div>
    </div>
  )
}

export default BaseImageElement
