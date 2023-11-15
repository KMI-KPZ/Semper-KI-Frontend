import useModal from "@/hooks/useModal";
import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

interface ModalContextProviderProps {}

export type ModalContext = {
  registerModal(modal: string, ref: React.RefObject<HTMLDialogElement>): void;
  deleteModal(modal: string): void;
};

export const ModalContext = React.createContext<ModalContext>({
  registerModal: () => {},
  deleteModal: () => {},
});

const ModalContextProvider: React.FC<
  PropsWithChildren<ModalContextProviderProps>
> = (props) => {
  const { children } = props;
  const { t } = useTranslation();
  const { registerModal, deleteModal } = useModal();

  return (
    <ModalContext.Provider value={{ registerModal, deleteModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
