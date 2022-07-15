import React, { useEffect, useRef } from 'react'
import { PPTTextElement } from '@/types/slides'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import ElementOutline from '../ElementOutline'
import SlateEditor from '../SlateEditor'
import './index.scss'

interface TextComponentProps {
  element: PPTTextElement
}

const TextComponent: React.FC<TextComponentProps> = props => {
  const { element } = props

  const dispatch = useDispatch<Dispatch>()
  const isScaling = useSelector((state: RootState) => state.mainStore.isScaling)
  const textComponent = useRef<HTMLDivElement>(null)

  const updateTextElementHeight = (entries: ResizeObserverEntry[]) => {
    if (!textComponent.current) {
      return
    }
    const contentRect = entries[0].contentRect

    if (element.height !== contentRect.height && !isScaling) {
      dispatch.slidesStore.UPDATE_ELEMENT(element.id, {
        height: contentRect.height
      })
    }
  }

  const resizeObserver = new ResizeObserver(updateTextElementHeight)

  useEffect(() => {
    if (textComponent.current) {
      resizeObserver.observe(textComponent.current)
    }
    return () => {
      if (textComponent.current) {
        resizeObserver.unobserve(textComponent.current)
      }
    }
  }, [isScaling])

  return (
    <div
      className="element-text-component"
      style={{
        top: element.top,
        left: element.left,
        width: element.width
      }}
      ref={textComponent}
    >
      <div className="rotate-wrapper">
        <div
          className="text-content"
          style={{
            color: element.defaultColor
          }}
        >
          {/* <ElementOutline
            width={element.width}
            height={element.height}
            outline={element.outline}
          /> */}
          {/* 集成富文本 */}
          <SlateEditor
            element={element}
            value={element.content}
            defaultColor={element.defaultColor}
          />
        </div>
      </div>
    </div>
  )
}

export default TextComponent
