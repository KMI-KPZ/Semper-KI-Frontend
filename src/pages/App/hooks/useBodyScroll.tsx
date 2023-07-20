import { useEffect } from "react";

interface ReturnProps {
  setScroll(stopScroll: boolean): void;
}

const useBodyScroll = (stopScroll?: boolean): ReturnProps => {
  const setScroll = (stopScroll: boolean) => {
    document.body.style.overflowY = stopScroll === true ? "hidden" : "scroll";
    document.body.style.scrollbarGutter = "stable";
    // document.body.style.paddingRight = stopScroll === true ? "17px" : "";
  };

  if (stopScroll !== undefined) {
    useEffect(() => {
      setScroll(stopScroll);
    }, [stopScroll]);
  }

  return {
    setScroll,
  };
};

export default useBodyScroll;
