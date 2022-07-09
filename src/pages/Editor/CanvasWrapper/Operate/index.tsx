import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { PPTElement, ElementTypes } from '@/types/slides'
import './index.scss'
import useResizeElement from '../hooks/useResizeElement'

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
  const scaleTop = element.top * canvasScale
  const scaleLeft = element.left * canvasScale
  const scaleWidth = element.width * canvasScale
  const scaleHeight = element.height * canvasScale

  const operateLines = [
    {
      className: 'top',
      style: { width: scaleWidth + 'px' }
    },
    {
      className: 'right',
      style: { left: scaleWidth + 'px', height: scaleHeight + 'px' }
    },
    {
      className: 'bottom',
      style: { top: scaleHeight + 'px', width: scaleWidth + 'px' }
    },
    {
      className: 'left',
      style: { height: scaleHeight + 'px' }
    }
  ]

  const resizeBoxes = [
    {
      className: 'top-left',
      style: {
        top: '-4px',
        left: '-4px',
        cursor: 'nwse-resize'
      }
    },
    {
      className: 'top-center',
      style: {
        top: '-4px',
        left: scaleWidth / 2 - 4 + 'px',
        cursor: 'ns-resize'
      }
    },
    {
      className: 'top-right',
      style: {
        top: '-4px',
        left: scaleWidth - 4 + 'px',
        cursor: 'nesw-resize'
      }
    },
    {
      className: 'center-left',
      style: {
        top: scaleHeight / 2 - 4 + 'px',
        left: '-4px',
        cursor: 'ew-resize'
      }
    },
    {
      className: 'center-right',
      style: {
        top: scaleHeight / 2 - 4 + 'px',
        left: scaleWidth - 4 + 'px',
        cursor: 'ew-resize'
      }
    },
    {
      className: 'bottom-left',
      style: {
        top: scaleHeight - 4 + 'px',
        left: '-4px',
        cursor: 'nesw-resize'
      }
    },
    {
      className: 'bottom-center',
      style: {
        top: scaleHeight - 4 + 'px',
        left: scaleWidth / 2 - 4 + 'px',
        cursor: 'ns-resize'
      }
    },
    {
      className: 'bottom-right',
      style: {
        top: scaleHeight - 4 + 'px',
        left: scaleWidth - 4 + 'px',
        cursor: 'nwse-resize'
      }
    }
  ]

  const { dragResizeBox } = useResizeElement()

  const handleResizeBoxItemMD = (e: React.MouseEvent, pos: string) => {
    e.stopPropagation()
    dragResizeBox(e, pos)
  }

  return (
    <div
      className="operate"
      style={{
        top: scaleTop + 'px',
        left: scaleLeft + 'px'
      }}
    >
      {isSelected && (
        <>
          <div className="line">
            {operateLines.map(line => (
              <div
                className={`operate-line ${line.className}`}
                key={line.className + 'operate-line'}
                style={line.style}
              ></div>
            ))}
          </div>
          <div className="resize-box">
            {resizeBoxes.map(box => (
              <div
                className={`resize-box-item ${box.className}`}
                key={box.className + 'resize-box'}
                style={box.style}
                onMouseDown={e => handleResizeBoxItemMD(e, box.className)}
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Operate
