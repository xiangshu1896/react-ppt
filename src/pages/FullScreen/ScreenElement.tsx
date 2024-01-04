import * as React from 'react'
import { PPTElement, ElementTypes } from '@/types/slides'
import TextElement from '@/pages/components/elements/TextElement/BaseTextElement'
import ImageElement from '@/pages/components/elements/ImageElement/BaseImageElement'
import ShapeElement from '@/pages/components/elements/ShapeElement/BaseShapeElement'
import TableElement from '@/pages/components/elements/TableElement/BaseTableElement'

interface ScreenElementProps {
  element: PPTElement
}

const elementComponentMap = {
  [ElementTypes.TEXT]: TextElement,
  [ElementTypes.IMAGE]: ImageElement,
  [ElementTypes.SHAPE]: ShapeElement,
  [ElementTypes.TABLE]: TableElement
}

const ScreenElement: React.FC<ScreenElementProps> = props => {
  const { element } = props

  const elementType = props.element.type
  const ElementComponent = elementComponentMap[elementType]

  return (
    <div className={`screen-element ${'screen-element-' + element.id}`}>
      {
        // 动态加载元素组件
        // @ts-ignore
        <ElementComponent element={element} />
      }
    </div>
  )
}

export default ScreenElement
