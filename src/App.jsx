import React from "react";
import { useState } from "react";
import RootContext from "./providers/root";
import { ResultsPage, LoadingPage, HomePage } from "./pages";
import "./App.css";

export const PageName = "results" | "loading";

const App = () => {
  const [currentPage, setCurrentPage] = useState(PageName);
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  // Root page navigation setup.
  const renderPage = () => {
    switch (currentPage) {
      case "results":
        return <ResultsPage />;
      case "loading":
        return <LoadingPage />;
      default:
        return <HomePage />;
    }
  };
  return (
    // List of global variables used through the project.
    <div>
      <RootContext.Provider
        value={{
          data,
          setData,
          setCurrentPage,
          selectedValue,
          setSelectedValue,
          selectedImages,
          setSelectedImages
        }}
      >
        {renderPage()}
      </RootContext.Provider>
    </div>
  );
};

export default App;