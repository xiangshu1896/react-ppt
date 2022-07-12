import { createModel } from '@rematch/core'
import { Dispatch, RootState, RootModel } from '@/store'
import { CreatingElement } from '@/types/edit'

interface MainState {
  canvasScale: number // 视图缩放比
  canvasPercentage: number // 视图展示比例
  selectedElementIdList: string[] // 选中的元素列表
  creatingElement: CreatingElement | null // 正在创建的元素
}

const mainState: MainState = {
  canvasScale: 1,
  canvasPercentage: 90,
  selectedElementIdList: [],
  creatingElement: null
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
    },
    SET_CREATING_ELEMENT(
      state: MainState,
      creatingElement: CreatingElement | null
    ) {
      return {
        ...state,
        creatingElement
      }
    }
  },
  effects: (dispatch: Dispatch) => ({})
})

export default mainStore
