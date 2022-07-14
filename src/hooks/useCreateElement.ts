import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { PPTElement, CommonElementPosition } from '@/types/slides'
import { nanoid } from 'nanoid'

export default () => {
  const dispatch = useDispatch<Dispatch>()
  const creatingElement = useSelector(
    (state: RootState) => state.mainStore.creatingElement
  )

  // 创建（插入）一个元素并将其设置为被选中元素
  const createElement = (element: PPTElement) => {
    dispatch.slidesStore.ADD_NEW_ELEMENT(element)
    dispatch.mainStore.SET_SELECTED_ELEMENT_ID(element.id)

    if (creatingElement) {
      dispatch.mainStore.SET_CREATING_ELEMENT(null)
    }
  }

  /**
   * 创建文本元素
   */
  const createTextElement = (position: CommonElementPosition, content = '') => {
    const { left, top, width, height } = position
    const id = 'element_' + nanoid()
    createElement({
      type: 'text',
      id,
      left,
      top,
      width,
      height,
      content,
      defaultColor: '#333'
    })
  }

  return {
    createTextElement
  }
}
