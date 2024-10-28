import React, { useState } from "react";
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
                    <img src="tu-logo.png" alt="Logo" className="navbar__logo-img" />
                </div>
                <nav className={`navbar__menu ${menuActive ? "navbar__menu--active" : ""}`}>
                    <ul className="navbar__links">
                        <li><a href="#home" className="navbar__link">Inicio</a></li>
                        <li><a href="#about" className="navbar__link">Acerca de</a></li>
                        <li><a href="#services" className="navbar__link">Servicios</a></li>
                        <li><a href="#contact" className="navbar__link">Contacto</a></li>
                    </ul>
                </nav>
                <div className="navbar__login">
                    <img src="login-icon.png" alt="Login" className="navbar__login-img" />
                </div>
                <div className="navbar__menu-icon" onClick={toggleMenu}>
                    <Icon icon="ic:baseline-menu" width="30" height="30" /> {/* Aquí se utiliza el icono de menú */}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
