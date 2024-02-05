import React, { useState, useEffect } from 'react';
import '../components/css/Comentario.css';
import '@fortawesome/fontawesome-free/css/all.css';
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
  const [emojiSeleccionado, setEmojiSeleccionado] = useState(null);
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

  function getNombreEmoji(emoji) {
    switch (emoji) {
      case '😁':
        return '😁 Muy Satisfecho';
      case '😊':
        return '😊 Satisfecho';
      case '😐':
        return '😐 Neutro';
      case '😔':
        return '😔 Poco Satisfecho';
      case '😡':
        return '😡 Muy Insatisfecho';
      default:
        return '';
    }
  }

  useEffect(() => {
    obtenerComentarios();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!emojiSeleccionado) {
      mensajes("seleccione un emoji", "error", error.message);
      return;
    } else {
      const external = getExternal();
      const datos = {
        comentario: comentario,
        external_persona: external,
        satisfaccion: getNombreEmoji(emojiSeleccionado),
      };

      try {
        const info = await enviar('/comentario/save', datos);

        if (info.code === 200) {
          mensajes("Comentario enviado!", "success", info.msg);
          obtenerComentarios();
          setComentario('');
          setEmojiSeleccionado(null); // Limpiar el emoji seleccionado después de enviar con éxito
        } else {
          setError(info.msg);
          mensajes("Error al comentar", "error", error);
        }
      } catch (error) {
        setError("Error al comentar");
        mensajes("Error al comentar", "error", error.message);
      }
    }
  };

  return (
    <>
      <div className="card">
        <div className="px-4 chat-box bg-white rounded-lg">
          <div className="p-4 row">
            <div className="text-center">
              <h2>Queremos saber qué piensas...</h2>
            </div>
          </div>
          <div className="text-center">
            <h3>Nivel de Satisfacción:</h3>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button type="button" className={`emoji-button ${emojiSeleccionado === '😁' ? 'selected' : ''}`} onClick={() => setEmojiSeleccionado('😁')}>😁</button>
            <button type="button" className={`emoji-button ${emojiSeleccionado === '😊' ? 'selected' : ''}`} onClick={() => setEmojiSeleccionado('😊')}>😊</button>
            <button type="button" className={`emoji-button ${emojiSeleccionado === '😐' ? 'selected' : ''}`} onClick={() => setEmojiSeleccionado('😐')}>😐</button>
            <button type="button" className={`emoji-button ${emojiSeleccionado === '😔' ? 'selected' : ''}`} onClick={() => setEmojiSeleccionado('😔')}>😔</button>
            <button type="button" className={`emoji-button ${emojiSeleccionado === '😡' ? 'selected' : ''}`} onClick={() => setEmojiSeleccionado('😡')}>😡</button>
          </div>
          {emojiSeleccionado && (
            <form onSubmit={onSubmit} className="transparent">
              {/* Mostrar emoji seleccionado en el textarea */}
              <div className="selected-emoji-textarea">{emojiSeleccionado}</div>
              <div className="input-group" style={{ width: '100%' }}>
                <textarea
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  aria-describedby="button-addon2"
                  className="form-control border-1 alert alert-info p-2"
                  style={{
                    backgroundColor: 'transparent',
                    height: '40px',
                    overflowY: comentario.length > 50 ? 'scroll' : 'hidden',
                  }}
                ></textarea>
                <div className="input-group-append alert alert-info" style={{ height: '40px', margin: '0', padding: '0' }}>
                  <button type="submit" className="btn btn-link">
                    <i className="fa fa-paper-plane" style={{ width: "25", height: "25" }}></i>
                  </button>
                </div>
              </div>
            </form>
          )}
          <p>Comentarios</p>
          {/* Mapear los comentarios */}
          {comentarios.slice().reverse().map((comentario, index) => (
            <div key={index} className="media mb-3">
              <div className="">
                <div role="alert" className="alert alert-success py-2 mb-2">
                  <p className="text-small mb-0 text-muted">comentario: {comentario.coment}</p>
                  <p className="text-small mb-0 text-muted">sentimiento: {comentario.sentimiento}</p>
                  <p className="text-small mb-0 text-muted">Nivel de satisfaccion: {comentario.satisfaccion}</p>
                </div>
                <p className="small text-muted">creado por: {comentario.usuario} - {formatFecha(comentario.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comentario;
