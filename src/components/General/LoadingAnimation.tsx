import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LogoURL from "@images/logo192.png";

interface Props {
  color?: string;
  text?: boolean;
}

const LoadingAnimation: React.FC<Props> = (props) => {
  const { color, text } = props;
  const { t } = useTranslation();
  const [state, setState] = useState<number>(0);

  useEffect(() => {
    if (text) {
      const intervalId = setInterval(() => {
        setState((count) => (count + 1) % 5);
      }, 500);

      return () => clearInterval(intervalId);
    }
  }, []);

  if (text)
    return (
      <div className="flex flex-row">
        {text}
        <div className={` ${state > 0 ? "" : "invisible"}`}>.</div>
        <div className={` ${state > 1 ? "" : "invisible"}`}>.</div>
        <div className={` ${state > 2 ? "" : "invisible"}`}>.</div>
      </div>
    );
  return (
    <div className="">
      <div className="h-24 w-24 animate-bounce">
        <img src={LogoURL} alt="" />
      </div>
    </div>
  );
};

export default LoadingAnimation;
