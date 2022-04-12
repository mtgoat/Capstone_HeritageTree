import React, { useState,  createContext } from "react";

export const HealthStatusContext =  createContext();

export const HealthStatusProvider = (props) => {

    const [healthStatuses, setHealthStatuses] = useState([]);
    const apiUrl = "https://localhost:5001";

  const getAllHealthStatuses = () => {
    return fetch(`${apiUrl}/api/HealthStatus`)
      .then((res) => res.json())
      .then(setHealthStatuses);
  };

  return (
    <HealthStatusContext.Provider value={{ healthStatuses, getAllHealthStatuses }}>
      {props.children}
    </HealthStatusContext.Provider>
  );
};