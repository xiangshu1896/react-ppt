import React from 'react'
import { PPTElement, ElementTypes } from '@/types/slides'
import TextElement from '@/components/elements/TextElement'
import ImageElement from '@/components/elements/ImageElement'
import './index.scss'
import useSelectElement from '../hooks/useSelectElement'
import useDragElement from '../hooks/useDragElement'

interface ElementProps {
  element: PPTElement
}

const elementComponentMap = {
  [ElementTypes.TEXT]: TextElement,
  [ElementTypes.IMAGE]: ImageElement
}

const Element: React.FC<ElementProps> = props => {
  const { element } = props

  const elementType = props.element.type
  const ElementComponent = elementComponentMap[elementType]

  const { selectElement } = useSelectElement()
  const { dragElement } = useDragElement()

  const handleElementMD = (e: React.MouseEvent) => {
    e.stopPropagation()
    selectElement(e, element)
    dragElement(e)
  }

  return (
    <div
      className={`element-item ${'element-' + element.id}`}
      onMouseDown={handleElementMD}
    >
      {
        // 动态加载元素组件
        // @ts-ignore
        <ElementComponent element={element} />
      }
    </div>
  )
}

export default Element
