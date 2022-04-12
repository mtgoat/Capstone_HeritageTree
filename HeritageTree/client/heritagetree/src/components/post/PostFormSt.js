import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MaintenanceContext } from "../../providers/MaintenanceProvider";
import {PostContext} from "../../providers/PostProvider";
import {WardContext} from "../../providers/WardProvider";
import { TreeCommonNameContext } from "../../providers/TreeCommonNameProvider";
import { HeritageStatusContext } from "../../providers/HeritageStatusProvider";
import { OwnershipContext } from "../../providers/OwnershipProvider";
import { HealthStatusContext } from "../../providers/HealthStatusProvider"
import { Button, Form, FormSelect} from "react-bootstrap";
import { Link } from "react-router-dom";

export const PostFormStMesage = "This page is under construction right now.  Please come back later."

export const PostFormSt = () => {
    
    const {addPost} = useContext(PostContext);
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
    const currentUserId = currentUser.id;
   
    const {maintenances, getAllMaintenances} = useContext(MaintenanceContext);
    const {wards, getAllWards} = useContext(WardContext);
    const { treeCommonNames, getAllTreeCommonNames } = useContext(TreeCommonNameContext);
    const { heritageStatuses, getAllHeritageStatuses } = useContext(HeritageStatusContext);
    const { ownerships, getAllOwnerships } = useContext(OwnershipContext);
    const {healthStatuses, getAllHealthStatuses} = useContext(HealthStatusContext);

  useEffect(() => {
    getAllMaintenances();
    getAllWards();
    getAllTreeCommonNames();
    getAllHeritageStatuses();
    getAllOwnerships();
    getAllHealthStatuses();
  }, []);


console.log(wards, maintenances, treeCommonNames, heritageStatuses, ownerships, healthStatuses)

    const [post, setPost] = useState({
        streetAddress: "",
        city:"",
        state:"",
        zip: "",
        latitude: "",
        longitude: "",
        wardId: "",
        userProfileId: currentUserId,
        treeCommonName: "",
        imageLocation: "",
        ownershipId:4, 
        isApproved: false
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
        <p> This form requires geographic coordinates of a tree, such as latitude and longitude.  If you would like to report with a street address, click the button below</p>
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