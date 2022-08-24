import React, { useCallback, useMemo } from 'react'
import { PPTTableElement } from '@/types/slides'
import {
  Slate,
  Editable,
  withReact,
  ReactEditor,
  RenderElementProps
} from 'slate-react'
import {
  Editor,
  Range,
  Point,
  Descendant,
  createEditor,
  BaseEditor,
  Element as SlateElement
} from 'slate'
import useSelectElement from '@/pages/Editor/CanvasWrapper/hooks/useSelectElement'
import './index.scss'

type CustomElement = {
  type: 'paragraph' | 'table' | 'table-cell' | 'table-row'
  children: (CustomText | CustomElement)[]
  width?: string
  height?: string
}
type CustomText = { text: string; bold?: true }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

interface TableComponentProps {
  element: PPTTableElement
}

/**
 * 自定义Editor处理方法，禁止跨表格删除text
 */
const withTables = (editor: Editor) => {
  const { deleteBackward, deleteForward } = editor

  editor.deleteBackward = unit => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Editor.nodes(editor, {
        match: n =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === 'table-cell'
      })

      if (cell) {
        const [, cellPath] = cell
        const start = Editor.start(editor, cellPath)

        if (Point.equals(selection.anchor, start)) {
          return
        }
      }
    }

    deleteBackward(unit)
  }

  editor.deleteForward = unit => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Editor.nodes(editor, {
        match: n =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === 'table-cell'
      })

      if (cell) {
        const [, cellPath] = cell
        const end = Editor.end(editor, cellPath)

        if (Point.equals(selection.anchor, end)) {
          return
        }
      }
    }

    deleteForward(unit)
  }

  return editor
}

const initialValue: Descendant[] = [
  {
    type: 'table',
    children: [
      {
        type: 'table-row',
        height: '33.33%',
        children: [
          {
            type: 'table-cell',
            width: '25%',
            children: [{ text: '' }]
          },
          {
            type: 'table-cell',
            width: '25%',
            children: [{ text: '' }]
          },
          {
            type: 'table-cell',
            width: '25%',
            children: [{ text: '' }]
          },
          {
            type: 'table-cell',
            width: '25%',
            children: [{ text: '' }]
          }
        ]
      },
      {
        type: 'table-row',
        height: '33.33%',
        children: [
          {
            type: 'table-cell',
            width: '25%',
            children: [{ text: '' }]
          },
          {
            type: 'table-cell',
            width: '25%',
            children: [{ text: '' }]
          },
          {
            type: 'table-cell',
            width: '25%',
            children: [{ text: '' }]
          },
          {
            type: 'table-cell',
            width: '25%',
            children: [{ text: '' }]
          }
        ]
      },
      {
        type: 'table-row',
        height: '33.33%',
        children: [
          {
            type: 'table-cell',
            width: '25%',
            children: [{ text: '' }]
          },
          {
            type: 'table-cell',
            width: '25%',
            children: [{ text: '' }]
          },
          {
            type: 'table-cell',
            width: '25%',
            children: [{ text: '' }]
          },
          {
            type: 'table-cell',
            width: '25%',
            children: [{ text: '' }]
          }
        ]
      }
    ]
  }
]

const TableComponent: React.FC<TableComponentProps> = props => {
  const { element } = props

  const { selectElement } = useSelectElement()

  const handleTableCellMD = (e: React.MouseEvent) => {
    e.stopPropagation()
    selectElement(e, element)
  }

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
            onMouseDown={handleTableCellMD}
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
  const editor = useMemo(() => withTables(withReact(createEditor())), [])

  return (
    <div
      className="element-table-component"
      style={{
        top: element.top,
        left: element.left,
        width: element.width,
        height: element.height
      }}
    >
      <Slate editor={editor} value={initialValue}>
        <Editable renderElement={renderElement} />
      </Slate>
    </div>
  )
}

export default TableComponent
