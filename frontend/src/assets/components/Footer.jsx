import React from "react";
import Logo from "../img/Logo.jpg";
import "./styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          <img src={Logo} alt="Logo" className="footer__logo-img" />
          <span className="footer__site-name">ZenBalance</span>
        </div>
        <div className="footer__links">
          <p><Link to="/nosotros" className="footer__link">MISIÓN</Link></p>
          <p><Link to="/nosotros" className="footer__link">VISIÓN</Link></p>
          <div>
            <p><Link to="/nosotros" className="footer__link">POLÍTICAS DE TRATAMIENTO DE</Link></p>
            <p><Link to="/nosotros" className="footer__link">DATOS PERSONALES</Link></p>
          </div>
          
        </div>
        <p className="footer__author">
          ELABORADO POR: David Gomez, Diego Candela.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
