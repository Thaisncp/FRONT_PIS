import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import '../components/css/InicioSesion.css';
import UVBar from '../components/UVBar';
import UVMap from '../components/UVMap';
import UVInfo from '../components/UVInfo';
import UVWarning from '../components/UVWarning';
import UVLegend from '../components/UVLegend';
import NewUVBar from '../components/NewUVBar';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
const MainContainer1 = ({ uvData}) => (
    <div className="main-container" style={{ backgroundColor:  'white'}}>
      {/* Contenido principal después de iniciar sesión */}
      <h1 className="text-center mb-4">Sistema UV</h1>
      <div className="row">
        <div className="col-md-6">
          <UVBar uvIntensity={uvData.intensity} />
          <UVWarning uvIntensity={uvData.intensity} />
        </div>
        <div className="col-md-6">
          <UVMap uvData={uvData} />
        </div>
      </div>
      <div className="mt-3">
        <UVInfo uvIntensity={uvData.intensity} uvLocation={uvData.location} />
      </div>
    </div>
  );
  
  const MainContainer2 = ({ uvData }) => (
    <div className="main-container2 side-container" style={{ backgroundColor: 'white'}}>
      {/* Contenido específico para MainContainer2 */}
      <h2>Informacion UV</h2>
      <div className="mt-5">
      </div>
        <div className="col-md-8">
          <NewUVBar uvIntensity={uvData.intensity} />
          <UVLegend />
        </div>
  
    </div>
  );
  
  const MainContainer3 = ({ uvData }) => {
    const [uvHistory, setUVHistory] = useState([]);
  
    useEffect(() => {
      const interval = setInterval(() => {
        const currentDate = new Date().toLocaleString();
  
        // Agrega el nuevo dato al historial usando el valor actual de intensity
        setUVHistory((prevHistory) => [
          ...prevHistory,
          { intensity: uvData.intensity, date: currentDate },
        ]);
      }, 1000); // Intervalo de 1 segundo
  
      // Limpia el intervalo al desmontar el componente
      return () => clearInterval(interval);
    }, [uvData.intensity]); // El efecto se ejecuta cada vez que cambia el valor de intensity en uvData
  
    // Limita la cantidad de elementos mostrados en el historial
    const limitedHistory = uvHistory.slice(-15); // Cambia 5 por la cantidad que desees mostrar
  
  return (
      <div className="main-container3 side-container" style={{ backgroundColor: 'white' }}>
        <h2>Historial UV</h2>
        <div className="history-container">
          <ul>
            {limitedHistory.map((historyItem, index) => (
              <li key={index}>
                Intensidad UV: {historyItem.intensity}, Fecha: {historyItem.date}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
const Radiacion = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
  };

  const handleLogout = () => {
  };
  const [uvData, setUVData] = useState({
    intensity: 3,
    location: 'Loja, Ecuador',
  });
  return (
    <>
    <Navbar/>
          <MainContainer1 uvData={uvData} handleLogout={handleLogout} />
          <MainContainer2 uvData={uvData} />
          <MainContainer3 uvData={uvData} />
      <Footer />
    </>
  );
};


export default Radiacion;