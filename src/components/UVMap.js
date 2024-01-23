/// UVMap.js
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Importa los estilos de Leaflet

const UVMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Configuración básica del mapa
      const map = L.map('map').setView([-3.9903, -79.2044], 13); // Cambia a las coordenadas correctas
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
      mapRef.current = map;

      // Ajusta el tamaño del mapa al cambiar el tamaño de la ventana
      const resizeMap = () => {
        const container = document.getElementById('map');
        mapRef.current.invalidateSize(false);
        container.style.minHeight = `${window.innerHeight - 50}px`; // Ajusta según tus necesidades
      };

      // Agrega un evento de cambio de tamaño al mapa
      window.addEventListener('resize', resizeMap);

      // Limpia el evento cuando el componente se desmonta
      return () => {
        window.removeEventListener('resize', resizeMap);
      };
    }

    // Puedes agregar marcadores u otras capas según tus necesidades
  }, []);

  return <div id="map" style={{ minHeight: '350px', border: '1px solid #ccc' }}></div>;
};

export default UVMap;
