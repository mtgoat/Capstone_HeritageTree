import React, { useState, createContext} from "react";

export const TCNameContext =  createContext();

export const TCNameProvider = (props) => {

    const [tcnames, setTcnames] = useState([]);
    const apiUrl = "https://localhost:5001";

  const getAllTcnames = () => {
    return fetch(`${apiUrl}/api/Ward`)
      .then((res) => res.json())
      .then(setTcnames);
  };

  return (
    <TCNameContext.Provider value={{ tcnames, setTcnames  }}>
      {props.children}
    </TCNameContext.Provider>
  );
};