import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { PPTElement } from '@/types/slides'
import useOperateMain from '@/hooks/useOperateMain'

export default (
  dragElement: (
    e: React.MouseEvent<Element, MouseEvent>,
    element: PPTElement
  ) => void
) => {
  const { setSelectedElementId, pushSelectedElementId } = useOperateMain()

  const selectElement = (
    e: React.MouseEvent,
    element: PPTElement,
    startMove = true
  ) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      setSelectedElementId(element.id)
    } else {
      pushSelectedElementId(element.id)
    }

    if (startMove) {
      dragElement(e, element)
    }
  }

  return {
    selectElement
  }
}
