// src/components/Nosotros.jsx
import React from 'react';
import './styles/Nosotros.css';

const Nosotros = () => {
  return (
    <div className="nosotros-container">
      <section className="section">
        <h2 className="section-title">Misión</h2>
        <p className="section-content">
          Nuestra misión es desarrollar un aplicativo web accesible y eficaz que permita a los usuarios mejorar su salud mental a través de herramientas de autoayuda y el fomento de hábitos saludables. Nos comprometemos a proporcionar un recurso confiable que apoye el bienestar emocional, facilitando el acceso a estrategias preventivas y de autocuidado.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">Visión</h2>
        <p className="section-content">
          Ser una plataforma líder en la promoción de la salud mental en Colombia, brindando soluciones tecnológicas que permitan a las personas gestionar su bienestar emocional de manera efectiva. Buscamos ser un referente en innovación tecnológica aplicada a la salud, alcanzando una mejora significativa en la calidad de vida de nuestros usuarios.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">Política de Tratamiento de Datos Personales</h2>
        <p className="section-content">
          Nos comprometemos a respetar y proteger la privacidad de los datos personales de nuestros usuarios. Toda la información recolectada a través de nuestro aplicativo se maneja de acuerdo con los principios de confidencialidad y seguridad, y solo será utilizada para el funcionamiento del aplicativo. Aseguramos que no compartiremos datos personales con terceros sin el consentimiento expreso de nuestros usuarios, y que cumplimos con la normativa vigente en Colombia sobre protección de datos personales.
        </p>
      </section>
    </div>
  );
};

export default Nosotros;
