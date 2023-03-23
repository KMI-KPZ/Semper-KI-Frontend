import React, { ReactNode } from "react";
import "./LoadingAnimation.scss";

interface Props {
  className?: string;
}

const LoadingAnimation: React.FC<Props> = (props) => {
  const { className } = props;
  return (
    <div className="lds-circle inline-block">
      <div
        className={`${className} bg-white inline-block w-16 h-16 m-2 rounded-full`}
      ></div>
    </div>
  );
};

export default LoadingAnimation;
