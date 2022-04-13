import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";


export const UserProfileContext = createContext();

export const UserProfileProvider = (props) => {

  const apiUrl = "https://localhost:5001";

  const userProfile = sessionStorage.getItem("userProfile");
  const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);
  const [ users, setUsers ] = useState ([]);

  const getAllUsers = () => {
    return fetch(`${apiUrl}/api/Userprofile`)
      .then((res) => res.json())
      .then(setUsers);
  };

  
  const login = (userObject) => {
    return fetch(`${apiUrl}/api/userprofile/getbyemail?email=${userObject.email}`)
    .then((r) => r.json())
      .then((userProfile) => {
        if(userProfile.id){
          sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
          setIsLoggedIn(true);
          return userProfile
        }
        else{
          return undefined
        }
      });
  };

  // This logout will clear sessionStorage and "userProfile" will be empty
  const logout = () => {
        sessionStorage.clear()
        setIsLoggedIn(false);
  };

  const register = (userObject, password) => {
    return  fetch(`${apiUrl}/api/userprofile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    })
    .then((response) => response.json())
      .then((savedUserProfile) => {
        sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
        setIsLoggedIn(true);
      });
  };





  return (
    <UserProfileContext.Provider value={{ users, getAllUsers, isLoggedIn, login, logout, register,  }}>
       {props.children}
    </UserProfileContext.Provider>
  );
}