import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-cobalt'; // Importar el tema cobalt desde ace-builds
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/ext-language_tools'
import Navbar from './Navbar';

function Api() {
    const URL_BACKEND_API = "https://computacion.unl.edu.ec/uv/api/";
    //SOLICITUDES GET
    const solicitudes_get = {
        primero: { funcion: 'Lista de sensores', direccion: URL_BACKEND_API + 'listar' },
        segundo: { funcion: 'Lista de sensores activos', direccion: URL_BACKEND_API + 'activos' },
        tercero: { funcion: 'Radiacion promedio', direccion: URL_BACKEND_API + 'medicionPromedio' },
        cuarto: { funcion: 'Radiacion por dispositivo', direccion: URL_BACKEND_API + 'medicionDispositivos' },
    };
    //SOLICITUDES POST
    const solicitudes_post = {
        primero: { funcion: 'Promedio de radiacion por fechas', direccion: URL_BACKEND_API + 'medicionFechas' },
        segundo: { funcion: 'Promedio de radiacion por semana', direccion: URL_BACKEND_API + 'medicionSemana' },
        tercero: { funcion: 'Promedio de radiacion por dia', direccion: URL_BACKEND_API + 'medicionDia' },
    };

    // Estado para almacenar la salida de cada petición
    const [outputs, setOutputs] = useState({});

    useEffect(() => {
        const fetchData = async (key, url) => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setOutputs(prevState => ({
                    ...prevState,
                    [key]: JSON.stringify(data, null, 2)
                }));
            } catch (error) {
                console.error('Error fetching API:', error);
                setOutputs(prevState => ({
                    ...prevState,
                    [key]: `Error fetching API: ${error.message}`
                }));
            }
        };
        Object.entries(solicitudes_get).forEach(([key, item]) => fetchData(key, item.direccion));
        Object.entries(solicitudes_post).forEach(([key, item]) => fetchData(key, item.direccion));
    }, []); // El array vacío como segundo argumento asegura que el efecto se ejecute solo una vez al cargar la página
    //METODO PARA MAPEAR LAS SOLICITUDES
    const cargarSolicitudes = (lista) => {
        return Object.keys(lista).map((key) => (
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }} className="col-xs-12 col-sm-12 col-md-6 col-lg-6" key={key}>
                <div style={{ marginBottom: '10px', flex: 1 }}>
                <div className="d-flex justify-content-between">
                <h3 style={{ color: 'black', textAlign: 'left' }}>{lista[key].funcion}</h3>
            </div>
            <div className="alert alert-info" role="alert">
            <h5 style={{ textAlign: 'left' }}>{lista[key].direccion}</h5>
            </div>
                </div>
                <div> {/* Agregamos margen izquierdo y derecho de 10px */}
                <AceEditor
                        mode="json"
                        theme="cobalt"
                        name={`output-editor-${key}`}
                        editorProps={{ $blockScrolling: Infinity }}
                        value={outputs[key] || ''} // Utilizar la salida correspondiente a la petición actual
                        style={{ height: '250px', fontSize: "20px", width: 'calc(100% - 20px)' }}
                        readOnly={true} />
                </div>
            </div>
        ));
    };

    return (
        <>
            <Navbar />
            <main className="p-5">
                <div className="card p-4" style={{ overflow: 'auto', maxHeight: '780px' }}>
                    <div className="p-4 row">
                        <div className="col-sm-10" style={{alignContent: 'center'}}>
                            <h2>Listado de peticiones disponibles</h2>
                        </div>
                    </div>
                    <div>
                        <h3>GET</h3>
                        <div className='row'>
                            {cargarSolicitudes(solicitudes_get)}
                        </div>

                        <h3>POST</h3>
                        <div className='row'>
                            {cargarSolicitudes(solicitudes_post)}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Api;