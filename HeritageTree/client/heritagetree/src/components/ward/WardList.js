import React, { useContext, useEffect } from "react";
import { WardContext } from "../../providers/WardProvider";
import { Accordion, Button } from "react-bootstrap";
import "../../index.css";
import { Link } from "react-router-dom";

export const WardList = () => {
    const { wards, getAllWards } = useContext(WardContext);
   
    useEffect(() => {
      getAllWards();
    }, []);

    return (
        <>
        
        <div className="container">
        <h3 className="ward__title">List of Wards:</h3>
          <div className="row justify-content-center">
            <div className="col-sm-10 col-lg-10">
              <Accordion defaultActiveKey="0">
                {wards.map((w) => (
                  <Accordion.Body key={w.id} ward={w} >
                    {w.name}
                    </Accordion.Body >
                ))}
              </Accordion>
            </div>
          </div>
        </div>
        </>
      );
    };