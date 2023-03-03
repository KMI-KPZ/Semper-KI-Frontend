import React from "react";
import "./Background.scss";

interface Props {}

const Background: React.FC<Props> = (props) => {
  return (
    <div className="app-background">
      <img
        alt=""
        className="background-bubbles-Top-Left"
        src={require("../../assets/images/Bubbles3_Trans.png")}
      />
      <img
        alt=""
        className="background-bubbles-Top-Right"
        src={require("../../assets/images/Bubbles1_Trans.png")}
      />
      <img
        alt=""
        className="background-bubbles-Bottom-Middel"
        src={require("../../assets/images/Bubbles2_Trans.png")}
      />
    </div>
  );
};

export default Background;
