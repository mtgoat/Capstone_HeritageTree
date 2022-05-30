import React, { useState, useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Accordion, Button, Row, Col } from "react-bootstrap";
import { PostNA } from "./PostNA";
import "../../index.css";


export const PostListNA = () => {
  
    const { nonAppPosts, getAllNonAppPosts, getAllPostsByHeritageId } = useContext(PostContext);
    
    const [ allNonHeritagePosts, setAllNonHeritagePosts ] = useState([]);


    useEffect(() => {
      getAllNonAppPosts();
    }, []);
console.log(nonAppPosts)

useEffect(() => {
  getAllPostsByHeritageId(2)
  .then(setAllNonHeritagePosts);;
}, []);

console.log(allNonHeritagePosts)
    return (
        <>
        {/* <Link to={`/posts/cor/create`}>
          <Button className="post__create">Create Post</Button>
        </Link> */}
        <div className="container">
          <Row>
            <Col xs={9} md={6}>
            <h3 className="postNAList__title">List of Pending Trees</h3> <div className="row justify-content-center">
            <div className="col-sm-10 col-lg-10 postNAListColumn">
              <Accordion defaultActiveKey="0">
                {nonAppPosts.map((p) => (
                  <PostNA key={p.id} post={p} />
                ))}
              </Accordion>
            </div>
          </div>
            </Col>
            <Col xs={9} md={6}> <h3 className="postNAList__title">List of  Denied Trees </h3>
            <div className="row justify-content-center">
            <div className="col-sm-10 col-lg-10 postNAListColumn">
            <Accordion defaultActiveKey="0">
                {allNonHeritagePosts.map((p) => (
                  <PostNA key={p.id} post={p} />
                ))}
              </Accordion>
            </div>
            </div>
            </Col>
          </Row>
       
         
        </div>
        </>
      );
    };