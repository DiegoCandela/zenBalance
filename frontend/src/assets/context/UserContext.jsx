// src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user"); // Nuevo estado para el rol del usuario
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (storedUser && storedUser.name && token) {
      console.log("Usuario autenticado:", storedUser.name);
      setUsername(storedUser.name);
      setRole(storedUser.role || "user"); // Asignar el rol almacenado o 'user' por defecto
      setIsAuthenticated(true);
    } else {
      console.log("No hay usuario autenticado o falta el token");
    }
  }, []);

  const updateUser = (name, userRole = "user") => {
    setUsername(name);
    setRole(userRole); // Actualizar el rol del usuario
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify({ name, role: userRole }));
  };

  const logout = () => {
    console.log("Cerrando sesión y limpiando almacenamiento local");
    setUsername("");
    setRole("user"); // Restablecer el rol a 'user' por defecto
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ username, role, updateUser, isAuthenticated, logout }}>
      {children}
    </UserContext.Provider>
  );
};
