import { AppContext } from "@/pages/App";
import React, { ReactNode, useContext, useEffect } from "react";

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
          ? "fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black/50"
          : "hidden"
      }`}
      onClick={handleOnClickBackground}
      onMouseDown={(e) => handleOnClickBackground}
    >
      {open === true ? (
        <div
          className="flex flex-col items-center justify-center"
          onClick={handleOnClickChildren}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default PopUp;
