import { useEffect } from "react";

interface ReturnProps {
  setScroll(stopScroll: boolean): void;
}

const useBodyScroll = (): ReturnProps => {
  const setScroll = (stopScroll: boolean) => {
    document.body.style.overflowY = stopScroll === true ? "hidden" : "scroll";
    document.body.style.scrollbarGutter = "stable";
    // document.body.style.paddingRight = stopScroll === true ? "17px" : "";
  };

  return {
    setScroll,
  };
};

export default useBodyScroll;
