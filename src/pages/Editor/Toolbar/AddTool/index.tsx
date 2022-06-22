import * as React from 'react'
import { Dropdown, Space, Menu } from 'antd'
import SvgIcon from '@/components/SvgIcon'
import './index.scss'

const addMoreMenu = (
  <Menu
    items={[
      {
        key: 'text',
        label: (
          <>
            <SvgIcon.Text width="15" height="15" />
            <div className="dropdown-title">文本框</div>
          </>
        )
      },
      {
        key: 'shape',
        label: (
          <>
            <SvgIcon.Shape width="15" height="15" />
            <div className="dropdown-title">形状</div>
          </>
        )
      },
      {
        key: 'image',
        label: (
          <>
            <SvgIcon.Pic width="15" height="15" />
            <div className="dropdown-title">图片</div>
          </>
        )
      },
      {
        key: 'table',
        label: (
          <>
            <SvgIcon.Table width="15" height="15" />
            <div className="dropdown-title">表格</div>
          </>
        )
      }
    ]}
  />
)

const AddTool = () => {
  return (
    <div className="add-tool">
      <Space>
        <Dropdown
          overlay={addMoreMenu}
          trigger={['click']}
          overlayClassName="add-more-dropdown"
        >
          <div className="add-more">
            <SvgIcon.Add width="15" height="15" />
            插入
          </div>
        </Dropdown>
        <div className="tool-icon">
          <SvgIcon.Text width="15" height="15" />
        </div>
        <div className="tool-icon">
          <SvgIcon.Shape width="15" height="15" />
        </div>
      </Space>
    </div>
  )
}

export default AddTool
