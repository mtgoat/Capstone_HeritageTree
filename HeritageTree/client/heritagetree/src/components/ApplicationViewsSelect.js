import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./Home";
import { PostProvider } from "../providers/PostProvider";
import { PostList } from "./post/PostList";
import { PostDetails } from "./post/PostDetails";
import { PostFormCord } from "./post/PostFormCord";
import { PostFormSt } from "./post/PostFormSt";
import { MaintenanceProvider } from "../providers/MaintenanceProvider";
import { MaintenanceList } from "./maintenance/MaintenanceList";
import { MaintenanceForm } from "./maintenance/MaintenanceForm";
import { WardProvider } from "../providers/WardProvider";
import { WardList } from "./ward/WardList";
import { Sorry } from "./Sorry";
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
    <WardProvider>
    <MaintenanceProvider> 
    <PostProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/posts/cor/create" element={<PostFormCord />} />
        <Route path="/posts/st/create" element={<PostFormSt />} />
        <Route path="/maintenance/*" element={<Sorry />} />
        {/* <Route path="/ward/*" element={<Sorry />} /> */}
      </Routes>
  </PostProvider>
  </MaintenanceProvider>
  </WardProvider>
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
    <WardProvider>
  <PostProvider>
      <Routes>
        <Route path="#" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/wards" element={< WardList/>} />
    
     {/* to edit and approve report */}
     {/* to change the user type Id to admin or arbor */}
      </Routes>
  </PostProvider>
  </WardProvider>
  )
}