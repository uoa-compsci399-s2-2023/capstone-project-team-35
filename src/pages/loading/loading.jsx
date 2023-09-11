import RootContext from "../../providers/root";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./loading.css";

const LoadingPage = () => {
  const { setData, setCurrentPage } = useContext(RootContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      fetch("sample.json")
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setCurrentPage("results");
        })
        .catch(() => {
          if (window.confirm("Error loading data. Proceed to previous page?")) {
            navigate("/");
          }
        });
    }, 1000);
  }, []);

  return (
    <div>
      <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>      
    </div>
  )
};

export default LoadingPage;
