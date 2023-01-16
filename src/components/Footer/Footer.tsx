import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <nav className="footer">
      <ul className="footer-list">
        <li className="footer-list-item">
          <a
            className="footer-list-item-link"
            href="https://infai.org/das-institut/impressum/"
          >
            Impressum
          </a>
        </li>
        <li className="footer-list-item">
          <a
            className="footer-list-item-link"
            href="https://infai.org/datenschutz/"
          >
            Datenschutzerklärung
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Footer;
