import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { PPTElement } from '@/types/slides'

export default () => {
  const dispatch = useDispatch<Dispatch>()
  const selectedElementIdList = useSelector(
    (state: RootState) => state.mainStore.selectedElementIdList
  )

  const selectElement = (e: React.MouseEvent, element: PPTElement) => {
    // 当前元素已被选中
    if (selectedElementIdList.includes(element.id)) {
      // 如果按下ctrl或command键，此时清除该元素的选中状态
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        dispatch.mainStore.REMOVE_SELECTED_ELEMENT_ID(element.id)
      }
    } else if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      dispatch.mainStore.PUSH_SELECTED_ELEMENT_ID(element.id)
    } else {
      dispatch.mainStore.SET_SELECTED_ELEMENT_ID(element.id)
    }
  }

  return {
    selectElement
  }
}
