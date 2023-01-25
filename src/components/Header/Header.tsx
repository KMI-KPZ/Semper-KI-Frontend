import React, { useState } from "react";
import "./Header.scss";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ClickAwayListener } from "@mui/material";
import { IHeaderItem } from "../../interface/Interface";
import HeaderItem from "./HeaderItem";

import _HeaderItems from "./HeaderItems.json";
import { EUserType } from "../../interface/enums";
const HeaderItems = _HeaderItems as IHeaderItem[];

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
}

interface State {
  languageMenu: boolean;
  menu: boolean;
}

export const Header = ({ isLoggedIn, userType }: Props) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [state, setState] = useState<State>({
    menu: false,
    languageMenu: false,
  });

  const changeLanguage = (code: string) => () => {
    closeLanguageMenu();
    if (i18n.language !== code) i18n.changeLanguage(code);
  };

  const closeLanguageMenu = () => {
    setState((prevState) => ({ ...prevState, languageMenu: false }));
  };

  const openLanguageMenu = () => {
    setState((prevState) => ({ ...prevState, languageMenu: true }));
  };

  const closeMenu = () => {
    setState((prevState) => ({ ...prevState, menu: false }));
  };

  const openMenu = () => {
    setState((prevState) => ({ ...prevState, menu: true }));
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

  const getHeaderItems = (): JSX.Element => {
    return (
      <>
        {HeaderItems.filter(
          (headerItem: IHeaderItem) =>
            headerItem.show === true && headerItem.userType.includes(userType)
        ).map((headerItem: IHeaderItem, index: number) => (
          <HeaderItem
            key={index}
            closeMenus={closeMenus}
            headeritem={headerItem}
          />
        ))}
      </>
    );
  };

  const getMenuItems = (): JSX.Element => {
    return (
      <>
        {HeaderItems.filter(
          (headerItem: IHeaderItem) =>
            headerItem.show === false && headerItem.userType.includes(userType)
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

  return (
    <header data-testid="header" className="header">
      <nav className="nav-left">
        <a
          href="/"
          className="kiss-logo"
          onClick={(e) => {
            e.preventDefault();
            closeMenus();
            navigate("/");
          }}
        >
          <img
            className="kiss-logo-img"
            data-testid="logo"
            src={require("../../assets/images/logo192.png")}
            alt="Kiss Logo"
          />
          <h3 className="kiss-logo-name" data-testid="logoName">
            SEMPER-KI
          </h3>
        </a>
      </nav>
      <nav className="nav" data-testid="mainNav">
        <ul className="nav-list">
          {getHeaderItems()}
          <li className="nav-list-item">
            <ClickAwayListener onClickAway={closeLanguageMenu}>
              <div className="language-menu">
                <div
                  data-testid="languageMenu"
                  className={`fi fi-${getFlagButtonClassName()}`}
                  onClick={openLanguageMenu}
                />
                {state.languageMenu === true ? (
                  <div
                    className="language-menu-dropdown"
                    data-testid="dropdown"
                  >
                    {languages.map(({ code, country_code }: Language) => (
                      <div
                        data-testid={country_code}
                        className={`fi fi-${country_code} main-nav-dropdown-item ${
                          i18n.language === code ? "disabled" : ""
                        }`}
                        key={country_code}
                        onClick={changeLanguage(code)}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            </ClickAwayListener>
          </li>
          <li className="nav-list-item" onClick={openMenu}>
            <MenuIcon />
          </li>
        </ul>
      </nav>
      {state.menu === true ? (
        <>
          <div className="menu-blank" onClick={closeMenu} />
          <div className="menu-dropdown">{getMenuItems()}</div>
        </>
      ) : null}
    </header>
  );
};
