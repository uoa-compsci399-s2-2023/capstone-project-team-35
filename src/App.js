import React from 'react'

import './App.css'
import { Image_upload, Insect_type } from './components/index'
import { Control_frame, Title } from './containers/index'
 
const App = () => {
  return (
    <div className='App'>
      <div className='title'>
        <Title />
      </div>
      <div className='control_frame'>
        <Control_frame />
        <Image_upload />
        <Insect_type />
      </div>
    </div>
  )
}

export default App
