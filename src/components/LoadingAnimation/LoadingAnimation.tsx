import React, { ReactNode } from "react";
import "./LoadingAnimation.scss";

interface Props {
  type?: number;
}

const WaveAnimation: ReactNode = (
  <div className="loader">
    <div className="wave wave-1"></div>
    <div className="wave wave-2"></div>
    <div className="wave wave-3"></div>
  </div>
);

const CoinAnimation: ReactNode = (
  <div className="lds-circle">
    <div></div>
  </div>
);

const LoadingAnimation: React.FC<Props> = (props) => {
  const { type } = props;
  if (type !== undefined) {
    switch (type) {
      case 0:
        return CoinAnimation;
      case 1:
        return WaveAnimation;
      default:
        return CoinAnimation;
    }
  }
  return CoinAnimation;
};

export default LoadingAnimation;
