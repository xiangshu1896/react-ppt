import React from 'react'
import { PPTElement, ElementTypes } from '@/types/slides'
import TextElement from '@/components/elements/TextElement'
import ImageElement from '@/components/elements/ImageElement'
import './index.scss'

interface ElementProps {
  element: PPTElement
  selectElement: (
    e: React.MouseEvent<Element, MouseEvent>,
    element: PPTElement,
    startMove?: boolean
  ) => void
}

const elementComponentMap = {
  [ElementTypes.TEXT]: TextElement,
  [ElementTypes.IMAGE]: ImageElement
}

const Element: React.FC<ElementProps> = props => {
  const { element, selectElement } = props

  const elementType = props.element.type
  const ElementComponent = elementComponentMap[elementType]

  return (
    <div className={`element-item ${'element-' + element.id}`}>
      {
        // 动态加载元素组件
        // @ts-ignore
        <ElementComponent element={element} selectElement={selectElement} />
      }
    </div>
  )
}

export default Element
