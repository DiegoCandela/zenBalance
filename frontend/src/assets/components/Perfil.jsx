// src/components/Perfil.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { Icon } from '@iconify/react';
import './styles/Perfil.css';

const Perfil = () => {
  const { username, isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();
  const [age, setAge] = useState('');
  const [personalDescription, setPersonalDescription] = useState('');
  const [improvementDescription, setImprovementDescription] = useState('');
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar el modo de edición

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("No hay token, redirigiendo a login");
      navigate('/login');
    } else if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated, navigate]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { age, personalDescription, improvementDescription } = response.data;
      setAge(age || '');
      setPersonalDescription(personalDescription || '');
      setImprovementDescription(improvementDescription || '');
    } catch (error) {
      console.error('Error al cargar el perfil:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true); // Habilitar el modo de edición
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/api/auth/update-profile',
        { age, personalDescription, improvementDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(response.data.message);
      setIsEditing(false); // Deshabilitar el modo de edición
    } catch (error) {
      setMessage('Error al actualizar el perfil');
      console.error(error);
    }
  };

  return (
    <div className="profile-container">
      {/* Sección izquierda: ícono de usuario de Iconify */}
      <div className="profile-avatar">
        <Icon icon="mdi:account-circle" className="user-icon" />
      </div>

      {/* Sección derecha: Información del perfil */}
      <div className="profile-info">
        <h1>Perfil de {username}</h1>
        {message && <p className="message">{message}</p>}

        <div className="profile-field">
          <label htmlFor="age">Edad:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            disabled={!isEditing} // Deshabilitar si no está en modo edición
          />
        </div>
        
        <div className="profile-field">
          <label htmlFor="personalDescription">Descripción Personal:</label>
          <textarea
            id="personalDescription"
            name="personalDescription"
            value={personalDescription}
            onChange={(e) => setPersonalDescription(e.target.value)}
            rows="3"
            disabled={!isEditing} // Deshabilitar si no está en modo edición
          ></textarea>
        </div>
        
        <div className="profile-field">
          <label htmlFor="improvementDescription">Cosas que quiero mejorar:</label>
          <textarea
            id="improvementDescription"
            name="improvementDescription"
            value={improvementDescription}
            onChange={(e) => setImprovementDescription(e.target.value)}
            rows="3"
            disabled={!isEditing} // Deshabilitar si no está en modo edición
          ></textarea>
        </div>

        {/* Mostrar el botón Editar o Guardar Cambios según el modo */}
        {!isEditing ? (
          <button onClick={handleEdit}>Editar</button>
        ) : (
          <button onClick={handleSave}>Guardar Cambios</button>
        )}
      </div>
    </div>
  );
};

export default Perfil;
