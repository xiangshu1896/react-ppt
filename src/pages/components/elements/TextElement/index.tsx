import React, { useEffect, useRef } from 'react'
import { PPTTextElement } from '@/types/slides'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import SlateEditor from '../SlateEditor'
import useSelectElement from '@/pages/Editor/CanvasWrapper/hooks/useSelectElement'
import './index.scss'

interface TextComponentProps {
  element: PPTTextElement
}

const TextComponent: React.FC<TextComponentProps> = props => {
  const { element } = props

  const { selectElement } = useSelectElement()

  const dispatch = useDispatch<Dispatch>()
  const isScaling = useSelector((state: RootState) => state.mainStore.isScaling)
  const textComponent = useRef<HTMLDivElement>(null)

  // 当text元素发生缩放变化时，判断是否在缩放和高度是否变化，同时满足时更新元素高度
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

  // 监听isScaling，使监听事件中的isScaling始终保持最新状态
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

  const handleTextComponentMD = (e: React.MouseEvent) => {
    e.stopPropagation()
    selectElement(e, element)
  }

  return (
    <div
      className="element-text-component"
      style={{
        top: element.top,
        left: element.left,
        width: element.width
      }}
      ref={textComponent}
      onMouseDown={handleTextComponentMD}
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
