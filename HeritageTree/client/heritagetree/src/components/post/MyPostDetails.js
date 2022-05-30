import React, {useState, useEffect, useContext} from "react";
import { PostContext } from "../../providers/PostProvider";
import { useParams, useNavigate, Link  } from "react-router-dom";
import { Card, Button, Badge } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const MyPostDetails = ({myPost}) => {
    // const [myPost, setMyPost] = useState();
    // const {getMyPostById} = useContext(PostContext);
    // const {id} = useParams();

    // console.log("useParam", id)
    // useEffect(() => {
    //     getMyPostById(id)
    //     .then(setMyPost);
    //    debugger
    // }, [])
   
    // console.log("this is post at MyPost", myPost)
    // if (!myPost) {
    //     return null;
    // }
    return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-12 col-lg-6" >
           
            <Card border="success"  style={{ width: '30rem', margin: '3em auto' }}>
                <Badge bg="secondary">{myPost.createDateTime}</Badge>
                
               { myPost.imageLocation === ""?  <Card.Img variant="top" src='/images/noImageAvailable.png' alt='No Image Available'className="noImageAvailable"/> : <Card.Img variant="top" src={myPost.imageLocation} /> 
                } 
                
                
                <Card.Body>
                <Card.Title>{myPost.treeCommonNameName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Reported by: {myPost.userProfile?.displayName}</Card.Subtitle>
                {/* <Card.Body style={{textIndent: '2rem'}}> */}
                    
                <Row >
                <Col xs={4}>Address: </Col>
                <Col xs={8}>{myPost.streetAddress}{" "}{myPost.city}{", "}{myPost.state}{" "}{myPost.zip} </Col>
                </Row>
    
                <Row>
                <Col xs={4}>Ward: </Col>
                <Col>{ myPost.wardName }</Col>  
                </Row>
    
                <Row>
                <Col xs={4}>Latitude: </Col>
                <Col>{myPost.latitude}</Col>
                </Row>
    
                <Row>
                 <Col xs={4}>Longitude: </Col>
                <Col>{myPost.longitude}</Col>   
                </Row>
                
                <Row>
                 <Col xs={5}>
                 Health Status:
                 </Col>
                 <Col>{ myPost.healthStatusName }</Col>   
                </Row>
    
                <Row>
                 <Col xs={5}>Property Type: </Col>
                <Col>{ myPost.ownershipName }</Col>   
                </Row>
    
                <Row>
                 <Col xs={5}>Heritage Status: </Col>
                <Col>{ myPost.heritageStatusName } </Col>   
                </Row>
    
                </Card.Body>
            </Card>
            </div>
          </div>
        </div>
        )

}