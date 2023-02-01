import React, { ReactNode, useState } from "react";
import "./PopUp.scss";

interface Props {
  button: ReactNode;
  children: ReactNode;
}

interface State {
  open: boolean;
}

const PopUp: React.FC<Props> = ({ children, button }) => {
  const [state, setState] = useState<State>({ open: false });
  const handleOnClickButton = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setState((prevState) => ({ ...prevState, open: true }));
  };
  const handleOnClickBackground = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setState((prevState) => ({ ...prevState, open: false }));
  };
  const handleOnClickChildren = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <div
      className={`popup ${state.open ? "open" : "closed"}`}
      onClick={handleOnClickBackground}
    >
      {state.open === true ? (
        <div className="popup-children" onClick={handleOnClickChildren}>
          {children}
        </div>
      ) : (
        <div className="popup-button" onClick={handleOnClickButton}>
          {button}
        </div>
      )}
    </div>
  );
};

export default PopUp;
