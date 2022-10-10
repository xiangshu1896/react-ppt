import React, { useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { PPTTableElement, CustomElement, CustomText } from '@/types/slides'
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

const TableComponent: React.FC<TableComponentProps> = props => {
  const { element } = props

  const dispatch = useDispatch<Dispatch>()

  const { selectElement } = useSelectElement()
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
  const editor = useMemo(() => withTables(withReact(createEditor())), [])

  const handleTableComponentMD = (e: React.MouseEvent) => {
    e.stopPropagation()
    selectElement(e, element)
  }

  const handleSlateChange = (value: Descendant[]) => {
    dispatch.slidesStore.UPDATE_ELEMENT(element.id, {
      content: value
    })
  }

  return (
    <div
      className="element-table-component"
      style={{
        top: element.top,
        left: element.left,
        width: element.width,
        height: element.height
      }}
      onMouseDown={handleTableComponentMD}
      onKeyDown={e => e.stopPropagation()}
    >
      <Slate editor={editor} value={initialValue} onChange={handleSlateChange}>
        <Editable renderElement={renderElement} />
      </Slate>
    </div>
  )
}

export default TableComponent
