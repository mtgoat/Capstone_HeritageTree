import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Accordion, Button, Row, Col } from "react-bootstrap";
import { Post } from "./Post";
// import "../../index.css";
import { Link } from "react-router-dom";
import "./post.css"

export const PostList = () => {
  
    const { posts, getAllPosts } = useContext(PostContext);
  
    useEffect(() => {
      getAllPosts();
    }, []);
    console.log("posts ", posts);
    return (
      <article id="postList__container">
       <Row >
          
          <Col xs={6} md={4} ><div className="postList__LeftContainer">
          <h5 className="postList__welcome"> Welcome to the Heritage tree page</h5>
        <Link to={`/posts/cor/create`}>
          <Button className="postList__createButton">Nominate a heritage tree</Button>
        </Link></div>
          </Col>
          
          <Col xs={12} md={8}>
          <h3 className="postList__title">List of Heritage Trees:</h3>
          <div className="row justify-content-center">
            <div className="col-sm-10 col-lg-10">
              <Accordion defaultActiveKey="0">
                {posts.map((p) => (
                  <Post key={p.id} post={p} />
                ))}
              </Accordion>
            </div>
          </div>
          </Col>
       </Row>
        </article>
      );
    };