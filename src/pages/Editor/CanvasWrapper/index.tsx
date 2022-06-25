import React, { useRef } from 'react'
import SelectArea from './SelectArea'
import useViewportSize from './hooks/useViewportSize'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import './index.scss'
import useSelectArea from './hooks/useSelectArea'

const CanvasWrapper = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)

  const dispatch = useDispatch<Dispatch>()
  const canvasScale = useSelector(
    (state: RootState) => state.mainStore.canvasScale
  )

  const { viewportStyles } = useViewportSize(canvasRef)
  const { isSelectVisible, selectQuadrant, selectPosition, updateSelectArea } =
    useSelectArea(viewportRef)

  const handleCanvasMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    updateSelectArea(e)
  }

  return (
    <div
      className="canvas-wrapper"
      ref={canvasRef}
      onMouseDown={handleCanvasMouseDown}
    >
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
        <div
          className="viewport"
          style={{ transform: `scale(${canvasScale})` }}
          ref={viewportRef}
        >
          <div>1111</div>
          {isSelectVisible && (
            <SelectArea
              selectPosition={selectPosition}
              selectQuadrant={selectQuadrant}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default CanvasWrapper
