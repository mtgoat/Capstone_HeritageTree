import React, {useState, useEffect, useContext} from "react";
import { PostContext } from "../../providers/PostProvider";
import { useParams, useNavigate  } from "react-router-dom";
import { Card, Button, Badge } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import { ManageMaintenanceForm } from "./ManageMaintenanceForm";

export const PostDetails = () => {
    const [post, setPost] = useState();
    const {getPostById} = useContext(PostContext);
    const {id} = useParams();
    
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
    const currentUserType = currentUser.userTypeId;

    //this is for the add maintenance button
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);


    useEffect(() => {
        console.log(currentUser.userTypeId);
        getPostById(id)
        .then(setPost);
    }, [])

    console.log(currentUser.userTypeId);
    if (!post) {
        return null;
    }

    // let month = post.publishDateTime.slice(0,10).split("-")[1]
    // let day = post.publishDateTime.slice(0,10).split("-")[2]
    // let year = post.publishDateTime.slice(0,10).split("-")[0]
    // const formattedDate = `${month}-${day}-${year}`;

    return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
       
        <Card border="success"  style={{ width: '30rem', margin: '3em auto' }}>
            <Badge bg="secondary">{post.createDateTime}</Badge>
            <Card.Img variant="top" src={post.imageLocation} />
            <Card.Body>
            <Card.Title>{post.treeCommonNameName}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Reported by: {post.userProfile.displayName}</Card.Subtitle>
            <Card.Body style={{textIndent: '2rem'}}>
                <Row ><Col xs={4}>Address: </Col>
            <Col xs={8}>{post.streetAddress}{" "}{post.city}{", "}{post.state}{" "}{post.zip} </Col></Row>

            <Row>
            <Col xs={4}>Ward: </Col>
            <Col>{ post.wardName }</Col>  
            </Row>

            <Row>
            <Col xs={4}>Latitude: </Col>
            <Col>{post.latitude}</Col>
            </Row>

            <Row>
             <Col xs={4}>Longitude: </Col>
            <Col>{post.longitude}</Col>   
            </Row>
            
            <Row>
             <Col xs={5}>
             Health Status:
             </Col>
             <Col>{ post.healthStatusName }</Col>   
            </Row>

            <Row>
             <Col xs={5}>Property Type: </Col>
            <Col>{ post.ownershipName }</Col>   
            </Row>

            <Row>
             <Col xs={5}>Heritage Status: </Col>
            <Col>{ post.heritageStatusName } </Col>   
            </Row>
            </Card.Body>
            <div className="d-grid gap-2">

            {currentUserType !==2 ? 
                <Row>
                    <Col md={6} className="mb-2">
                    {/* <Button variant="primary" size="md" disabled>
                        Edit
                    </Button> */}
                    </Col>
                    <Col md={6} className="mb-2">
                    <Button onClick={toggleShowA} className="mb-2">
                    Add Maintenance to this Post
                    </Button>

                    <Toast show={showA} onClose={toggleShowA}>
                    <Toast.Header>
                        
                        <strong className="me-auto">Add maintenance to this post</strong>
                        
                    </Toast.Header>
                    <Toast.Body>
                        <ManageMaintenanceForm/>
                    </Toast.Body>
                    </Toast>

                    </Col>
                </Row>: null}

            </div>
            </Card.Body>
        </Card>
        </div>
      </div>
    </div>
    )
}