import logger from "@/hooks/useLogger";
import {
  KeyboardEvent,
  MouseEvent,
  PropsWithChildren,
  SyntheticEvent,
  useContext,
  useEffect,
  useRef,
} from "react";
import { Button } from "..";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { BodyScrollContext } from "@/contexts/BodyScrollContextProvider";

type ModelProps = {
  open: boolean;
  locked?: boolean;
  className?: string;
  closeModal?: () => void;
  noIcon?: boolean;
};

const Modal: React.FC<PropsWithChildren<ModelProps>> = ({
  open,
  locked = false,
  closeModal,
  children,
  className = "",
  noIcon,
}) => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDialogElement>(null);
  const { setBodyScroll } = useContext(BodyScrollContext);

  const closeModalWithScroll = () => {
    setBodyScroll(true);
    modalRef.current?.close();
    if (closeModal) closeModal();
  };

  const closeModalOnEscape = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "Escape") {
      closeModalWithScroll();
    }
  };

  // Eventlistener: trigger onclose when cancel detected
  const handleOnCancel = (e: SyntheticEvent<HTMLDialogElement, Event>) => {
    closeModalWithScroll();
  };

  // Eventlistener: trigger onclose when click outside
  const handleOnClick = (
    e: MouseEvent<HTMLDialogElement, globalThis.MouseEvent>
  ) => {
    closeModalWithScroll();
  };

  // Eventlistener: trigger close click on anim end
  const handleOnAnimEnd = () => {
    // logger("handleOnAnimEnd");
    closeModalWithScroll();
  };

  const handleOnClickChildren = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
  };

  // when open changes run open/close command
  useEffect(() => {
    if (open === true) {
      setBodyScroll(false);
      modalRef.current?.showModal();
    } else {
      setBodyScroll(true);
      modalRef.current?.close();
      if (closeModal) closeModal();
    }
  }, [open]);

  if (open === false) return null;

  return (
    <dialog
      ref={modalRef}
      className={`fixed max-h-screen max-w-7xl overflow-auto bg-transparent 
      p-0 backdrop:fixed backdrop:bottom-0 backdrop:left-0 backdrop:right-0 
      backdrop:top-0 backdrop:bg-black backdrop:opacity-30 backdrop:blur-sm
     `}
      onKeyDown={closeModalOnEscape}
      onClose={closeModal}
      onCancel={handleOnCancel}
      onClick={handleOnClick}
      onAnimationEnd={handleOnAnimEnd}
    >
      <div
        className={`box-border min-h-[20px] min-w-[20px] shadow-lg md:p-5 ${className}`}
        onClick={handleOnClickChildren}
      >
        {noIcon === true ? null : (
          <Button
            className="absolute right-0 top-0 z-10 mr-3 mt-3 bg-none md:mr-5 md:mt-5"
            title={t("component-library.Modal.button.close")}
            children={<CloseIcon />}
            variant="text"
            width="fit"
            onClick={closeModal}
          />
        )}
        {children}
      </div>
    </dialog>
  );
};
export default Modal;
