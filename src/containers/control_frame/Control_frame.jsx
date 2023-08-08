import React from 'react'
import './control_frame.css'
import { Image_upload, Insect_type } from '../../components/index'

const Control_frame = () => {
  return (
    <div className='frame'>
      <h1>Pest Identification in 2 easy steps</h1>
      <div className='options'>
        <div>
          <Insect_type />
        </div>
        <div>
          <Image_upload />
        </div>
      </div>
    </div>
  )
}

export default Control_frame
