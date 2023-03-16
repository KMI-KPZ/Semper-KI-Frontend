import React, { ReactNode, useContext, useEffect } from "react";
import { AppContext } from "../App/App";

interface Props {
  open: boolean;
  onOutsideClick(): void;
  children: ReactNode;
}

const PopUp: React.FC<Props> = (props) => {
  const { children, open, onOutsideClick } = props;
  const { setAppState } = useContext(AppContext);

  useEffect(() => {
    setAppState((prevState) => ({ ...prevState, stopScroll: open }));
  }, [open]);

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
      className={`${
        open === true
          ? "fixed top-0 left-0 bottom-0 right-0 bg-black/50 flex flex-col justify-center items-center"
          : "hidden"
      }`}
      onClick={handleOnClickBackground}
      onMouseDown={(e) => handleOnClickBackground}
    >
      {open === true ? (
        <div
          className="flex flex-col justify-center items-center"
          onClick={handleOnClickChildren}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default PopUp;
