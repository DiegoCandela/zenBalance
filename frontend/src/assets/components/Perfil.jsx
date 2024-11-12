import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/Perfil.css";

const Perfil = () => {
  const { username, setUsername } = useContext(UserContext); // Obtenemos el contexto del usuario
  const navigate = useNavigate(); // Para redirigir al login si es necesario

  // Estado para manejar el nuevo nombre de usuario
  const [newUsername, setNewUsername] = useState(username || "");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Estado para la carga

  // Redirigir al login si no hay usuario autenticado
  useEffect(() => {
    if (!username) {
      navigate("/login");  // Redirige al login si no hay usuario
    }
  }, [username, navigate]);

  // Función para manejar la actualización del perfil
  const handleUpdateProfile = async () => {
    if (!newUsername.trim()) {
      setError("El nombre de usuario no puede estar vacío.");
      return;
    }

    try {
      setIsLoading(true); // Activamos la carga

      const token = localStorage.getItem("token"); // Recuperamos el token del localStorage
      if (!token) {
        setError("No se proporcionó un token de autenticación.");
        return;
      }

      // Realizamos la solicitud PUT para actualizar el nombre de usuario
      const response = await axios.put(
        `http://localhost:5000/api/auth/${id}`,  // Asegúrate de que esta sea la URL correcta
        { username: newUsername },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Si la respuesta es exitosa, actualizamos el contexto y el localStorage
      if (response.status === 200) {
        setUsername(newUsername); // Actualizamos el nombre en el contexto
        localStorage.setItem("username", newUsername); // Actualizamos el nombre en el localStorage
        alert("Perfil actualizado con éxito.");
        setIsLoading(false); // Desactivamos la carga
      }
    } catch (error) {
      setIsLoading(false); // Desactivamos la carga en caso de error
      const errorMessage = error.response?.data?.message || error.message || "Error al actualizar el perfil.";
      setError(errorMessage); // Mostramos el error
    }
  };

  return (
    <div className="perfil">
      {username ? (
        <>
          <h1>Perfil del Usuario</h1>
          <div className="perfil__info">
            <p><strong>Nombre:</strong> {username}</p>
          </div>

          <h2>Editar Perfil</h2>
          {error && <p className="error">{error}</p>} {/* Mostramos el error si existe */}
          <div className="perfil__form">
            <label>
              Nombre de usuario:
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)} // Actualizamos el nombre al escribir
              />
            </label>
            <button
              onClick={handleUpdateProfile}
              disabled={isLoading} // Deshabilitamos el botón mientras se está procesando
            >
              {isLoading ? "Actualizando..." : "Actualizar Nombre"}
            </button>
          </div>
        </>
      ) : (
        <p>Redirigiendo al inicio de sesión...</p>
      )}
    </div>
  );
};

export default Perfil;
