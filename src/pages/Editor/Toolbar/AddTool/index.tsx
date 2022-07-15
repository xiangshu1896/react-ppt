import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { Dropdown, Space, Menu, Upload } from 'antd'
import { MenuInfo } from 'rc-menu/lib/interface'
import type { UploadProps } from 'antd'
import { getImageDataUrl } from '@/utils/image'
import SvgIcon from '@/components/SvgIcon'
import useCreateElement from '@/hooks/useCreateElement'
import './index.scss'

const AddTool = () => {
  const dispatch = useDispatch<Dispatch>()

  const { createImageElement } = useCreateElement()

  const drawText = () => {
    dispatch.mainStore.SET_CREATING_ELEMENT({
      type: 'text'
    })
  }

  const handleMenuClick = (menuInfo: MenuInfo) => {
    if (menuInfo.key === 'text') {
      drawText()
    }
  }

  const uplodProps: UploadProps = {
    accept: 'image/*',
    showUploadList: false,
    beforeUpload(file) {
      getImageDataUrl(file).then(res => createImageElement(res))
      return false
    }
  }

  const addMoreMenu = (
    <Menu
      onClick={handleMenuClick}
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
            <Upload {...uplodProps}>
              <SvgIcon.Pic width="15" height="15" />
              <div className="dropdown-title">图片</div>
            </Upload>
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
        <div className="tool-icon icon-shape">
          <SvgIcon.Shape width="15" height="15" />
          <SvgIcon.Arrow width="10" height="10" />
        </div>
      </Space>
    </div>
  )
}

export default AddTool
