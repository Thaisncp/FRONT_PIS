import React, { useState } from 'react';
import { borrarSesion } from '../utilidades/SessionUtil';
import { getRol } from '../utilidades/SessionUtilClient';
import { useNavigate } from 'react-router';
import { Modal, Button } from 'react-bootstrap';
import Comentario from './Comentario';
import '../components/css/Comentario.css';

const Navbar = () => {
  const navigate = useNavigate();
  const rol = getRol();

  const [showComentariosModal, setShowComentariosModal] = useState(false);

  const handleCerrarSesion = () => {
    borrarSesion();
    navigate('/inicio-sesion');
  };

  const sesionIniciada = rol !== null; // Verifica si la sesión está iniciada

  const handleAbrirComentariosModal = () => {
    setShowComentariosModal(true);
  };

  const handleCerrarComentariosModal = () => {
    setShowComentariosModal(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">SEMAFORO UV</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {rol === 'ADMINISTRADOR' && (
              <>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">Inicio</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/validacion-usuarios">Validacion usuarios</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/api">Api</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/usuarios-aceptados">Usuarios Aceptados</a>
                </li>
              </>
            )}
            {rol === 'USUARIO' && (
              <>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">Inicio</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/api">Api</a>
                </li>
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" onClick={handleAbrirComentariosModal}>Comentario</a>
                </li>
              </>
            )}
            {!sesionIniciada && (
              <>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">Inicio</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/inicio-sesion">Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/registro">Registro</a>
                </li>
              </>
            )}
          </ul>
          {sesionIniciada && (
            <span className="navbar-text">
              <a className="nav-link" href="/inicio-sesion" onClick={handleCerrarSesion}>Cerrar sesión</a>
            </span>
          )}
        </div>
      </div>
      <Modal show={showComentariosModal} 
      onHide={handleCerrarComentariosModal}
      dialogClassName="custom-modal-dialog">
        <Modal.Header closeButton>
          <Modal.Title>Comentarios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Comentario></Comentario>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCerrarComentariosModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};

export default Navbar;
