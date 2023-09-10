import React from "react";
import "./title.css";
import logo from "./logo.png";

const Title = () => {
  return (
    <div>
      <img src={logo} />
      <h3>your biosecurity buddy</h3>
    </div>
  );
};

export default Title;
