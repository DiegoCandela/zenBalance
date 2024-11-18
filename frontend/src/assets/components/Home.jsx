import React from "react";
import Home_Paisaje from "../img/Home_Paisaje.png";
import "./styles/Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <header className="welcome-header">
        <h1>Bienvenido a ZenBalance</h1>
      </header>
      <div className="home-container">
        <div className="image-section">
          <img src={Home_Paisaje} alt="Imagen Salud Mental" />
        </div>
        <div className="text-section">
          <div className="text-box">
            <h2>OBJETIVO</h2>
            <p>
              Brindar un espacio accesible y seguro donde los usuarios puedan
              encontrar herramientas, recursos y orientación para mejorar su
              bienestar mental, promoviendo la calma, el equilibrio emocional y
              el autoconocimiento.
            </p>
            <button className="cta-button">
              <Link to="/recursos" className="cta-link">
                Explora nuestros recursos
              </Link>
            </button>
          </div>
        </div>
      </div>

      {/* Sección de Preguntas Frecuentes */}
      <div className="faq-container">
        <h2>Preguntas Frecuentes</h2>
        <div className="faq-item">
          <h3>¿Qué es ZenBalance?</h3>
          <p>
            ZenBalance es una plataforma dedicada a proporcionar recursos y
            herramientas para el bienestar mental.
          </p>
        </div>
        <div className="faq-item">
          <h3>¿Cómo puedo acceder a los recursos?</h3>
          <p>
            Puedes acceder a los recursos a través de nuestra sección de
            herramientas en la plataforma.
          </p>
        </div>
        <div className="faq-item">
          <h3>¿Es gratuita la plataforma?</h3>
          <p>Sí, ZenBalance ofrece todos sus recursos de forma gratuita.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
