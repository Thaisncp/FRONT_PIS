import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Api = () => {
    const lista_peticiones = {
        peticion1: { metodo: 'GET', peticion: 'http://localhost:3005/api/rol/listar' },
        peticion2: { metodo: 'POST', peticion: 'http://localhost:3005/api/persona/listar' },
        peticion3: { metodo: 'PUT', peticion: 'http://localhost:3005/api/persona-rol/listar' },
        peticion4: { metodo: 'DELETE', peticion: 'http://localhost:3005/api/persona-rol/listar' },
        peticion5: { metodo: 'PATCH', peticion: 'http://localhost:3005/api/persona-rol/listar' },
    };

    return (
        <>
            <Navbar />

            <main className='p-5'>
                <div className="card p-4">
                    <div className="p-4 row">
                        <div className="col-sm-10">
                            <h2 >Listado de peticiones disponibles</h2>
                        </div>
                    </div>
                    <div>
                        {Object.entries(lista_peticiones).map(([clave, valor], index) => (
                            <div className="mb-5" key={index}>
                                <div className={`d-flex justify-content-between theme-ambiance`}>
                                    <p className="accordion-header metodo" id={`heading${index + 1}`}>{valor.metodo}</p>
                                </div>
                                <div className="alert alert-info theme-ambiance" role="alert">
                                    {valor.peticion}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Api;