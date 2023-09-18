import RootContext from "../../providers/root";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./loading.css";

const LoadingPage = () => {
  const { data, setCurrentPage } = useContext(RootContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (data && data.predictions) {
      
      // Load for 2 seconds because it looks cool and professional 
      const timer = setTimeout(() => {
        setCurrentPage("results");
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      console.error("No predictions data available.");
      if (window.confirm("Error loading data. Proceed to the previous page?")) {
        navigate("/");
      }
    }
  }, []);

  return (
    <div>
      <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>    
      </div>
  )
};

export default LoadingPage;
