import React, { ReactNode } from "react";
import "./PopUp.scss";

interface Props {
  open: boolean;
  onOutsideClick(): void;
  children: ReactNode;
}

const PopUp: React.FC<Props> = ({ children, open, onOutsideClick }) => {
  const handleOnClickBackground = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    onOutsideClick();
  };

  const handleOnClickChildren = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className={`popup ${open ? "open" : ""}`}
      onClick={handleOnClickBackground}
      onMouseDown={(e) => handleOnClickBackground}
    >
      {open === true ? (
        <div className="popup-children" onClick={handleOnClickChildren}>
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default PopUp;
