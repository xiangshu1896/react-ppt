import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { PPTElement, CommonElementPosition } from '@/types/slides'
import useOperateSlide from './useOperateSlide'
import useOperateMain from './useOperateMain'
import { nanoid } from 'nanoid'

export default () => {
  const dispatch = useDispatch<Dispatch>()
  const creatingElement = useSelector(
    (state: RootState) => state.mainStore.creatingElement
  )

  const { addNewElement } = useOperateSlide()
  const { setSelectedElementId } = useOperateMain()

  // 创建（插入）一个元素并将其设置为被选中元素
  const createElement = (element: PPTElement) => {
    addNewElement(element)
    setSelectedElementId(element.id)

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
