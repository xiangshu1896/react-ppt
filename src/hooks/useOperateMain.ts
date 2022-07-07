import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'

export default () => {
  const dispatch = useDispatch<Dispatch>()
  const selectedElementIdList = useSelector(
    (state: RootState) => state.mainStore.selectedElementIdList
  )

  const setSelectedElementId = (id: string) => {
    dispatch.mainStore.SET_SELECTED_ELEMENT_ID_LIST([id])
  }

  const pushSelectedElementId = (id: string) => {
    dispatch.mainStore.SET_SELECTED_ELEMENT_ID_LIST([
      ...selectedElementIdList,
      id
    ])
  }

  const clearSelectedElementIdList = () => {
    dispatch.mainStore.SET_SELECTED_ELEMENT_ID_LIST([])
  }

  const removeSelectedElementId = (id: string) => {
    const newIdList = selectedElementIdList.filter(idItem => idItem !== id)
    dispatch.mainStore.SET_SELECTED_ELEMENT_ID_LIST(newIdList)
  }

  return {
    setSelectedElementId,
    pushSelectedElementId,
    clearSelectedElementIdList,
    removeSelectedElementId
  }
}
