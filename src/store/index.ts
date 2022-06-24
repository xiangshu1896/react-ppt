import { init, Models, RematchDispatch, RematchRootState } from '@rematch/core'
import mainStore from './mainStore'
import slidesStore from './slidesStore'

export interface RootModel extends Models<RootModel> {
  mainStore: typeof mainStore
  slidesStore: typeof slidesStore
}

const rootModel: RootModel = { mainStore, slidesStore }
const store = init({
  models: rootModel
})

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>

export default store
