import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';




function Model({ show, modalConfirmPress, modalText, hideModal }) {

    return (
        <Modal
            show={show}
            onHide={hideModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h4>{modalText}</h4>
                </Modal.Title>
            </Modal.Header>
            {/* <Modal.Body>
                <h4>{modalText}</h4>
            </Modal.Body> */}
            <Modal.Footer>
                <Button onClick={modalConfirmPress}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Model;