import React, { useState } from "react";
import "./Header.scss";
import PersonIcon from "@mui/icons-material/Person";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ClickAwayListener } from "@mui/material";
import { UserType } from "../../interface/types";
import HeaderLink from "./HeaderLink";
import { AuthTokenType } from "../../interface/Interface";

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
  authToken: AuthTokenType | null;
  userType: UserType;
  setUserType: (userType: UserType) => void;
}

export const Header = ({ authToken, userType, setUserType }: Props) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const changeLanguage = (code: string) => () => {
    closeMenu();
    if (i18n.language !== code) i18n.changeLanguage(code);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openMenu = () => {
    setIsMenuOpen(true);
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

  const getLinks = (): JSX.Element => {
    const unauthorizedClientLinks = (
      <HeaderLink
        text={t("header.contractor")}
        Icon={<FactoryOutlinedIcon />}
        link="/"
        toggleUserType={toggleUserType}
      />
    );
    const unauthorizedContractorLinks = (
      <HeaderLink
        text={t("header.client")}
        Icon={<ShoppingCartOutlinedIcon />}
        link="/"
        toggleUserType={toggleUserType}
      />
    );
    const unauthorizedLinks = (
      <>
        <HeaderLink
          text={t("header.about-us")}
          Icon={kissLogo}
          link="/aboutus"
        />
        <HeaderLink
          text={t("header.login")}
          Icon={<PersonIcon />}
          link="/login"
        />
      </>
    );
    const authorizedClientLinks = (
      <>
        <HeaderLink
          text={t("header.newOrder")}
          Icon={<NoteAddOutlinedIcon />}
          link="/process/new"
        />
        <HeaderLink
          text={t("header.shoppingcart")}
          Icon={<ShoppingCartOutlinedIcon />}
          link="/shoppingcart"
        />
      </>
    );
    const authorizedContractorLinks = (
      <>
        <HeaderLink
          text={t("header.contracts")}
          Icon={<DescriptionOutlinedIcon />}
          link="/contracts"
        />
      </>
    );
    const authorizedLinks = (
      <>
        {/* <HeaderLink
          text="Prozess"
          Icon={<PlayCircleIcon />}
          link="/process/models"
        /> */}
        <HeaderLink
          text={t("header.messages")}
          Icon={<EmailOutlinedIcon />}
          link="/messages"
        />
        <HeaderLink
          text={t("header.account")}
          Icon={<PersonIcon />}
          link="/account"
        />
        <HeaderLink
          text={t("header.logout")}
          Icon={<LogoutIcon />}
          link="/logout"
        />
      </>
    );
    return (
      <>
        {authToken === null ? (
          <>
            {userType === "client"
              ? unauthorizedClientLinks
              : unauthorizedContractorLinks}
            {unauthorizedLinks}
          </>
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
    <header data-testid="header">
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
      <nav className="main-nav" data-testid="mainNav">
        <ul>
          {getLinks()}
          <li>
            <ClickAwayListener onClickAway={closeMenu}>
              <div>
                <div
                  data-testid="languageMenu"
                  className={`fi fi-${getFlagButtonClassName()} main-nav-dropdown-icon`}
                  onClick={openMenu}
                />
                {isMenuOpen && (
                  <div className="main-nav-dropdown" data-testid="dropdown">
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
                )}
              </div>
            </ClickAwayListener>
          </li>
        </ul>
      </nav>
    </header>
  );
};
