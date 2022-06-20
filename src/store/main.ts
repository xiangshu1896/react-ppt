import { createModel } from '@rematch/core'
import { Dispatch, RootState, RootModel } from '@/store'
import { MainState } from '@/types/state'

const mainState: MainState = {
  title: '',
  content: '',
  version: '',
  isChecked: false
}

const main = createModel<RootModel>()({
  state: mainState,
  reducers: {
    SET_CONTENT(state: MainState, content: string) {
      return {
        ...state,
        content
      }
    }
  },
  effects: (dispatch: Dispatch) => ({})
})

export default main
