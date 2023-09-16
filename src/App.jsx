import React from "react";
import { useState } from "react";
import RootContext from "./providers/root";
import { ResultsPage, LoadingPage, HomePage } from "./pages";
import "./App.css";

// Previous Routing Import
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export const PageName = "results" | "loading";

const App = () => {
  const [currentPage, setCurrentPage] = useState(PageName);
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

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
    <div>
      {/* Previous Routing System */}
      {/* <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/loading" exact element={<Loading />} />
      </Routes> */}

      <RootContext.Provider
        value={{
          data,
          setData,
          setCurrentPage,
          selectedValue,
          setSelectedValue
        }}
      >
        {renderPage()}
      </RootContext.Provider>
    </div>
  );
};

export default App;