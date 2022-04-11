import React, { useContext, useEffect, useState } from "react";
import {ListGroup} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import {Link } from "react-router-dom";
import "./Maintenance.css";
import { MaintenanceContext } from "../../providers/MaintenanceProvider";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
//we're just using the Card component that comes with reactstrap to organize some of the category details.
export const Maintenance = ({MaintenanceProp}) => {
    const {hardDeleteCategory } = useContext(MaintenanceContext); 
    
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  

    const onClickHandler = () => {
       
        hardDeleteCategory(MaintenanceProp.id).then(
        navigate(handleClose)).then(navigate('/posts')); 
    };


    return (
        
        <ListGroup.Item id={MaintenanceProp.id} className="category__flex-container" >
            <div> {MaintenanceProp.name}</div>
            
            <div> <Button outline variant="secondary" size="md" onClick={() => navigate(`/maintenances/edit/${MaintenanceProp.id}`)}> Edit </Button></div>

            <div> <Button outline variant="danger" size="md" onClick={handleShow}> 
                Delete
             </Button></div>

             <Modal show={show} onHide={handleClose}>
<Modal.Header closeButton>
<Modal.Title>Delete Maintenance Category</Modal.Title>
</Modal.Header>
<Modal.Body>Maintenance Name: {MaintenanceProp.name}</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={onClickHandler}>
    Confirm Delete
  </Button>
  <Button variant="primary" onClick={handleClose.then(navigate(`/maintenances`))}>
    Back to List
  </Button>
</Modal.Footer>
</Modal>
             
        </ListGroup.Item>
    )
}