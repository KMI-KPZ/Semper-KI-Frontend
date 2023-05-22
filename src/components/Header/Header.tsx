import React, { useContext, useState } from "react";
// import "./Header.scss";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ClickAwayListener } from "@mui/material";
import HeaderItem from "./HeaderItem";

import { AppContext } from "../App/App";
import { ENavigationItemPreferred, EUserType } from "../../interface/enums";
import { IHeaderItem, IOrderCollectionEvent } from "../../interface/Interface";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { NavigationItems } from "../../data/NavigationItems";

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
  userType: EUserType;
  events?: IOrderCollectionEvent[];
  cartCount: number;
}

interface State {
  languageMenuOpen: boolean;
  menuOpen: boolean;
}

export const Header: React.FC<Props> = (props) => {
  const { isLoggedIn, userType, cartCount, events } = props;
  const { setAppState } = useContext(AppContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
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

  const getChangeCount = (): number | undefined => {
    if (events === undefined) return undefined;
    let count = 0;
    events.forEach((orderCollectionEvent) => {
      orderCollectionEvent.orders.forEach((orderEvent) => {
        if (orderEvent.messages !== undefined && orderEvent.messages > 0)
          count += orderEvent.messages;
        if (orderEvent.status !== undefined && orderEvent.status > 0)
          count += orderEvent.status;
      });
    });
    return count;
  };
  const count = getChangeCount();
  const calcBadge = (title: string): number | undefined => {
    if (
      count !== undefined &&
      count > 0 &&
      (title === "data.NavigationItem.contracts" ||
        title === "data.NavigationItem.orders")
    )
      return getChangeCount();
    if (cartCount > 0 && title === "data.NavigationItem.cart") return cartCount;
    return undefined;
  };

  const renderLanguageMenu: JSX.Element = (
    <li className="flex items-center justify-center" title="Sprachmenu">
      <ClickAwayListener onClickAway={closeLanguageMenu}>
        <div className="relative flex h-full w-full items-center justify-center">
          <a
            href={"/languageMenu"}
            className="group p-2  hover:cursor-pointer"
            onClick={openLanguageMenu}
          >
            <div
              className={`fi fi-${getFlagButtonClassName()} scale-80 duration-300 group-hover:shadow-border group-hover:shadow-türkis xl:scale-100`}
            />
          </a>
          {state.languageMenuOpen === true ? (
            <div
              className="absolute flex translate-y-20 flex-col bg-slate-50"
              data-testid="dropdown"
            >
              {languages.map(({ code, country_code }: Language) => (
                <a
                  key={country_code}
                  onClick={changeLanguage(code)}
                  className="group p-2 hover:cursor-pointer"
                >
                  <div
                    data-testid={country_code}
                    className={`fi duration-300 group-hover:shadow-border 
                    group-hover:shadow-türkis fi-${country_code} ${
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
    <ul className="hidden flex-row items-center justify-center gap-2 md:flex md:gap-4">
      {NavigationItems.filter(
        (item) =>
          item.preferred.includes(ENavigationItemPreferred.header) &&
          item.userTypes.includes(userType)
      ).map((item, index: number) => (
        <HeaderItem
          key={index}
          closeMenus={closeMenus}
          headeritem={item}
          badge={calcBadge(item.title)}
        />
      ))}
    </ul>
  );
  const renderMobileHeaderItems: JSX.Element = (
    <ul className="hidden flex-row items-center justify-center gap-2 xs:flex md:hidden md:gap-4">
      {NavigationItems.filter(
        (item) =>
          item.preferred.includes(ENavigationItemPreferred.header) &&
          item.userTypes.includes(userType)
      ).map((item, index: number) => (
        <HeaderItem
          key={index}
          onlyIcon
          closeMenus={closeMenus}
          headeritem={item}
          badge={calcBadge(item.title)}
        />
      ))}
    </ul>
  );
  const renderMenuItems: JSX.Element = (
    <ul className="hidden flex-col gap-3 md:flex">
      <div className="flex flex-row-reverse gap-4">
        <div
          className="flex justify-center duration-300  hover:cursor-pointer hover:text-türkis"
          onClick={closeMenu}
        >
          <CloseIcon fontSize="large" />
        </div>
        {renderLanguageMenu}
      </div>

      {NavigationItems.filter(
        (item) =>
          item.preferred.includes(ENavigationItemPreferred.menu) &&
          item.userTypes.includes(userType)
      ).map((item, index: number) => (
        <HeaderItem
          key={index}
          closeMenus={closeMenus}
          headeritem={item}
          badge={calcBadge(item.title)}
        />
      ))}
    </ul>
  );
  const renderMobileMenuItems = (
    <ul className="flex flex-col gap-3 md:hidden">
      <div className="flex flex-row-reverse gap-4">
        <div
          className="flex justify-center p-2 duration-300 hover:cursor-pointer hover:text-türkis"
          onClick={closeMenu}
        >
          <CloseIcon fontSize="large" />
        </div>
        {renderLanguageMenu}
      </div>
      {NavigationItems.filter(
        (item) =>
          item.preferred.includes(ENavigationItemPreferred.header) &&
          item.userTypes.includes(userType)
      ).map((item, index: number) => (
        <HeaderItem
          key={index}
          closeMenus={closeMenus}
          headeritem={item}
          badge={calcBadge(item.title)}
        />
      ))}
    </ul>
  );
  const renderMenu: JSX.Element = (
    <>
      <div
        className="absolute top-0 right-0 z-30 hidden h-screen w-screen bg-gray-900 opacity-60 md:block"
        onClick={closeMenu}
      />
      <div
        className="
        absolute top-0 right-0 z-40
        flex h-screen w-screen flex-col 
        justify-between
        overflow-x-hidden bg-white 
       p-3 shadow-xl md:w-fit
        md:shadow-none
       "
      >
        {renderMenuItems}
        {renderMobileMenuItems}
        <div
          className="flex w-full flex-row 
          items-center justify-center duration-300 hover:cursor-pointer hover:text-türkis"
          onClick={closeMenu}
        >
          <ExpandLessIcon fontSize="large" className="md:rotate-90" />
        </div>
      </div>
    </>
  );
  const renderHomeButton: JSX.Element = (
    <a
      href="/"
      className="group flex flex-row items-center gap-3 p-2 duration-300 hover:cursor-pointer hover:text-türkis "
      onClick={(e) => {
        e.preventDefault();
        closeMenus();
        navigate("/");
      }}
      title="Startseite"
    >
      <img
        className="h-8 duration-300 group-hover:scale-110 md:h-10"
        data-testid="logo"
        src={require("../../assets/images/logo192.png")}
        alt="Kiss Logo"
      />
      <div className="hidden flex-col items-end justify-start text-inherit xs:flex">
        <h3 className="p-0 text-3xl font-bold" data-testid="logoName">
          {t("Header.Header.title")}
        </h3>
        <h4 className="hidden text-xs font-bold md:block"></h4>
        {/* <h4 className="text-türkis text-sm">Blog</h4> */}
      </div>
    </a>
  );
  const renderMenuButton: JSX.Element = (
    <li
      className="group flex items-center justify-center p-2 duration-300 hover:cursor-pointer hover:text-türkis"
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
  return (
    <header
      data-testid="header"
      className="flex w-full flex-row items-center justify-between bg-white shadow-lg"
    >
      <nav className="m-3">{renderHomeButton}</nav>
      <nav className="m-3 flex flex-row items-center justify-center gap-4">
        {renderHeaderItems}
        {renderMobileHeaderItems}
        {renderMenuButton}
      </nav>
      {menuOpen ? <>{renderMenu}</> : null}
    </header>
  );
};
