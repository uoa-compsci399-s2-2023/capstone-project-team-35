import RootContext from "../../providers/root";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import "./loading.css";

const LoadingPage = () => {
  const { data, setData, setCurrentPage } = useContext(RootContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (data && data.predictions) {
      // You already have the predictions, no need to fetch them again
      //console.log(data.predictions)
      // Use predictions as needed
      setCurrentPage("results"); // Navigate to the results page
    } else {
      console.error("No predictions data available.");
      if (window.confirm("Error loading data. Proceed to the previous page?")) {
        navigate("/");
      }
    }
  }, []);
  
  // useEffect(() => {
  //   // Fetch predictions from the '/classify' endpoint using Axios
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`/classify/${selectedValue}`); // Adjust the URL as needed
  //       const data = response.data; // Get the data from the Axios response
  //       setData(data); // Update the data with predictions
  //       setCurrentPage("results"); // Navigate to the results page
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       if (window.confirm("Error loading data. Proceed to the previous page?")) {
  //         navigate("/");
  //       }
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     fetch("sample.json")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setData(data);
  //         //setCurrentPage("results");
  //       })
  //       .catch(() => {
  //         if (window.confirm("Error loading data. Proceed to previous page?")) {
  //           navigate("/");
  //         }
  //       });
  //   }, 1000);
  // }, []);

  return (
    <div>
      <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>    
      </div>
  )
};

export default LoadingPage;
