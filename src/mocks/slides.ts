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
        height: 100,
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
        url: 'adsf789a7f9a7sd'
      }
    ]
  },
  {
    id: 'agds0a70dg7a0sdg',
    elements: [
      {
        id: 'gasdh79ads7f8',
        type: 'image',
        left: 80,
        top: 90,
        width: 100,
        height: 100,
        url: 'adsf789a7f9a7sd'
      }
    ]
  },
  {
    id: 'ageqw79asg98d',
    elements: [
      {
        id: '7ags9d789',
        type: 'text',
        left: 80,
        top: 90,
        width: 100,
        height: 100,
        content: '测试文本',
        defaultColor: 'black'
      }
    ]
  },
  {
    id: 'ageqw79asg9sfhwe8d',
    elements: [
      {
        id: '7ags9d789',
        type: 'text',
        left: 80,
        top: 90,
        width: 100,
        height: 100,
        content: '测试文本',
        defaultColor: 'black'
      }
    ]
  },
  {
    id: 'sdhwert',
    elements: [
      {
        id: '7ags9d789',
        type: 'text',
        left: 80,
        top: 90,
        width: 100,
        height: 100,
        content: '测试文本',
        defaultColor: 'black'
      }
    ]
  },
  {
    id: 'ageqw79asggsfg98d',
    elements: [
      {
        id: '7ags9d789',
        type: 'text',
        left: 80,
        top: 90,
        width: 100,
        height: 100,
        content: '测试文本',
        defaultColor: 'black'
      }
    ]
  },
  {
    id: 'agdsf',
    elements: [
      {
        id: '7ags9d789',
        type: 'text',
        left: 80,
        top: 90,
        width: 100,
        height: 100,
        content: '测试文本',
        defaultColor: 'black'
      }
    ]
  }
]

export const createBlankSlide = (): Slide => ({
  id: 'slide_' + nanoid(),
  elements: []
})
