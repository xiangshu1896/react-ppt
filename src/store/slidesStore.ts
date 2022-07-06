import { createModel } from '@rematch/core'
import { Dispatch, RootState, RootModel } from '@/store'
import { Slide } from '@/types/slides'
import { slides } from '@/mocks/slides'
import _ from 'lodash'

interface SlidesState {
  slides: Slide[] // 配置的页面列表
  slideIndex: number // 当前选中的页面
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
    }
  },
  effects: (dispatch: Dispatch) => ({})
})

export default slidesStore
