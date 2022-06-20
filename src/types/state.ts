export interface MainState {
  title: string
  content: string
  version: string
  isChecked: boolean
}

export interface ScreenState {
  width: string
  height: string
  type: 'top' | 'bottom'
}
