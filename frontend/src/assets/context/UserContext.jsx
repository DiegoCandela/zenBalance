// src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.name) {
      setUsername(storedUser.name);
    }
  }, []);

  const updateUser = (name) => {
    setUsername(name);
  };

  return (
    <UserContext.Provider value={{ username, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
