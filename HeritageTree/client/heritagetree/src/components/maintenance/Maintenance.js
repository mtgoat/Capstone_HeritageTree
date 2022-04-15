import React, { useContext, useEffect, useState } from "react";
import {ListGroup, Row, Col} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import {Link } from "react-router-dom";
import "./Maintenance.css";
import { MaintenanceContext } from "../../providers/MaintenanceProvider";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import {PostByMList} from "./PostMaintenance"

export const Maintenance = ({MaintenanceProp}) => {
    const {hardDeleteCategory } = useContext(MaintenanceContext); 
    
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);
    const handleShow = () => setShow(true);
    const handleShow2 = () => setShow2(true);

    const onClickHandler = () => {
       
        hardDeleteCategory(MaintenanceProp.id).then(
        navigate(handleClose)).then(navigate('/maintenances')); 
    };


    return (
        
        <ListGroup.Item id={MaintenanceProp.id} className="maintenances__flex-container" >
            <div> {MaintenanceProp.name}</div>
            
            <Row><Col> <Button outline variant="secondary" size="md" onClick={() => navigate(`/maintenances/edit/${MaintenanceProp.id}`)}> Edit </Button></Col>

            <Col> <Button outline variant="danger" size="md" onClick={handleShow}> 
                Delete
             </Button></Col>
             
             
             <Col>
             <Button outline variant="secondary" size="md" onClick={handleShow2}>View Posts</Button>

             </Col>

             </Row>


             <Modal show={show} onHide={handleClose}>
<Modal.Header closeButton>
<Modal.Title>Delete Maintenance Category</Modal.Title>
</Modal.Header>
<Modal.Body>Maintenance Name: {MaintenanceProp.name}</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={onClickHandler}>
    Confirm Delete
  </Button>
  <Button variant="primary" onClick={handleClose}>
    Cancel Delete
  </Button>
</Modal.Footer>
</Modal>

<Modal show={show2} onHide={handleClose2}>
<Modal.Header closeButton>
<Modal.Title>List of Reports with {MaintenanceProp.name} </Modal.Title>
</Modal.Header>
<Modal.Body>
  <PostByMList PostMaintenanceProp={MaintenanceProp}/>
</Modal.Body>
<Modal.Footer>
 
  <Button variant="primary" onClick={handleClose2}>
    Go Back
  </Button>
</Modal.Footer>
</Modal>
             
        </ListGroup.Item>
    )
}