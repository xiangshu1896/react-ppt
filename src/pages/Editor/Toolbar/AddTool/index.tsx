import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { Dropdown, Space, Menu, Upload } from 'antd'
import { MenuInfo } from 'rc-menu/lib/interface'
import type { UploadProps } from 'antd'
import { getImageDataUrl } from '@/utils/image'
import SvgIcon from '@/components/SvgIcon'
import useCreateElement from '@/hooks/useCreateElement'
import { ShapeMenuItem, SHAPE_LIST_ITEM } from '@/configs/shape'
import './index.scss'

const AddTool = () => {
  const [isShapeDPVisible, setIsShapeDPVisible] = useState(false)

  const dispatch = useDispatch<Dispatch>()

  const { createImageElement } = useCreateElement()

  const drawText = () => {
    dispatch.mainStore.SET_CREATING_ELEMENT({
      type: 'text'
    })
  }

  const drawShape = (shapeMenuItem: ShapeMenuItem) => {
    dispatch.mainStore.SET_CREATING_ELEMENT({
      type: 'shape',
      data: shapeMenuItem
    })
    setIsShapeDPVisible(false)
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

  const handleShapeDPVisibleChange = (flag: boolean) => {
    setIsShapeDPVisible(flag)
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

  const shapeMenu = (
    <div className="shape-menu">
      {SHAPE_LIST_ITEM.map(shapeListItem => (
        <div
          className="shape-list-item"
          key={shapeListItem.type + 'shape_list'}
        >
          <div className="shape-type">{shapeListItem.type}</div>
          <div className="shape-list">
            {shapeListItem.children.map((shapeMenuItem, shapeMenuIndex) => (
              <div
                className="shape-menu-item"
                key={shapeMenuIndex + 'shape_menu'}
              >
                <div
                  className="shape-content"
                  onClick={() => drawShape(shapeMenuItem)}
                >
                  <svg overflow="visible" width="16" height="16">
                    <g
                      transform={`scale(${16 / shapeMenuItem.viewBox[0]}, ${
                        16 / shapeMenuItem.viewBox[1]
                      }) translate(0,0) matrix(1,0,0,1,0,0)`}
                    >
                      <path
                        className="shape-path"
                        vectorEffect="non-scaling-stroke"
                        strokeLinecap="butt"
                        strokeMiterlimit="8"
                        strokeWidth="1"
                        fill="transparent"
                        stroke="#555"
                        d={shapeMenuItem.path}
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
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
        <Dropdown
          overlay={shapeMenu}
          trigger={['click']}
          onVisibleChange={handleShapeDPVisibleChange}
          visible={isShapeDPVisible}
          overlayClassName="shape-menu-dropdown"
        >
          <div className="tool-icon icon-shape">
            <SvgIcon.Shape width="15" height="15" />
            <SvgIcon.Arrow width="10" height="10" />
          </div>
        </Dropdown>
      </Space>
    </div>
  )
}

export default AddTool
