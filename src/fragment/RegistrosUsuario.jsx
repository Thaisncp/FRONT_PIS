import React, { useState, useEffect } from 'react';
import { obtener, enviar } from '../hooks/Conexion';
import Navbar from './Navbar';
import mensajes from '../utilidades/Mensajes';

function RegistrosUsuario() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await obtener('/persona/list');
        const resultado = response.info;
        setUsuarios(resultado);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    obtenerUsuarios();
  }, []);

  const handleCambiarEstado = async (externalId, nuevoEstado) => {
    try {
      const data = {
        external_id: externalId,
        estado: nuevoEstado,
      };
      // Ajusta la URL según tu implementación real
      await enviar('/cuenta/modEstado', data).then((info) => {
        console.log('xddd', info.code)
        if (info.code === 200) {
          mensajes("estado actualizado!", "success", info.msg);
          const nuevosUsuarios = usuarios.map((usuario) =>
          usuario.cuenta.external_id === externalId
            ? { ...usuario, cuenta: { ...usuario.cuenta, estado: nuevoEstado } }
            : usuario
        );
        setUsuarios(nuevosUsuarios);
        } else {
          mensajes("Error al cambiar estado", "error", info.msg);
        }
      });
      // Actualizar la lista de usuarios después de cambiar el estado
    } catch (error) {
      console.error('Error al cambiar el estado:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="row">
        <figure className="text-center">
          <h1 style={{ color: 'white' }}>LISTA DE USUARIOS</h1>
        </figure>
        <div className="container-fluid">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Nro</th>
                <th>Apellidos</th>
                <th>Nombres</th>
                <th>Dirección</th>
                <th>Fecha de Nacimiento</th>
                <th>Ocupación</th>
                <th>Organización</th>
                <th>Correo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{usuario.apellidos}</td>
                  <td>{usuario.nombres}</td>
                  <td>{usuario.direccion}</td>
                  <td>{new Date(usuario.fecha_nacimiento).toLocaleDateString()}</td>
                  <td>{usuario.ocupacion}</td>
                  <td>{usuario.organizacion}</td>
                  <td>{usuario.cuenta.correo}</td>
                  <td>{usuario.cuenta.estado}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleCambiarEstado(usuario.cuenta.external_id, 'ACEPTADO')}
                    >
                      Aceptar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleCambiarEstado(usuario.cuenta.external_id, 'RECHAZADO')}
                    >
                      Rechazar
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleCambiarEstado(usuario.cuenta.external_id, 'ESPERA')}
                    >
                      Espera
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default RegistrosUsuario;
