import { Button } from "@component-library/index";
import React, { KeyboardEvent, MouseEvent, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import useApp from "@/hooks/useApp";
import MenuLanguageMenu from "./components/LanguageMenu";
import useModal from "@/hooks/useModal";
import { twMerge } from "tailwind-merge";
import { NavigationItemData } from "@/data/navigation";
import useUser from "@/hooks/useUser";
import HeaderItem from "../Header/components/Item";
import useBadge from "@/hooks/useBadge";

interface MenuProps {}

const Menu: React.FC<MenuProps> = (props) => {
  const {} = props;
  const modalTitle = "Menu";
  const { setMenu, appState } = useApp();
  const { user } = useUser();
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDialogElement>(null);
  const { deleteModal, registerModal } = useModal();
  const { calcBadge } = useBadge();

  const closeMenu = () => {
    setMenu(false);
  };

  const closeModalWithScroll = () => {
    deleteModal(modalTitle);
    modalRef.current?.close();
    closeMenu();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeModalWithScroll();
    }
  };

  const handleOnCancel = () => {
    closeModalWithScroll();
  };

  const handleOnClick = () => {
    closeModalWithScroll();
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
    if (appState.menuOpen) {
      registerModal(modalTitle, modalRef);
      modalRef.current?.showModal();
    } else {
      deleteModal(modalTitle);
      modalRef.current?.close();
      closeMenu();
    }
  }, [appState.menuOpen]);

  // logger("Menu", appState.menuOpen);

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
      onClose={closeMenu}
      onCancel={handleOnCancel}
      onClick={handleOnClick}
      onAnimationEnd={handleOnAnimEnd}
    >
      <div
        onClick={handleOnClickChildren}
        className="
                  fixed right-0
                  top-0 flex h-full w-full
                  flex-col
                  justify-between overflow-x-hidden
                  bg-white
                  p-3 md:w-fit md:min-w-[250px]
                "
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-row-reverse gap-3">
            <Button
              children={<CloseIcon />}
              title={t(`components.Menu.button.close`)}
              width="fit"
              size="sm"
              variant="primary"
              onClick={closeMenu}
            />
            <MenuLanguageMenu />
          </div>
          <ul className="flex flex-col gap-3">
            {NavigationItemData.filter((item) =>
              item.userTypes.includes(user.usertype)
            ).map((item, index: number) => (
              <HeaderItem
                key={index}
                headeritem={item}
                closeMenus={closeMenu}
                badge={calcBadge(item.title)}
              />
            ))}
          </ul>
        </div>
        <Button
          className="md:hidden"
          title={t(`components.Menu.button.close`)}
          onClick={closeMenu}
          children={<ExpandLessIcon className="md:rotate-90" />}
          variant="secondary"
          width="full"
        />
      </div>
    </dialog>
  );
};

export default Menu;
