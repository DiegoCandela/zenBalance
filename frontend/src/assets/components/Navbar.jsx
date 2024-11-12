import React, { useState, useContext } from "react";
import Logo from "../img/Logo.jpg";
import User from "../img/User.png";
import { Icon } from '@iconify/react';
import "./styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext'

const Navbar = () => {
    const [menuActive, setMenuActive] = useState(false);
    const { username, updateUser } = useContext(UserContext); // Asegúrate de tener updateUser en tu contexto
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    const handleLoginClick = (e) => {
        // Prevenir el comportamiento predeterminado del enlace si el usuario hace clic en "Login"
        e.preventDefault();

        if (username) {
            // Si el usuario está logueado, preguntamos si quiere cerrar sesión
            const confirmLogout = window.confirm("¿Deseas cerrar sesión?");
            if (confirmLogout) {
                // Eliminar el token y los datos del usuario del localStorage
                localStorage.removeItem('user');
                // Actualizar el estado global o el contexto (si usas un UserContext)
                updateUser("");  
                // Redirigir al login
                navigate('/login');
            } else {
                // Si cancela, redirigir al Home
                navigate('/');
            }
        } else {
            // Si el usuario no está logueado, lo redirigimos al login
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
                        <li><Link to="/perfil" className="navbar__link">PERFIL</Link></li>
                        <li><a href="#services" className="navbar__link">RECURSOS</a></li>
                        <li><a href="#contact" className="navbar__link">NOSOTROS</a></li>
                    </ul>
                </nav>
                <div className="navbar__login-container">
                    {/* Evita el comportamiento predeterminado del Link */}
                    <a href="/login" className="navbar__login" onClick={handleLoginClick}>
                        <img src={User} alt="Login" className="navbar__login-img" />
                        {username && <span className="navbar__username">{username}</span>}
                    </a>
                </div>
                <div className="navbar__menu-icon" onClick={toggleMenu}>
                    <Icon icon="ic:baseline-menu" width="30" height="30" />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
