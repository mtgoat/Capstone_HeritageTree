import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserList } from "./auth/UserList";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./Home";
import { PostProvider } from "../providers/PostProvider";
import { PostList } from "./post/PostList";
import { PostDetails } from "./post/PostDetails";
import { PostFormCord } from "./post/PostFormCord";
import { PostFormSt } from "./post/PostFormSt";
import { PostListNA } from "./post/PostListNA";
import { PostDetailsNA } from "./post/PostDetailsNA";
import { PostFormCordNA } from "./post/PostFormNA";
import { PostFormEdit } from "./post/PostFormEdit";

import { MaintenanceProvider } from "../providers/MaintenanceProvider";
import { MaintenanceList } from "./maintenance/MaintenanceList";
import { MaintenanceForm } from "./maintenance/MaintenanceForm";
import { MaintenanceFormEdit } from "./maintenance/MaintenanceFormEdit";

import { WardProvider } from "../providers/WardProvider";
import { WardList } from "./ward/WardList";
import { Sorry } from "./Sorry";

import { TreeCommonNameProvider } from "../providers/TreeCommonNameProvider";
import { HeritageStatusProvider } from "../providers/HeritageStatusProvider";
import { OwnershipProvider } from "../providers/OwnershipProvider";
import { HealthStatusProvider } from "../providers/HealthStatusProvider";

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
    <> 
      <HealthStatusProvider>
    <OwnershipProvider>
    <HeritageStatusProvider>
    <TreeCommonNameProvider>
    <WardProvider>
    <MaintenanceProvider> 
    <PostProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/posts/edit/:id/*" element={<PostFormEdit />} />
        <Route path="/posts/cor/create" element={<PostFormCord />} />
        <Route path="/posts/st/create" element={<PostFormSt />} />
        <Route path="/maintenances/*" element={<Sorry />} />
        {/* <Route path="/ward/*" element={<Sorry />} /> */}
      </Routes>
      </PostProvider>
      </MaintenanceProvider>
  </WardProvider>
  </TreeCommonNameProvider>
  </HeritageStatusProvider>
  </OwnershipProvider>
  </HealthStatusProvider>

    </>
  )
}

export const ApplicationViewsArb = () => {
  return (
   
    <MaintenanceProvider> 
    <PostProvider>
    <Routes>
      <Route path="/maintenances" element={<MaintenanceList />} />
      <Route path="/maintenances/create" element={<MaintenanceForm />} />
      <Route path="/maintenances/edit/:maintenanceId/*" element={<MaintenanceFormEdit />} />
    </Routes>
    </PostProvider>
  </MaintenanceProvider>
  
  )
}

export const ApplicationViewsAdmin = () => {
  return (
    <HealthStatusProvider>
    <OwnershipProvider>
    <HeritageStatusProvider>
    <TreeCommonNameProvider>
  <WardProvider>
      <PostProvider>
        <Routes>
          <Route path="/posts" element={<PostListNA />} />
          <Route path="/postsNA/:id" element={<PostDetailsNA />} />
          <Route path="/postsNA/edit/:id/*" element={<PostFormCordNA />} />
          <Route path="/wards" element={< WardList/>} />
          <Route path="/users" element={<UserList />} />
      {/* to edit and approve report */}
      {/* to change the user type Id to admin or arbor */}
        </Routes>
        </PostProvider>
 </WardProvider>
 </TreeCommonNameProvider>
  </HeritageStatusProvider>
  </OwnershipProvider> 
  </HealthStatusProvider> 
  )
}