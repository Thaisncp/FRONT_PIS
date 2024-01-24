import React, { useState } from 'react';
import Footer from './Footer';
import '../components/css/InicioSesion.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Registro = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ocupacion, setOcupacion] = useState('');
  const [institucion, setInstitucion] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
   };

  const handleLogout = () => {
    // Implementa la lógica de cierre de sesión si es necesario.
  };

  return (<div>
    <div className="mb-4 registro-container container mt-5">
      <h1 className="text-center mb-4">Registro</h1>
      <form className='row g-3' onSubmit={handleLogin}>
        <div className="col-md-6">
          <label htmlFor="nombres" className="form-label">
            Nombres:
          </label>
          <input
            type="text"
            id="nombres"
            className="form-control"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="apellidos" className="form-label">
            Apellidos:
          </label>
          <input
            type="text"
            id="apellidos"
            className="form-control"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="fechaNacimiento" className="form-label">
            Fecha de Nacimiento:
          </label>
          <input
            type="date"
            id="fechaNacimiento"
            className="form-control"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="direccion" className="form-label">
            Dirección:
          </label>
          <input
            type="text"
            id="direccion"
            className="form-control"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="ocupacion" className="form-label">
            Ocupación:
          </label>
          <input
            type="text"
            id="ocupacion"
            className="form-control"
            value={ocupacion}
            onChange={(e) => setOcupacion(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="institucion" className="form-label">
            Institución:
          </label>
          <input
            type="text"
            id="institucion"
            className="form-control"
            value={institucion}
            onChange={(e) => setInstitucion(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="correo" className="form-label">
            Correo:
          </label>
          <input
            type="email"
            id="correo"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="clave" className="form-label">
            Clave:
          </label>
          <input
            type="password"
            id="clave"
            className="form-control"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
          />
        </div>
        
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            Iniciar Sesión
          </button>
        </div>
        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
    </div>
    <Footer />
    </div>
  );
};

export default Registro;
