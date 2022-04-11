import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MaintenanceContext } from "../../providers/MaintenanceProvider";
import {PostContext} from "../../providers/PostProvider";
import {WardContext} from "../../providers/WardProvider";
import { Button, Form, FormSelect} from "react-bootstrap";
import { Link } from "react-router-dom";

export const PostFormCord = () => {
    
    const {addPost} = useContext(PostContext);
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
    const currentUserId = currentUser.id;
   
    const {maintenances, getAllMaintenances} = useContext(MaintenanceContext)

    const {wards, getAllWards} = useContext(WardContext)

  useEffect(() => {
    getAllMaintenances();
  }, []);


    const [post, setPost] = useState({
        userProfileId: currentUserId,
        title:"", 
        content:"",
        imageLocation:"",
        categoryId: 0,
        isApproved: true
    });

    const navigate = useNavigate();

    const handleControlledInputChange = (e) => {
        const newPost = { ...post }
        newPost[e.target.name] = e.target.value
        setPost(newPost)
    }

    const handleClickSavePost = (e) => {
        e.preventDefault();
        console.log(post);
        addPost(post)
        .then(() => navigate('/posts'));  
        
    }

    return (
        <>
        <h3 className="postForm__title">Report Heritage Tree Form </h3>
        <p> This form requires geographic coordinates of a tree,such as latitude and longitude.  If you would like to report with a street address, click the button below</p>
        <Link to={`/posts/st/create`}>
          <Button className="post__create">Report a Heritage Tree with a street address</Button>
        </Link>
        <Form className="post__form">
  <Form.Group className="mb-3" controlId="title">
    <Form.Label>Title:</Form.Label>
    <Form.Control name="title" value={post.title} onChange={handleControlledInputChange} type="text" required autoFocus placeholder="Enter a title for your post" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="categoryId">
    <Form.Label>Category:</Form.Label>
    <FormSelect required autoFocus name="categoryId" onChange={handleControlledInputChange}>
        <option>Select a category</option>
        {maintenances.map((category) => {
            return (
                <option value={category.id}>{category.name}</option>
            )
          })
        }
    </FormSelect>
  </Form.Group>

  <Form.Group className="mb-3" controlId="content">
    <Form.Label>Content:</Form.Label>
    <Form.Control name="content" value={post.content} onChange={handleControlledInputChange} type="text" required autoFocus placeholder="Enter content for your post" as="textarea" aria-label="With textarea" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="imageLocation">
    <Form.Label>Gif Image:</Form.Label>
    <Form.Control name="imageLocation" value={post.imageLocation} onChange={handleControlledInputChange} type="text" autoFocus placeholder="Enter enter a url to your gif" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="publishDateTime">
    <Form.Label>Publish Date:</Form.Label>
    <Form.Control name="publishDateTime" value={post.publishDateTime} onChange={handleControlledInputChange} type="date" autoFocus />
  </Form.Group>


  <Button onClick={handleClickSavePost} variant="primary" size="md" type="submit">
    Save Post
  </Button>
</Form>
        </>
    )
}