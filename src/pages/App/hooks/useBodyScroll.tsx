import { useEffect } from "react";

interface ReturnProps {}

const useBodyScroll = (stopScroll: boolean): ReturnProps => {
  useEffect(() => {
    document.body.style.overflowY = stopScroll === true ? "hidden" : "scroll";
    document.body.style.scrollbarGutter = "stable";
    // document.body.style.paddingRight = stopScroll === true ? "17px" : "";
  }, [stopScroll]);

  return {};
};

export default useBodyScroll;
