import RootContext from "../../providers/root";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import logo from "../../assets/ui-elements/logo.png";
import "./loading.css";

const LoadingPage = () => {
  // List of retrieved global variables from App.jsx.
  const {
    selectedImages,
    setSelectedImages,
    setData,
    setCurrentPage,
    selectedValue,
  } = useContext(RootContext);
  const [uploadStatus, setUploadStatus] = useState(""); // Displays the status of the image upload
  const [transition, setTransition] = useState(false);

  // Is triggered as soon as the page loads.
  useEffect(() => {
    const formData = new FormData();
    selectedImages.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });

    const fetchData = async () => {
      try {
        // Send a POST request to the '/classify' endpoint in the backend to upload the image. This is on the backend server hosted at 'http://localhost:5000'
        const response = await axios.post(
          `http://localhost:5000/classify/${selectedValue}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Stores the return prediction value of the endpoints and stores it in a global variable
        const predictions = response.data;
        console.log(predictions);
        setData({ predictions });

        // Enables the transition into the results page to start.
        setTransition(true);

        // Waits for 2 seconds (waiting for the previous transition to finish) before navigating to the results page.
        setTimeout(() => {
          setUploadStatus("Image uploaded successfully!"); // Set image upload status
          setSelectedImages([]); // Clear the selected image after successful upload
          setCurrentPage("results");
        }, "2000");
      } catch (error) {
        // Display errors/status if there is an error
        console.error("Error uploading image:", error);
        setUploadStatus("Error uploading image: " + error.message);
      }
    };

    fetchData(); // Call the async function
  }, []);

  return (
    <div>
      {/* Status message if there is an error */}
      <p>{uploadStatus}</p>

      {/* Div containing the laoding spinner, image and message. */}
      <div className={`loading_container  ${transition ? "loading_container_transition" : ""}`}>

        {/* Insect logo image */}
        <img
          className={`logo ${transition ? "logo_transition" : ""}`}
          src={logo}
          alt="insect logo"
        ></img>

        {/* The loading spinner */}
        <div id="loading-bar-spinner" className="spinner">
          <div
            className={`spinner-icon ${transition ? "spinner_transition" : ""}`}
          ></div>
        </div>

        {/* The loading text */}
        <p className="loading_text">we're working on it!</p>
      </div>
    </div>
  );
};

export default LoadingPage;
