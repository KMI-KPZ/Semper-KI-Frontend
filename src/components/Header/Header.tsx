import React, { useContext, useEffect, useRef, useState } from "react";
// import "./Header.scss";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ClickAwayListener } from "@mui/material";
import HeaderItem from "./HeaderItem";

import { AppContext } from "../App/App";
import { EHeaderItemPreferred, EUserType } from "../../interface/enums";
import { IHeaderItem } from "../../interface/Interface";
import { IconArrowR, IconX } from "../../constants/Icons";
import { HeaderItemsData } from "./HeaderData";

interface Language {
  code: string;
  name: string;
  country_code: string;
}

const languages: Language[] = [
  {
    code: "de",
    name: "Deutsch",
    country_code: "de",
  },
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
];

interface Props {
  isLoggedIn: boolean;
  userType: EUserType | undefined;
}

interface State {
  languageMenuOpen: boolean;
  menuOpen: boolean;
}

export const Header: React.FC<Props> = (props) => {
  const { isLoggedIn, userType } = props;
  const { setAppState } = useContext(AppContext);
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [state, setState] = useState<State>({
    menuOpen: false,
    languageMenuOpen: false,
  });
  const { menuOpen, languageMenuOpen } = state;

  const changeLanguage = (code: string) => () => {
    closeLanguageMenu();
    if (i18n.language !== code) i18n.changeLanguage(code);
  };
  const closeLanguageMenu = () => {
    setState((prevState) => ({ ...prevState, languageMenuOpen: false }));
  };
  const openLanguageMenu = (
    e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e?.preventDefault();
    e?.stopPropagation();
    setState((prevState) => ({ ...prevState, languageMenuOpen: true }));
  };
  const closeMenu = () => {
    setState((prevState) => ({ ...prevState, menuOpen: false }));
    setAppState((prevState) => ({ ...prevState, stopScroll: false }));
  };
  const openMenu = (
    e?:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    e?.preventDefault();
    e?.stopPropagation();
    setState((prevState) => ({ ...prevState, menuOpen: true }));
    setAppState((prevState) => ({ ...prevState, stopScroll: true }));
  };
  const closeMenus = (): void => {
    closeLanguageMenu();
    closeMenu();
  };
  const getFlagButtonClassName = (): string => {
    let returnString: string = "";
    languages.forEach((language: Language) =>
      language.code === i18n.language
        ? (returnString = language.country_code)
        : null
    );
    return returnString;
  };

  const renderLanguageMenu: JSX.Element = (
    <li className="flex items-center justify-center" title="Sprachmenu">
      <ClickAwayListener onClickAway={closeLanguageMenu}>
        <div className="relative w-full h-full flex items-center justify-center">
          <a
            href={"/languageMenu"}
            className="group hover:cursor-pointer  p-2"
            onClick={openLanguageMenu}
          >
            <div
              className={`fi fi-${getFlagButtonClassName()} scale-80 xl:scale-100 group-hover:shadow-türkis group-hover:shadow-border duration-300`}
            />
          </a>
          {state.languageMenuOpen === true ? (
            <div
              className="flex flex-col absolute translate-y-20 bg-slate-50"
              data-testid="dropdown"
            >
              {languages.map(({ code, country_code }: Language) => (
                <a
                  key={country_code}
                  onClick={changeLanguage(code)}
                  className="group hover:cursor-pointer p-2"
                >
                  <div
                    data-testid={country_code}
                    className={`group-hover:shadow-türkis group-hover:shadow-border duration-300 
                    fi fi-${country_code} ${
                      i18n.language === code ? "grayscale" : ""
                    }`}
                  />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </ClickAwayListener>
    </li>
  );
  const renderHeaderItems: JSX.Element = (
    <ul className="hidden md:flex flex-row gap-4 justify-center items-center">
      {HeaderItemsData.filter(
        (headerItem: IHeaderItem) =>
          headerItem.preferred === EHeaderItemPreferred.header &&
          headerItem.userType.includes(
            userType === undefined ? EUserType.client : userType
          ) &&
          headerItem.loggedIn.includes(isLoggedIn)
      ).map((headerItem: IHeaderItem, index: number) => (
        <HeaderItem
          key={index}
          closeMenus={closeMenus}
          headeritem={headerItem}
        />
      ))}
      {renderLanguageMenu}
    </ul>
  );
  const renderMenuItems = (mobile: boolean): JSX.Element => {
    return (
      <>
        {mobile === true ? (
          <>
            <div className="flex flex-row-reverse gap-4">
              <div
                className="hover:bg-gray-300 hover:cursor-pointer p-2 flex justify-center"
                onClick={closeMenu}
              >
                <img alt="close Menu" src={IconX} className="w-6" />
              </div>
              {renderLanguageMenu}
            </div>
            {HeaderItemsData.filter(
              (headerItem: IHeaderItem) =>
                headerItem.preferred === EHeaderItemPreferred.header &&
                headerItem.userType.includes(
                  userType === undefined ? EUserType.client : userType
                ) &&
                headerItem.loggedIn.includes(isLoggedIn)
            ).map((headerItem: IHeaderItem, index: number) => (
              <HeaderItem
                key={index}
                closeMenus={closeMenus}
                headeritem={headerItem}
              />
            ))}
          </>
        ) : (
          <div className="flex flex-row-reverse gap-4">
            <div
              className="hover:bg-gray-300 hover:cursor-pointer p-2 flex justify-center"
              onClick={closeMenu}
            >
              <img alt="close Menu" src={IconX} className="w-6" />
            </div>
          </div>
        )}
        {HeaderItemsData.filter(
          (headerItem: IHeaderItem) =>
            headerItem.preferred === EHeaderItemPreferred.menu &&
            headerItem.userType.includes(
              userType === undefined ? EUserType.client : userType
            ) &&
            headerItem.loggedIn.includes(isLoggedIn)
        ).map((headerItem: IHeaderItem, index: number) => (
          <HeaderItem
            isMenuItem
            key={index}
            closeMenus={closeMenus}
            headeritem={headerItem}
          />
        ))}
      </>
    );
  };
  const renderHomeButton: JSX.Element = (
    <a
      href="/"
      className="group hover:text-türkis hover:cursor-pointer duration-300 flex flex-row items-center gap-3 p-2 "
      onClick={(e) => {
        e.preventDefault();
        closeMenus();
        navigate("/");
      }}
      title="Startseite"
    >
      <img
        className="h-6 xl:h-8 group-hover:scale-110 duration-300"
        data-testid="logo"
        src={require("../../assets/images/logo192.png")}
        alt="Kiss Logo"
      />
      <div className="flex flex-col justify-start items-end gap-0 text-inherit">
        <h3 className="font-bold text-inherit" data-testid="logoName">
          SEMPER-KI
        </h3>
        {/* <h4 className="text-türkis text-sm">Blog</h4> */}
      </div>
    </a>
  );

  const renderMenuButton: JSX.Element = (
    <li
      className="group hover:text-türkis hover:cursor-pointer duration-300 flex items-center justify-center p-2"
      onClick={openMenu}
      title="Menu"
    >
      <a
        href={"/menu"}
        onClick={openMenu}
        className="flex items-center justify-center text-inherit"
      >
        <MenuIcon className="h-6 xl:h-10" />
      </a>
    </li>
  );

  const renderMenu: JSX.Element = (
    <>
      <div
        className="hidden md:block absolute top-0 right-0 h-screen w-screen bg-gray-900 opacity-60 z-30"
        onClick={closeMenu}
      />
      <div
        className="
        flex flex-col justify-between absolute
        w-screen h-screen top-0 right-0 
        overflow-x-hidden
        md:w-fit md:shadow-none 
       bg-white p-3 shadow-xl
        z-40
       "
      >
        <ul className="hidden md:flex flex-col gap-3">
          {renderMenuItems(false)}
        </ul>
        <ul className="md:hidden flex flex-col gap-3">
          {renderMenuItems(true)}
        </ul>
        <div
          className="hover:bg-gray-300 hover:cursor-pointer w-full p-3 flex justify-center items-center"
          onClick={closeMenu}
        >
          <img className="h-8 rotate-[270deg] md:rotate-0" src={IconArrowR} />
        </div>
      </div>
    </>
  );

  return (
    <header
      data-testid="header"
      className="flex justify-between items-center flex-row relative shadow-lg bg-white w-full"
    >
      <nav className="m-3">{renderHomeButton}</nav>
      <nav className="m-3 flex flex-row justify-center items-center gap-4">
        {renderHeaderItems}
        {renderMenuButton}
      </nav>
      {menuOpen ? renderMenu : null}
    </header>
  );
};
