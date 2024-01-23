import React, { useState } from 'react';
import Footer from './Footer';
import '../components/css/InicioSesion.css';

import 'bootstrap/dist/css/bootstrap.min.css';
const InicioSesion = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
  };

  const handleLogout = () => {
  };

  return (
    <>
      <div className="login-container container mt-5">
        <h1 className="text-center mb-4">Inicia Sesión</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Usuario:
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
           </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Iniciar Sesión
            </button>
          </div>
          {error && <p className="text-danger mt-2">{error}</p>}
        </form>
      </div>
      <Footer />
    </>
  );
};


export default InicioSesion;