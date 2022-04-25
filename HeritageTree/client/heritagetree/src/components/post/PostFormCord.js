import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MaintenanceContext } from "../../providers/MaintenanceProvider";
import { PostContext } from "../../providers/PostProvider";
import { WardContext } from "../../providers/WardProvider";
import { TreeCommonNameContext } from "../../providers/TreeCommonNameProvider";
import { HeritageStatusContext } from "../../providers/HeritageStatusProvider";
import { OwnershipContext } from "../../providers/OwnershipProvider";
import { HealthStatusContext } from "../../providers/HealthStatusProvider"
import { Button, Form, FormSelect} from "react-bootstrap";
import { Link } from "react-router-dom";

export const PostFormCord = () => {
    
    const {addPost, getGeoCoordinate} = useContext(PostContext);
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
    const currentUserId = currentUser.id;
   
    const {maintenances, getAllMaintenances} = useContext( MaintenanceContext);
    const { wards, getAllWards} = useContext(WardContext);
    const { treeCommonNames, getAllTreeCommonNames } = useContext(TreeCommonNameContext);
    const { ownerships, getAllOwnerships } = useContext(OwnershipContext);
    const {healthStatuses, getAllHealthStatuses} = useContext(HealthStatusContext);

  useEffect(() => {
    getAllMaintenances()
    .then(getAllWards())
    .then(getAllTreeCommonNames())
    .then(getAllOwnerships())
    .then(getAllHealthStatuses())
  }, []);


// console.log(wards, maintenances, treeCommonNames, heritageStatuses, ownerships, healthStatuses)

    const [post, setPost] = useState({
        streetAddress: "",
        city:"",
        state:"",
        zip: 0,
        latitude: "",
        longitude: "",
        wardId: "",
        userProfileId: currentUserId,
        treeCommonNameId: "",
        imageLocation: "",
        ownershipId:4, 
        healthStatusId: 0
    });
    const [results, setResults] = useState({
      latitude: "",
      longitude: ""
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
        .then(() => navigate('/myPosts'));  
        
    }

    const latlng = (streetAddress, city, state, zip) => {
      const newPost2 = { ...post }
      getGeoCoordinate(streetAddress, city, state, zip)
      newPost2.latitude = results.latitude
      newPost2.longitude = results.longitude
      setPost(newPost2)
      
    }

    return (
        <>
        <div className="postForm">
        <h3 className="postForm__title">Nominate Heritage Tree Form </h3>
        {/* <p> This form requires geographic coordinates of a tree, such as latitude and longitude.  If you would like to report with a street address, click the button below </p>
        
        <Link to={`/posts/st/create`}>
          <Button className="post__create">Report a Heritage Tree with a street address</Button>
        </Link> */}
        <br></br>
        <Form className="post__form">
        <Form.Group className="mb-3" controlId="treeCommonNameId">
            <Form.Label>Please select a type of the tree:</Form.Label>
              <FormSelect required autoFocus name="treeCommonNameId" onChange={handleControlledInputChange}>
        <option>Select a type of the tree</option>
        {treeCommonNames.map((t) => {
            return (
                <option key={t.id} value={t.id}>{t.name}</option>
            )
          })
        }
              </FormSelect>
          </Form.Group>

          <Form.Group className="mb-3" controlId="streetAddress">
    <Form.Label>Street Address:</Form.Label>
    <Form.Control required autoFocus name="streetAddress" onChange={handleControlledInputChange}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="city">
    <Form.Label>City:</Form.Label>
    <Form.Control required autoFocus name="city" onChange={handleControlledInputChange}/>
  </Form.Group>


  <Form.Group className="mb-3" controlId="state">
    <Form.Label>State:</Form.Label>
    <Form.Control required autoFocus name="state" onChange={handleControlledInputChange}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="zip">
    <Form.Label>Zip:</Form.Label>
    <Form.Control required autoFocus name="zip" onChange={handleControlledInputChange}/>
  </Form.Group>
          
          {/* <Button onClick = {latlng(post.streetAddress, post.city, post.state, post.zip)} >
            Generate coordinates for latitude and longitude
          </Button> */}
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
                <option key={ward.id} value={ward.id}>{ward.name}</option>
            )
          })
        }
              </FormSelect>
              <Form.Text>If you do not know which ward, please visit <a href="https://coewv.maps.arcgis.com/apps/webappviewer/index.html?id=15246ac759c345babbbbb8a5f7c11490" target="_blank" rel="noopener noreferrer">here</a></Form.Text>
          </Form.Group>

         

  <Form.Group className="mb-3" controlId="imageLocation">
    <Form.Label>Image URL(optional):</Form.Label>
    <Form.Control name="imageLocation" value={post.imageLocation} onChange={handleControlledInputChange} type="url" autoFocus placeholder="Enter a url of an image" />
  </Form.Group>

          <Form.Group className="mb-3" controlId="ownershipId">
            <Form.Label>Please select a type of property the tree is located:</Form.Label>
              <FormSelect  autoFocus name="ownershipId" onChange={handleControlledInputChange}>
        <option >Select a type of property</option>
        {ownerships.map((o) => {
            return (
                <option defaultValue={post.ownershipId} key={o.id} value={o.id}>{o.name}</option>
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
                <option key={h.id} value={h.id}>{h.name}</option>
            )
          })
        }
              </FormSelect>
          </Form.Group>

  <Button onClick={handleClickSavePost} variant="primary" size="md" type="submit">
   Submit
  </Button>{"  "}

<Link to={"/posts"}>
  <Button  variant="secondary" size="md" type="submit">
    Back to List
  </Button> 
  </Link>
</Form>
</div>  </>
    )
}