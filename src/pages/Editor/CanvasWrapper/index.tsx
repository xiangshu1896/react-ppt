import React, { useEffect, useRef } from 'react'
import SelectArea from './SelectArea'
import Element from './Element'
import Operate from './Operate'
import ElementCreateSelection from './ElementCreateSelection'
import useViewportSize from './hooks/useViewportSize'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import './index.scss'
import useSelectArea from './hooks/useSelectArea'
import useInsertElement from './hooks/useInsertElement'
import { PPTElement } from '@/types/slides'

const CanvasWrapper = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)

  const dispatch = useDispatch<Dispatch>()
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
  const creatingElement = useSelector(
    (state: RootState) => state.mainStore.creatingElement
  )

  const { viewportStyles } = useViewportSize(canvasRef)
  const { isSelectVisible, selectPosition, updateSelectArea } =
    useSelectArea(viewportRef)
  const { insertElement } = useInsertElement(viewportRef)

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    // 点击空白区域清空选中元素
    dispatch.mainStore.CLEAR_SELECTED_ELEMENT_ID_LIST()
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
      {creatingElement && (
        <ElementCreateSelection insertElement={insertElement} />
      )}
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
          {slides[slideIndex].elements.map(element => (
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
          {isSelectVisible && <SelectArea selectPosition={selectPosition} />}
          {slides[slideIndex].elements.map(element => (
            <Element element={element} key={element.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CanvasWrapper
