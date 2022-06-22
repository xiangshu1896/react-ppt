import * as React from 'react'
import SvgIcon from '@/components/SvgIcon'
import { Space } from 'antd'
import './index.scss'

const OperateTool = () => {
  return (
    <div className="operate-tool">
      <Space>
        <div className="tool-icon">
          <SvgIcon.Back width="15" height="15" />
        </div>
        <div className="tool-icon">
          <SvgIcon.Next width="15" height="15" />
        </div>
        <div className="tool-icon">
          <SvgIcon.Brush width="15" height="15" />
        </div>
        <div className="tool-icon">
          <SvgIcon.ClearFormat width="15" height="15" />
        </div>
      </Space>
    </div>
  )
}

export default OperateTool
