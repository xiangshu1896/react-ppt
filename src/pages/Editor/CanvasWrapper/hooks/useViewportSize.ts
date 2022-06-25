import { RefObject, useEffect } from 'react'
import {
  VIEWPORT_WIDTH,
  VIEWPORT_HEIGHT,
  VIEWPORT_RATIO
} from '@/configs/canvas'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import { useSetState } from 'react-use'
import _ from 'lodash'

export default (canvasRef: RefObject<HTMLDivElement>) => {
  const [viewportStyles, setViewportStyles] = useSetState({
    width: VIEWPORT_WIDTH,
    height: VIEWPORT_HEIGHT,
    left: 0,
    top: 0
  })

  const dispatch = useDispatch<Dispatch>()
  const canvasPercentage = useSelector(
    (state: RootState) => state.mainStore.canvasPercentage
  )

  // 更新视图大小位置、缩放比
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
        left: (canvasWidth - viewportActualWidth) / 2,
        top: (canvasHeight - viewportActualWidth * VIEWPORT_RATIO) / 2
      })
    } else {
      const viewportActualHeight = canvasHeight * (canvasPercentage / 100)
      dispatch.mainStore.SET_CANVAS_SCALE(
        viewportActualHeight / VIEWPORT_HEIGHT
      )
      setViewportStyles({
        left: (canvasWidth - viewportActualHeight / VIEWPORT_RATIO) / 2,
        top: (canvasHeight - viewportActualHeight) / 2
      })
    }
  }

  // 监听视图占比变化时更新
  useEffect(setViewportPosition, [canvasPercentage])

  // 监听窗口变化时更新
  const resizeObserver = new ResizeObserver(_.throttle(setViewportPosition, 20))

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
