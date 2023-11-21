import useModal from "@/hooks/useModal";
import React, { PropsWithChildren, RefObject, useState } from "react";
import { useTranslation } from "react-i18next";

interface ModalContextProviderProps {}

export interface ModalItem {
  title: string;
  ref: RefObject<HTMLDialogElement>;
}

export type ModalContext = {
  modals: ModalItem[];
  setModals: React.Dispatch<React.SetStateAction<ModalItem[]>>;
};

export const ModalContext = React.createContext<ModalContext>({
  modals: [],
  setModals: () => {},
});

const ModalContextProvider: React.FC<
  PropsWithChildren<ModalContextProviderProps>
> = (props) => {
  const { children } = props;
  const [modals, setModals] = useState<ModalItem[]>([]);

  return (
    <ModalContext.Provider value={{ modals, setModals }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
