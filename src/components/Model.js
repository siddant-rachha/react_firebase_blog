import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';




function Model({ show, modalConfirmPress, modalText, hideModal }) {

    return (
        <Modal
            show={show}
            onHide={hideModal}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h5 className='mb-0'>{modalText}</h5>
                </Modal.Title>
            </Modal.Header>
            {/* <Modal.Body>
                <h4>{modalText}</h4>
            </Modal.Body> */}
            <Modal.Footer>
                <Button className='btn-sm' variant="outline-dark" onClick={modalConfirmPress}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Model;