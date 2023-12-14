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
import { ModalContext } from "@/contexts/ModalContextProvider";
import useModal from "@/hooks/useModal";

type ModelProps = {
  title: string;
  open: boolean;
  locked?: boolean;
  className?: string;
  closeModal?: () => void;
  noIcon?: boolean;
};

const Modal: React.FC<PropsWithChildren<ModelProps>> = ({
  title,
  open,
  locked = false,
  closeModal,
  children,
  className = "",
  noIcon,
}) => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDialogElement>(null);
  const { deleteModal, registerModal } = useModal();

  const closeModalWithScroll = () => {
    if (locked === undefined || locked === false) {
      deleteModal(title);
      modalRef.current?.close();
      if (closeModal) closeModal();
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeModalWithScroll();
    }
    // logger("Modal onKeyDown", e.key);
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
      registerModal(title, modalRef);
      modalRef.current?.showModal();
    } else {
      deleteModal(title);
      modalRef.current?.close();
      if (closeModal) closeModal();
    }
  }, [open]);

  if (open === false) return null;

  return (
    <dialog
      ref={modalRef}
      className={twMerge(
        `fixed h-full w-full overflow-auto rounded-xl bg-transparent
        bg-white bg-opacity-70 p-0
        backdrop:fixed backdrop:bottom-0
        backdrop:left-0 backdrop:right-0
        backdrop:top-0 backdrop:bg-black
        backdrop:opacity-30
        md:h-fit md:max-h-[90vh] md:w-fit md:max-w-7xl
     `
      )}
      onKeyDown={onKeyDown}
      onClose={closeModal}
      onCancel={handleOnCancel}
      onClick={handleOnClick}
      onAnimationEnd={handleOnAnimEnd}
    >
      <div
        className={twMerge(`h-full w-full  md:p-10`, className)}
        onClick={handleOnClickChildren}
      >
        {noIcon === true ? null : (
          <Button
            className="absolute right-0 top-0 z-10 "
            title={t("component-library.Modal.button.close")}
            children={<CloseIcon />}
            variant="text"
            width="fit"
            size="sm"
            onClick={closeModalWithScroll}
          />
        )}
        {children}
      </div>
    </dialog>
  );
};
export default Modal;
