import React from 'react'
import './index.scss'

interface SelectAreaProps {
  selectPosition: {
    top: number
    left: number
    width: number
    height: number
  }
}

const SelectArea: React.FC<SelectAreaProps> = props => {
  const { top, left, width, height } = props.selectPosition
  return (
    <div
      className={`select-area`}
      style={{
        top: top + 'px',
        left: left + 'px',
        width: width + 'px',
        height: height + 'px'
      }}
    ></div>
  )
}

export default SelectArea
