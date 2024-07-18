import { Button } from "@component-library/index";
import { ClickAwayListener } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface MenuLanguageMenuProps {}

export interface Language {
  name: string;
  country_code: "de" | "gb";
  code: "de-DE" | "en-US";
}

export const app_languages: Language[] = [
  {
    name: "german",
    country_code: "de",
    code: "de-DE",
  },
  {
    name: "english",
    country_code: "gb",
    code: "en-US",
  },
];

const MenuLanguageMenu: React.FC<MenuLanguageMenuProps> = (props) => {
  const {} = props;
  const { t, i18n } = useTranslation();
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const closeLanguageMenu = () => {
    setLangMenuOpen(false);
  };

  const openLanguageMenu = () => {
    setLangMenuOpen(true);
  };

  const changeLanguage = (code: string) => () => {
    closeLanguageMenu();
    if (i18n.language !== code) i18n.changeLanguage(code);
  };

  const getFlagButtonClassName = (): string => {
    let returnString: string = "";
    app_languages.forEach((language: Language) =>
      language.code === i18n.language
        ? (returnString = language.country_code)
        : null
    );
    return returnString;
  };

  return (
    <li className="flex items-center justify-center" title="Sprachmenu">
      <ClickAwayListener onClickAway={closeLanguageMenu}>
        <div className="relative flex h-full w-full items-center justify-center">
          <Button
            title={t(
              "components.Menu.components.LanguageMenu.button.languageMenu"
            )}
            onClick={openLanguageMenu}
            className="overflow-clip"
          >
            <div
              className={`fi fi-${getFlagButtonClassName()} scale-150 duration-300`}
            />
          </Button>

          {langMenuOpen === true ? (
            <div
              className="absolute z-30 flex translate-y-14 flex-col gap-3 bg-slate-50"
              data-testid="dropdown"
            >
              {app_languages
                .filter(({ code, country_code }) => code !== i18n.language)
                .map(({ code, country_code }: Language, index) => (
                  <Button
                    title={t(
                      `components.Menu.components.LanguageMenu.button.${country_code}`
                    )}
                    onClick={changeLanguage(code)}
                    key={index}
                    className="overflow-clip"
                  >
                    <div
                      data-testid={country_code}
                      className={`fi scale-150 duration-300 fi-${country_code} ${
                        i18n.language === code ? "grayscale" : ""
                      }`}
                    />
                  </Button>
                ))}
            </div>
          ) : null}
        </div>
      </ClickAwayListener>
    </li>
  );
};

export default MenuLanguageMenu;
