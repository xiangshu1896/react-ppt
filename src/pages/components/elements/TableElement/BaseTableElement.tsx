import React, { useState, useCallback } from 'react'
import { PPTTableElement } from '@/types/slides'
import { Slate, Editable, withReact, RenderElementProps } from 'slate-react'
import { Descendant, createEditor } from 'slate'
import './BaseTableElement.scss'

interface BaseTableElementProps {
  element: PPTTableElement
}

const BaseTableElement: React.FC<BaseTableElementProps> = props => {
  const { element } = props

  const initialValue: Descendant[] = element.content

  const TableElement = ({
    attributes,
    children,
    element
  }: RenderElementProps) => {
    switch (element.type) {
      case 'table':
        return (
          <div className="table-container" {...attributes}>
            {children}
          </div>
        )
      case 'table-row':
        return (
          <div
            className="table-row"
            style={{ height: element.height }}
            {...attributes}
          >
            {children}
          </div>
        )
      case 'table-cell':
        return (
          <div
            className="table-cell"
            style={{ width: element.width }}
            {...attributes}
          >
            {children}
          </div>
        )
      default:
        return <p {...attributes}>{children}</p>
    }
  }

  const renderElement = useCallback(
    (props: RenderElementProps) => <TableElement {...props} />,
    []
  )

  const [editor] = useState(() => withReact(createEditor()))

  // 实时更新富文本数据
  editor.children = element.content

  return (
    <div
      className="base-table-element"
      style={{
        top: element.top,
        left: element.left,
        width: element.width,
        height: element.height
      }}
    >
      <Slate editor={editor} value={initialValue}>
        <Editable renderElement={renderElement} readOnly={true} />
      </Slate>
    </div>
  )
}

export default BaseTableElement
