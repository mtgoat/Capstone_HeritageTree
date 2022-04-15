import React, { useState, useEffect, createContext } from "react";

export const MaintenanceContext = createContext();

export function MaintenanceProvider(props) {

    const apiUrl = "https://localhost:5001";

    const [maintenances, setMaintenances] = useState([]);

    const getAllMaintenances = () => {
        return fetch(`${apiUrl}/api/Maintenance`)
          .then((res) => res.json())
          .then(setMaintenances);
      };

      const getMaintenanceById = (id) => {
        return fetch(`${apiUrl}/api/Maintenance/${id}`)
            .then(res => res.json())
    }

    const getAllMaintenancesByPostId = (id) => {
      return fetch(`${apiUrl}/api/Maintenance/GetAllByPostId/${id}`)
          .then(res => res.json())
  }
    

    const addMaintenance = (maintenance) => {
        return fetch(`${apiUrl}/api/Maintenance`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(maintenance),
        }).then(getAllMaintenances);
      };

      const updateMaintenance = (category) => {
        return fetch(`${apiUrl}/api/Maintenance/${category.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(category)
        })
          .then(getAllMaintenances)
      }

    const hardDeleteMaintenance = (maintenanceId) => {
        return fetch(`${apiUrl}/api/Maintenance/${maintenanceId}`, {
              method: "DELETE"
          })
              .then(getAllMaintenances)
    }

    const softDeleteMaintenance = (maintenanceId) => {
      
    }



      return (
        <MaintenanceContext.Provider value={{maintenances, getAllMaintenances, getMaintenanceById, addMaintenance, hardDeleteMaintenance, updateMaintenance, getAllMaintenancesByPostId
         }}>
          {props.children}
        </MaintenanceContext.Provider>
      );

};