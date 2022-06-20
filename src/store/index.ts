import { init, Models, RematchDispatch, RematchRootState } from '@rematch/core'

import main from './main'
import screen from './screen'

export interface RootModel extends Models<RootModel> {
  main: typeof main
  screen: typeof screen
}

const rootModel: RootModel = { main, screen }
const store = init({
  models: rootModel
})

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>

export default store
