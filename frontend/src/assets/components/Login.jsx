// src/components/Login.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Importar Link para el enlace de registro
import { UserContext } from '../context/UserContext';
import "./styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      // Guarda el token y el usuario (incluido el rol) en el localStorage
      localStorage.setItem('token', token);
      localStorage.setItem("user", JSON.stringify({ name: user.name, role: user.role }));

      // Actualiza el contexto con el nombre y el rol del usuario
      updateUser(user.name, user.role);

      console.log("Inicio de sesión exitoso, usuario:", user);
      navigate('/');
    } catch (error) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
      console.error("Error en el inicio de sesión:", error);
    }
  };

  return (
    <div className="form-container">
      <h1>Iniciar Sesión</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p className="register-prompt">
        ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </div>
  );
};

export default Login;
