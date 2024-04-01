import React, { useState, useEffect, useMemo } from 'react';
import GenericTable from '../../components/tables/GenericTable';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import RefreshButton from '../../components/tables/RefreshButton';

import { fetchServiciosContratados, calificateService } from '../../services/ServiciosService';

const parseResponse = (data) => {
    let parsedData = [];
    data.forEach((val, i) => {
        let trabajador = val.trabajador;
        let labor = val.labor;
        let info = {
            id: val.id,
            fechaCreacion: val.fechaCreacion,
            fechaFinalizacion: val.fechaTerminacion,
            labor: labor.tipo,
            trabajador: trabajador.nombre + ' ' + trabajador.apellido,
            descripcion: val.descripcion,
            laborId: labor.id,
            precio: val.precio,
            calificacion: val.calificacion,
            estado: val.estado,
            rowId: i
        }
        parsedData.push(info);
    });
    return parsedData;
}

const ContratadosPage = () => {
    const [data, setData] = useState([]);
    const [loadingTable, setLoadingTable] = useState(false);
    const ContratadosSwal = withReactContent(Swal)
    const columns = [
        {
            name: 'Fecha Creación',
            selector: row => row.fechaCreacion,
            sortable: true,
            reorder: true,
        },
        {
            name: 'Labor',
            selector: row => row.labor,
            sortable: true,
            reorder: true,
        },
        {
            name: 'Trabajador',
            selector: row => row.trabajador,
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
            name: 'Valor',
            selector: row => row.precio,
            sortable: true,
            reorder: true,
            maxWidth: '10rem'
        },
        {
            name: 'Calificación',
            selector: row => row.calificacion,
            sortable: true,
            reorder: true,
            maxWidth: '10rem'
        },
        {
            name: 'Estado',
            selector: row => row.estado,
            sortable: true,
            reorder: true,
            maxWidth: '10rem'
        },
        {
            name: 'Fecha Finalización',
            selector: row => row.fechaTerminacion,
            sortable: true,
            reorder: true,
            maxWidth: '10rem'
        },
        {
            name: 'Calificar',
            button: true,
            minWidth: "10rem",
            cell: (row, index) => (
                <Button
                    variant="primary"
                    className='w-100 p-1'
                    data-tag="allowRowEvents"
                    disabled={row.estado !== "FINALIZADO"}
                    onClick={() => { calificateServiceModal(row, index) }}
                >
                    Calificar
                </Button>
            )
        },
    ];


    const loadServiciosContratados = async () => {
        setLoadingTable(true);
        fetchServiciosContratados()
            .then(response => {
                setData(parseResponse(response))
                setLoadingTable(false);
            })
            .catch(err => {
                console.error(err);
                setLoadingTable(false);
            })
    }
    useEffect(() => {
        loadServiciosContratados()
    }, []);

    const calificateServiceModal = async (row, index) => {
        ContratadosSwal.fire({
            title: <i>Calificar Servicio</i>,
            input: 'number',
            inputAttributes: {
                placeholder: "Califica de 1 a 10",
                min: "1",
                max: "10"
            },
            showCancelButton: true,
            showCloseButton: true,
            allowOutsideClick: true,
            showLoaderOnConfirm: true,
            confirmButtonText: "Calificar!",
            cancelButtonText: "Cancelar!",
            preConfirm: () => {
                if (!ContratadosSwal.getInput().value) {
                    return false;
                }
            },
            inputValidator: (value) => {
                if (!value) {
                    return "Se requiere una calificación!";
                }
            }
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                let json = {
                    usuarioId: '3057675078',//getUserData().usuario.celular, PENDIENTE
                    calificacion: result.value,
                    idServicio: row.id
                }
                calificateService(json).then(() => {
                    loadServiciosContratados();
                    ContratadosSwal.fire({
                        icon: "success",
                        title: "Servicio Calificado"
                    });

                }).catch((error) => {
                    console.error(error);
                });


            }
        });
    }

    const actionsMemo = useMemo(() => <RefreshButton action={loadServiciosContratados} />, []);

    return (
        <main role="main" className="container">
            <div className="container-fluid pt-3">
                <div className="row mt-3">
                    <div className="col-12 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="text-center">Mis servicios contratados: </h3>
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
            </div>

        </main>
    )
}
export default ContratadosPage;