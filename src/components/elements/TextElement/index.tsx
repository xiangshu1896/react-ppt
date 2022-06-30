import React from 'react'
import { PPTTextElement } from '@/types/slides'
import ElementOutline from '../ElementOutline'
import SlateEditor from '../SlateEditor'
import './index.scss'

interface TextComponentProps {
  element: PPTTextElement
}

const TextComponent: React.FC<TextComponentProps> = props => {
  const { element } = props
  return (
    <div
      className="element-text-component"
      style={{
        top: element.top,
        left: element.left,
        width: element.width
      }}
    >
      <div className="rotate-wrapper">
        <div
          className="element-content"
          style={{
            color: element.defaultColor
          }}
        >
          <ElementOutline
            width={element.width}
            height={element.height}
            outline={element.outline}
          />
          <SlateEditor />
        </div>
      </div>
    </div>
  )
}

export default TextComponent
