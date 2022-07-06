import React from 'react'
import { PPTTextElement } from '@/types/slides'
import ElementOutline from '../ElementOutline'
import SlateEditor from '../SlateEditor'
import './index.scss'

interface TextComponentProps {
  element: PPTTextElement
  selectElement: (
    e: React.MouseEvent<Element, MouseEvent>,
    element: PPTTextElement,
    startMove?: boolean
  ) => void
}

const TextComponent: React.FC<TextComponentProps> = props => {
  const { element, selectElement } = props

  const handleElementTextComMD = (e: React.MouseEvent) => {
    e.stopPropagation()
    selectElement(e, element, true)
  }

  return (
    <div
      className="element-text-component"
      style={{
        top: element.top,
        left: element.left,
        width: element.width
      }}
      onMouseDown={handleElementTextComMD}
    >
      <div className="rotate-wrapper">
        <div
          className="text-content"
          style={{
            color: element.defaultColor
          }}
        >
          <ElementOutline
            width={element.width}
            height={element.height}
            outline={element.outline}
          />
          {/* 集成富文本 */}
          <SlateEditor
            element={element}
            value={element.content}
            defaultColor={element.defaultColor}
            selectElement={selectElement}
          />
        </div>
      </div>
    </div>
  )
}

export default TextComponent
