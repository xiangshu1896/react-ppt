import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
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
  const dispatch = useDispatch<Dispatch>()

  const drawText = () => {
    dispatch.mainStore.SET_CREATING_ELEMENT({
      type: 'text'
    })
  }

  const drawShape = () => {
    dispatch.mainStore.SET_CREATING_ELEMENT({
      type: 'shape',
      data: {}
    })
  }

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
        <div className="tool-icon" onClick={drawText}>
          <SvgIcon.Text width="15" height="15" />
        </div>
        <div className="tool-icon" onClick={drawShape}>
          <SvgIcon.Shape width="15" height="15" />
        </div>
      </Space>
    </div>
  )
}

export default AddTool
