import React, { useState, createContext } from "react";

export const HeritageStatusContext =  createContext();

export const HeritageStatusProvider = (props) => {

    const [heritageStatuses, setHeritageStatuses] = useState([]);
    const apiUrl = "https://localhost:5001";

  const getAllHeritageStatuses = () => {
    return fetch(`${apiUrl}/api/HeritageStatus`)
      .then((res) => res.json())
      .then(setHeritageStatuses);
  };

  return (
    <HeritageStatusContext.Provider value={{ heritageStatuses, getAllHeritageStatuses }}>
      {props.children}
    </HeritageStatusContext.Provider>
  );
};