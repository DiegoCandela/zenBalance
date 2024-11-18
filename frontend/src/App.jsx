import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./assets/components/Navbar";
import Footer from "./assets/components/Footer";
import Home from "./assets/components/Home";
import Login from "./assets/components/Login";
import Perfil from "./assets/components/Perfil";
import { UserProvider } from "./assets/context/UserContext";
import Register from "./assets/components/Register";
import Nosotros from "./assets/components/Nosotros";
import Recursos from "./assets/components/Recursos";

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/recursos" element={<Recursos />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
