import React, { useContext, useEffect, useState } from "react";
import { MaintenanceContext } from "../../providers/MaintenanceProvider";
import {ListGroup} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import {Maintenance} from "./Maintenance";
import "./Maintenance.css";
import { Link, useNavigate} from "react-router-dom";

export const MaintenanceList = () => {
    const {maintenances, getAllMaintenances} = useContext(MaintenanceContext)
    const navigate = useNavigate();
    useEffect(() => {
        getAllMaintenances();
      }, []);
// const user = JSON.parse(localStorage.getItem("gifterUser"))

return (
    <>
        <p className="maintenance__title"> Maintenance Page</p>
        <Link to={"/maintenances/create"} >
        <Button className="maintenance__button" variant="outline-primary" >Create Maintenance Category</Button>
        </Link>
        <p className="maintenance__title"> List of Maintenance Categories</p>
            <section className="maintenanceList">
                <ListGroup> 
                    {maintenances.map((singleMaintenanceInLoop) =>{
                    return (
                    <Maintenance key={singleMaintenanceInLoop.id} MaintenanceProp={singleMaintenanceInLoop} />  
                    )})}
                </ListGroup>
            </section>
    </>
);

};