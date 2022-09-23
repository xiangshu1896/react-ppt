import React, { useCallback, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { KEYS } from '@/configs/hotkey'

export default () => {
  const dispatch = useDispatch<Dispatch>()
  const selectedElementIdList = useSelector(
    (state: RootState) => state.mainStore.selectedElementIdList
  )

  const selectedElementIdListRef = useRef<string[]>()

  useEffect(() => {
    selectedElementIdListRef.current = selectedElementIdList
  }, [selectedElementIdList])

  const remove = useCallback(() => {
    if (selectedElementIdListRef.current?.length) {
      dispatch.slidesStore.DELETE_SELECTED_ELEMENTS(
        selectedElementIdListRef.current
      )
      return
    }
    dispatch.slidesStore.DELETE_SELECTED_SLIDE()
  }, [dispatch.slidesStore])

  const keydownListener = useCallback(
    (e: KeyboardEvent) => {
      const { ctrlKey, shiftKey, altKey, metaKey } = e
      const ctrlOrMetaKeyActive = ctrlKey || metaKey

      const key = e.key.toUpperCase()

      if (key === KEYS.DELETE || key === KEYS.BACKSPACE) {
        e.preventDefault()
        remove()
      }
    },
    [remove]
  )

  useEffect(() => {
    document.addEventListener('keydown', keydownListener)
    return () => {
      document.removeEventListener('keydown', keydownListener)
    }
  }, [keydownListener])
}
