import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import BaseView from './BaseView'

const FullScreen: React.FC = () => {
  const slides = useSelector((state: RootState) => state.slidesStore.slides)
  const slideIndex = useSelector(
    (state: RootState) => state.mainStore.currentPlaySlideIndex
  )

  return (
    <div className="full-screen">
      <BaseView slide={slides[slideIndex]} />
    </div>
  )
}

export default FullScreen
