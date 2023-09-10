import RootContext from "@/providers/root";
import { useContext, useEffect } from "react";

const LoadingPage = () => {
  const { setData, setCurrentPage } = useContext(RootContext);

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
            setCurrentPage("upload");
          }
        });
    }, 1000);
  }, []);

  return <div>Loading...</div>;
};

export default LoadingPage;
