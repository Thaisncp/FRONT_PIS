import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InicioSesion from './fragment/InicioSesion';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<InicioSesion />} />
          <Route path='/inicio-sesion' element={<InicioSesion />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

