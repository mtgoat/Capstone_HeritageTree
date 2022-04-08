import React, {useContext, useEffect, useState} from "react"
import { MaintenanceContext } from "../../providers/MaintenanceProvider";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormSelect} from "react-bootstrap";

export const MaintenanceForm = () => {
    const {addMaintenance, getMaintenanceById, updateMaintenance} = useContext(MaintenanceContext)

    const {maintenance, setMaintenance} = useState({});

    const [isLoading, setIsLoading] = useState(true);

   const {maintenanceId} = useParams();

   console.log("maintenanceId", maintenanceId)
    useEffect(()=> {
        if(maintenanceId){
            getMaintenanceById(maintenanceId)
            .then(mnt => {
                setMaintenance(mnt)
              setIsLoading(false)
            })
          } else {
            setIsLoading (false)
          }}, [])


    const navigate = useNavigate();

    const handleControlledInputChange = (event)=> {
        const newMaintenance = {...maintenance}
        newMaintenance[event.target.id] = event.target.value
        
        setMaintenance(newMaintenance)
    }

    const handleSaveMaintenance = (event) => {
      

        if(maintenance.name === "" )
        {
            alert("Please fill out the Maintenance name.")
        } else {

            setIsLoading(true);
            if (maintenanceId){
                //PUT - update
             
                updateMaintenance({
                    id: maintenance.id,
                    name: maintenance.name,
                })
                .then(()=> navigate("/maintenances"))
            } else {
            addMaintenance({
                name: maintenance.name
            })
            .then(navigate("/maintenances"));
     }
    }
      
    }
    
    return(
        <>
        <h2 className="maintenancesForm__title">New Maintenance Category</h2>
        
        <Form className="post__form">
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Maintenance Category Name:</Form.Label>
                <Form.Control name="name" value={maintenance.name} onChange={handleControlledInputChange} type="text" required autoFocus placeholder="Enter a name for new maintenance category" />
            </Form.Group>
                         
            <Button primary disabled={isLoading} type="submit" className="btn btn-primary" onClick={event => {
                                event.preventDefault()
                                handleSaveMaintenance()}}>
                              {maintenanceId ? <>Save Maintenance</> : <>Add Maintenance</>}
            </Button>
            <Button outline onClick={() => navigate("/maintenances")}>
            Back to List
            </Button>
                   
        </Form>
        </>
    )
}
