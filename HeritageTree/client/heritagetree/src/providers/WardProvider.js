import React, { useState} from "react";

export const WardContext = React.createContext();

export const WardProvider = (props) => {

    const [wards, setWards] = useState([]);
    const apiUrl = "https://localhost:5001";

  const getAllWards = () => {
    return fetch(`${apiUrl}/api/Ward`)
      .then((res) => res.json())
      .then(setWards);
  };

  console.log(wards)
  return (
    <WardProvider.Provider value={{ wards, getAllWards }}>
      {props.children}
    </WardProvider.Provider>
  );
};