import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { PostContext } from "../../providers/PostProvider";
import { WardContext } from "../../providers/WardProvider";
import { TreeCommonNameContext } from "../../providers/TreeCommonNameProvider";
import { HeritageStatusContext } from "../../providers/HeritageStatusProvider";
import { OwnershipContext } from "../../providers/OwnershipProvider";
import { HealthStatusContext } from "../../providers/HealthStatusProvider"
import { Button, Form, FormSelect} from "react-bootstrap";

export const PostFormCordNA = () => {
    
    const {addPost, getNPPostById, updatePostNA} = useContext(PostContext);
     const { wards, getAllWards} = useContext(WardContext);
    const { treeCommonNames, getAllTreeCommonNames } = useContext(TreeCommonNameContext);
    const { heritageStatuses, getAllHeritageStatuses } = useContext(HeritageStatusContext);
    const { ownerships, getAllOwnerships } = useContext(OwnershipContext);
    const {healthStatuses, getAllHealthStatuses} = useContext(HealthStatusContext);
    const { users, getAllUsers} = useContext(UserProfileContext); 
    // const {maintenances, getAllMaintenances} = useContext( MaintenanceContext);
   
    const {id} = useParams ();
    const [isLoading, setIsLoading] = useState(false);
   
    // const approvals = [true, false]
    // console.log(id)
  useEffect(() => {
    // getAllMaintenances()
    // .then()
    if(id){
      getAllUsers().then(getNPPostById(id).then(post => {
                                  setPost(post)}))
    .then(getAllWards())
    .then(getAllTreeCommonNames())
    .then(getAllHeritageStatuses())
    .then(getAllOwnerships())
    .then(getAllHealthStatuses())
    
     
    setIsLoading(false)
   
    } else {
    
    setIsLoading(false)
    }
  }, []);


// console.log(wards, treeCommonNames, heritageStatuses, ownerships, healthStatuses)

    const [post, setPost] = useState({
        streetAddress: "",
        city:"",
        state:"",
        zip: "",
        latitude: "",
        longitude: "",
        wardId: "",
        createDateTime: "",
        userProfileId: "",
        treeCommonNameId: "",
        imageLocation: "",
        heritageStatusId: "",
        heritageDateTime: "",
        ownershipId:"", 
        healthStatusId: "",
        isApproved: ""
    });

    const navigate = useNavigate();

    const handleControlledInputChange = (e) => {
        const newPost = { ...post }
        newPost[e.target.name] = e.target.value
        setPost(newPost)
    }

    const handleClickSavePost = (e) => {
      if (post.latitude === "" || post.longitude === "" || post.treeCommonNameId === ""){
        window.alert("Please enter a latitude, a longitude, or common name for the tree")
      }else {
        setIsLoading(true);
        if(id){
          console.log(post)
          updatePostNA(post)
        .then(() => navigate('/posts'))
        } else {
          e.preventDefault();
        console.log(post);
        addPost(post)
        .then(() => navigate('/posts'));  
        };
      };
    }
  

    return (
        <>
        <div className="postForm">
        <h3 className="postForm__title">Update the Heritage Tree Form </h3>

        <Form className="postForm__container">
          <Form.Group className="mb-3" controlId="streetAddress">
            <Form.Label>Street Address:</Form.Label>
              <Form.Control name="streetAddress" value={post.streetAddress} onChange={handleControlledInputChange} type="text" required autoFocus placeholder="Update a streetAddress" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City:</Form.Label>
              <Form.Control name="city" value={post.city} onChange={handleControlledInputChange} type="text" required autoFocus placeholder="Update a city" />
          </Form.Group>
   
          <Form.Group className="mb-3" controlId="state">
            <Form.Label>State:</Form.Label>
              <Form.Control name="state" value={post.state} onChange={handleControlledInputChange} type="text" required autoFocus placeholder="Update a state" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="zip">
            <Form.Label>Zip:</Form.Label>
              <Form.Control name="zip" value={post.zip} onChange={handleControlledInputChange} type="text" required autoFocus placeholder="Update a zip code" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="latitude">
            <Form.Label>Latitude:</Form.Label>
              <Form.Control name="latitude" value={post.latitude} onChange={handleControlledInputChange} type="text" required autoFocus placeholder="Enter a latitude" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="longitude">
            <Form.Label>Longitude:</Form.Label>
              <Form.Control name="longitude" value={post.longitude} onChange={handleControlledInputChange} type="text" required autoFocus placeholder="Enter a longitude" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="wardId">
            <Form.Label>Please select a ward:</Form.Label>
              <FormSelect required autoFocus name="wardId" onChange={handleControlledInputChange}>
        <option >Select a ward</option>
        {wards.map((ward) => {
            return (
                <option selected={post.wardId} key={ward.id} value={ward.id}>{ward.name}</option>
            )
          })
        }
              </FormSelect>
              <Form.Text>If you do not know which ward, please visit <a href="https://coewv.maps.arcgis.com/apps/webappviewer/index.html?id=15246ac759c345babbbbb8a5f7c11490" target="_blank" rel="noopener noreferrer">here</a></Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="createDateTime">
            <Form.Label>CreateDateTime:</Form.Label>
            <Form.Control name="createDateTime" value={post.createDateTime} disabled type="text"  autoFocus/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="userProfileId">
            <Form.Label>Author of the post:</Form.Label>
            <FormSelect autoFocus name="userProfileId" onChange={handleControlledInputChange}>
        <option >Select an author of the post</option>
        {users.map((u) => {
            return (
                <option selected={post.userProfileId} key={u.id} value={u.id}>{u.fullName}</option>
            )
          })
        }
              </FormSelect>
          </Form.Group>

          <Form.Group className="mb-3" controlId="treeCommonNameId">
            <Form.Label>Please select a type of the tree:</Form.Label>
              <FormSelect required autoFocus name="treeCommonNameId" onChange={handleControlledInputChange}>
        <option>Select a type of the tree</option>
        {treeCommonNames.map((t) => {
            return (
                <option selected={post.treeCommonNameId} key={t.id} value={t.id}>{t.name}</option>
            )
          })
        }
              </FormSelect>
          </Form.Group>

  <Form.Group className="mb-3" controlId="imageLocation">
    <Form.Label>Image URL(optional):</Form.Label>
    <Form.Control name="imageLocation" value={post.imageLocation} onChange={handleControlledInputChange} type="url" autoFocus placeholder="Enter a url of an image" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="heritageStatusId">
            <Form.Label>Please select a Heritage Status:</Form.Label>
              <FormSelect required autoFocus name="heritageStatusId" onChange={handleControlledInputChange}>
        <option >Select a Heritage Status</option>
        {heritageStatuses.map((hrtg) => {
            return (
                <option selected={post.healthStatusId} key={hrtg.id} value={hrtg.id}>{hrtg.name}</option>
            )
          })
        }
              </FormSelect>
              </Form.Group>

              <Form.Group className="mb-3" controlId="heritageDateTime">
    <Form.Label>Date for the status:</Form.Label>
    <Form.Control name="heritageDateTime" selected={post.heritageDateTime} value={post.heritageDateTime} onChange={handleControlledInputChange} type="date" autoFocus placeholder="Enter a date" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="ownershipId">
            <Form.Label>Please select a type of property the tree is located:</Form.Label>
              <FormSelect  autoFocus name="ownershipId" onChange={handleControlledInputChange}>
        <option >Select a type of property</option>
        {ownerships.map((o) => {
            return (
                <option selected={post.ownershipId} key={o.id} value={o.id}>{o.name}</option>
            )
          })
        }
              </FormSelect>
              </Form.Group>

  <Form.Group className="mb-3" controlId="healthStatusId">
            <Form.Label>Please select a health status of the tree:</Form.Label>
              <FormSelect required autoFocus name="healthStatusId" onChange={handleControlledInputChange}>
        <option>Select a health status of the tree</option>
        {healthStatuses.map((h) => {
            return (
                <option defaultValue={post.healthStatusId} key={h.id} value={h.id}>{h.name}</option>
            )
          })
        }
              </FormSelect>
          </Form.Group>

          <Form.Group className="mb-3" controlId="isApproved">
            <Form.Label>Please update the approval status:</Form.Label>
              <FormSelect required autoFocus name="isApproved" onChange={handleControlledInputChange}>
        <option value="null">Select the approval status</option>
            <option  value={false}>Not Approved</option>
            <option  value={true}> Approved</option>
              </FormSelect>
              </Form.Group>

  <Button onClick={ e => {
    e.preventDefault()
    handleClickSavePost()} } variant="primary" size="sm" type="submit" disabled={isLoading}>
  {id ? <>Save Update</> : <>Create </>} 
  </Button>
  
</Form>
</div>  </>
    )
}