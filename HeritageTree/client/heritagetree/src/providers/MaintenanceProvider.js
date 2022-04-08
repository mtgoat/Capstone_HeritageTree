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

      const getMaintenancesById = (id) => {
        return fetch(`${apiUrl}/api/Maintenance/${id}`)
            .then(res => res.json())
    }

    const addMaintenances = (maintenance) => {
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





      return (
        <MaintenanceContext.Provider value={{maintenances, getAllMaintenances, getMaintenancesById, addMaintenances, hardDeleteMaintenance, updateMaintenance
         }}>
          {props.children}
        </MaintenanceContext.Provider>
      );

};