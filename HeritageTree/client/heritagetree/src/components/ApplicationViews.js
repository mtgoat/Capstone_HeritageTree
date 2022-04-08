import React, { useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { ApplicationViewsNotLogIn, ApplicationViewsPub, ApplicationViewsArb, ApplicationViewsAdmin } from "./ApplicationViewsSelect";

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);
  
    const userTypeId = JSON.parse(localStorage.getItem('userProfile')).userTypeId

    if (!isLoggedIn) {
      return (
        <ApplicationViewsNotLogIn/>
      );
    }
    else {
    
      switch (userTypeId) {
        case 1: //Admin
          return( 
          <><ApplicationViewsPub />
          <ApplicationViewsArb/>
          <ApplicationViewsAdmin/></>);
          
         case 3: //Arbor
          return (
          <><ApplicationViewsArb/><ApplicationViewsPub/></>);
          
         default://Public
          return (
          <ApplicationViewsPub/>);
      }}
    
    }
    