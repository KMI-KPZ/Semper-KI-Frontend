import React from "react";
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loader">
      <div className="wave wave-1"></div>
      <div className="wave wave-2"></div>
      <div className="wave wave-3"></div>
    </div>
  );
};

export default Loading;
