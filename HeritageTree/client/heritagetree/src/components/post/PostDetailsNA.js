import React, {useState, useEffect, useContext} from "react";
import { PostContext } from "../../providers/PostProvider";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Badge, Col } from "react-bootstrap";

export const PostDetailsNA = () => {
    const [post, setPost] = useState();
    const {getNPPostById} = useContext(PostContext);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getNPPostById(id)
        .then(setPost);
    }, [])

    // console.log(post, post.isApproved)

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
       
        <Card style={{ width: '35rem', margin: '3em auto' }}>
            <Badge bg="secondary">{post.createDateTime}</Badge>
            <Card.Img variant="top" src={post.imageLocation} />
            <Card.Body>
            <Card.Title>{post.treeCommonNameName}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Reported by: {post.userProfile.displayName}</Card.Subtitle>
            <Card.Text style={{textIndent: '2rem'}}>
                <Col>Address: </Col>
                <Col>{post.streetAddress}{" "}{post.city}{" "}{post.state}{" "}{post.zip} </Col>
                <Col>Latitude: </Col>
                <Col>{post.latitude}</Col>
                <Col>Longitude: </Col>
                <Col>{post.longitude}</Col>
                <Col> Ward: </Col>
                <Col>{ post.wardName }</Col>
                <Col> HealthStatusName: </Col>
                <Col>{ post.healthStatusName }</Col>
                <Col> Location Ownership Type: </Col>
                <Col>{ post.ownershipName }</Col>
                <Col> Heritage Status: </Col>
                <Col>{ post.HeritageStatusName ?? 'Not Assigned'}</Col>
                <Col> Heritage Status Approved Date: { post.HeritageDateTime ?? 'Not Assigned'}</Col>
                <Col> Heritage Approval Status: { post.isApproved ? 'Approved' : 'Not Approved' }</Col>
                </Card.Text>
            <div className="d-grid gap-2">
                <Button variant="primary" size="md" onClick={() => navigate(`/post/edit/${post.id}`)}>
                    Edit
                </Button>
                <Button variant="secondary" size="md" disabled>
                    Delete
                </Button>
            </div>
            </Card.Body>
        </Card>
        </div>
      </div>
    </div>
    )
}