import "./data-inputs.css";
import React, { useState, useEffect, useRef } from "react";
// import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

import RootContext from "../../providers/root";
import { useContext } from "react";

const DataInputs = () => {
  const { selectedValue, setSelectedValue, setCurrentPage, setData } = useContext(RootContext);

  // Declare variables to manage the POST and GET request between the front-end and back-end
  const [selectedImages, setSelectedImages] = useState([]); // Holds the selected image file
  const [uploadStatus, setUploadStatus] = useState(""); // Displays the status of the image upload
  const input_form = useRef(); // References the React form where the images will be uploaded from
  const [isImageSelected, setIsImageSelected] = useState(false); // Boolean which determines if the input contains images

  // Handles file being dragged into input
  const [isImageDragging, setIsImageDragging] = useState(false);

  // Set classes for certain components
  const [selectedCircleClass, setSelectedCircleClass] = useState("");
  const [selectedCircleText, setSelectedCircTextleText] = useState("1");
  const [selectedUploadClass, setSelectedUploadClass] = useState("off");

  // A list of all the different insect types
  const [getOptions, setOptions] = useState([]);

  // Function to handle image selection
  const handleImageChange = (event) => {
    const selectedImage = Array.from(event.target.files);
    setSelectedImages(selectedImage);
    setIsImageSelected(true);
  };

  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object to send the selected image
    const formData = new FormData();
    selectedImages.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });

    try {
      // Send a POST request to the '/classify' endpoint in the backend to upload the image
      const response = await axios.post(`/classify/${selectedValue}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      // Stores the return prediction value of the endpoints and stores it in a global variable
      const predictions = response.data; 
      setData({ predictions });
      
      setUploadStatus("Image uploaded successfully!"); // Set image upload status
      setSelectedImages([]); // Clear the selected image after successful upload
      setCurrentPage("loading") // After image is uploaded, navigate to the loading page
    } catch (error) {

      // Display errors/status if there is an error
      console.error("Error uploading image:", error);
      setUploadStatus("Error uploading image: " + error.message);
    }
  };

  // Run the 'fetchInsectTypes' function after the component is initially rendered.
  useEffect(() => {
    // This function accesses the /get_insect_types endpoint
    const fetchInsectTypes = async () => {
      try {
        // Stores the returned array of insect types
        const response = await axios.get("/get_insect_types");
        setOptions(response.data);
      } catch (error) {
        console.error("Error fetching insect types:", error);
      }
    };

    fetchInsectTypes();
  }, []);
  

  // Dropdown onChange handler
  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
    setSelectedCircleClass("selected");
    setSelectedUploadClass("selected_upload");
    setSelectedCircTextleText("E");
  };

  // Dragging image into file input handler
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsImageDragging(true);
    setIsImageSelected(true)
  };
  
  // Dragging image out of file input handler
  const handleDragLeave = () => {
    setIsImageDragging(false);
    setIsImageSelected(false)
  };

  // Variable whichs help component change classes which image is dragged over input
  const uploadClass = isImageDragging
    ? "image-dragging"
    : isImageSelected
    ? "image-selected"
    : "";

  return (
    <div>
      <div className="Inputs">
        {/* Square 1 */}
        <div className="grid_circle_1">
          <div className={`circlier_number circle ${selectedCircleClass}`}> {/* Orange number circle */}
            <p className={selectedCircleClass}>{selectedCircleText}</p>
          </div>
        </div>

        {/* Square 2 */}
        <div className="grid_selection1">

          {/* Insect type dropdown selection */}
          <select
            className={`button ${selectedCircleClass}`}
            onChange={handleSelectChange}
          >
            <option selected disabled className="off">
              Select Insect <i className="arrow"></i>
            </option>
            {getOptions.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Square 3 */}
        <div className="grid_connector">
          {/* Orange line between the circles */}
          <div className="connector"></div>
        </div>

        {/* Square 4 */}
        <div className="grid_circle_2">
          <div className="circlier_number">2</div> {/* Orange number circle */}
        </div>

        {/* Square 5 */}
        <div className="grid_selection2">
          <p className="upload">Upload Images</p>
        </div>

        {/* Square 6 */}
        <div className="grid_upload">
          {/* Image upload form */}
          <form
            onSubmit={handleFormSubmit}
            ref={input_form}
            className={selectedUploadClass}
          >
            {/* Div which controls the styling of the input as the actual input is invisible */}
            <div
              className={`${selectedUploadClass} ${uploadClass} ${isImageSelected ? "hasImage" : ""}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
            >
              {/* The actual file input */}
              <input
                type="file"
                className={selectedUploadClass}
                onChange={handleImageChange}
                multiple
                name="image_input"
              />
              {/* Status message if there is an error */}
              <p>{uploadStatus}</p>
            </div>

            {/* Square 7 */}
            <div className="grid_submit">
              {/* Submit button */}
              <button disabled={!isImageSelected} className={`${selectedUploadClass} ${isImageSelected ? "enabled" : ""}`} type="submit">
                Identify
              </button>
            </div>
          </form>
        </div>

        {/* Ends Input */}
      </div>
    </div>
  );
};

export default DataInputs;
