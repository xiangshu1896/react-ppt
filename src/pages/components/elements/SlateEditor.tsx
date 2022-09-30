import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { createEditor, Descendant, BaseEditor } from 'slate'
import {
  Slate,
  Editable,
  withReact,
  ReactEditor,
  DefaultElement
} from 'slate-react'
import useSelectElement from '@/pages/Editor/CanvasWrapper/hooks/useSelectElement'
import { PPTTextElement } from '@/types/slides'

interface SlateEditorProps {
  element: PPTTextElement
  defaultColor: string
}

const SlateEditor: React.FC<SlateEditorProps> = props => {
  const { element, defaultColor } = props

  const dispatch = useDispatch<Dispatch>()

  const initialValue: Descendant[] = element.content

  const [editor] = useState(() => withReact(createEditor()))

  const { selectElement } = useSelectElement()

  const handleSlateMD = (e: React.MouseEvent) => {
    e.stopPropagation()
    selectElement(e, element)
  }

  const handleSlateChange = (value: Descendant[]) => {
    dispatch.slidesStore.UPDATE_ELEMENT(element.id, {
      content: value
    })
  }

  return (
    <div className="slate-editor" onMouseDown={handleSlateMD}>
      <Slate editor={editor} value={initialValue} onChange={handleSlateChange}>
        <Editable />
      </Slate>
    </div>
  )
}

export default SlateEditor
