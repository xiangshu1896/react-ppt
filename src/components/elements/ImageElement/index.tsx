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
        width: element.width
      }}
    >
      <div className="rotate-wrapper">222</div>
    </div>
  )
}

export default ImageComponent
