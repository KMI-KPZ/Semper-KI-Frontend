import React, { ReactNode } from "react";
import "./LoadingAnimation.scss";

interface Props {
  color?: string;
}

const LoadingAnimation: React.FC<Props> = (props) => {
  const { color } = props;
  return (
    <div className="lds-circle inline-block">
      <div
        className={`${
          color !== undefined ? "bg-".concat(color) : "bg-white"
        } inline-block w-16 h-16 m-2 rounded-full `}
      ></div>
    </div>
  );
};

export default LoadingAnimation;
