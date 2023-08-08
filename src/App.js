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
      <div>
        <Control_frame />
      </div>
    </div>
  )
}

export default App
