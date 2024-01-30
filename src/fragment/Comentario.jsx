import React from 'react';
import Navbar from './Navbar';
import '../components/css/Comentario.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Footer from './Footer';


const Comentario = () => {
    // Data de comentarios
    const comentariosData = [
        { comentario: 'Aplicacion mala', autor: 'Thais' },
        { comentario: 'Me encanta esta app', autor: 'Juan' },
        { comentario: 'Necesita mejoras', autor: 'Ana' },
        { comentario: 'Genial!', autor: 'Carlos' },
        { comentario: 'No me gusta la interfaz', autor: 'Maria' },
    ];

    return (
        <>
            <Navbar />
            <div className='p-5'>
                <div className="card">
                    <div className="px-4 py-5 chat-box bg-white rounded-lg">
                    <div className="p-4 row">
                        <div className="text-center">
                            <h2 >Queremos saber que piensas...</h2>
                        </div>
                    </div>
                        <p>Ingresa tu comentario:</p>
                        <form action="#" className="bg-light">
                            <div className="input-group ">
                                <input
                                    type="text"
                                    aria-describedby="button-addon2"
                                    className="form-control border-1 alert alert-info"
                                    style={{ backgroundColor: 'transparent', height:'40px'}}
                                />
                                <div className="input-group-append alert alert-info" style={{height:'40px',margin:'0',padding:"0"}}>
                                    <button type="submit" className="btn btn-link">
                                        <i className="fa fa-paper-plane"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                        <p>Comentarios</p>
                        {/* Mapear los comentarios */}
                        {comentariosData.map((comentario, index) => (
                            <div key={index} className="media mb-3">
                                <div className="">
                                    <div role="alert" className="alert alert-success py-2 mb-2">
                                        <p className="text-small mb-0 text-muted">{comentario.comentario}</p>
                                    </div>
                                    <p className="small text-muted">{comentario.autor}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Comentario;