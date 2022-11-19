import React from 'react';
import { Modal, Button } from 'react-bootstrap';


const Modals = (props) => {
    const { state, title, children, button_1, button_2, size, cancelFnc, addFnc } = props

    return (
        <Modal show={state} size={size}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <form onSubmit={addFnc}>
                <Modal.Body>
                    {children}
                </Modal.Body>

                <Modal.Footer>
                    {
                        button_1 && <Button variant="secondary" onClick={cancelFnc}> {button_1}</Button>
                    }

                    {
                        button_2 && <Button variant="primary" type="submit">{button_2} </Button>
                    }

                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default Modals;
