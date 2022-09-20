import { createModel } from '@rematch/core'
import { Dispatch, RootState, RootModel } from '@/store'
import { Slide, PPTElement } from '@/types/slides'
import { slides, createBlankSlide } from '@/mocks/slides'
import _ from 'lodash'

interface SlidesState {
  slides: Slide[] // 配置的页面列表
  slideIndex: number // 当前选中的页面
}

// 工具函数

const pushNewSlide = (state: SlidesState) => {
  const slides = [...state.slides]
  slides.splice(state.slideIndex, 0, createBlankSlide())
  return slides
}

const setCurrentSlideNewEls = (state: SlidesState, elements: PPTElement[]) => {
  const slides = state.slides.map((slide, index) => {
    if (index === state.slideIndex) {
      return Object.assign({}, slide, {
        elements
      })
    } else {
      return slide
    }
  })
  return slides
}

const addNewElement = (state: SlidesState, element: PPTElement) => {
  const elements = [...state.slides[state.slideIndex].elements]
  elements.push(element)
  return setCurrentSlideNewEls(state, elements)
}

const updateElement = (
  state: SlidesState,
  id: string,
  props: Partial<PPTElement>
) => {
  const newElements = state.slides[state.slideIndex].elements.map(element => {
    if (element.id === id) {
      return Object.assign({}, element, props)
    } else {
      return element
    }
  })
  return setCurrentSlideNewEls(state, newElements)
}

const deleteSelectedElements = (
  state: SlidesState,
  selectedElementIdList: string[]
) => {
  const elements = [...state.slides[state.slideIndex].elements].filter(
    element => !selectedElementIdList.includes(element.id)
  )
  return setCurrentSlideNewEls(state, elements)
}

const slidesState: SlidesState = {
  slides,
  slideIndex: 0
}

const slidesStore = createModel<RootModel>()({
  name: 'slidesStore',
  state: slidesState,
  reducers: {
    SET_SLIDES(state: SlidesState, slides: Slide[]) {
      return {
        ...state,
        slides
      }
    },
    SET_SLIDE_INDEX(state: SlidesState, slideIndex: number) {
      return {
        ...state,
        slideIndex
      }
    },
    PUSH_NEW_SLIDE(state: SlidesState) {
      const slides = pushNewSlide(state)
      return {
        ...state,
        slides
      }
    },
    SET_CURRENT_SLIDE_NEW_ELS(state: SlidesState, elements: PPTElement[]) {
      const slides = setCurrentSlideNewEls(state, elements)
      return {
        ...state,
        slides
      }
    },
    UPDATE_ELEMENT(state: SlidesState, id: string, props: Partial<PPTElement>) {
      const slides = updateElement(state, id, props)
      return {
        ...state,
        slides
      }
    },
    ADD_NEW_ELEMENT(state: SlidesState, element: PPTElement) {
      const slides = addNewElement(state, element)
      return {
        ...state,
        slides
      }
    },
    DELETE_SELECTED_ELEMENTS(
      state: SlidesState,
      selectedElementIdList: string[]
    ) {
      const slides = deleteSelectedElements(state, selectedElementIdList)
      return {
        ...state,
        slides
      }
    }
  },
  effects: dispatch => ({})
})

export default slidesStore
