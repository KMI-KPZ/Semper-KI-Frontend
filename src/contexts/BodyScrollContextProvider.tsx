import logger from "@/hooks/useLogger";
import { ClassNames } from "@emotion/react";
import React, { PropsWithChildren, useState } from "react";

interface BodyScrollContextProviderProps {}

export type BodyScrollContext = {
  setBodyScroll(stopScroll: boolean): void;
};

export const BodyScrollContext = React.createContext<BodyScrollContext>({
  setBodyScroll: () => {},
});

const getScrollbarWidth = (): number => {
  var scrollDiv = document.createElement("div");
  scrollDiv.className = "scrollbar-measure";
  scrollDiv.style.width = "100px";
  scrollDiv.style.height = "100px";
  scrollDiv.style.overflow = "scroll";
  scrollDiv.style.position = "absolute";
  scrollDiv.style.top = "-9999px";
  document.body.appendChild(scrollDiv);

  // Get the scrollbar width
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

  // Delete the DIV
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

const BodyScrollContextProvider: React.FC<
  PropsWithChildren<BodyScrollContextProviderProps>
> = (props) => {
  const { children } = props;

  const setBodyScroll = (scroll: boolean) => {
    document.body.style.overflowY = scroll === true ? "auto" : "hidden";

    // const rootElement = document.getElementById("root");
    // if (rootElement) {
    //   rootElement.style.overflowY = scroll === true ? "scroll" : "hidden";
    // }
  };

  return (
    <BodyScrollContext.Provider value={{ setBodyScroll }}>
      {children}
    </BodyScrollContext.Provider>
  );
};

export default BodyScrollContextProvider;
