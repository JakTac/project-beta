import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useNavigate } from 'react-router-dom'

function AlertMessage({activeAlert, setActiveAlert, message}) {
    let navigate = useNavigate()


    function handleClose() {
        setActiveAlert(false)
        navigate('/appointments')
    }


    return (
        <Modal show={activeAlert} onHide={handleClose} backdrop="static">
            <Modal.Header>
                <Modal.Title>Alert</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleClose}>Close</button>
            </Modal.Footer>
        </Modal>
    )
}
export default AlertMessage