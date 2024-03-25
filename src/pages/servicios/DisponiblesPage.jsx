import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { fetchLaboresDisponibles } from '../../services/ServiciosService';

import GenericTable from "../../components/tables/GenericTable";
import LoadReceiptForm from '../../components/forms/LoadReceipt';

function parseResponse(data) {
    let parsedData = [];
    data.forEach((labor) => {
        labor.laborTrabajador.forEach((labTrabajador) => {
            let info = {
                //id: labTrabajador.usuarioId + '_' + labTrabajador.laborId,
                tipo: labor.tipo,
                descripcion: labor.descripcion,
                usuarioId: labTrabajador.usuarioId,
                precio: labTrabajador.precio,
                unidadPrecio: labTrabajador.unidadPrecio,
                nombre: labTrabajador.usuario.nombre,
                apellido: labTrabajador.usuario.apellido,
                nombreCompleto: labTrabajador.usuario.nombre + ' ' + labTrabajador.usuario.apellido,
                fechaNacimiento: labTrabajador.usuario.fechaNacimiento
            }
            parsedData.push(info);

        })
    })
    console.log('formated_data', parsedData);
    return parsedData;
}

function DisponiblesPage() {
    const [data, setData] = useState([]);
    const columns = [
        {
            name: 'Tipo',
            selector: row => row.tipo,
            sortable: true,
            reorder: true,
        },
        {
            name: 'Descripción',
            selector: row => row.descripcion,
            sortable: true,
            reorder: true,
        },
        {
            name: 'Especialista',
            selector: row => row.nombreCompleto,
            sortable: true,
            reorder: true,
        },
        {
            name: 'Valor Unitario',
            selector: row => row.precio,
            sortable: true,
            reorder: true,
        },
        {
            name: 'Unidad',
            selector: row => row.unidadPrecio,
            sortable: true,
            reorder: true,
        },
        {
            name: 'Contratar',
            sortable: true,
            reorder: false,
        },
    ];

    useEffect(() => {
        fetchLaboresDisponibles()
            .then(response => {
                setData(parseResponse(response))
            })
            .catch(err => console.error(err))
    }, []);

    return (
        <main role="main" className="container">
            <div className="container-fluid pt-3">
                <div className="card bg-info text-white justify-content-center">
                    <div className="card-body justify-content-center">
                        <div className="row mx-auto justify-content-center">
                            <LoadReceiptForm />
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="text-center">Servicios Disponibles</h3>
                                <div className="row">
                                    <GenericTable columns={columns} data={data} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </main >

    );
}

export default DisponiblesPage;