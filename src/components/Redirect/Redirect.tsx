import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

interface Props {
  link: string;
  time?: number;
  text?: string;
  extern?: boolean;
}

const Redirect: React.FC<Props> = (props) => {
  const { link, time, text, extern } = props;
  const navigate = useNavigate();

  const openLink = () => {
    if (extern !== undefined && extern === true) {
      window.location.href = link;
    } else {
      navigate(link);
    }
  };

  useEffect(() => {
    if (time === undefined) {
      openLink();
    } else {
      setTimeout(() => {
        openLink();
      }, time);
    }
  }, []);

  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      {text}
      <LoadingAnimation />
    </div>
  );
};

export default Redirect;
