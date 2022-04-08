import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./Home";
import { PostProvider } from "../providers/PostProvider";
import { MaintenanceProvider } from "../providers/MaintenanceProvider";
import { PostList } from "./post/PostList";
import { PostDetails } from "./post/PostDetails";
import { PostFormCord } from "./post/PostDetails";
import { PostFormSt } from "./post/PostFormSt";
import { MaintenanceList } from "./maintenance/MaintenanceList";
import { MaintenanceForm } from "./maintenance/maintenanceForm";

export const ApplicationViewsNotLogIn = () => {
    
      return (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      );
    }

export const ApplicationViewsPub = () => {
  return (
    <MaintenanceProvider> 
    <PostProvider>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<PostList />} />
      <Route path="/posts/:id" element={<PostDetails />} />
      <Route path="/posts/cor/create" element={<PostFormCord />} />
      <Route path="/posts/st/create" element={<PostFormSt />} />
    </Routes>
  </PostProvider>
  </MaintenanceProvider>
  )
}

export const ApplicationViewsArb = () => {
  return (
    <MaintenanceProvider> 
    <PostProvider>
    <Routes>
      <Route path="/maintenance" element={<MaintenanceList />} />
      <Route path="/maintenance/create" element={<MaintenanceForm />} />
      <Route path="/maintenance/edit/:maintenanceId" element={<MaintenanceForm />} />
    </Routes>
  </PostProvider>
  </MaintenanceProvider>
  )
}

export const ApplicationViewsAdmin = () => {
  return (
  <PostProvider>
      <Routes>
      <Route path="#" element={<Home />} />
     {/* to edit and approve report */}
     {/* to change the user type Id to admin or arbor */}
      </Routes>
  </PostProvider>
  )
}