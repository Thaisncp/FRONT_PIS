import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InicioSesion from './fragment/InicioSesion';
import Registro from './fragment/Registro';
import Radiacion from './fragment/Radiacion';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Radiacion/>} />
          <Route path='/inicio-sesion' element={<InicioSesion />} />
          <Route path='/registro-usuarios' element={<Registro/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

