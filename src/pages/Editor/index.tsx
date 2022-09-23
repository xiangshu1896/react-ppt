import React from 'react'
import EditorHeader from './EditorHeader'
import Toolbar from './Toolbar'
import LeftBar from './LeftBar'
import CanvasWrapper from './CanvasWrapper'
import useGlobalEvent from '../../hooks/useGlobalEvent'
import './index.scss'

const Editor = () => {
  useGlobalEvent()

  return (
    <div className="ppt-editor">
      <EditorHeader />
      <Toolbar />
      <div className="editor-content">
        <LeftBar />
        <CanvasWrapper />
      </div>
    </div>
  )
}

export default Editor
