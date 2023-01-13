import React, { useState } from "react";
import "./Header.scss";
import PersonIcon from "@mui/icons-material/Person";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import BugReportIcon from "@mui/icons-material/BugReport";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ClickAwayListener, IconButton } from "@mui/material";
import { TUserType } from "../../interface/types";
import HeaderLink from "./HeaderLink";
import { IAuthToken } from "../../interface/Interface";

const kissLogo: React.ReactNode = (
  <img
    style={{ width: "1em", height: "1em" }}
    className="kiss_logo"
    src={require("../../assets/images/kiss_logo.svg").default}
    alt=""
  />
);

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
  // authToken: IAuthToken | null;
  isLoggedIn: boolean;
  userType: TUserType;
  setUserType: (userType: TUserType) => void;
  setMenuOpen(menuOpen: boolean): void;
  isMenuOpen: boolean;
}

interface State {
  languageMenu: boolean;
  menu: boolean;
}

export const Header = ({
  // authToken,
  isLoggedIn,
  userType,
  setUserType,
  setMenuOpen,
  isMenuOpen,
}: Props) => {
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

  const customNavigate = (link: string): void => {
    closeLanguageMenu();
    closeMenu();
    navigate(link);
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

  const toggleUserType = () => {
    setUserType(userType === "client" ? "contractor" : "client");
  };

  const getLinksHeader = (): JSX.Element => {
    return isLoggedIn === false ? (
      <HeaderLink
        text={t("header.about-us")}
        icon={kissLogo}
        link="/aboutus"
        navigate={customNavigate}
      />
    ) : (
      <></>
    );
  };

  const getLinksMenu = (): JSX.Element => {
    const unauthorizedLinks = (
      <>
        <HeaderLink
          text={t("header.login")}
          icon={<PersonIcon />}
          link="/login"
          navigate={customNavigate}
          className="menu-item"
        />
      </>
    );
    const authorizedClientLinks = (
      <>
        <HeaderLink
          text={t("header.newOrder")}
          icon={<NoteAddOutlinedIcon />}
          link="/process/new"
          navigate={customNavigate}
          className="menu-item"
        />
        <HeaderLink
          text={t("header.shoppingcart")}
          icon={<ShoppingCartOutlinedIcon />}
          link="/shoppingcart"
          navigate={customNavigate}
          className="menu-item"
        />
      </>
    );
    const authorizedContractorLinks = (
      <>
        <HeaderLink
          text={t("header.contracts")}
          icon={<DescriptionOutlinedIcon />}
          link="/contracts"
          navigate={customNavigate}
          className="menu-item"
        />
      </>
    );
    const authorizedLinks = (
      <>
        <HeaderLink
          text={t("header.messages")}
          icon={<EmailOutlinedIcon />}
          link="/messages"
          navigate={customNavigate}
          className="menu-item"
        />
        <HeaderLink
          text={t("header.account")}
          icon={<PersonIcon />}
          link="/account"
          navigate={customNavigate}
          className="menu-item"
        />
        <HeaderLink
          text={t("header.logout")}
          icon={<LogoutIcon />}
          link="/logout"
          navigate={customNavigate}
          className="menu-item"
        />
      </>
    );
    return (
      <>
        {isLoggedIn === false ? (
          <>{unauthorizedLinks}</>
        ) : (
          <>
            {userType === "client"
              ? authorizedClientLinks
              : authorizedContractorLinks}
            {authorizedLinks}
          </>
        )}
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
            navigate("/");
          }}
        >
          <img
            data-testid="logo"
            className="kiss-logo-img"
            src={require("../../assets/images/KISS_logo_transparent.png")}
            alt="Kiss Logo"
          />
          <div className="kiss-logo-name" data-testid="logoName">
            KISS
          </div>
        </a>
      </nav>
      <nav className="nav" data-testid="mainNav">
        <ul className="nav-list">
          {getLinksHeader()}
          <li className="nav-list-item">
            <ClickAwayListener onClickAway={closeLanguageMenu}>
              <div className="language-menu">
                <div
                  data-testid="languageMenu"
                  className={`fi fi-${getFlagButtonClassName()} language-menu-button`}
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
          <li className="nav-list-item">
            <div className="menu-button" onClick={openMenu}>
              <MenuIcon />
            </div>
          </li>
        </ul>
      </nav>
      {state.menu === true ? (
        <>
          <div className="menu-blank" onClick={closeMenu} />
          <div className="menu-dropdown">
            {getLinksMenu()}
            <HeaderLink
              text={"test"}
              icon={<BugReportIcon />}
              link="/test"
              navigate={customNavigate}
              className="menu-item"
            />
          </div>
        </>
      ) : null}
    </header>
  );
};
