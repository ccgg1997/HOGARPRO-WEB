import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import * as usuarioService from '../../services/UsuariosService.js';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const LoadReceiptForm = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedFile) {
            const formData = new FormData();
            formData.append('imagen', selectedFile);
            usuarioService.loadReceipt(formData)
                .then(result => {
                    console.log(result);
                    MySwal.fire('Recibo cargado correctamente');
                })
                .catch(error => {
                    console.log(error)
                    MySwal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Ocurrió un error al cargar el archivo",
                        footer: error.message
                    });
                });
        } else {
            console.log('No file selected');
            MySwal.fire({
                icon: "info",
                title: "Ups...",
                text: "Debe seleccionar un archivo",
            });
        }
    };

    return (
        <Form onSubmit={handleSubmit} className='form-inline'>
            <div className="input-group">
                <div className="col-12 col-sm-4">
                    <label htmlFor="" className="mt-2 h5">
                        Realiza la carga del recibo de servicios:
                    </label>
                </div>
                <div className="custom-file col-12 col-sm-5 px-1">
                    <Form.Control syze="sm" type="file" placeholder="Recibo De Servicios" onChange={handleFileChange} />
                </div>
                <div className="col-12 col-sm-3 px-2">
                    <input
                        type="submit"
                        className="btn btn-primary mx-auto loat-right w-100"
                        defaultValue="Enviar"
                    />

                </div>
            </div>
        </Form>
    );
};

export default LoadReceiptForm;