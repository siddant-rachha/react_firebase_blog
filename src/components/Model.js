//bootstrap imports
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//redux imports
import { useSelector, useDispatch } from 'react-redux';
import { modelActions } from '../store/modelSlice';
//


function Model() {

    //redux
    const model = useSelector((state) => state.model)
    const dispatch = useDispatch()
    //

    const handleClick = () => {
        dispatch(modelActions.setModel({ pressed: !model.pressed, display: false }))
    }

    return (
        <>
            {console.log('MODEL COMPONENT.JS RENDERED')}

            <Modal
                show={model.display}
                onHide={() => dispatch(modelActions.setModel({ display: false }))}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h5 className='mb-0'>{model.text}</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={handleClick} className='btn-sm' variant="outline-primary">Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Model;