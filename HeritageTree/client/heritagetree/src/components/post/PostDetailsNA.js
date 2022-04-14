import React, {useState, useEffect, useContext} from "react";
import { PostContext } from "../../providers/PostProvider";
import { useParams, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Card, Button, Badge } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
export const PostDetailsNA = () => {
    const [post, setPost] = useState();
    const {getNPPostById, hardDeletePost} = useContext(PostContext);
    const {id} = useParams();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));

    useEffect(() => {
        getNPPostById(id)
        .then(setPost);
    }, [])

    // console.log(post.heritageStatusId, post.HeritageStatusName)
    // // console.log(post, post.isApproved)

    if (!post) {
        return null;
    }

    // let month = post.publishDateTime.slice(0,10).split("-")[1]
    // let day = post.publishDateTime.slice(0,10).split("-")[2]
    // let year = post.publishDateTime.slice(0,10).split("-")[0]
    // const formattedDate = `${month}-${day}-${year}`;
    const onClickDeleteHandler = () =>  {
       
        hardDeletePost(post.id).then(
            navigate(handleClose)).then(navigate('/posts')); 
        };

        const handleShowIfAdmin = () =>  {
            if(currentUser.userTypeId === 1){
                handleShow()
            }else{
                alert("No can do")
            } 
    };

    return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
       
        <Card border="danger" style={{ width: '35rem', margin: '3em auto' }}>
            <Badge bg="secondary">{post.createDateTime}</Badge>
            <Card.Img variant="top" src={post.imageLocation} />
            <Card.Body>
            <Card.Title>{post.treeCommonNameName}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Reported by: {post.userProfile.displayName}</Card.Subtitle>
            <Card.Body
 style={{textIndent: '2rem'}}>
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
            
            <Row>
            <Col> Heritage Status  Date: </Col><Col> { post.HeritageDateTime}</Col>
            </Row>    
                
            <Row>
            <Col> Heritage Approval Status:</Col><Col>{ post.isApproved}</Col>    
            </Row>
                 {/* { post.isApproved ? 'Approved' : 'Not Approved' } */}
                </Card.Body>
            <div className="d-grid gap-2">
                <Button variant="primary" size="md" onClick={() => navigate(`/postsNA/edit/${post.id}`)}>
                    Edit
                </Button>
                <Button variant="secondary" size="md" onClick={handleShowIfAdmin}>
                    Delete
                </Button>
            </div>
            </Card.Body>
        </Card>

        <Modal show={show} onHide={handleClose}>
<Modal.Header closeButton>
<Modal.Title>Delete Post Forever, Recovery impossible</Modal.Title>
</Modal.Header>
<Modal.Body>
    <Col>Tree Name: {post.treeCommonNameName} </Col>
    <Col>Report ID: {post.id} </Col>
    <Col> coordinates: {post.latitude}, {post.longitude} </Col>
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={onClickDeleteHandler}>
    Confirm Delete
  </Button>
  <Button variant="primary" onClick={handleClose}>
    Cancel Delete
  </Button>
</Modal.Footer>
</Modal>
        </div>
      </div>
    </div>
    )
}