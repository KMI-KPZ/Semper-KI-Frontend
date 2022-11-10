import React, { useState } from "react";
import "./Header.scss";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ClickAwayListener } from "@mui/material";

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

export const Header = () => {
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
          src={require("../images/KISS_logo_transparent.png")}
          alt="Kiss Logo"
        />
        <div className="kiss-logo-name" data-testid="logoName">
          KISS
        </div>
      </a>
      <nav className="main-nav" data-testid="mainNav">
        <ul>
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
          <li>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                navigate("/about");
              }}
            >
              {t("header.about-us")}
            </a>
          </li>
          <li>
            <a
              href="/login"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              <PersonIcon className="icon" sx={{ fontSize: 40 }} />
              {t("header.login")}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
