import { Slide } from '@/types/slides'
import { nanoid } from 'nanoid'

export const slides: Slide[] = [
  {
    id: 'asd09g809',
    elements: [
      {
        id: 'a908dsf09',
        type: 'text',
        left: 80,
        top: 90,
        width: 100,
        height: 42,
        content: '测试文本',
        defaultColor: '#333'
      },
      {
        id: 'gasdaggeqeh79ads7f8',
        type: 'image',
        left: 180,
        top: 290,
        width: 100,
        height: 100,
        url: 'https://markdown.com.cn/assets/img/philly-magic-garden.9c0b4415.jpg'
      },
      {
        id: 'fa7s9d7f98a7sd98f',
        type: 'shape',
        left: 180,
        top: 290,
        width: 100,
        height: 100,
        viewBox: [200, 200],
        path: 'M 0 0 L 0 200 L 200 200 Z',
        fill: '#5b9bd5',
        outlineColor: '#333'
      }
    ]
  },
  {
    id: 'agds0a70dg7a0sdg',
    elements: []
  }
]

export const createBlankSlide = (): Slide => ({
  id: 'slide_' + nanoid(),
  elements: []
})
