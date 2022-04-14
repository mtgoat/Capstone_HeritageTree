import React, {useContext, useEffect, useState} from "react"
import { MaintenanceContext } from "../../providers/MaintenanceProvider";
import { useNavigate } from "react-router-dom";
import { Button, Form} from "react-bootstrap";

export const MaintenanceForm = () => {
    const {addMaintenance, getAllMaintenances} = useContext(MaintenanceContext)

    const [maintenance, setMaintenance] = useState({});

    useEffect(()=> {
        getAllMaintenances()
           
          }, [])

console.log(maintenance)
    const navigate = useNavigate();

    const handleControlledInputChange = (event)=> {
        const newMaintenance = {...maintenance}
        newMaintenance[event.target.id] = event.target.value
        
        setMaintenance(newMaintenance)
    }

    const handleSaveMaintenance = (event) => {
        event.preventDefault()

        if(maintenance.name === "" )
        {
            alert("Please fill out the Maintenance name.")
        } else {

            addMaintenance(maintenance)
            .then(navigate("/maintenances"));
     }
    }
      
    return(
        <>
        <h2 className="maintenanceForm__title">New Maintenance Category</h2>
        
        <Form className="maintenance__form">
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Maintenance Category Name:</Form.Label>
                <Form.Control name="name" value={maintenance.name} onChange={handleControlledInputChange} type="text" required autoFocus placeholder="Enter a name for new maintenance category" />
                
            </Form.Group>

            <Form.Group >
            <Form.Label></Form.Label>
              <Form.Control show={false} disabled/>
          </Form.Group>

            <Button primary  type="submit" className="btn btn-primary" onClick={handleSaveMaintenance}>
                                Save Maintenance
            </Button> {" "}
            <Button outline onClick={() => navigate("/maintenances")}>
            Back to List
            </Button>
                   
        </Form>
        </>
    )
}
