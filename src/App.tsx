import React from 'react'
import Editor from './pages/Editor'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import FullScreen from './pages/FullScreen'
import useGlobalEvent from './hooks/useGlobalEvent'

const App = () => {
  useGlobalEvent()
  const isScreening = useSelector(
    (state: RootState) => state.mainStore.isScreening
  )

  return <div className="app">{isScreening ? <FullScreen /> : <Editor />}</div>
}

export default App
