import React from "react";

import "./App.css";
import { ControlFrame, Title } from "./containers";
import Results from "./pages/results";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="App">
      <div className="title">
        <Title />
      </div>
      <div>
        <ControlFrame />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/results" exact element={<Results />} />
      </Routes>
    </div>
  );
};

export default App;
