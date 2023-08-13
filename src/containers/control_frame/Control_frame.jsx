import React from 'react'
import './control_frame.css'
import { Image_upload, Insect_type } from '../../components/index'

const Control_frame = () => {
  return (
    <div className='frame'>
      <h1>Pest Identification in 2 easy steps</h1>
      {/* Layout grid - will probs change the class names tho */}
      <div className='options'>
        <div className='option1'>
          <Insect_type />
        </div>
        <div className='option2'>
          <Image_upload />
        </div>
      </div>
    </div>
  )
}

export default Control_frame
