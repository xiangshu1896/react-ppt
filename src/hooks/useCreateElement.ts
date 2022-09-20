import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import {
  PPTElement,
  CommonElementPosition,
  CustomElement,
  CustomText
} from '@/types/slides'
import { nanoid } from 'nanoid'
import { getImageSize } from '@/utils/image'
import {
  VIEWPORT_WIDTH,
  VIEWPORT_HEIGHT,
  VIEWPORT_RATIO
} from '@/configs/canvas'
import { ShapeMenuItem } from '@/configs/shape'
import { useEffect, useRef } from 'react'
import { CreatingElement } from '@/types/edit'

export default () => {
  const dispatch = useDispatch<Dispatch>()
  const creatingElement = useSelector(
    (state: RootState) => state.mainStore.creatingElement
  )

  // 记录最新数据，保证数据为最新值
  const creatingElementRef = useRef<CreatingElement | null>()
  useEffect(() => {
    creatingElementRef.current = creatingElement
  }, [creatingElement])

  // 创建（插入）一个元素并将其设置为被选中元素
  const createElement = (element: PPTElement) => {
    dispatch.slidesStore.ADD_NEW_ELEMENT(element)
    dispatch.mainStore.SET_SELECTED_ELEMENT_ID(element.id)

    if (creatingElementRef.current) {
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

  /**
   * 创建图形元素
   */
  const createShapeElement = (
    position: CommonElementPosition,
    shapeMenuItem: ShapeMenuItem
  ) => {
    const { left, top, width, height } = position
    const { viewBox, path } = shapeMenuItem
    createElement({
      type: 'shape',
      id: 'element_' + nanoid(),
      left,
      top,
      width,
      height,
      viewBox,
      path,
      fill: '#0188FB'
    })
  }

  /**
   * 创建表格元素
   */
  const createTableElement = (tableNum: {
    rowNum: number
    cellNum: number
  }) => {
    const { rowNum, cellNum } = tableNum
    const rowHeight = ((1 / rowNum) * 100).toFixed(2) + '%'
    const cellWidth = ((1 / cellNum) * 100).toFixed(2) + '%'
    // 依据行数列数生成table content
    const content: (CustomElement | CustomText)[] = [
      {
        type: 'table',
        children: Array(rowNum)
          .fill('')
          .map(() => ({
            type: 'table-row',
            height: rowHeight,
            children: Array(cellNum)
              .fill('')
              .map(() => ({
                type: 'table-cell',
                width: cellWidth,
                children: [{ text: '' }]
              }))
          }))
      }
    ]

    // 根据表格行列数计算出table大小，每个cell宽高为20×40，高度不限，宽度不超过800px
    const tableWidth = cellNum * 80 > 800 ? 800 : cellNum * 80
    const tableHeight = rowNum * 40
    // 计算位置，宽度居中，高度如果小于画布高度则居中，否则置顶
    const left = (VIEWPORT_WIDTH - tableWidth) / 2
    const top =
      VIEWPORT_HEIGHT - tableHeight > 0
        ? (VIEWPORT_HEIGHT - tableHeight) / 2
        : 0

    createElement({
      type: 'table',
      id: 'element_' + nanoid(),
      left,
      top,
      width: tableWidth,
      height: tableHeight,
      content
    })
  }

  return {
    createTextElement,
    createImageElement,
    createShapeElement,
    createTableElement
  }
}
