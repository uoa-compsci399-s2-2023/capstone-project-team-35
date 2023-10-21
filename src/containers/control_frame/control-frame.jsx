import React from "react";
import "./control-frame.css";
import { DataInputs } from "../../components";

const ControlFrame = () => {
  return (
    <div className="frame">
      <h1>Pest Identification in 2 easy steps</h1>
      <div className="data_inputs">
        <DataInputs />
      </div>
    </div>
  );
};

export default ControlFrame;
