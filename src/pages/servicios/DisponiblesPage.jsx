import React, { useState, useEffect, useMemo } from 'react';
import { Button } from 'react-bootstrap';

import { fetchLaboresDisponibles } from '../../services/ServiciosService';
import GenericTable from "../../components/tables/GenericTable";
import LoadReceiptForm from '../../components/forms/LoadReceipt';
import WorkerCard from '../../components/workers/WorkerCard';
import RefreshButton from '../../components/tables/RefreshButton';

const parseResponse = (data) => {
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
    return parsedData;
}



function DisponiblesPage() {
    const [data, setData] = useState([]);
    const [workerId, setWorkerId] = useState('');
    const [showWorkerCard, setShowWorkerCard] = useState(false);
    const [loadingTable, setLoadingTable] = useState(false);

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
            maxWidth: '10rem'
        },
        {
            name: 'Contratar',
            button: true,
            minWidth: "10rem",
            cell: (row, index) => (
                <Button
                    variant="primary"
                    className='w-100 p-1'
                    data-tag="allowRowEvents"
                    onClick={() => showWorkerInfo(row, index)}
                >
                    Ver
                </Button>
            )
        },
    ];

    const showWorkerInfo = (row, index) => {
        setWorkerId(row.usuarioId);
        setShowWorkerCard(true);
    }


    const loadLaboresDisponibles = async () => {
        setLoadingTable(true);
        fetchLaboresDisponibles()
            .then(response => {
                setData(parseResponse(response))
                setLoadingTable(false)
            })
            .catch(err => {
                console.error(err);
                setLoadingTable(false);
            })
    }
    useEffect(() => {
        loadLaboresDisponibles()
    }, []);

    const actionsMemo = useMemo(() => <RefreshButton action={loadLaboresDisponibles} />, []);

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
                                    <GenericTable
                                        columns={columns}
                                        data={data}
                                        args={{
                                            progressPending: loadingTable,
                                            actions: actionsMemo
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            {/* Modals */}
            {showWorkerCard && (
                <WorkerCard isOpen={showWorkerCard} onClose={() => { setShowWorkerCard(false); }} onWorkerHired={loadLaboresDisponibles} workerId={workerId} />
            )}
        </main >

    );
}

export default DisponiblesPage;