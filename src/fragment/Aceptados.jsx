import React, { useState, useEffect } from 'react';
import { obtener } from '../hooks/Conexion';
import Navbar from './Navbar';

function Aceptados() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await obtener('/persona/listaAceptado');
        const resultado = response.info;
        setUsuarios(resultado);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    obtenerUsuarios();
  }, []);

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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Aceptados;
