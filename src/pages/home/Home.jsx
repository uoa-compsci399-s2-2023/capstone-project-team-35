import React from "react";
import "./home.css";
import { ControlFrame, Title } from "../../containers";

const Home = () => {
    return (
      <div className="App">
        <div className="title_container">
          <Title />
        </div>
        <div className="control_frame_container">
          <ControlFrame />
        </div>
      </div>
    );
  };

export default Home;
