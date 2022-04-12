import React, { useState, createContext} from "react";

export const TreeCommonNameContext =  createContext();

export const TreeCommonNameProvider = (props) => {

    const [treeCommonNames, setTreeCommonNames] = useState([]);
    const apiUrl = "https://localhost:5001";

  const getAllTreeCommonNames = () => {
    return fetch(`${apiUrl}/api/TreeCommonName`)
      .then((res) => res.json())
      .then(setTreeCommonNames);
  };

  return (
    <TreeCommonNameContext.Provider value={{ treeCommonNames, getAllTreeCommonNames  }}>
      {props.children}
    </TreeCommonNameContext.Provider>
  );
};