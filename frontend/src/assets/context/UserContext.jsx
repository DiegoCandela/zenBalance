// src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (storedUser && storedUser.name && token) {
      console.log("Usuario autenticado:", storedUser.name);
      setUsername(storedUser.name);
      setIsAuthenticated(true);
    } else {
      console.log("No hay usuario autenticado o falta el token");
    }
  }, []);

  const updateUser = (name) => {
    setUsername(name);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify({ name }));
  };

  const logout = () => {
    console.log("Cerrando sesión y limpiando almacenamiento local");
    setUsername("");
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ username, updateUser, isAuthenticated, logout }}>
      {children}
    </UserContext.Provider>
  );
};
