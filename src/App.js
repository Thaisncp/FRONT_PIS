import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InicioSesion from './fragment/InicioSesion';
import Registro from './fragment/Registro';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Registro/>} />
          <Route path='/inicio-sesion' element={<InicioSesion />} />
          <Route path='/registro-usuarios' element={<Registro/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

