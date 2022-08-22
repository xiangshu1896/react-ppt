export interface ShapeMenuItem {
  viewBox: [number, number]
  path: string
}

interface ShapeListItem {
  type: string
  children: ShapeMenuItem[]
}

export const SHAPE_LIST_ITEM: ShapeListItem[] = [
  {
    type: '矩形',
    children: [
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 200 0 L 200 200 L 0 200 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 0 40 Q 0 0 40 0 L 160 0 Q 200 0 200 40 L 200 160 Q 200 200 160 200 L 40 200 Q 0 200 0 160 L 0 40 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 160 0 L 200 40 L 200 200 L 0 200 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 0 50 L 50 0 L 150 0 L 200 50 L 200 200 L 0 200 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 160 0 L 200 40 L 200 200 L 40 200 L 0 160 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 0 40 Q 0 0 40 0 L 160 0 L 200 40 L 200 200 L 0 200 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 160 0 Q 200 0 200 40 L 200 200 L 0 200 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 0 40 Q 0 0 40 0 L 160 0 Q 200 0 200 40 L 200 200 L 0 200 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 0 40 Q 0 0 40 0 L 200 0 L 200 160 Q 200 200 160 200 L 0 200 Z'
      }
    ]
  },
  {
    type: '常用形状',
    children: [
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 L 0 200 L 200 200 L 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 0 200 L 200 200 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 50 0 L 200 0 L 150 200 L 0 200 L 50 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 150 0 L 200 200 L 50 200 L 0 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 50 0 L 150 0 L 200 200 L 0 200 L 50 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 L 0 100 L 100 200 L 200 100 L 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 L 0 50 L 0 200 L 200 200 L 200 50 L 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 200 100 L 150 0 L 0 0 L 50 100 L 0 200 L 150 200 L 200 100 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 0 200 A 50 100 0 1 1 200 200 L 0 200 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 40 20 A 100 100 0 1 0 200 100 L 100 100 L 40 20 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 100 100 102 1 0 200 100 L 100 100 L 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 160 20 A 100 100 0 1 0 200 100 L 100 100 L 160 20 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 100 100 102 1 0 200 100 L 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 100 100 102 1 0 200 100 L 200 0 L 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 200 0 Q 200 200 0 200 L 0 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 L 0 90 L 50 200 L 150 200 L 200 90 L 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 L 0 60 L 0 140 L 100 200 L 200 140 L 200 60 L 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 60 0 L 140 0 L 200 60 L 200 140 L 140 200 L 60 200 L 0 140 L 0 60 L 60 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 75 0 L 125 0 L 175 25 L 200 75 L 200 125 L 175 175 L 125 200 L 75 200 L 25 175 L 0 125 L 0 75 L 25 25 L 75 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 150 0 A 50 100 0 1 1 150 200 L 0 200 L 0 0 L 150 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 50 0 A 25 50 0 1 0 50 200 L 150 200 A 25 50 0 1 0 150 0 L 50 0 Z'
      }
    ]
  }
]
