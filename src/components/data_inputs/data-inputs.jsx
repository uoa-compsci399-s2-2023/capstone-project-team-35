import "./data-inputs.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import upload_icon from "../../assets/ui-elements/file_upload.svg";
import edit_icon from "../../assets/ui-elements/edit_icon.svg";
import x_icon from "../../assets/ui-elements/cross-small.png";
import RootContext from "../../providers/root";
import { useContext } from "react";

// Get global variables declared in App.jsx.
const DataInputs = () => {
  const {
    selectedImages,
    setSelectedImages,
    setSelectedValue,
    setCurrentPage,
  } = useContext(RootContext);

  // Declare variables to manage the POST and GET request between the front-end and back-end.
  const input_form = useRef(); // References the React form where the images will be uploaded from.
  const [isImageSelected, setIsImageSelected] = useState(false); // Boolean which determines if the input contains images.

  // Handles file being dragged into input.
  const [isImageDragging, setIsImageDragging] = useState(false);

  // Set classes for certain components.
  const [selectedCircleClass, setSelectedCircleClass] = useState("");
  const [selectedCircleText, setSelectedCircTextleText] = useState("1");
  const [selectedUploadClass, setSelectedUploadClass] = useState("off");

  // A list of all the different insect types.
  const [getOptions, setOptions] = useState([]);

  // Function to handle image selection.
  const handleImageChange = (event) => {
    const savedImages = Array.from(event.target.files);

    // When the user adds another image, it checks if there are any images still in the array. If there is, add the new iamge to the array otherwise add it to an empty array.
    if (selectedImages.length > 0) {
      if (selectedImages.includes(savedImages)) {
        console.log("Yes");
      }

      // Adds new image to array of existing images.
      const updatedImages = selectedImages.concat(savedImages);
      setSelectedImages(updatedImages);
    } else {
      // Adds new image to a new array.
      setSelectedImages(savedImages);
    }
    setIsImageSelected(true);
  };

  // Function to handle form submission.
  const handleFormSubmit = async (event) => {
    setCurrentPage("loading");
  };

  // Run the 'fetchInsectTypes' function after the component is initially rendered.
  useEffect(() => {
    // This function accesses the /get_insect_types endpoint which is on the backend server hosted on http://localhost:5000.
    const fetchInsectTypes = async () => {
      try {
        // Retrieves an array of the total list of insect types.
        const response = await axios.get("http://localhost:5000/get_insect_types");

        // Stores the returned array of insect types in a global variable.
        setOptions(response.data);
      } catch (error) {
        console.error("Error fetching insect types:", error);
      }
    };

    fetchInsectTypes();
  }, []);

  // Dropdown onChange handler.
  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
    setSelectedCircleClass("selected");
    setSelectedUploadClass("selected_upload");
    setSelectedCircTextleText(<img src={edit_icon} alt="edit icon"></img>);
  };

  // Dragging image into file input handler.
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsImageDragging(true);
    setIsImageSelected(true);
  };

  // Dragging image out of file input handler.
  const handleDragLeave = () => {
    setIsImageDragging(false);
    setIsImageSelected(false);
  };

  // Handles removing an image from the list of seleced images.
  const handleRemoveImage = (index) => {
    const updatedSelectedImages = [...selectedImages];
    updatedSelectedImages.splice(index, 1);
    setSelectedImages(updatedSelectedImages);
    if (selectedImages.length === 1) {
      setIsImageSelected(false);
    }
  };

  // Variable whichs help component change classes which image is dragged over input
  const uploadClass = isImageDragging
    ? "image-dragging"
    : isImageSelected
    ? "image-selected"
    : "";

  return (
    <div>
      <div className={`Inputs ${selectedCircleClass}`}>
        {/* Square 1 */}
        <div className="grid_circle_1">
          {/* Orange number 1 circle */}
          <div className={`circlier_number circle ${selectedCircleClass}`}>
            {" "}
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

            {/* Adds all the insect types from the global array of insect types as <option> tags in this dropdown. */}
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
          {/* Orange number 2 circle */}
          <div className="circlier_number">
            <p>2</p>
          </div>{" "}
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
              className={`${selectedUploadClass} ${uploadClass} ${
                isImageSelected ? "hasImage" : ""
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
            >
              <div
                className={`individ_images ${
                  isImageSelected ? "enabled" : "off"
                }`}
              >
                {/* Displays all of the selected images */}
                {selectedImages.map((image, index) => (
                  <div className="image_section" key={index}>
                    <p>{image.name}</p>{" "}
                    <button
                      onClick={() => handleRemoveImage(index)}
                      type="button"
                      className="p-1"
                    >
                      {/* Delete button for each selected image in case the user wants to remove an image. */}
                      <img src={x_icon} alt="small x" className="error_btn" />
                    </button>
                  </div>
                ))}
              </div>

              {/* The actual file input */}
              <input
                type="file"
                className={`${selectedUploadClass} hello`}
                onChange={handleImageChange}
                multiple
                name="image_input"
              />
            </div>

            {/* Square 7 */}
            <div className="grid_submit">
              {/* Submit button */}
              <button
                disabled={!isImageSelected}
                className={`${selectedUploadClass} ${
                  isImageSelected ? "enabled" : ""
                }`}
                type="submit"
              >
                Identify
              </button>

              {/* Add images button, in case the user wants to add more images. */}
              <span className={isImageSelected ? "enabled" : "off"}>
                <input
                  type="file"
                  onChange={handleImageChange}
                  multiple
                  name="image_input"
                  id="file-input"
                  className="off"
                />
                <label for="file-input">
                  <img src={upload_icon} alt="upload icon"></img>
                  <p>Add Images</p>
                </label>
              </span>
            </div>
          </form>
        </div>

        {/* Ends Input */}
      </div>
    </div>
  );
};

export default DataInputs;
