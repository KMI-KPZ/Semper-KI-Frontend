import React from "react";
import { useTranslation } from "react-i18next";
import { URL_Datenschutz, URL_Impressum } from "../../constants/Constants";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="w-full bg-white shadow-inner ">
      <ul className="flex flex-col md:flex-row md:justify-around items-center">
        <li className="p-2">
          <a className="p-2 break-words link" href={URL_Impressum}>
            {t("Footer.imprint")}
          </a>
        </li>
        <li className="p-2">
          <a className="p-2 break-words link" href={URL_Datenschutz}>
            {t("Footer.data-protection")}
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
