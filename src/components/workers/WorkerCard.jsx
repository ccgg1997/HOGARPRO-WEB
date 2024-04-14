import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import * as usuariosService from '../../services/UsuariosService';
import * as serviciosService from '../../services/ServiciosService.js';

const MySwal = withReactContent(Swal)

const WorkerCard = ({ isOpen, onClose, onWorkerHired, workerId }) => {
    const [data, setData] = useState({});
    const [unitsNumber, setUnitsNumber] = useState('');

    const handleUnitsNumberChange = (event) => {
        setUnitsNumber(event.target.value);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('fetchCard', workerId);
                const response = await usuariosService.fecthUserInfo(workerId);
                // const userData = await response.json();
                console.log('response', response);
                setData(response);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };
        if (workerId) {
            fetchData();
        }
    }, [workerId]);


    const handleSubmit = (event) => {
        event.preventDefault();
        if (unitsNumber) {

            serviciosService.createServiceOrder({
                trabajador: workerId,
                cantidad: unitsNumber,
                labor: 1
            }).then(result => {
                console.log(result);
                onWorkerHired();
                MySwal.fire('Servicio Contratado Satisfactoriamente');
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
            MySwal.fire({
                icon: "info",
                title: "Ups...",
                text: "Debe solicitar al menos una unidad",
            });
        }
    }
    return (
        <Modal
            show={isOpen}
            onHide={onClose}
            animation={false} //NO SE QUE TIENE QUE VER PERO SI SE DEJA LA ANIMACIÓN SE CONGELA TODO XD
        >
            <Modal.Header closeButton>
                <Modal.Title>Información del trabajador</Modal.Title>
            </Modal.Header>
            <Modal.Body className='justify-content-center mx-auto '>
                <div className="card" style={{ width: "400px" }}>
                    <img className="card-img-top" src="https://www.w3schools.com/bootstrap4/img_avatar1.png" />
                    <div className="card-body">
                        <h4 className="card-title">{data.nombreCompleto}</h4>
                        <h5 className="card-title">Email: {data.correoElectronico}</h5>
                        <h6>Numero Estrellas: {data.numeroEstrellas}</h6>
                        <h6>Promedio Estrellas: {data.promedioEstrellas}</h6>
                        <Form onSubmit={handleSubmit}>
                            <Form.Control syze="sm" type="number" placeholder="Cantidad" value={unitsNumber} onChange={handleUnitsNumberChange} />
                            <button className="btn btn-outline-primary contratar-btn mt-2" type='submit'>
                                Contratar
                            </button>
                        </Form>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default WorkerCard;