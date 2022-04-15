import React, { useState, createContext } from "react";

export const PostContext = createContext();

export const PostProvider = (props) => {

    const [posts, setPosts] = useState([]);
    const [nonAppPosts, setNonAppPosts ] = useState([]);
    const [postsByM, setPostsByM] = useState([]);
    const apiUrl = "https://localhost:5001";

  const getAllPosts = () => {
    return fetch(`${apiUrl}/api/Post`)
      .then((res) => res.json())
      .then(setPosts);
  };

  const getAllNonAppPosts = () => {
    return fetch(`${apiUrl}/api/Post/GetNonApp`)
      .then((res) => res.json())
      .then(setNonAppPosts);
  };

  const getPostById = (id) => {
    return fetch(`${apiUrl}/api/Post/${id}`)
    .then((res) => res.json())
  }

  const getNPPostById = (id) => {
    return fetch(`${apiUrl}/api/Post/GetNonAppById/${id}`)
    .then((res) => res.json())
  }

  const getPostsByUserId = (id) => {
    return fetch(`${apiUrl}/api/Post/myposts?id=${id}`)
    .then((res) => res.json())
    .then(setPosts);
  }

  const addPost = (post) => {
    return fetch(`${apiUrl}/api/Post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then(getAllPosts);
  };

  const updatePostNA = (post) => {
    return fetch(`${apiUrl}/api/Post/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    }).then(getAllPosts);
  }

  const hardDeletePost = (postId) => {

    return fetch(`${apiUrl}/api/Post/${postId}`, {
        method: "DELETE"
    })
        .then(getAllPosts)
  }
  
  const addMaintenanceToPost = (maintenance) => {
        return fetch(`${apiUrl}/api/Post/AddMaintenanceToPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(maintenance)
   
    })
    //.then(GetAllPublishedPosts);
  
  }; 

  const getPostsByMaintenanceId = (id) => {
    return fetch(`${apiUrl}/api/Post/GetAllByMaintenanceId/${id}`)
    .then((res) => res.json())
    .then(setPostsByM);
  }

  return (
    <PostContext.Provider value={{ posts, getAllPosts, getPostById, addPost, getPostsByUserId, getAllNonAppPosts, getNPPostById, updatePostNA, hardDeletePost, nonAppPosts, addMaintenanceToPost, postsByM, getPostsByMaintenanceId }}>
      {props.children}
    </PostContext.Provider>
  );
};