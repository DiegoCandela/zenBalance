import React from "react";
import Logo from "../img/Logo.jpg";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          <img src={Logo} alt="Logo" className="footer__logo-img" />
          <span className="footer__site-name">ZenBalance</span>
        </div>
        <div className="footer__links">
          <p className="footer__link">MISIÓN</p>
          <p className="footer__link">VISIÓN</p>
          <p className="footer__link">POLÍTICAS DE PRIVACIDAD</p>
        </div>
        <p className="footer__author">
          ELABORADO POR: David Gomez, Diego Candela.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
