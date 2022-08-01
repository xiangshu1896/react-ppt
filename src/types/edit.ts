import { ShapeMenuItem } from '@/configs/shape'

export interface CreateElementSelectionData {
  start: [number, number]
  end: [number, number]
}

export interface CreatingTextElement {
  type: 'text'
}
export interface CreatingShapeElement {
  type: 'shape'
  data: ShapeMenuItem
}
export interface CreatingLineElement {
  type: 'line'
  data: any
}
export type CreatingElement =
  | CreatingTextElement
  | CreatingShapeElement
  | CreatingLineElement

export interface DrawPosition {
  startPageX: number
  startPageY: number
  endPageX: number
  endPageY: number
}
