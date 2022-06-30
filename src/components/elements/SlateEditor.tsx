import React, { useState } from 'react'
import { createEditor, Descendant, BaseEditor } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

interface SlateEditorProps {}

const initialValue: Descendant[] = []

const SlateEditor: React.FC<SlateEditorProps> = () => {
  const [editor] = useState(() => withReact(createEditor()))

  return (
    <div className="slate-editor">
      <Slate editor={editor} value={initialValue}>
        <Editable />
      </Slate>
    </div>
  )
}

export default SlateEditor
