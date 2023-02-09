
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
const Ordermodel = (data) => {
    const [show, setShow] = useState(false);
    console.log(data);
    // data.fo()
    // console.log(data);
    // // data.fc();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
    {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
      {/* c */}
      <Modal show={data.st} onHide={()=>data.fc()}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>data.fc()}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>data.fc()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Ordermodel