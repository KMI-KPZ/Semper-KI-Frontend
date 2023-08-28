import logger from "@/hooks/useLogger";
import {
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
import { AppContext } from "@/pages/App/App";
import useBodyScroll from "@/pages/App/hooks/useBodyScroll";

type ModelProps = {
  open: boolean;
  locked?: boolean;
  className?: string;
  closeModal?: () => void;
  noIcon?: boolean;
};

const Modal: React.FC<PropsWithChildren<ModelProps>> = ({
  open,
  locked,
  closeModal,
  children,
  className: _className,
  noIcon,
}) => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDialogElement>(null);
  const className = _className || "";
  useBodyScroll(open);

  // Eventlistener: trigger onclose when cancel detected
  const handleOnCancel = (e: SyntheticEvent<HTMLDialogElement, Event>) => {
    // logger("handleOnCancel", e);
    e.preventDefault();
    if (!locked && closeModal) closeModal();
  };

  // Eventlistener: trigger onclose when click outside
  const handleOnClick = (
    e: MouseEvent<HTMLDialogElement, globalThis.MouseEvent>
  ) => {
    if (closeModal) closeModal();
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

  if (open === false) return null;

  return (
    <dialog
      ref={modalRef}
      className={`relative max-h-screen max-w-[100vw] overflow-auto bg-transparent p-0 
      backdrop:fixed backdrop:bottom-0 backdrop:left-0 backdrop:right-0 backdrop:top-0 
      backdrop:bg-black backdrop:opacity-30 backdrop:blur-sm
     `}
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
            title={t("components.Modal.button.close")}
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
