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
        path: 'M 0 0 L 200 0 L 200 200 L 0 200 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 200 0 L 200 200 L 0 200 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 200 0 L 200 200 L 0 200 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 200 0 L 200 200 L 0 200 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 200 0 L 200 200 L 0 200 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 200 0 L 200 200 L 0 200 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 200 0 L 200 200 L 0 200 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 200 0 L 200 200 L 0 200 Z'
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
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z'
      }
    ]
  }
]
