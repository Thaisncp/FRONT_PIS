import React, { useState } from 'react';
import Footer from './Footer';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { InicioSesion as iniciarSesionAPI } from '../hooks/Conexion'; // Ajusta las importaciones según tu estructura
import mensajes from '../utilidades/Mensajes'
import { saveToken} from '../utilidades/SessionUtil';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/css/InicioSesion.css';

const InicioSesion = () => {
  const navegation = useNavigate();
  const [error, setError] = useState(''); // Cambié el nombre de setError a error
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    var datos = {
      "correo": data.usuario,
      "clave": data.clave
    };
    console.log('doooo', datos);
    iniciarSesionAPI(datos).then((info) => {
      console.log('xddd', info.info.code)
      if (info.info.code === 200) {
        saveToken(info.info.token);
        mensajes("Has ingresado al sistema!", "Bienvenido usuario");
        navegation('/inicio');
      } else {
        setError(info.info.msg); // Cambié setError(info.msg) para mostrar el mensaje de error
        mensajes("Error en inicio de sesion", "error", info.info.msg);
      }
    });
  };

  return (
    <>
      <div className="login-container container mt-5">
        <h1 className="text-center mb-4">Inicia Sesión</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="usuario" className="form-label">
              Usuario:
            </label>
            <input
              type="text"
              id="usuario"
              className={`form-control ${errors.usuario ? 'is-invalid' : ''}`}
              placeholder="Ingrese usuario"
              {...register('usuario', { required: true })}
            />
            {errors.usuario && errors.usuario.type === 'required' && <div className='alert alert-danger'>Ingrese el usuario</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="clave" className="form-label">
              Clave:
            </label>
            <input
              type="password"
              id="clave"
              className={`form-control ${errors.clave ? 'is-invalid' : ''}`}
              placeholder="Ingrese clave"
              {...register('clave', { required: true })}
            />
            {errors.clave && errors.clave.type === 'required' && <div className='alert alert-danger'>Ingrese una clave</div>}
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
