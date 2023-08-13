import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import './image_upload.css'

const Image_upload = () => {
  
  // flask intergration starts
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [message, setMessage] = useState('');
  const input_form = useRef();

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
    //input_form.current.submit();
  };

  const handleFormSubmit = async (event) => {
    clearImages();
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadStatus('Image uploaded successfully!');
      setSelectedImage(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus('Error uploading image: ' + error.message);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get('/get_images');
      setUploadedImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const clearImages = async () => {
    try {
      const response = await axios.post('/clear_images');
      setMessage(response.data);
    } catch (error) {
      console.error('Error clearing images:', error);
    }
  };  
  // flask intergration ends

  return (
    <div className='image_upload'>
      <div class="image_upload_grid">
        <div id="image_upload_circle">
          <div className='circlier_number'>2</div>
        </div>
        <div id="image_upload_input">
          <form onSubmit={handleFormSubmit} ref={input_form}>
            <input type="file" onChange={handleImageChange} name='image_input'/>
            <button type="submit">Upload Image</button>
        </form>
        </div>
      </div>

      {uploadStatus && <p>{uploadStatus}</p>}

      <h2>Uploaded Images:</h2>
      <ul>
        {uploadedImages.map((imagePath, index) => (
          <li key={index}><img src={imagePath} alt={`Image ${index}`} /></li>
        ))}
      </ul>
    </div>
  )
}

export default Image_upload
