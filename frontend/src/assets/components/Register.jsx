import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from './Spinner'; // Importa el componente Spinner
import './styles/Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado para el spinner
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true); // Activar el spinner

    try {
      const response = await axios.post('https://zenbalance.onrender.com/api/auth/register', {
        username,
        email,
        password,
      });

      setMessage(response.data.message);
      setLoading(false); // Desactivar el spinner
      navigate('/login');
    } catch (error) {
      setLoading(false); // Desactivar el spinner
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('Error en el servidor. Intenta nuevamente.');
      }
    }
  };

  return (
    <div className="register-container">
      <h1>Registro de Usuario</h1>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <Spinner /> // Usar el componente Spinner
      ) : (
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Registrarse</button>
        </form>
      )}
      <p className="register-prompt">
        ¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesion</Link>
      </p>
    </div>
  );
};

export default Register;
