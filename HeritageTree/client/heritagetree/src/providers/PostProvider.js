import React, { useState, createContext } from "react";

export const PostContext = createContext();

export const PostProvider = (props) => {

    const [posts, setPosts] = useState([]);
    const apiUrl = "https://localhost:5001";

  const getAllPosts = () => {
    return fetch(`${apiUrl}/api/Post`)
      .then((res) => res.json())
      .then(setPosts);
  };

  const getAllNonAppPosts = () => {
    return fetch(`${apiUrl}/api/Post/GetNonApp`)
      .then((res) => res.json())
      .then(setPosts);
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

  return (
    <PostContext.Provider value={{ posts, getAllPosts, getPostById, addPost, getPostsByUserId, getAllNonAppPosts, getNPPostById }}>
      {props.children}
    </PostContext.Provider>
  );
};