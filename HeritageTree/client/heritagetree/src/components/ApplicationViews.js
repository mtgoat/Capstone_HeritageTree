import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import {
  UserProfileContext,
  UserProfileProvider,
} from "../providers/UserProfileProvider";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./assets/Home";

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);
  
    if (!isLoggedIn) {
      return (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      );
    }
    else{
     return(
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
     );
    }
  }