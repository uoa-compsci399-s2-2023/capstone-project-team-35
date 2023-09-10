import React from "react";
import "./control-frame.css";
import ImageUpload from "../../components/image_upload";
import InsectType from "../../components/insect_type";
import DataInputs from "../../components/data_inputs/data-inputs";

const ControlFrame = () => {
  return (
    <div className="frame">
      <h1>Pest Identification in 2 easy steps</h1>
      {/* Layout grid - will probs change the class names tho */}
      <DataInputs />
    </div>
  );
};

export default ControlFrame;
