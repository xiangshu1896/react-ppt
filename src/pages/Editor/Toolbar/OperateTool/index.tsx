import * as React from 'react'
import SvgIcon from '@/components/SvgIcon'
import { Space } from 'antd'

const OperateTool = () => {
  return (
    <div className="operate-tool">
      <Space size="middle">
        <SvgIcon.Back width="15" height="15" />
        <SvgIcon.Next width="15" height="15" />
        <SvgIcon.Brush width="15" height="15" />
        <SvgIcon.ClearFormat width="15" height="15" />
      </Space>
    </div>
  )
}

export default OperateTool
