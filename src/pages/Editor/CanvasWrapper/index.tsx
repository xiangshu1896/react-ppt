import React, { useRef } from 'react'
import useViewportSize from './hooks/useViewportSize'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import './index.scss'

const CanvasWrapper = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const { viewportStyles } = useViewportSize(canvasRef)
  const dispatch = useDispatch<Dispatch>()
  const canvasScale = useSelector(
    (state: RootState) => state.mainStore.canvasScale
  )

  return (
    <div className="canvas-wrapper" ref={canvasRef}>
      <div
        className="viewport-wrapper"
        style={{
          width: viewportStyles.width * canvasScale + 'px',
          height: viewportStyles.height * canvasScale + 'px',
          left: viewportStyles.left + 'px',
          top: viewportStyles.top + 'px'
        }}
      >
        <div className="operates"></div>
        <div className="viewport"></div>
      </div>
    </div>
  )
}

export default CanvasWrapper
