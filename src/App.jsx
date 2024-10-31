// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './assets/components/Navbar';
import Footer from './assets/components/Footer';
import Home from './assets/components/Home';

function App() {
  return (
      <Router>
        <Navbar />
        <main> {/* Añadido un contenedor principal para el contenido */}
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Agrega más rutas aquí para otras páginas */}
          </Routes>
        </main>
        <Footer /> {/* Mueve el Footer fuera de Routes */}
      </Router>
  );
}

export default App;
