import React from 'react'
import { PPTElement, ElementTypes } from '@/types/slides'
import TextElement from '@/components/elements/TextElement'
import ImageElement from '@/components/elements/ImageElement'
import './index.scss'

interface ElementProps {
  element: PPTElement
}

const elementComponentMap = {
  [ElementTypes.TEXT]: TextElement,
  [ElementTypes.IMAGE]: ImageElement
}

const Element: React.FC<ElementProps> = props => {
  const element = props.element

  const elementType = props.element.type
  const ElementComponent = elementComponentMap[elementType]
  return (
    <div className={`element-item ${'element-' + element.id}`}>
      {
        // @ts-ignore
        <ElementComponent element={element} />
      }
    </div>
  )
}

export default Element
