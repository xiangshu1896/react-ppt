import React from 'react'
import { Dropdown, Menu } from 'antd'
import useScreen from '@/pages/FullScreen/hooks/useScreen'
import type { MenuProps } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import SvgIcon from '@/components/SvgIcon'
import './index.scss'

const folderMenuItems = [
  {
    label: '导入JSON',
    key: 'import-json'
  },
  {
    label: '导出JSON',
    key: 'output-json'
  },
  {
    label: '导出PPTX',
    key: 'output-pptx'
  }
]

const editorMenuItems = [
  {
    label: '撤销',
    key: 'repeal'
  },
  {
    label: '还原',
    key: 'restore'
  }
]

const playMenuItems = [
  {
    label: '从头开始',
    key: 'from-start'
  },
  {
    label: '从当前页开始',
    key: 'from-cur'
  }
]

const EditorHeader = () => {
  const { enterScreening } = useScreen()

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    console.log('key', key)
    switch (key) {
      case 'from-start':
        enterScreening()
        break
      default:
        break
    }
  }

  const getMenu = (menuItem: ItemType[]): MenuProps => {
    return { items: menuItem, onClick: handleMenuClick }
  }

  return (
    <div className="editor-header">
      <div className="left">文档名称</div>
      <div className="right">
        <Dropdown
          menu={getMenu(folderMenuItems)}
          trigger={['click']}
          overlayClassName="editor-header-dropdown"
        >
          <div className="drop-content">
            <SvgIcon.Folder width="15" height="15" />
            文档
          </div>
        </Dropdown>
        <Dropdown
          menu={getMenu(editorMenuItems)}
          trigger={['click']}
          overlayClassName="editor-header-dropdown"
        >
          <div className="drop-content">
            <SvgIcon.Editor width="15" height="15" />
            编辑
          </div>
        </Dropdown>
        <Dropdown
          menu={getMenu(playMenuItems)}
          trigger={['click']}
          overlayClassName="editor-header-dropdown"
        >
          <div className="drop-content">
            <SvgIcon.Play width="15" height="15" />
            演示
          </div>
        </Dropdown>
      </div>
    </div>
  )
}

export default EditorHeader
