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
      <main style={{ marginTop: '13vh', marginBottom: '10vh' }}> {/* Márgenes para evitar que el contenido quede detrás del navbar y footer */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Agrega más rutas aquí para otras páginas */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
