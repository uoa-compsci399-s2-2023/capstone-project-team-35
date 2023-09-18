import RootContext from "../../providers/root";
import { useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./loading.css";

const LoadingPage = () => {
  const { selectedImages, setSelectedImages, data, setData, setCurrentPage, selectedValue } = useContext(RootContext);
  const [uploadStatus, setUploadStatus] = useState(""); // Displays the status of the image upload
  
  
  useEffect(() => {
    const formData = new FormData();
    selectedImages.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });
  
    const fetchData = async () => { // Declare an async function
      try {
        // Send a POST request to the '/classify' endpoint in the backend to upload the image
        const response = await axios.post(
          `/classify/${selectedValue}`,
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
  
        setUploadStatus("Image uploaded successfully!"); // Set image upload status
        setSelectedImages([]); // Clear the selected image after successful upload
        setCurrentPage("results");
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
      <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>    
    </div>
  )
};

export default LoadingPage;
