import React, { useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { ApplicationViewsNotLogIn, ApplicationViewsPub, ApplicationViewsArb, ApplicationViewsAdmin } from "./ApplicationViewsSelect";

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);
  
    console.log((sessionStorage.getItem('userProfile')));

    const userTypeId = JSON.parse(sessionStorage.getItem('userProfile'))?.userTypeId
console.log(userTypeId);
    if (!isLoggedIn || userTypeId === null) {
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
  