import React, { useContext, useEffect } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Accordion } from "react-bootstrap";



export const UserList = () => {
  
    const { users, getAllUsers } = useContext(UserProfileContext);
  
    useEffect(() => {
        getAllUsers();
    }, []);
    console.log("UserProfiles ", users);
    return (
        <>
        
        <div className="container">
        <h3 className="userProfile__title">List of UserProfiles:</h3>
          <div className="row justify-content-center">
            <div className="col-sm-10 col-lg-10">
              <Accordion defaultActiveKey="0">
                {users.map((u) => (
                  <Accordion.Item eventKey={u.id}>{u.displayName}
                  </Accordion.Item  >
                ))}
              </Accordion>
            </div>
          </div>
        </div>
        </>
      );
    };