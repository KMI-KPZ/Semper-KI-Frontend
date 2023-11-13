import useBodyScroll from "@/hooks/useBodyScroll";
import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const { setBodyScroll } = useBodyScroll();

  return (
    <BodyScrollContext.Provider value={{ setBodyScroll }}>
      {children}
    </BodyScrollContext.Provider>
  );
};

export default BodyScrollContextProvider;
