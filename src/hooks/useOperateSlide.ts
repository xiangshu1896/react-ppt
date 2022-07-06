import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { createBlankSlide } from '@/mocks/slides'
import { PPTElement } from '@/types/slides'

export default () => {
  const dispatch = useDispatch<Dispatch>()
  const slides = useSelector((state: RootState) => state.slidesStore.slides)
  const slideIndex = useSelector(
    (state: RootState) => state.slidesStore.slideIndex
  )

  const pushNewSlide = () => {
    const newSlides = [...slides]
    newSlides.splice(slideIndex, 0, createBlankSlide())
    dispatch.slidesStore.SET_SLIDES(newSlides)
  }

  const setCurrentSlideNewEls = (elements: PPTElement[]) => {
    const resSlides = slides.map((slide, index) => {
      if (index === slideIndex) {
        return Object.assign({}, slide, {
          elements
        })
      } else {
        return slide
      }
    })
    dispatch.slidesStore.SET_SLIDES(resSlides)
  }

  return {
    pushNewSlide,
    setCurrentSlideNewEls
  }
}
