import { createModel } from '@rematch/core'
import { Dispatch, RootState, RootModel } from '@/store'

interface MainState {
  canvasScale: number // 视图缩放比
  canvasPercentage: number // 视图展示比例
  selectedElementIdList: string[] // 选中的元素列表
}

const mainState: MainState = {
  canvasScale: 1,
  canvasPercentage: 90,
  selectedElementIdList: []
}

const mainStore = createModel<RootModel>()({
  state: mainState,
  reducers: {
    SET_CANVAS_SCALE(state: MainState, canvasScale: number) {
      return {
        ...state,
        canvasScale
      }
    },
    SET_SELECTED_ELEMENT_ID_LIST(
      state: MainState,
      selectedElementIdList: string[]
    ) {
      return {
        ...state,
        selectedElementIdList
      }
    }
  },
  effects: (dispatch: Dispatch) => ({})
})

export default mainStore
