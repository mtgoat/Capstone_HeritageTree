import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Accordion, Button } from "react-bootstrap";
import { Post } from "./Post";
import "../../index.css";
import { Link } from "react-router-dom";

export const PostList = () => {
    const { posts, getAllPosts } = useContext(PostContext);
  
    useEffect(() => {
      getAllPosts();
    }, []);

    return (
        <>
        <Link to={`/posts/create`}>
          <Button className="post__create">Create Post</Button>
        </Link>
        <div className="container">
        <h3 className="post__title">List of Posts:</h3>
          <div className="row justify-content-center">
            <div className="col-sm-10 col-lg-10">
              <Accordion defaultActiveKey="0">
                {posts.map((p) => (
                  <Post key={p.id} post={p} />
                ))}
              </Accordion>
            </div>
          </div>
        </div>
        </>
      );
    };