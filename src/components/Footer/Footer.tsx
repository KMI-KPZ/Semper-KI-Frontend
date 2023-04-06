import React from "react";
import { URL_Datenschutz, URL_Impressum } from "../../config/Constants";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white shadow-inner ">
      <ul className="flex flex-col md:flex-row md:justify-around items-center">
        <li className="p-2">
          <a className="p-2 break-words link" href={URL_Impressum}>
            Impressum
          </a>
        </li>
        <li className="p-2">
          <a className="p-2 break-words link" href={URL_Datenschutz}>
            Datenschutzerklärung
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
