export const enum ElementTypes {
  TEXT = 'text',
  IMAGE = 'image',
  SHAPE = 'shape',
  TABLE = 'table'
}

/**
 * 页面
 *
 * id：页面id
 *
 * elements：元素
 */
export interface Slide {
  id: string
  elements: PPTElement[]
}

/**
 * 基础元素
 *
 * id：元素id
 *
 * left：元素水平位置
 *
 * top：元素垂直位置
 *
 * width：元素宽度
 *
 * height：元素高度
 */
interface PPTBaseElement {
  id: string
  left: number
  top: number
  width: number
  height: number
}

export type PPTElement =
  | PPTTextElement
  | PPTImageElement
  | PPTShapeElement
  | PPTTableElement

/**
 * 文本元素
 *
 * type：类型（文本）
 *
 * content：文本内容
 *
 * defaultColor：默认文字颜色
 */
export interface PPTTextElement extends PPTBaseElement {
  type: 'text'
  content: (CustomElement | CustomText)[]
  defaultColor: string
  outline?: PPTElementOutline
}

/**
 * 图片元素
 *
 * type：类型（图片）
 *
 * url：图片地址
 */
export interface PPTImageElement extends PPTBaseElement {
  type: 'image'
  url: string
}

/**
 * 形状元素
 *
 * type: 类型（形状）
 *
 * viewBox: SVG的viewBox属性
 *
 * path: 形状路径
 *
 * fill: 填充
 *
 * outlineColor: 边框颜色
 *
 */
export interface PPTShapeElement extends PPTBaseElement {
  type: 'shape'
  viewBox: [number, number]
  path: string
  fill: string
  outlineColor?: string
}

/**
 * 表格元素
 */
export interface PPTTableElement extends PPTBaseElement {
  type: 'table'
  content: (CustomElement | CustomText)[]
}

/**
 * 元素边框
 *
 * style?: 边框样式（实线或虚线）
 *
 * width?: 边框宽度
 *
 * color?: 边框颜色
 */
export interface PPTElementOutline {
  style?: 'dashed' | 'solid'
  width?: number
  color?: string
}

/**
 * 通用元素的位置大小
 */
export interface CommonElementPosition {
  left: number
  top: number
  width: number
  height: number
}

/**
 * slate自定义元素
 */
export type CustomElement = {
  type: 'paragraph' | 'table' | 'table-cell' | 'table-row'
  children: (CustomText | CustomElement)[]
  width?: string
  height?: string
}
export type CustomText = { text: string; bold?: true }
