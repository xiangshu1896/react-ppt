import React from 'react'
import OperateTool from './OperateTool'
import AddTool from './AddTool'
import { Divider } from 'antd'
import './index.scss'

const Toolbar = () => {
  return (
    <div className="toolbar">
      <OperateTool />
      <Divider type="vertical" />
      <AddTool />
      <Divider type="vertical" />
    </div>
  )
}

export default Toolbar
