import React, {useContext, useEffect, useState} from "react"
import { PostContext } from "../../providers/PostProvider";
import { useNavigate, useParams, Link } from "react-router-dom";
import { MaintenanceContext } from "../../providers/MaintenanceProvider";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export const ManageMaintenanceForm = () => {

    const {maintenances ,getAllMaintenances, getMaintenanceById } = useContext(MaintenanceContext)
    
    const {getAllPosts, GetPostById, addMaintenanceToPost } = useContext(PostContext)
    const {id} = useParams();

    const [postMaintenance, setPostMaintenance] = useState({});
    
    const navigate = useNavigate();

    useEffect(()=> {
        getAllMaintenances()
     
        
    }, []);


    const handleControlledInputChange = (event)=> {
        const newPostMaintenance = {...postMaintenance}
        newPostMaintenance[event.target.id] = event.target.value
        
        setPostMaintenance(newPostMaintenance)
    }

    const handleClickSavePostMaintenance = (event) => {
        
        event.preventDefault()
        postMaintenance.postId = id
        addMaintenanceToPost(postMaintenance)
            .then(navigate(`/posts/${id}`))
            window.location.reload(false);
;
     }
      
    
    
    return(
        <Form className="postMaintenance">
            
            <Form.Group className="mb-3" controlId="maintenanceId">
            <Form.Label>Please select a Maintenance category:</Form.Label>
              <Form.Select required autoFocus name="maintenanceId" onChange={handleControlledInputChange}>
        <option>select a Maintenance category</option>
        {maintenances.map((m) => {
            return (
                <option key={m.id} value={m.id}>{m.name}</option>
            )
          })
        }
              </Form.Select>
          </Form.Group>
          <Button onClick={handleClickSavePostMaintenance} variant="primary" size="md" type="submit">
    Save Maintenance
  </Button>{"  "}

<Link to={"/posts"}>
  <Button  variant="secondary" size="md" type="submit">
    Back to List
  </Button> 
  </Link>
</Form>
          
          
)}