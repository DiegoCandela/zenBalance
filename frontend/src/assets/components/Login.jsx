// src/components/Login.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Spinner from './Spinner'; // Importa el componente Spinner
import "./styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Estado para el spinner
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Activar el spinner

    try {
      const response = await axios.post('https://zenbalance.onrender.com/api/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem("user", JSON.stringify({ name: user.name, role: user.role }));

      updateUser(user.name, user.role);

      console.log("Inicio de sesión exitoso, usuario:", user);
      setLoading(false); // Desactivar el spinner
      navigate('/');
    } catch (error) {
      setLoading(false); // Desactivar el spinner
      setError('Error al iniciar sesión. Verifica tus credenciales.');
      console.error("Error en el inicio de sesión:", error);
    }
  };

  return (
    <div className="form-container">
      <h1>Iniciar Sesión</h1>
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <Spinner /> // Usar el componente Spinner
      ) : (
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
      )}
      <p className="register-prompt">
        ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </div>
  );
};

export default Login;
