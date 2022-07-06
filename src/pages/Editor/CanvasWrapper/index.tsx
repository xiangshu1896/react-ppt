import React, { useRef } from 'react'
import SelectArea from './SelectArea'
import Element from './Element'
import Operate from './Operate'
import useViewportSize from './hooks/useViewportSize'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import './index.scss'
import useSelectArea from './hooks/useSelectArea'
import useSelectElement from './hooks/useSelectElement'
import useOperateMain from '@/hooks/useOperateMain'
import useDragElement from './hooks/useDragElement'

const CanvasWrapper = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)

  const canvasScale = useSelector(
    (state: RootState) => state.mainStore.canvasScale
  )

  const slides = useSelector((state: RootState) => state.slidesStore.slides)
  const slideIndex = useSelector(
    (state: RootState) => state.slidesStore.slideIndex
  )
  const selectedElementIdList = useSelector(
    (state: RootState) => state.mainStore.selectedElementIdList
  )

  const elementList = slides[slideIndex].elements

  const { viewportStyles } = useViewportSize(canvasRef)
  const { isSelectVisible, selectQuadrant, selectPosition, updateSelectArea } =
    useSelectArea(elementList, viewportRef)
  const { clearSelectedElementIdList } = useOperateMain()
  const { dragElement } = useDragElement(elementList, canvasScale)
  const { selectElement } = useSelectElement(dragElement)

  const handleCanvasMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // 点击空白区域清空选中元素
    clearSelectedElementIdList()
    // 仅当鼠标左键down时触发
    if (e.button === 0) {
      updateSelectArea(e)
    }
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
        <div className="operates">
          {elementList.map(element => (
            <Operate
              key={element.id}
              element={element}
              isSelected={selectedElementIdList.includes(element.id)}
              isMultiSelected={selectedElementIdList.length > 1}
            />
          ))}
        </div>
        <div
          className="viewport"
          style={{ transform: `scale(${canvasScale})` }}
          ref={viewportRef}
        >
          {isSelectVisible && (
            <SelectArea
              selectPosition={selectPosition}
              selectQuadrant={selectQuadrant}
            />
          )}
          {elementList.map(element => (
            <Element
              element={element}
              key={element.id}
              selectElement={selectElement}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CanvasWrapper
