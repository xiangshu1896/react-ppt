import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { PPTElement } from '@/types/slides'
import useOperateMain from '@/hooks/useOperateMain'

export default () => {
  const {
    setSelectedElementId,
    pushSelectedElementId,
    removeSelectedElementId
  } = useOperateMain()
  const selectedElementIdList = useSelector(
    (state: RootState) => state.mainStore.selectedElementIdList
  )

  const selectElement = (e: React.MouseEvent, element: PPTElement) => {
    // 当前元素已被选中
    if (selectedElementIdList.includes(element.id)) {
      // 如果按下ctrl或command键，此时清除该元素的选中状态
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        removeSelectedElementId(element.id)
      }
    } else if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      pushSelectedElementId(element.id)
    } else {
      setSelectedElementId(element.id)
    }
  }

  return {
    selectElement
  }
}
