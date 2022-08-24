import React, { useState } from 'react'
import { createEditor, Descendant, BaseEditor } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import useSelectElement from '@/pages/Editor/CanvasWrapper/hooks/useSelectElement'
import { PPTTextElement } from '@/types/slides'

interface SlateEditorProps {
  element: PPTTextElement
  value: string
  defaultColor: string
}

const SlateEditor: React.FC<SlateEditorProps> = props => {
  const { element, value, defaultColor } = props

  const initialValue: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: value }]
    }
  ]

  const [editor] = useState(() => withReact(createEditor()))

  const { selectElement } = useSelectElement()

  const handleSlateMD = (e: React.MouseEvent) => {
    e.stopPropagation()
    selectElement(e, element)
  }

  return (
    <div className="slate-editor" onMouseDown={handleSlateMD}>
      <Slate editor={editor} value={initialValue}>
        <Editable />
      </Slate>
    </div>
  )
}

export default SlateEditor
