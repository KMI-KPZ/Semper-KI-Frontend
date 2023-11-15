import { BodyScrollContext } from "@/contexts/BodyScrollContextProvider";
import React, { RefObject, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import logger from "./useLogger";

interface useModalReturnProps {
  registerModal(modal: string, ref: RefObject<HTMLDialogElement>): void;
  deleteModal(modal: string): void;
}

const useModal = (): useModalReturnProps => {
  const { t } = useTranslation();
  const { setBodyScroll } = useContext(BodyScrollContext);

  const [modals, setModals] = useState<
    { title: string; ref: RefObject<HTMLDialogElement> }[]
  >([]);

  const hasUndefinedRef = () =>
    modals.some((item) => item.ref.current === null);

  useEffect(() => {
    if (hasUndefinedRef()) {
      // logger("useModal | useEffect | undefined ref", modals);
      setModals((prevState) => [
        ...prevState.filter((item) => item.ref.current !== null),
      ]);
    }
    if (modals.length > 0) {
      setBodyScroll(false);
    } else {
      setBodyScroll(true);
    }
  }, [modals]);

  const registerModal = (modal: string, ref: RefObject<HTMLDialogElement>) => {
    // logger("useModal", "registerModal", modal, modals);
    setModals((prevState) => [
      ...prevState.filter((item) => item.title !== modal),
      { title: modal, ref },
    ]);
  };
  const deleteModal = (modal: string) => {
    // logger("useModal", "deleteModal", modal, modals);
    setModals((prevState) => prevState.filter((item) => item.title !== modal));
  };

  return { deleteModal, registerModal };
};

export default useModal;
