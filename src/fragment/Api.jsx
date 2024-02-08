import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/ext-language_tools';

const ApiRequest = ({ method, endpoint, outputKey, outputValue }) => (
    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <div >
            <div className="d-flex justify-content-between theme-ambiance">
                <p className="accordion-header metodo">{method}</p>
            </div>
            <div className="alert alert-info theme-ambiance" role="alert">
                {endpoint}
            </div>
        </div>
        <div key={outputKey}>
        {outputValue && (
            <AceEditor
                mode="json"
                theme="twilight"
                name={`output-editor-${outputKey}`}
                editorProps={{ $blockScrolling: Infinity }}
                value={outputValue || ''}
                style={{ height: '80%', fontSize: '20px', width: '100%' }}
                readOnly={true}
            />
        )}
        </div>
    </div>
);

const Api = () => {
    const URL_BACKEND_API = "https://computacion.unl.edu.ec/uv/api/";
    const lista_peticiones_get = {
        peticion1: { metodo: 'LISTA DISPOSITIVOS', peticion: URL_BACKEND_API + 'listar' },
        peticion2: { metodo: 'LISTA DISPOSITIVOS ACTIVOS', peticion: URL_BACKEND_API + 'activos' },
        peticion3: { metodo: 'MEDICIÓN PROMEDIO', peticion: URL_BACKEND_API + 'medicionPromedio' },
        peticion4: { metodo: 'MEDICIÓN DISPOSITIVOS', peticion: URL_BACKEND_API + 'medicionDispositivos' },
    };
    const lista_peticiones_post = {
        peticion1: { metodo: 'PROMEDIO POR FECHAS', peticion: URL_BACKEND_API + 'medicionFechas' },
        peticion2: { metodo: 'PROMEDIO POR SEMANAS', peticion: URL_BACKEND_API + 'medicionSemana' },
        peticion3: { metodo: 'PROMEDIO POR DIA', peticion: URL_BACKEND_API + 'medicionDia' },
    };
    const [outputs, setOutputs] = useState({});

    useEffect(() => {
        const fetchData = async (key, url) => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setOutputs((prevState) => ({
                    ...prevState,
                    [key]: JSON.stringify(data, null, 2),
                }));
            } catch (error) {
                console.error('Error fetching API:', error);
                setOutputs((prevState) => ({
                    ...prevState,
                    [key]: `Error fetching API: ${error.message}`,
                }));
            }
        };
        Object.keys(lista_peticiones_get).forEach((key) => fetchData(`get_${key}`, lista_peticiones_get[key].peticion));
        Object.keys(lista_peticiones_post).forEach((key) => fetchData(`post_${key}`, lista_peticiones_post[key].peticion));
    }, [lista_peticiones_get, lista_peticiones_post]);

    return (
        <>
            <Navbar />
            <main className="p-5">
                <div className="card p-4" style={{ overflow: 'auto', maxHeight: '780px' }}>
                    <div className="p-4 row">
                        <div className="col-sm-10">
                            <h2>Listado de peticiones disponibles</h2>
                        </div>
                    </div>
                    <div>
                        <h1>GET</h1>
                        <div className="row">
                            {Object.keys(lista_peticiones_get).map((clave, index) => (
                                <ApiRequest
                                    key={index}
                                    method={lista_peticiones_get[clave].metodo}
                                    endpoint={lista_peticiones_get[clave].peticion}
                                    outputKey={`get_${clave}`}
                                    outputValue={outputs[`get_${clave}`]}
                                />
                            ))}
                        </div>
                        <h1>POST</h1>
                        <div className="row">
                            {Object.keys(lista_peticiones_post).map((clave, index) => (
                                <ApiRequest
                                    key={index}
                                    method={lista_peticiones_post[clave].metodo}
                                    endpoint={lista_peticiones_post[clave].peticion}
                                    outputKey={`post_${clave}`}
                                    outputValue={outputs[`post_${clave}`]}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Api;