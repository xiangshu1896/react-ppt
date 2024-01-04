import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'

export default () => {
  const dispatch = useDispatch<Dispatch>()

  // 开启放映状态
  const enterScreening = () => {
    const docElm = document.documentElement
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen()
    }
    dispatch.mainStore.SET_IS_SCREENING(true)
  }

  // 关闭放映状态
  const closeScreening = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  return {
    enterScreening,
    closeScreening
  }
}
