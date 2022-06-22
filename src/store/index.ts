import { init, Models, RematchDispatch, RematchRootState } from '@rematch/core'
import main from './main'
import screen from './screen'
import slidesStore from './slidesStore'

export interface RootModel extends Models<RootModel> {
  main: typeof main
  screen: typeof screen
  slidesStore: typeof slidesStore
}

const rootModel: RootModel = { main, screen, slidesStore }
const store = init({
  models: rootModel
})

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>

export default store
