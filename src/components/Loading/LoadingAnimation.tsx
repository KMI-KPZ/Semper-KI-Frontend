import React, { ReactNode } from "react";
import { Icon3DPrinter } from "../../constants/Icons";
// import "./LoadingAnimation.scss";

interface Props {
  color?: string;
}

const LoadingAnimation: React.FC<Props> = (props) => {
  const {} = props;
  return (
    <div className="">
      <div className="h-24 w-24 animate-bounce">
        <img src={require("../../assets/images/logo192.png")} alt="" />
      </div>
    </div>
  );
};

export default LoadingAnimation;
