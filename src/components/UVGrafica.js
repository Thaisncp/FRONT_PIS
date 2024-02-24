import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import '../components/css/Radiacion.css'
import { format, subDays } from 'date-fns';

const GraficaMedicionesUV = () => {
  const [mediciones, setMediciones] = useState([]);

  useEffect(() => {
    const fechaActual = new Date();
    console.log(fechaActual);
    const fechaInicio = subDays(fechaActual, 3);
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://computacion.unl.edu.ec/uv/api/medicionFechas',
          {
            fechaInicio: format(fechaInicio, 'yyyy-MM-dd'),//'2024-02-17',
            fechaFin: format(fechaActual, 'yyyy-MM-dd')//'2024-02-20',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-API-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJCQUNLRU5EIiwiaWF0IjoxNzA4NDYxNjY0fQ.f1FEK9NjDiZ_8nhl1wcXyxb7F4DBJfe11RLnW1ehSI0',
            },
          }
        );

        if (!response.data || !response.data.mediciones) {
          throw new Error('No se recibieron datos válidos');
        }

        setMediciones(response.data.mediciones);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchData();
  }, []);

  const nombresDispositivos = {
    1: 'Hospital Universitario Motupe',
    2: 'Quinta experimental Punzara',
    3: 'FEIRNNR',
    4: 'Veterinaria',
    5: 'Area de contabilidad',
    6: 'FSH'
    // Agrega más dispositivos según sea necesario
  };

  const dispositivos = Array.from(new Set(mediciones.map((medicion) => medicion.dispositivoId)));

  const series = dispositivos.map((dispositivoId, index) => ({
    name: nombresDispositivos[dispositivoId] || `Dispositivo ${dispositivoId}`,
    data: mediciones
      .filter((medicion) => medicion.dispositivoId === dispositivoId)
      .map((medicion) => ({
        x: new Date(medicion.fecha).getTime(),
        y: medicion.uv,
      })),
  }));

  const options = {
    chart: {
      height: 350,
      type: 'area',
      background: 'white', // Fondo gris
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function (val) {
          return new Date(val).toLocaleDateString(); // Mostrar solo la fecha en formato corto
        },
      },
    },
    yaxis: {
      min: 0,
      max: 15,
      tickAmount: 16,
      labels: {
        formatter: function (val) {
          return Math.round(val);
        },
      },
    },

    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
      style: {
        fontSize: '12px', // Tamaño de la fuente
        fontFamily: 'Helvetica, Arial, sans-serif', // Familia de la fuente
        colors: ['#000000'], // Color del texto (negro)
      },
    },
  };

  return (
    <div className='grafica-container'>
      <h1 style={{ color: '#100955', fontSize: '40px', textAlign: 'center', margin: '0'}}>Gráfico de Radiación Semanal</h1>
      {mediciones.length > 0 && <ReactApexChart options={options} series={series} type="area" height={350} width={1700} color='#100955' />}
    </div>
  );
};

export default GraficaMedicionesUV;
