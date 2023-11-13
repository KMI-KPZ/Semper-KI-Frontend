import { use } from "i18next";
import { useEffect } from "react";
import logger from "./useLogger";

interface ReturnProps {
  setBodyScroll(scroll: boolean): void;
}

const useBodyScroll = (): ReturnProps => {
  const setBodyScroll = (scroll: boolean) => {
    document.body.style.overflowY = scroll === true ? "scroll" : "hidden";
    document.body.style.scrollbarGutter = "stable";
  };

  return {
    setBodyScroll,
  };
};

export default useBodyScroll;
