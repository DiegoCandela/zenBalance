// src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user"); // Nuevo estado para el rol del usuario
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
  
    if (storedUser && token) {
      setUsername(storedUser.name);
      setRole(storedUser.role || "user");
      setIsAuthenticated(true); // Usuario autenticado
      console.log("Autenticación exitosa:", storedUser.name);
    } else {
      setIsAuthenticated(false); // Usuario no autenticado
      console.log("No hay usuario o token válido");
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
