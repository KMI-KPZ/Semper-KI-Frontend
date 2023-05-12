import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { URL_Datenschutz, URL_Impressum } from "../../constants/Constants";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleOnClickContact = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate("/contact");
  };

  return (
    <footer className="w-full bg-white shadow-inner ">
      <ul className="flex flex-col md:flex-row md:justify-around items-center">
        <li className="p-2">
          <a className="p-2 break-words link" href={URL_Impressum}>
            {t("Footer.Footer.imprint")}
          </a>
        </li>
        <li className="p-2">
          <a className="p-2 break-words link" href={URL_Datenschutz}>
            {t("Footer.Footer.data-protection")}
          </a>
        </li>
        <li className="p-2">
          <a
            className="p-2 break-words link"
            href={t("Footer.Footer.contact")}
            onClick={handleOnClickContact}
          >
            {t("Footer.Footer.contact")}
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
