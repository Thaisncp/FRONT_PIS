import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InicioSesion from './fragment/InicioSesion';
import Registro from './fragment/Registro';
import Radiacion from './fragment/Radiacion';
import Comentario from './fragment/Comentario';
import Api from './fragment/Api';
import RegistrosUsuario from './fragment/RegistrosUsuario';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Radiacion/>} />
          <Route path='/inicio-sesion' element={<InicioSesion />} />
          <Route path='/registro-usuarios' element={<Registro/>}/>
          <Route path='/comentarios' element={<Comentario/>}/>
          <Route path='/api' element={<Api/>}/>
          <Route path='/registros-usuarios' element={<RegistrosUsuario/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

