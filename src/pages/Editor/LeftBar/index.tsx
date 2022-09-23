import * as React from 'react'
import { Dropdown } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { ReactSortable, Sortable } from 'react-sortablejs'
import './index.scss'
import { Slide } from '@/types/slides'
import _ from 'lodash'

const pageList = <div> </div>

// 拖拽组件配置项
const sortableOptions = {
  animation: 200,
  ghostClass: 'ghost-slide',
  scroll: true,
  scrollSensitivity: 100,
  scrollSpeed: 20,
  dragClass: 'dragging-slide',
  forceFallback: true
}

const LeftBar = () => {
  const dispatch = useDispatch<Dispatch>()
  const slides = useSelector((state: RootState) => state.slidesStore.slides)
  const selectedSlideIndexList = useSelector(
    (state: RootState) => state.slidesStore.selectedSlideIndexList
  )

  const selectSlide = (e: React.MouseEvent, slideIndex: number) => {
    dispatch.mainStore.CLEAR_SELECTED_ELEMENT_ID_LIST()
    dispatch.slidesStore.SET_SLIDE_INDEX(slideIndex)
    dispatch.slidesStore.CHANGE_SELECTED_SLIDE_INDEX_LIST(
      slideIndex,
      e.ctrlKey || e.metaKey
    )
  }

  const setList = (slides: Slide[]) => {
    dispatch.slidesStore.SET_SLIDES(slides)
  }

  const handleDragEnd = (dragEvent: Sortable.SortableEvent) => {
    const { newIndex } = dragEvent
    if (!newIndex && newIndex !== 0) {
      return
    }
    dispatch.slidesStore.SET_SLIDE_INDEX(newIndex)
    dispatch.slidesStore.SET_SELECTED_SLIDE_INDEX_LIST([newIndex])
  }

  const handleAddSlideClick = () => {
    dispatch.slidesStore.PUSH_NEW_SLIDE()
  }

  return (
    <div className="left-bar">
      <div className="add-page">
        <Dropdown.Button overlay={pageList} onClick={handleAddSlideClick}>
          添加页面
        </Dropdown.Button>
      </div>
      <div className="page-list">
        <ReactSortable
          list={slides}
          setList={setList}
          onEnd={handleDragEnd}
          {...sortableOptions}
          disabled={selectedSlideIndexList.length > 1}
          className="sort-container"
        >
          {slides.map((slide, slideIndex) => (
            <div
              key={slide.id}
              className="slide"
              onMouseDown={e => selectSlide(e, slideIndex)}
            >
              <div className="slide-num">{slideIndex + 1}</div>
              <div
                className={`slide-content ${
                  selectedSlideIndexList.includes(slideIndex)
                    ? 'checked-slide'
                    : ''
                }`}
              ></div>
            </div>
          ))}
        </ReactSortable>
      </div>
    </div>
  )
}

export default LeftBar
