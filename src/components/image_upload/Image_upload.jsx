import React from 'react'
import axios from "axios";
import './image_upload.css'

const Image_upload = () => {
  
  // flask intergration starts
  const [profileData, setProfileData] = React.useState(null)

  function getData() {
    axios({
      method: "GET",
      url:"/profile",
    })
    .then((response) => {
      const res =response.data
      setProfileData(({
        test_data: res.test}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    function InsertImage(body){
        return fetch(`http://localhost:5000/image`,{
            'method':'POST',
            headers : {
            'Content-Type':'application/json'
      },
      body:JSON.stringify(body)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    }

    const [image, setImage] = React.useState(null)

    const sendData = () => {
      InsertImage({image})
      .then((response) => {
        sendData(response)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })}

      const handleSubmit=(event)=>{ 
        event.preventDefault()
        sendData()
        setImage('')
      }
    // flask intergration ends

  return (
    <div className='image_upload'>
      <div className='circlier_number'>2</div>
      
      <form onSubmit = {handleSubmit}>
      <input 
          type="text"
          className="form-control" 
          placeholder ="Enter title"
          value={image}
          onChange={(e)=>setImage(e.target.value)}
          required
          />
      </form>


      <button onClick={getData}>See info</button>
        {profileData && <div>
              <p>Test info: {profileData.test_data}</p>
            </div>
        }
    </div>
  )
}

export default Image_upload
