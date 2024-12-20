import React, { useState, useContext } from "react";
import Logo from "../img/Logo.jpg";
import User from "../img/User.png";
import { Icon } from '@iconify/react';
import "./styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';

const Navbar = () => {
    const [menuActive, setMenuActive] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const { username, isAuthenticated, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        logout();
        setShowLogoutModal(false);
        navigate('/login');
    };

    const cancelLogout = () => {
        setShowLogoutModal(false);
    };

    const handleLoginClick = (e) => {
        if (!isAuthenticated) {
            e.preventDefault();
            navigate('/login');
        }
    };

    return (
        <header className="navbar">
            <div className="navbar__container">
                <Link to="/" className="navbar__logo">
                    <img src={Logo} alt="Logo" className="navbar__logo-img" />
                    <span className="navbar__site-name">ZenBalance</span>
                </Link>
                <nav className={`navbar__menu ${menuActive ? "navbar__menu--active" : ""}`}>
                    <ul className="navbar__links">
                        <li><Link to="/" className="navbar__link">INICIO</Link></li>
                        {isAuthenticated && <li><Link to="/perfil" className="navbar__link">PERFIL</Link></li>}
                        <li><Link to="/recursos" className="navbar__link">RECURSOS</Link></li>
                        <li><Link to="/nosotros" className="navbar__link">NOSOTROS</Link></li>
                    </ul>
                </nav>
                <div className="navbar__login-container">
                    <Link to="/perfil" className="navbar__login" onClick={handleLoginClick}>
                        <img src={User} alt="Login" className="navbar__login-img" />
                        {isAuthenticated && <span className="navbar__username">{username}</span>}
                    </Link>
                    {isAuthenticated && (
                        <Icon
                            icon="ic:baseline-logout"
                            width="20"
                            height="20"
                            className="navbar__logout-icon"
                            onClick={handleLogoutClick}
                        />
                    )}
                </div>
                <div className="navbar__menu-icon" onClick={toggleMenu}>
                    <Icon icon="ic:baseline-menu" width="30" height="30" />
                </div>
            </div>

            {/* Modal de confirmación de cierre de sesión */}
            {showLogoutModal && (
                <div className="logout-modal">
                    <div className="logout-modal__content">
                        <h2>¿Deseas cerrar sesión?</h2>
                        <div className="logout-modal__buttons">
                            <button onClick={confirmLogout} className="btn btn-primary">Sí</button>
                            <button onClick={cancelLogout} className="btn btn-secondary">No</button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
