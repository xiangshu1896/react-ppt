import React, { useEffect, useState } from 'react'
import { PPTTextElement } from '@/types/slides'
import { createEditor, Descendant } from 'slate'
import { Slate, Editable, withReact } from 'slate-react/dist/index'
import './BaseTextElement.scss'

interface BaseTextElementProps {
  element: PPTTextElement
}

const BaseTextElement: React.FC<BaseTextElementProps> = props => {
  const { element } = props

  const initialValue = element.content

  const [editor] = useState(() => withReact(createEditor()))

  // 实时更新富文本数据
  editor.children = element.content

  return (
    <div
      className="base-text-element"
      style={{
        top: element.top,
        left: element.left,
        width: element.width
      }}
    >
      <div className="rotate-wrapper">
        <div
          className="text-content"
          style={{
            color: element.defaultColor
          }}
        >
          <Slate editor={editor} value={initialValue}>
            <Editable readOnly={true} />
          </Slate>
        </div>
      </div>
    </div>
  )
}

export default BaseTextElement
