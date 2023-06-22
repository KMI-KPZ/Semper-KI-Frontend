import React, { ReactNode, useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ClickAwayListener } from "@mui/material";
import HeaderItem from "./components/Item";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { NavigationItemData } from "@/data/navigation";
import LogoURL from "@images/logo192.png";
import { AppContext } from "@/pages/App";
import { UserType } from "@/hooks/useUser/types";
import { Event, OrderEvent } from "@/pages/App/hooks/types";
import { Heading, Text } from "@component-library/Typography";
import { Button } from "@component-library/Button";
import { getOrderEventAmount } from "@/pages/App/hooks/useEvents";

interface Language {
  code: string;
  name: string;
  country_code: string;
}

export type HeaderItem = {
  title: string;
  link: string;
  icon: string | ReactNode;
  extern: boolean;
  preferred: NavigationItemPreferredType;
  userType: UserType[];
  loggedIn: boolean[];
};

export type HeaderItemLoggedInType = true | false | "both";
export type NavigationItemPreferredType = "header" | "menu" | "home";

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
  userType: UserType;
  events?: Event[];
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
  const openMenu = () => {
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

  const calcBadge = (title: string): number | undefined => {
    if (
      title === "data.NavigationItem.contracts" ||
      title === "data.NavigationItem.orders"
    )
      return getOrderEventAmount(events);
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
    <ul className="hidden flex-row items-center justify-center  md:flex">
      {NavigationItemData.filter(
        (item) =>
          item.preferred.includes("header") && item.userTypes.includes(userType)
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
    <ul className="flex flex-row items-center justify-center  md:hidden">
      {NavigationItemData.filter(
        (item) =>
          item.preferred.includes("header") && item.userTypes.includes(userType)
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
      {NavigationItemData.filter(
        (item) =>
          item.preferred.includes("menu") && item.userTypes.includes(userType)
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
      {NavigationItemData.filter(
        (item) =>
          (item.preferred.includes("menu") ||
            item.preferred.includes("header")) &&
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
        className="absolute right-0 top-0 z-30 hidden h-screen w-screen bg-gray-900 opacity-60 md:block"
        onClick={closeMenu}
      />
      <div
        className="
        absolute right-0 top-0 z-40
        flex h-screen w-screen flex-col 
        justify-between
        overflow-x-hidden bg-white 
       p-3 shadow-xl md:w-fit
        md:shadow-none
       "
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-row-reverse gap-3">
            <Button
              children={<CloseIcon fontSize="large" />}
              title={t(`Header.Header.button.${menuOpen ? "close" : "open"}`)}
              width="fit"
              variant="secondary"
              onClick={closeMenu}
            />
            {renderLanguageMenu}
          </div>
          {renderMenuItems}
          {renderMobileMenuItems}
        </div>
        <Button
          title={t(`Header.Header.button.${menuOpen ? "close" : "open"}`)}
          onClick={closeMenu}
          children={
            <ExpandLessIcon fontSize="large" className="md:rotate-90" />
          }
          variant="secondary"
          width="full"
        />
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
        className="h-8 duration-300 group-hover:scale-110 group-hover:motion-safe:animate-pulse md:h-10"
        data-testid="logo"
        src={LogoURL}
        alt="Kiss Logo"
      />
      <div className="hidden flex-col items-end justify-start text-inherit xs:flex">
        <Text variant="custom" className="text-4xl font-bold">
          {t("Header.Header.title")}
        </Text>
      </div>
    </a>
  );
  const renderMenuButton: JSX.Element = (
    <li
      className="group flex items-center justify-center p-2 duration-300 hover:cursor-pointer hover:text-türkis"
      onClick={openMenu}
      title={t(`Header.Header.button.${menuOpen ? "close" : "open"}`)}
    >
      <Button
        variant="text"
        title={t(`Header.Header.button.${menuOpen ? "close" : "open"}`)}
        onClick={openMenu}
        children={<MenuIcon className="h-6 xl:h-10" />}
      />
    </li>
  );
  return (
    <header
      data-testid="header"
      className="flex w-full flex-row items-center justify-between bg-white shadow-lg"
    >
      <nav className="m-2">{renderHomeButton}</nav>
      <nav className="m-2 flex flex-row items-center justify-center  ">
        {renderHeaderItems}
        {renderMobileHeaderItems}
        {renderMenuButton}
      </nav>
      {menuOpen ? <>{renderMenu}</> : null}
    </header>
  );
};
