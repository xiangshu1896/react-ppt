import * as React from 'react'
import { Slide } from '@/types/slides'
import {
  VIEWPORT_WIDTH,
  VIEWPORT_HEIGHT,
  VIEWPORT_RATIO
} from '@/configs/canvas'
import ScreenElement from './ScreenElement'

interface BaseViewProps {
  slide: Slide
}

const BaseView: React.FC<BaseViewProps> = props => {
  const { slide } = props
  const screenWidth = document.body.clientWidth

  const scale = screenWidth / VIEWPORT_WIDTH

  return (
    <div
      className="base-view"
      style={{
        width: screenWidth + 'px',
        height: screenWidth * VIEWPORT_RATIO + 'px'
      }}
    >
      <div
        className="screen-elements"
        style={{
          width: VIEWPORT_WIDTH + 'px',
          height: VIEWPORT_HEIGHT + 'px',
          transform: `scale(${scale})`
        }}
      >
        {slide.elements.map(element => (
          <ScreenElement element={element} key={element.id} />
        ))}
      </div>
    </div>
  )
}

export default BaseView
