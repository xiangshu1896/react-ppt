import React from 'react'
import { Slide } from '@/types/slides'
import PreviewElement from './PreviewElement'
import {
  VIEWPORT_WIDTH,
  VIEWPORT_RATIO,
  VIEWPORT_HEIGHT
} from '@/configs/canvas'
import './index.scss'

interface PreviewProps {
  slide: Slide
}

const Preview: React.FC<PreviewProps> = props => {
  const { slide } = props

  const scale = 120 / VIEWPORT_WIDTH

  return (
    <div
      className="preview"
      style={{
        width: '120px',
        height: 120 * VIEWPORT_RATIO + 'px'
      }}
    >
      <div
        className="preview-elements"
        style={{
          width: VIEWPORT_WIDTH + 'px',
          height: VIEWPORT_HEIGHT + 'px',
          transform: `scale(${scale})`
        }}
      >
        {slide.elements.map(element => (
          <PreviewElement element={element} key={element.id} />
        ))}
      </div>
    </div>
  )
}

export default Preview
