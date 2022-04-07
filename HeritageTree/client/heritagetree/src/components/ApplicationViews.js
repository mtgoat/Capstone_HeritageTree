import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./Home";
import { PostProvider } from "../providers/PostProvider";
import { PostList } from "./post/PostList";
import { PostDetails } from "./post/PostDetails";

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
      <PostProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetails />} />
        </Routes>
      </PostProvider>
     );
    }
  }