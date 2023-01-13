import React, { useEffect } from "react";
import "./Redirect.scss";

const Redirect: React.FC<{ link: string }> = ({ link }) => {
  useEffect(() => {
    window.location.href = link;
  }, []);

  return (
    <div className="lds-circle">
      <div></div>
    </div>
  );
};

export default Redirect;
