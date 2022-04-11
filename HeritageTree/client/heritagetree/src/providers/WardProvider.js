import React, { useState, createContext} from "react";

export const WardContext =  createContext();

export const WardProvider = (props) => {

    const [wards, setWards] = useState([]);
    const apiUrl = "https://localhost:5001";

  const getAllWards = () => {
    return fetch(`${apiUrl}/api/Ward`)
      .then((res) => res.json())
      .then(setWards);
  };

  return (
    <WardContext.Provider value={{ wards, getAllWards  }}>
      {props.children}
    </WardContext.Provider>
  );
};