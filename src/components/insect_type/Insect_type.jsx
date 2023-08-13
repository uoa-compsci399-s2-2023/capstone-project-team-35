import React from 'react'
import './insect_type.css'

const Insect_type = () => {
  return (
    <div className='insect_type'>
      {/* <div className='insect_grid'>
        <div className='circlier_number circle'>1</div>
        <div className='connector'></div>
        <button className='insect_input'>Select Insect</button>
      </div> */}




      <div className='insect_grid'>
        <div className='grid_circle'>
          <div className='circlier_number circle'>1</div> 
        </div>
        <div className='grid_type'>
          <button>Insect Type</button>
        </div>
        <div className='grid_connector'>
          <div className='connector'></div>
        </div>
      </div>
    </div>
  )
}

export default Insect_type
