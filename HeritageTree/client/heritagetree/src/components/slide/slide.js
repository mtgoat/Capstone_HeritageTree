import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
import Carousel from 'react-bootstrap/Carousel'
import Row from 'react-bootstrap/Row'
import { Col } from 'react-bootstrap'
import  Button from 'react-bootstrap/Button'
import React, { useState } from "react";
import "../styles.css";
export const PostTks = () => {

    const [showB, setShowB] = useState(false);
    const handleCloseB = () => setShowB(false);
    const handleShowB = () => setShowB(true);
    const bg = {
        overlay: {
          background: "#696969"
        }
      };
    return (
    <Row>
    <Col md={6} className="mb-2">
    {/* <Button variant="primary" size="md" disabled>
        Edit
    </Button> */}
    </Col>
    <Col md={6} className="mb-2">
    <Button onClick={handleShowB} className="mb-2">
    Add Maintenance to this Post
    </Button>

    <Modal
show={showB}
onHide={handleCloseB}
backdrop="static"
keyboard={false}
fullscreen={true}
center 
styles={bg}
>
<Modal.Header closeButton bg="secondary">
<Modal.Title >Thank you !!!!! ありがとう!!!!! for all your help!</Modal.Title>
</Modal.Header>
<Modal.Body>
<Carousel fade >
  <Carousel.Item>
    <img
      className="d-block w-100"
      src='/slides/slide1.png'
      alt="First slide"
      width="500" height="600"
    />
  </Carousel.Item>

  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/slides/slide2.png"
      alt="Second slide"
    />
    
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/slides/slide3.png"
      alt="Third slide"
    />

</Carousel.Item>
</Carousel>
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleCloseB}>
Understood
</Button>

</Modal.Footer>
</Modal>

    </Col>
</Row>
    )
}