import logger from "@/hooks/useLogger";
import {
  MouseEvent,
  PropsWithChildren,
  SyntheticEvent,
  useEffect,
  useRef,
} from "react";
import { Button } from "..";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

type ModelProps = {
  open: boolean;
  locked?: boolean;
  className?: string;
  closeModal: () => void;
};

const Modal: React.FC<PropsWithChildren<ModelProps>> = ({
  open,
  locked,
  closeModal,
  children,
  className: _className,
}) => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDialogElement>(null);
  const className = _className || "";

  // Eventlistener: trigger onclose when cancel detected
  const handleOnCancel = (e: SyntheticEvent<HTMLDialogElement, Event>) => {
    // logger("handleOnCancel", e);
    e.preventDefault();
    if (!locked) closeModal();
  };

  // Eventlistener: trigger onclose when click outside
  const handleOnClick = (
    e: MouseEvent<HTMLDialogElement, globalThis.MouseEvent>
  ) => {
    logger("handleOnClick");
    closeModal();
  };

  // Eventlistener: trigger close click on anim end
  const handleOnAnimEnd = () => {
    // logger("handleOnAnimEnd");
    const { current } = modalRef;
    if (modalRef !== null && current !== null && !open) {
      current.close();
    }
  };

  const handleOnClickChildren = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    logger("handleOnClickChildren");
  };

  // when open changes run open/close command
  useEffect(() => {
    // logger("useEffect", open);
    const { current } = modalRef;
    if (modalRef !== null && current !== null) {
      if (open === true) {
        current.close();
        current.showModal();
      } else {
        current.close();
      }
    }
  }, [open]);

  return (
    <dialog
      ref={modalRef}
      className={`relative max-h-screen max-w-[100vw] overflow-auto p-0 shadow-lg
      backdrop:fixed backdrop:bottom-0 backdrop:left-0 backdrop:right-0 backdrop:top-0 
      backdrop:bg-black backdrop:opacity-30 backdrop:blur-sm
     `}
      onClose={closeModal}
      onCancel={handleOnCancel}
      onClick={handleOnClick}
      onAnimationEnd={handleOnAnimEnd}
    >
      <div
        className={`box-border min-h-[150px] min-w-[200px] bg-white p-5  ${className}`}
        onClick={handleOnClickChildren}
      >
        <Button
          className="absolute right-0 top-0"
          title={t("components.Modal.button.close")}
          children={<CloseIcon />}
          variant="text"
          onClick={closeModal}
        />
        {children}
      </div>
    </dialog>
  );
};
export default Modal;
