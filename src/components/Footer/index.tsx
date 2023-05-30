import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import { URL_Datenschutz, URL_Impressum } from "@/config/constants";

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
      <ul className="flex flex-col items-center md:flex-row md:justify-around">
        <li className="p-2">
          <a className="link break-words p-2" href={URL_Impressum}>
            {t("Footer.Footer.imprint")}
          </a>
        </li>
        <li className="p-2">
          <a className="link break-words p-2" href={URL_Datenschutz}>
            {t("Footer.Footer.data-protection")}
          </a>
        </li>
        <li className="p-2">
          <a
            className="link break-words p-2"
            href={t("Footer.Footer.contact")}
            onClick={handleOnClickContact}
          >
            {t("Footer.Footer.contact")}
          </a>
        </li>
        <li className="flex flex-row items-center justify-center gap-5 p-2">
          <a
            className="link break-words"
            href={t("Footer.Footer.contact")}
            onClick={handleOnClickContact}
          >
            <InstagramIcon />
          </a>
          <span className="font-bold text-grau-400">© 2023 Semper-KI</span>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
