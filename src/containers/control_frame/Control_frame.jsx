import React from 'react'
import './control_frame.css'
import { Image_upload, Insect_type, Data_inputs } from '../../components/index'

const Control_frame = () => {
  return (
    <div className='frame'>
      <h1>Pest Identification in 2 easy steps</h1>
      {/* Layout grid - will probs change the class names tho */}
      <Data_inputs />
    </div>
  )
}

export default Control_frame
