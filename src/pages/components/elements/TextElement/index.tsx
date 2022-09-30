import React, { useCallback, useEffect, useMemo, useRef } from 'react'
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

  const isScalingRef = useRef<boolean>(false)
  const elementRef = useRef<PPTTextElement>()
  useEffect(() => {
    isScalingRef.current = isScaling
  }, [isScaling])
  useEffect(() => {
    elementRef.current = element
  }, [element])

  // 当text元素发生缩放变化时，判断是否在缩放和高度是否变化，同时满足时更新元素高度
  const updateTextElementHeight = useCallback(
    (entries: ResizeObserverEntry[]) => {
      if (!textComponent.current) {
        return
      }
      const contentRect = entries[0].contentRect

      if (
        elementRef.current &&
        elementRef.current.height !== contentRect.height &&
        !isScalingRef.current
      ) {
        dispatch.slidesStore.UPDATE_ELEMENT(elementRef.current.id, {
          height: contentRect.height
        })
      }
    },
    [dispatch.slidesStore]
  )

  const resizeObserver = new ResizeObserver(updateTextElementHeight) // eslint-disable-line

  // 绑定监听事件
  useEffect(() => {
    const textComponentHTML = textComponent.current
    if (textComponentHTML) {
      resizeObserver.observe(textComponentHTML)
    }
    return () => {
      if (textComponentHTML) {
        resizeObserver.unobserve(textComponentHTML)
      }
    }
  }, [resizeObserver])

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
      onKeyDown={e => e.stopPropagation()}
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
          <SlateEditor element={element} defaultColor={element.defaultColor} />
        </div>
      </div>
    </div>
  )
}

export default TextComponent
