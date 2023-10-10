import React from "react";
import "./control-frame.css";
import { DataInputs, ImageUpload, InsectType } from "../../components";

const ControlFrame = () => {
  return (
    <div className="frame">
      <h1>Pest Identification in 2 easy steps</h1>
      {/* Layout grid - will probs change the class names tho */}
      <div className="data_inputs"><DataInputs /></div>
    </div>
  );
};

export default ControlFrame;
