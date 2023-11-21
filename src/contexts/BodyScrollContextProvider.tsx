import React, { PropsWithChildren } from "react";

interface BodyScrollContextProviderProps {}

export type BodyScrollContext = {
  setBodyScroll(stopScroll: boolean): void;
};

export const BodyScrollContext = React.createContext<BodyScrollContext>({
  setBodyScroll: () => {},
});

const BodyScrollContextProvider: React.FC<
  PropsWithChildren<BodyScrollContextProviderProps>
> = (props) => {
  const { children } = props;

  const setBodyScroll = (scroll: boolean) => {
    document.body.style.overflowY = scroll === true ? "scroll" : "hidden";
    document.body.style.scrollbarGutter = "stable";
  };

  return (
    <BodyScrollContext.Provider value={{ setBodyScroll }}>
      {children}
    </BodyScrollContext.Provider>
  );
};

export default BodyScrollContextProvider;
