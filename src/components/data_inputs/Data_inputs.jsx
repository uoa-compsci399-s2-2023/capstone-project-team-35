import './data_inputs.css'
import React, { useState, useEffect, useRef } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import axios from "axios";

const Data_inputs = () => {
  // Page navigation
  const navigate = useNavigate();

  const navigateToResults = () => {
    // 👇️ navigate to /contacts
    navigate('/results');
  };

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate('/');
  };

  // Flask intergration starts here:
  
  // Declare variables to manage the POST and GET request between the front-end and back-end
  const [selectedImage, setSelectedImage] = useState(null); // Holds the selected image file
  const [uploadedImages, setUploadedImages] = useState([]); // Holds the list of uploaded image filenames
  const [uploadStatus, setUploadStatus] = useState(''); // Displays the status of the image upload
  const [message, setMessage] = useState(''); // Holds general messages related to the backend - doesn't do much but is used for the clearImages fucntion 
  const input_form = useRef(); // References the React form where the images will be uploaded from
  const [isImageSelected, setIsImageSelected] = useState(false);


  // Function to handle image selection
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setIsImageSelected(true);
    //input_form.current.submit(); // This line would submit the form automatically when the image is selected (not working beacuse it isn't calling the handleFormSubmit after submittion)
  }

  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    clearImages(); // Clear uploaded images before submitting a new one
    event.preventDefault();

    // Create a FormData object to send the selected image
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      // Send a POST request to the '/upload' endpoint in the backend to upload the image
      await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadStatus('Image uploaded successfully!');
      setSelectedImage(null); // Clear the selected image after successful upload
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus('Error uploading image: ' + error.message);
    }
  };

  // Function to fetch the list of uploaded images from the backend - the is just to test if it was working, will be relocated to to results page.
  const fetchImages = async () => {
    try {
      // Send a GET request to the '/get_images' endpoint in the backend to fetch uploaded images
      const response = await axios.get('/get_images');
      setUploadedImages(response.data); // Update the state with fetched image filenames
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  // Run the 'fetchImages' function after the component is initially rendered.
  useEffect(() => {
    fetchImages();
  }, []);

  // Function to clear uploaded images
  const clearImages = async () => {
    try {
      // Send a POST request to the '/clear_images' endpoint to clear uploaded images
      const response = await axios.post('/clear_images');
      setMessage(response.data); // Update the state with the response message
    } catch (error) {
      console.error('Error clearing images:', error);
    }
  };

  // Flask intergration ends here
  
  // Placeholder list of insect types
  let options = [
    {label: "Fruit Fly", value: "fruit_fly"},
    {label: "Beetle", value: "beetle"},
    {label: "Moth", value: "moth"}
  ]

  // Currently select insect type
  const [selectedValue, setSelectedValue] = useState("")
  const [selectedCircleClass, setSelectedCircleClass] = useState("")
  const [selectedCircleText, setSelectedCircTextleText] = useState("1")
  const [selectedUploadClass, setSelectedUploadClass] = useState("off")

  // Dropdown onChange handler
  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value)
    setSelectedCircleClass("selected")
    setSelectedUploadClass("selected_upload")
    setSelectedCircTextleText("E")
  }

  // Handles file being dragged into input
  const [isImageDragging, setIsImageDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsImageDragging(true);
  };

  const handleDragLeave = () => {
    setIsImageDragging(false);
  };

  const uploadClass = isImageDragging
    ? 'image-dragging'
    : isImageSelected
    ? 'image-selected'
    : '';

  return (
    <div>
    <div className='Inputs'>

        {/* Square 1 */}
        <div className='grid_circle_1'>
          <div className={`circlier_number circle ${selectedCircleClass}`}><p className={selectedCircleClass}>{selectedCircleText}</p></div> 
        </div>

        {/* Square 2 */}
        <div className='grid_selection1'>

          {/* Insect type dropdown selection */}
          <select className={`button ${selectedCircleClass}`} onChange={handleSelectChange}>
            <option selected disabled className='off'>Select Insect <i class="arrow"></i></option>
            {options.map((option) => <option value={option.value}>{option.label}</option>)}
          </select>

        </div>
        
        {/* Square 3 */}   
        <div className='grid_connector'>
          <div className='connector'></div>
        </div>

        {/* Square 4 */}
        <div className="grid_circle_2">
            <div className='circlier_number'>2</div> {/* Orange number circle */}
          </div>

        {/* Square 5 */}
        <div className="grid_selection2">
            <p className='upload'>Upload Images</p>
        </div>

        {/* Square 6 */}
        <div className="grid_upload">
          <form onSubmit={handleFormSubmit} ref={input_form} className={selectedUploadClass}>
            <div className={`${selectedUploadClass} ${uploadClass}`} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}>
              <input type="file" className={selectedUploadClass} onChange={handleImageChange} name='image_input'/>
            </div>
            
            {/* Square 7 */}
            <div className='grid_submit'>
              <button className={selectedUploadClass} type="submit">Identify</button> 
            </div>
          </form>
        </div>

    {/* Ends Input */}
    </div> 

    {/* Form where the images are uploaded */}
    
  </div>
  )
}

export default Data_inputs
