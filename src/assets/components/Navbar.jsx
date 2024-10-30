import React, { useState } from "react";
import Logo from "../img/Logo.jpg";
import User from "../img/User.png";
import { Icon } from '@iconify/react';
import "./styles/Navbar.css";

const Navbar = () => {
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    return (
        <header className="navbar">
            <div className="navbar__container">
                <div className="navbar__logo">
                    <img src={Logo} alt="Logo" className="navbar__logo-img" />
                    <span className="navbar__site-name">ZenBalance</span> {/* Nombre del sitio */}
                </div>
                <nav className={`navbar__menu ${menuActive ? "navbar__menu--active" : ""}`}>
                    <ul className="navbar__links">
                        <li><a href="#home" className="navbar__link">Inicio</a></li>
                        <li><a href="#about" className="navbar__link">Perfil</a></li>
                        <li><a href="#services" className="navbar__link">Recursos</a></li>
                        <li><a href="#contact" className="navbar__link">Nosotros</a></li>
                    </ul>
                </nav>
                <div className="navbar__login">
                    <img src={User} alt="Login" className="navbar__login-img" />
                </div>
                <div className="navbar__menu-icon" onClick={toggleMenu}>
                    <Icon icon="ic:baseline-menu" width="30" height="30" />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
