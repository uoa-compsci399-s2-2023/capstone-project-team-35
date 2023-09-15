import React from "react";
import "./title.css";
// import logo from "./logo.png";
import main_logo from "../../assets/branding/main_logo.svg";

const Title = () => {
  return (
    <div className="title">
      <img src={main_logo} />
      <h3>your biosecurity buddy</h3>
    </div>
  );
};

export default Title;
