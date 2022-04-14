import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Accordion, Button } from "react-bootstrap";
import { PostNA } from "./PostNA";
import "../../index.css";
import { Link } from "react-router-dom";

export const PostListNA = () => {
  
    const { nonAppPosts, getAllNonAppPosts } = useContext(PostContext);
  
    useEffect(() => {
      getAllNonAppPosts();
    }, []);
console.log(nonAppPosts)
    return (
        <>
        {/* <Link to={`/posts/cor/create`}>
          <Button className="post__create">Create Post</Button>
        </Link> */}
        <div className="container">
        <h3 className="post__title">List of Non Approved Posts:</h3>
          <div className="row justify-content-center">
            <div className="col-sm-10 col-lg-10">
              <Accordion defaultActiveKey="0">
                {nonAppPosts.map((p) => (
                  <PostNA key={p.id} post={p} />
                ))}
              </Accordion>
            </div>
          </div>
        </div>
        </>
      );
    };