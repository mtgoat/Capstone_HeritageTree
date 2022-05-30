import React, {useState, useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Accordion, Button, Row, Col } from "react-bootstrap";
import { Post, MyPost } from "./Post";
// import "../../index.css";
import { Link } from "react-router-dom";
import "./post.css";
import { MyPostDetails } from "./MyPostDetails";

export const PostList = () => {
  
    const { posts, setPosts, getAllPostsByHeritageId } = useContext(PostContext);
  
    const [ allHeritagePosts, setAllHeritagePosts ] = useState([]);

    useEffect(() => {
      getAllPostsByHeritageId(1)
      .then(setAllHeritagePosts);
    }, []);
    console.log("allHeritagePosts", allHeritagePosts);
    return (
      <article id="postList__container">
        <h5 className="postList__welcome"> Welcome to the Heritage tree page</h5>
       <Row >
          
          <Col xs={9} md={6} ><div className="postList__LeftContainer">
          <p>To nominate a heritage tree click the button below</p>
        <Link to={`/posts/cor/create`}>
          <Button className="postList__createButton">Nominate a heritage tree</Button>
        </Link></div>
          </Col>
          
          <Col xs={9} md={6}>
          <h3 className="postList__title">List of Approved Trees</h3>
          <div className="row justify-content-center">
            <div className="col-sm-10 col-lg-10 postListColumn">
              <Accordion defaultActiveKey="0">
                {allHeritagePosts.map((p) => (
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

    export const MyPostList = () => {
  
      const { posts, getAllPostsByUserId } = useContext(PostContext);
    
      const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
  
      useEffect(() => {
        getAllPostsByUserId(currentUser.id)
      }, []);
 
      console.log("this is post at PostList", posts)
      return (
        <article id="postList__container">
          <h5 className="postList__welcome"> My tree page</h5>
          {posts.map((p) => (
                    <MyPostDetails key={p.id} myPost={p} />
                  ))}         
                  
            {/* <Row >
            
            <Col xs={9} md={6} >
            </Col>
            
            <Col xs={9} md={6}>
            <h3 className="postList__title">List of My Trees</h3>
            <div className="row justify-content-center">
              <div className="col-sm-10 col-lg-10 postListColumn">
                <Accordion defaultActiveKey="0">
                  {posts.map((p) => (
                    <MyPost key={p.id} post={p} />
                  ))}
                </Accordion>
              </div>
            </div>
            </Col>
         </Row> */}
          </article>
        );
      };