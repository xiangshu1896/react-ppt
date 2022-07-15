import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { PPTElement, CommonElementPosition } from '@/types/slides'
import { nanoid } from 'nanoid'
import { getImageSize } from '@/utils/image'
import {
  VIEWPORT_WIDTH,
  VIEWPORT_HEIGHT,
  VIEWPORT_RATIO
} from '@/configs/canvas'

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
    createElement({
      type: 'text',
      id: 'element_' + nanoid(),
      left,
      top,
      width,
      height,
      content,
      defaultColor: '#333'
    })
  }

  /**
   * 创建图片元素
   */
  const createImageElement = (url: string) => {
    getImageSize(url).then(({ width, height }) => {
      const scale = height / width

      if (scale < VIEWPORT_RATIO && width > VIEWPORT_WIDTH) {
        width = VIEWPORT_WIDTH
        height = VIEWPORT_WIDTH * scale
      } else if (height > VIEWPORT_HEIGHT) {
        height = VIEWPORT_HEIGHT
        width = VIEWPORT_HEIGHT / scale
      }

      createElement({
        type: 'image',
        id: 'element_' + nanoid(),
        url,
        width,
        height,
        left: (VIEWPORT_WIDTH - width) / 2,
        top: (VIEWPORT_HEIGHT - height) / 2
      })
    })
  }

  return {
    createTextElement,
    createImageElement
  }
}
