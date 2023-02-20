import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Redirect.scss";

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
    <div className="redirect">
      {text}
      <div className="lds-circle">
        <div></div>
      </div>
    </div>
  );
};

export default Redirect;
