import React from "react";
import { URL_Datenschutz, URL_Impressum } from "../../config/Constants";
import "./Footer.scss";

const Footer: React.FC = () => {
  return (
    <nav className="footer">
      <ul className="footer-list">
        <li className="footer-list-item">
          <a className="footer-list-item-link" href={URL_Impressum}>
            Impressum
          </a>
        </li>
        <li className="footer-list-item">
          <a className="footer-list-item-link" href={URL_Datenschutz}>
            Datenschutzerklärung
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Footer;
