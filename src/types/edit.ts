export interface CreateElementSelectionData {
  start: [number, number]
  end: [number, number]
}

export interface CreatingTextElement {
  type: 'text'
}
export interface CreatingShapeElement {
  type: 'shape'
  data: any
}
export interface CreatingLineElement {
  type: 'line'
  data: any
}
export type CreatingElement =
  | CreatingTextElement
  | CreatingShapeElement
  | CreatingLineElement
