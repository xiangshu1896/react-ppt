import { RefObject, useEffect, useState } from 'react'
import {
  VIEWPORT_WIDTH,
  VIEWPORT_HEIGHT,
  VIEWPORT_RATIO
} from '@/configs/canvas'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import _ from 'lodash'

export default (canvasRef: RefObject<HTMLDivElement>) => {
  const defaultCiewportStyles = {
    width: VIEWPORT_WIDTH,
    height: VIEWPORT_HEIGHT,
    left: 0,
    top: 0
  }

  const [viewportStyles, setViewportStyles] = useState(defaultCiewportStyles)

  const dispatch = useDispatch<Dispatch>()
  const canvasPercentage = useSelector(
    (state: RootState) => state.mainStore.canvasPercentage
  )

  const setViewportPosition = () => {
    if (!canvasRef.current) {
      return
    }
    const canvasWidth = canvasRef.current.clientWidth
    const canvasHeight = canvasRef.current.clientHeight

    if (canvasHeight / canvasWidth > VIEWPORT_RATIO) {
      const viewportActualWidth = canvasWidth * (canvasPercentage / 100)
      dispatch.mainStore.SET_CANVAS_SCALE(viewportActualWidth / VIEWPORT_WIDTH)
      setViewportStyles({
        ...defaultCiewportStyles,
        left: (canvasWidth - viewportActualWidth) / 2,
        top: (canvasHeight - viewportActualWidth * VIEWPORT_RATIO) / 2
      })
    } else {
      const viewportActualHeight = canvasHeight * (canvasPercentage / 100)
      dispatch.mainStore.SET_CANVAS_SCALE(
        viewportActualHeight / VIEWPORT_HEIGHT
      )
      setViewportStyles({
        ...defaultCiewportStyles,
        left: (canvasWidth - viewportActualHeight / VIEWPORT_RATIO) / 2,
        top: (canvasHeight - viewportActualHeight) / 2
      })
    }
  }

  useEffect(setViewportPosition, [canvasPercentage])

  const resizeObserver = new ResizeObserver(
    _.throttle(setViewportPosition, 100)
  )

  useEffect(() => {
    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current)
    }
    return () => {
      if (canvasRef.current) {
        resizeObserver.unobserve(canvasRef.current)
      }
    }
  }, [])

  return { viewportStyles }
}
