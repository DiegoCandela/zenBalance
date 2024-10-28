import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './assets/components/Navbar'


function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Navbar/>}/>
        </Routes>

      </Router>
    </>
  );
};

export default App
