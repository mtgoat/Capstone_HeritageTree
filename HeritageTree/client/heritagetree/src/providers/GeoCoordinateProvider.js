// import React, { useState, createContext } from "react";

// export const GeoCoordinateContext = createContext();

// export const PostProvider = (props) => {
//     const [queries, setQueries] = useState([]);
//     const [results, setResults] = useState([]);


//     const getGeoCoordinate = (streetAddress, city, state, zip) => {
//         debugger
//         return fetch(`https://nominatim.openstreetmap.org/?street=${streetAddress}&city=${city}&state=${state}&postalcode=${zip}&format=jsonv2`)
//         .then((res) => res.json())
//         .then(setResults);
        
//       }

//     return (
//         <GeoCoordinateContext.Provider value={{  }}>
//           {props.children}
//         </GeoCoordinateContext.Provider>
//       );
//     };