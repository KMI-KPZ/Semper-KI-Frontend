import {
  KeyboardEvent,
  MouseEvent,
  PropsWithChildren,
  useEffect,
  useRef,
} from "react";
import { Button } from "..";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import useModal from "@/hooks/useModal";

type ModelProps = {
  modalKey: string;
  open: boolean;
  locked?: boolean;
  className?: string;
  closeModal?: () => void;
  noIcon?: boolean;
};

export const Modal: React.FC<PropsWithChildren<ModelProps>> = ({
  modalKey: title,
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
  const handleOnCancel = () => {
    closeModalWithScroll();
  };

  // Eventlistener: trigger onclose when click outside
  const handleOnClick = () => {
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
        `
        backdrop:fixed
        backdrop:bottom-0
        backdrop:left-0 
        backdrop:right-0
        backdrop:top-0
        backdrop:bg-black
        backdrop:opacity-30
        `
      )}
      onKeyDown={onKeyDown}
      onClose={closeModal}
      onCancel={handleOnCancel}
      onClick={handleOnClick}
      onAnimationEnd={handleOnAnimEnd}
    >
      <div
        className={twMerge(
          `
              fixed right-0
              top-0 flex h-full w-full
              flex-col items-center
              justify-start overflow-x-hidden
              bg-white 
              md:right-1/2 md:top-1/2 
              md:h-fit  md:max-h-[90vh] 
              md:max-w-6xl
              md:-translate-y-1/2
              md:translate-x-1/2 
              md:p-5`,

          className
        )}
        onClick={handleOnClickChildren}
      >
        {noIcon === true ? null : (
          <Button
            className="absolute right-1 top-1 z-10  "
            title={t("general.button.close")}
            children={<CloseIcon />}
            variant="tertiary"
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
