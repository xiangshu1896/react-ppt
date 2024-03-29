import React, { ReactNode, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@/store'
import { Dropdown, Space, Menu, Upload, Modal, Form, InputNumber } from 'antd'
import { MenuInfo } from 'rc-menu/lib/interface'
import type { UploadProps, MenuProps } from 'antd'
import { getImageDataUrl } from '@/utils/image'
import SvgIcon from '@/components/SvgIcon'
import useCreateElement from '@/hooks/useCreateElement'
import { ShapeMenuItem, SHAPE_LIST_ITEM } from '@/configs/shape'
import './index.scss'

const AddTool = () => {
  const [isShapeDPVisible, setIsShapeDPVisible] = useState(false)

  const dispatch = useDispatch<Dispatch>()

  const { createImageElement, createTableElement } = useCreateElement()

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

  const shapeMenu = (): ReactNode => (
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

  const [addTableInfo, setAddTableInfo] = useState('插入表格')
  const [tableSelectInfo, setTableSelectInfo] = useState({
    rowIndex: -1,
    cellIndex: -1
  })
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const handleCellMouseOver = (tableIndex: {
    rowIndex: number
    cellIndex: number
  }) => {
    setTableSelectInfo(tableIndex)
    if (tableIndex.rowIndex > -1 && tableIndex.cellIndex > -1) {
      setAddTableInfo(
        `${tableIndex.cellIndex + 1}×${tableIndex.rowIndex + 1}表格`
      )
    }
  }

  const handleTableSelectorMO = () => {
    setTableSelectInfo({
      rowIndex: -1,
      cellIndex: -1
    })
    setAddTableInfo('插入表格')
  }

  const openCustomTableNum = () => {
    setIsModalVisible(true)
  }

  const handleTableFormCancel = () => {
    setIsModalVisible(false)
  }

  const handleTableFormOk = () => {
    form.validateFields().then(() => {
      const values = form.getFieldsValue() as {
        rowNum: number
        cellNum: number
      }
      addTable(values)
      setIsModalVisible(false)
    })
  }

  const addTable = (tableNum: { rowNum: number; cellNum: number }) => {
    createTableElement(tableNum)
  }

  const tableMenu = (
    <div className="table-menu">
      <div className="add-table-info">{addTableInfo}</div>
      <div className="table-selector" onMouseLeave={handleTableSelectorMO}>
        {Array(8)
          .fill('row')
          .map((row, rowIndex) => {
            return (
              <div className="selector-row" key={row + rowIndex}>
                {Array(10)
                  .fill('cell')
                  .map((cell, cellIndex) => {
                    return (
                      <div
                        className={`selector-cell ${
                          rowIndex <= tableSelectInfo.rowIndex &&
                          cellIndex <= tableSelectInfo.cellIndex
                            ? 'selected'
                            : ''
                        }`}
                        key={cell + cellIndex}
                        onMouseOver={() =>
                          handleCellMouseOver({
                            rowIndex: rowIndex,
                            cellIndex: cellIndex
                          })
                        }
                        onClick={() =>
                          addTable({
                            rowNum: rowIndex + 1,
                            cellNum: cellIndex + 1
                          })
                        }
                      ></div>
                    )
                  })}
              </div>
            )
          })}
      </div>
      <div className="custom-table-selector" onClick={openCustomTableNum}>
        自定义行列数
      </div>
      <Modal
        title="自定义行列数"
        open={isModalVisible}
        width={500}
        onOk={handleTableFormOk}
        onCancel={handleTableFormCancel}
      >
        <Form
          form={form}
          name="cumstom-table-form"
          layout="inline"
          style={{ justifyContent: 'space-between', height: '80px' }}
        >
          <Form.Item
            name="rowNum"
            label="行数"
            rules={[
              { type: 'number', max: 20, min: 1, message: '有效数值为1至20' }
            ]}
            initialValue={2}
          >
            <InputNumber style={{ width: '120px' }} />
          </Form.Item>
          <Form.Item
            name="cellNum"
            label="列数"
            rules={[
              { type: 'number', max: 20, min: 1, message: '有效数值为1至20' }
            ]}
            initialValue={5}
          >
            <InputNumber style={{ width: '120px' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )

  const addMoreMenu: MenuProps = {
    onClick: handleMenuClick,
    items: [
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
        ),
        children: [
          {
            key: 'shape-menu',
            label: shapeMenu()
          }
        ],
        popupClassName: 'shape-menu-children'
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
        ),
        children: [
          {
            key: 'table-menu',
            label: tableMenu
          }
        ],
        popupClassName: 'table-menu-children'
      }
    ]
  }

  return (
    <div className="add-tool">
      <Space>
        <Dropdown
          menu={addMoreMenu}
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
          dropdownRender={shapeMenu}
          trigger={['click']}
          onOpenChange={handleShapeDPVisibleChange}
          open={isShapeDPVisible}
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
