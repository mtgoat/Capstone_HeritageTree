import React, {useContext} from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider, UserProfileContext  } from "./providers/UserProfileProvider";
import { Header } from "./components/nav/Header";
import ApplicationViews from "./components/ApplicationViews";

export const App = () => {
  // const {isLoggedIn } = useContext(UserProfileContext);
  return (
    <Router>
      <UserProfileProvider>
      <Header /> 
      <ApplicationViews />
      </UserProfileProvider>
    </Router>
  );
}

