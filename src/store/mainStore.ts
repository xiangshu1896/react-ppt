import { createModel } from '@rematch/core'
import { Dispatch, RootState, RootModel } from '@/store'
import { CreatingElement } from '@/types/edit'

interface MainState {
  canvasScale: number // 视图缩放比
  canvasPercentage: number // 视图展示比例
  selectedElementIdList: string[] // 选中的元素列表
  creatingElement: CreatingElement | null // 正在创建的元素
  isScaling: boolean // 是否正在缩放
}

// 工具函数

const removeSelectedElementId = (state: MainState, id: string) => {
  const newIdList = state.selectedElementIdList.filter(idItem => idItem !== id)
  return newIdList
}

const mainState: MainState = {
  canvasScale: 1,
  canvasPercentage: 90,
  selectedElementIdList: [],
  creatingElement: null,
  isScaling: false
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
    },
    SET_IS_SCALING(state: MainState, isScaling: boolean) {
      return {
        ...state,
        isScaling
      }
    },
    SET_SELECTED_ELEMENT_ID(state: MainState, id: string) {
      return {
        ...state,
        selectedElementIdList: [id]
      }
    },
    PUSH_SELECTED_ELEMENT_ID(state: MainState, id: string) {
      return {
        ...state,
        selectedElementIdList: [...state.selectedElementIdList, id]
      }
    },
    CLEAR_SELECTED_ELEMENT_ID_LIST(state: MainState) {
      return {
        ...state,
        selectedElementIdList: []
      }
    },
    REMOVE_SELECTED_ELEMENT_ID(state: MainState, id: string) {
      const selectedElementIdList = removeSelectedElementId(state, id)
      return {
        ...state,
        selectedElementIdList
      }
    }
  },
  effects: (dispatch: Dispatch) => ({})
})

export default mainStore
