import { createModel } from '@rematch/core'
import { Dispatch, RootState, RootModel } from '@/store'
import { Slide, PPTElement } from '@/types/slides'
import { slides, createBlankSlide } from '@/mocks/slides'
import _ from 'lodash'

interface SlidesState {
  slides: Slide[] // 配置的页面列表
  slideIndex: number // 当前选中的页面id
  selectedSlideIndexList: number[] // 选中的页面列表
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
  slideIndex: 0,
  selectedSlideIndexList: [0]
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
    CHANGE_SELECTED_SLIDE_INDEX_LIST(
      state: SlidesState,
      slideIndex: number,
      isCtrl: boolean
    ) {
      let newSelectedSlideIndexList = [...state.selectedSlideIndexList]
      if (isCtrl) {
        // 如果已经选中了这个页面，就执行清除
        if (newSelectedSlideIndexList.includes(slideIndex)) {
          if (newSelectedSlideIndexList.length > 1) {
            // 如果按住了Ctrl，且已选页面数量大于一，清除该页面选中状态
            newSelectedSlideIndexList = newSelectedSlideIndexList.filter(
              indexItem => indexItem !== slideIndex
            )
            // 如果清除的页面就是当前pick的页面，pick之前选中的最近的
            if (state.slideIndex === slideIndex) {
              state.slideIndex = newSelectedSlideIndexList.at(-1) as number
            }
          }
        }
        // 如果没有选中这个页面，就加入选中列表
        else {
          newSelectedSlideIndexList.push(slideIndex)
        }
      }
      // 没按住Ctrl，就更改选中页面
      else {
        newSelectedSlideIndexList = [slideIndex]
      }
      return {
        ...state,
        selectedSlideIndexList: newSelectedSlideIndexList
      }
    },
    DELETE_SELECTED_SLIDE(state: SlidesState) {
      let newSlides = [...state.slides]
      let newSelectedSlideIndexList: number[] = []
      let newSlideIndex = 0

      // 至少留一个页面
      if (state.slides.length > state.selectedSlideIndexList.length) {
        // 从删除的最小index开始遍历，找到最小的没有被删除的index，如果没有，就设为index - 1
        const minIndex = Math.min(...state.selectedSlideIndexList)
        let targetIndex = minIndex + 1
        while (targetIndex < state.slides.length) {
          if (!state.selectedSlideIndexList.includes(targetIndex)) {
            break
          } else {
            targetIndex++
          }
        }
        // 如果targetIndex一直加到跳出循环，说明没有找到比minIndex大的未被选中索引，这时候将targetIndex定位到minIndex前一位
        if (targetIndex === state.slides.length) {
          targetIndex = minIndex - 1
        }

        // 记录id，用来定位
        const targetID = state.slides[targetIndex].id
        // 删除选中的页面
        newSlides = newSlides.filter(
          (slideItem, slideIndex) =>
            !state.selectedSlideIndexList.includes(slideIndex)
        )
        // 设定新的选中&选择index
        const newTargetIndex = newSlides.findIndex(
          slideItem => slideItem.id === targetID
        )

        newSelectedSlideIndexList = [newTargetIndex]
        newSlideIndex = newTargetIndex
      }

      return {
        slides: newSlides,
        slideIndex: newSlideIndex,
        selectedSlideIndexList: newSelectedSlideIndexList
      }
    },
    SET_SELECTED_SLIDE_INDEX_LIST(
      state: SlidesState,
      selectedSlideIndexList: number[]
    ) {
      return {
        ...state,
        selectedSlideIndexList
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
