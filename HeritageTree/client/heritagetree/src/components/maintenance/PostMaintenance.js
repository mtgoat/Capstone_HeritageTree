import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Accordion, Button } from "react-bootstrap";
import { Post } from "../post/Post";
import "../../index.css";
import { Link } from "react-router-dom";


export const PostByMList = ({PostMaintenanceProp}) => {
  
    const { postsByM, getPostsByMaintenanceId } = useContext(PostContext);
  
const PMid = PostMaintenanceProp.id
    useEffect(() => {
        getPostsByMaintenanceId(PMid);
    }, []);
    console.log("posts ", postsByM);
    return (
        <>
        
        <div className="container">
        <h3 className="post__title">List of Heritage Trees:</h3>
          <div className="row justify-content-center">
            <div className="col-sm-10 col-lg-10">
              <Accordion defaultActiveKey="0">
                {postsByM.map((p) => (
                  <Post key={p.id} post={p} />
                ))}
              </Accordion>
            </div>
          </div>
        </div>
        </>
      );
    };