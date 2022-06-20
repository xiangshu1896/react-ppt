import { createModel } from '@rematch/core'
import { Dispatch, RootState, RootModel } from '@/store'
import { ScreenState } from '@/types/state'

const screenState: ScreenState = {
  width: '',
  height: '',
  type: 'bottom'
}

const screen = createModel<RootModel>()({
  state: screenState,
  reducers: {
    SET_WIDTH(state: ScreenState, width: string) {
      return {
        ...state,
        width
      }
    }
  },
  effects: (dispatch: Dispatch) => ({})
})

export default screen
