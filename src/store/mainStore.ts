import { createModel } from '@rematch/core'
import { Dispatch, RootState, RootModel } from '@/store'

interface MainState {
  canvasScale: number
  canvasPercentage: number
}

const mainState: MainState = {
  canvasScale: 1,
  canvasPercentage: 90
}

const mainStore = createModel<RootModel>()({
  state: mainState,
  reducers: {
    SET_CANVAS_SCALE(state: MainState, canvasScale: number) {
      return {
        ...state,
        canvasScale
      }
    }
  },
  effects: (dispatch: Dispatch) => ({})
})

export default mainStore
