import React, { useState, useEffect, createContext } from "react";

export const OwnershipContext =  createContext();

export const OwnershipProvider = (props) => {

    const [ownerships, setOwnerships] = useState([]);
    const apiUrl = "https://localhost:5001";

  const getAllOwnerships = () => {
    return fetch(`${apiUrl}/api/Ownership`)
      .then((res) => res.json())
      .then(setOwnerships);
  };

  return (
    <OwnershipContext.Provider value={{ ownerships, getAllOwnerships  }}>
      {props.children}
    </OwnershipContext.Provider>
  );
};