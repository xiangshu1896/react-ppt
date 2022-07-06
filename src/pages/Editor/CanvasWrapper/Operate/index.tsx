import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { PPTElement, ElementTypes } from '@/types/slides'
import './index.scss'

interface OperateProps {
  element: PPTElement
  isSelected: boolean
  isMultiSelected: boolean
}

const Operate: React.FC<OperateProps> = props => {
  const { element, isSelected, isMultiSelected } = props

  const canvasScale = useSelector(
    (state: RootState) => state.mainStore.canvasScale
  )
  const scaleWidth = element.width * canvasScale
  const scaleHeight = element.height * canvasScale

  return (
    <div
      className="operate"
      style={{
        top: element.top * canvasScale + 'px',
        left: element.left * canvasScale + 'px'
      }}
    >
      {isSelected && (
        <>
          <div
            className="operate-line top"
            style={{
              width: scaleWidth + 'px'
            }}
          ></div>
          <div
            className="operate-line right"
            style={{
              left: scaleWidth + 'px',
              height: element.height * canvasScale + 'px'
            }}
          ></div>
          <div
            className="operate-line bottom"
            style={{
              top: scaleHeight + 'px',
              width: scaleWidth + 'px'
            }}
          ></div>
          <div
            className="operate-line left"
            style={{
              height: element.height * canvasScale + 'px'
            }}
          ></div>
        </>
      )}
    </div>
  )
}

export default Operate
