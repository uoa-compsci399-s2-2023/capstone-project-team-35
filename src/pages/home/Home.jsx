import React from "react";
import "./home.css";
import { ControlFrame, Title } from "../../containers";

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

export default Home;
