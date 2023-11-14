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
import { twMerge } from "tailwind-merge";

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
    // const dialogDimensions = modalRef.current?.getBoundingClientRect();
    // if (dialogDimensions !== undefined)
    //   logger(
    //     "Close Modal",
    //     "left",
    //     e.clientX < dialogDimensions.left,
    //     "right",
    //     e.clientX > dialogDimensions.right,
    //     "top",
    //     e.clientY < dialogDimensions.top,
    //     "bottom",
    //     e.clientY > dialogDimensions.bottom,
    //     "x",
    //     e.clientX,
    //     "y",
    //     e.clientY,
    //     "width",
    //     dialogDimensions.width,
    //     "height",
    //     dialogDimensions.height
    //   );
    // if (
    //   dialogDimensions !== undefined &&
    //   (e.clientX < dialogDimensions.left ||
    //     e.clientX > dialogDimensions.right ||
    //     e.clientY < dialogDimensions.top ||
    //     e.clientY > dialogDimensions.bottom)
    // ) {
    closeModalWithScroll();
    // }
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
      className={twMerge(
        `fixed  h-full w-full overflow-auto rounded-xl
        bg-transparent 
        bg-white bg-opacity-80 
        p-0 backdrop:fixed
        backdrop:bottom-0 backdrop:left-0 backdrop:right-0 backdrop:top-0
       backdrop:bg-black backdrop:opacity-30 backdrop:blur-sm
        md:h-fit md:max-h-[90vh] md:w-fit md:max-w-7xl
     `
        // className
      )}
      onKeyDown={closeModalOnEscape}
      onClose={closeModal}
      onCancel={handleOnCancel}
      onClick={handleOnClick}
      onAnimationEnd={handleOnAnimEnd}
    >
      <div
        className={twMerge(`h-full w-full md:p-5`, className)}
        onClick={handleOnClickChildren}
      >
        {noIcon === true ? null : (
          <Button
            className="absolute right-0 top-0 z-10 mr-1 mt-2 bg-slate-300 bg-none md:mr-1 md:mt-2"
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
