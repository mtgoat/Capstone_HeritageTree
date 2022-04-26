import React, { useState, createContext } from "react";

export const PostContext = createContext();

export const PostProvider = (props) => {

    const [posts, setPosts] = useState([]);
    // const [heritagePosts, setHeritagePosts] = useState([]);
    const [nonAppPosts, setNonAppPosts ] = useState([]);
    const [postsByM, setPostsByM] = useState([]);
    const [result, setResult] = useState([]);
    const [coordResults, setCoordResults] = useState([]);
    const apiUrl = "https://localhost:5001";

  const getAllPosts = () => {
    return fetch(`${apiUrl}/api/Post`)
      .then((res) => res.json())
      .then(setPosts);
  };

  const getAllNonAppPosts = () => {
    return fetch(`${apiUrl}/api/Post/GetAllNonApp`)
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

  const getAllPostsByUserId = (id) => {
     return fetch(`${apiUrl}/api/Post/GetAllByUserId/${id}`)
    .then((res) => res.json())
    .then(setPosts);
  }

  const getMyPostById = (id) => {
    debugger
    return fetch(`${apiUrl}/api/Post/GetMyPostById/${id}`)
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

  const getAllPostsByHeritageId = (id) => {
    return fetch(`${apiUrl}/api/Post/GetAllByHeritageId/${id}`)
    .then((res) => res.json())

  }

  const getGeoCoordinate = (streetAddress, city, state, zip) => {
    let streetAddressPlus = streetAddress.split(' ').join('+')
    

    debugger
    return fetch(`https://nominatim.openstreetmap.org/search?street=${streetAddressPlus}&city=${city}&state=${state}&postalcode=${zip}&country=US&format=jsonv2&accept-language=en&limit=1`)
    .then((res) => res.json())
   
   
  }

  

  return (
    <PostContext.Provider value={{ posts, setPosts, getAllPosts, getPostById, addPost, getAllPostsByUserId, getAllNonAppPosts, getNPPostById, updatePostNA, hardDeletePost, nonAppPosts, setNonAppPosts, addMaintenanceToPost, postsByM, setPostsByM, getPostsByMaintenanceId, result, setResult, getAllPostsByHeritageId, getGeoCoordinate,getMyPostById, coordResults, setCoordResults  }}>
      {props.children}
    </PostContext.Provider>
  );
};