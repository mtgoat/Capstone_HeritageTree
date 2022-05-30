import React from "react";
import { Accordion, Badge, Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Post = ({post}) => {
    // let month = post.publishDateTime.slice(0,10).split("-")[1]
    // let day = post.publishDateTime.slice(0,10).split("-")[2]
    // let year = post.publishDateTime.slice(0,10).split("-")[0]
    // const formattedDate = `${month}-${day}-${year}`;
//     console.log("post is approved?", post.isApproved);
// console.log(post.id)
    return (
        <div className="postList__items">
        <Accordion.Item eventKey={post.id}>
         <Badge bg="secondary">{post.createDateTime}</Badge>
        <Accordion.Header>{post.treeCommonNameName}</Accordion.Header>
        <Accordion.Body>
            <Row>
                <Col>
                    <h5>Heritage Status</h5>
                    {post.heritageStatusName} Tree
                </Col> 
               
                <Col>
                    <Link to={`/posts/${post.id}`}>
                    <Button className="mt-2" variant="secondary">More Info</Button>
                    </Link>
                </Col>

            </Row>
           
        </Accordion.Body>
      </Accordion.Item>
      </div>
    )
}

export const MyPost = ({post}) => {
    // let month = post.publishDateTime.slice(0,10).split("-")[1]
    // let day = post.publishDateTime.slice(0,10).split("-")[2]
    // let year = post.publishDateTime.slice(0,10).split("-")[0]
    // const formattedDate = `${month}-${day}-${year}`;
    console.log("post is approved?", post.isApproved);
console.log(post.id)
    return (
        <div className="postList__items">
        <Accordion.Item eventKey={post.id}>
         <Badge bg="secondary">{post.createDateTime}</Badge>
        <Accordion.Header>{post.treeCommonNameName}</Accordion.Header>
        <Accordion.Body>
            <Row>
                <Col>
                    <h5>Heritage Status</h5>
                    {post.heritageStatusName} Tree
                </Col> 
              
                <Col>
                    <Link to={`/myPosts/${post.id}`}>
                    <Button className="mt-2" variant="secondary">More Info</Button>
                    </Link>
                </Col>

            </Row>
           
        </Accordion.Body>
      </Accordion.Item>
      </div>
    )
}

export const Maint = ({MaintProp}) => {

return (<Row key={MaintProp.id}> 
                <Col xs={5} >Maintenance Item {MaintProp.id}: </Col><Col >{ MaintProp.name }</Col>
                  </Row>)
}