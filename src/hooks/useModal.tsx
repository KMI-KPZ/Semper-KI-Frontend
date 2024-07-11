import { RefObject, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useBodyScroll from "./useBodyScroll";
import { ModalContext } from "@/contexts/ModalContextProvider";
import logger from "./useLogger";

interface useModalReturnProps {
  registerModal(modal: string, ref: RefObject<HTMLDialogElement>): void;
  deleteModal(modal: string): void;
  closeAllModals(): void;
}

const useModal = (): useModalReturnProps => {
  const { t } = useTranslation();
  const { setBodyScroll } = useBodyScroll();
  const { modals, setModals } = useContext(ModalContext);

  const hasUndefinedRef = () =>
    modals.some((item) => item.ref.current === null);

  useEffect(() => {
    if (hasUndefinedRef()) {
      // logger("useModal | useEffect | undefined ref", modals);
      setModals((prevState) => [
        ...prevState.filter((item) => item.ref.current !== null),
      ]);
    }
  }, [modals]);

  useEffect(() => {
    if (modals.length > 0) {
      setBodyScroll(false);
    } else {
      setBodyScroll(true);
    }
  }, [modals]);

  const registerModal = (modal: string, ref: RefObject<HTMLDialogElement>) => {
    // logger("useModal", "registerModal", ref.current, modal, modals);
    setModals((prevState) => [
      ...prevState.filter((item) => item.title !== modal),
      { title: modal, ref },
    ]);
  };
  const deleteModal = (modal: string) => {
    // logger("useModal", "deleteModal", modal, modals);
    modals.find((item) => item.title === modal)?.ref.current?.close();
    setModals((prevState) => prevState.filter((item) => item.title !== modal));
  };

  const closeAllModals = () => {
    // logger("useModal", "closeAllModals", modals);
    modals.forEach((modal) => {
      modal.ref.current?.close();
    });
    setModals([]);
  };

  return { deleteModal, registerModal, closeAllModals };
};

export default useModal;
