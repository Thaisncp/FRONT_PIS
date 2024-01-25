import React from 'react';
import { borrarSesion } from '../utilidades/SessionUtil';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    borrarSesion();
    navigate('/inicio-sesion');
  };

  return (
  <nav class="navbar navbar-expand-lg  navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Semaforo</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Inicio</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/inicio-sesion">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/registro-usuarios">Registro</a>
          </li>
        </ul>
        <span class="navbar-text">
          <a className="nav-link" href="/inicio-sesion" onClick={handleCerrarSesion}>Cerrar sesion</a>
        </span>
      </div>
    </div>
  </nav>

);
  };

export default Navbar;