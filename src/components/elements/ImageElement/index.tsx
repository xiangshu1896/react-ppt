import React from 'react'
import { PPTImageElement } from '@/types/slides'
import './index.scss'

interface ImageComponentProps {
  element: PPTImageElement
}

const ImageComponent: React.FC<ImageComponentProps> = props => {
  const { element } = props
  return (
    <div
      className="element-image-component"
      style={{
        top: element.top,
        left: element.left,
        width: element.width,
        height: element.height
      }}
    >
      <div className="rotate-wrapper">
        <img className="image-self" src={element.url} />
      </div>
    </div>
  )
}

export default ImageComponent
