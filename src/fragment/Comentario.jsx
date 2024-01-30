import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../components/css/Comentario.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Footer from './Footer';
import { obtener, enviar } from '../hooks/Conexion';
import { getExternal } from '../utilidades/SessionUtilClient';
import mensajes from '../utilidades/Mensajes';

const Comentario = () => {
  // Data de comentarios
  function formatFecha(fecha) {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const fechaFormateada = new Date(fecha).toLocaleDateString(undefined, options);
    return fechaFormateada;
  }

  const [comentarios, setComentarios] = useState([]);
  const [comentario, setComentario] = useState('');
  const [error, setError] = useState('');

  const obtenerComentarios = async () => {
    try {
      const response = await obtener('/comentario/list');
      const resultado = response.info;
      setComentarios(resultado);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    obtenerComentarios();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const external = getExternal();
    const datos = {
      comentario: comentario,
      external_persona: external
    };

    try {
      const info = await enviar('/comentario/save', datos);

      if (info.code === 200) {
        mensajes("Comentario enviado!", "success", info.msg);
        // Obtener la lista de comentarios actualizada después de enviar con éxito
        obtenerComentarios();
        // Limpia el input después de enviar con éxito
        setComentario('');
      } else {
        setError(info.msg);
        mensajes("Error al comentar", "error", error);
      }
    } catch (error) {
      setError("Error al comentar");
      mensajes("Error al comentar", "error", error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className='p-5'>
        <div className="card">
          <div className="px-4 py-5 chat-box bg-white rounded-lg">
            <div className="p-4 row">
              <div className="text-center">
                <h2>Queremos saber que piensas...</h2>
              </div>
            </div>
            <p>Ingresa tu comentario:</p>
            <form onSubmit={onSubmit} className="bg-light">
              <div className="input-group">
                <input
                  type="text"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  aria-describedby="button-addon2"
                  className="form-control border-1 alert alert-info"
                  style={{ backgroundColor: 'transparent', height: '40px' }}
                />
                <div className="input-group-append alert alert-info" style={{ height: '40px', margin: '0', padding: "0" }}>
                  <button type="submit" className="btn btn-link">
                    <i className="fa fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </form>
            <p>Comentarios</p>
            {/* Mapear los comentarios */}
            {comentarios.slice().reverse().map((comentario, index) => (
              <div key={index} className="media mb-3">
                <div className="">
                  <div role="alert" className="alert alert-success py-2 mb-2">
                    <p className="text-small mb-0 text-muted">comentario: {comentario.coment}</p>
                    <p className="text-small mb-0 text-muted">sentimiento: {comentario.sentimiento}</p>
                  </div>
                  <p className="small text-muted">creado por: {comentario.usuario} - {formatFecha(comentario.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Comentario;
