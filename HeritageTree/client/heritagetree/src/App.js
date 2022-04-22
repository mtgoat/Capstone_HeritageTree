import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { HealthStatusProvider } from "./providers/HealthStatusProvider";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { OwnershipProvider } from "./providers/OwnershipProvider";
import { HeritageStatusProvider } from "./providers/HeritageStatusProvider";
import { TreeCommonNameProvider } from "./providers/TreeCommonNameProvider";
import { WardProvider } from "./providers/WardProvider";
import { MaintenanceProvider } from "./providers/MaintenanceProvider";
import { PostProvider } from "./providers/PostProvider";

import { Header } from "./components/nav/Header";
import ApplicationViews from "./components/ApplicationViews";


export const App = () => {
  // const {isLoggedIn } = useContext(UserProfileContext);
  return (
    <Router>
     
      {/* <WardProvider>
      <TreeCommonNameProvider>
      <HeritageStatusProvider>
      <OwnershipProvider>
      <HealthStatusProvider>
      
      <MaintenanceProvider>
      <PostProvider> */}
<UserProfileProvider>

      <Header /> 
      <ApplicationViews />
      
 </UserProfileProvider>
      {/* </PostProvider>
      </MaintenanceProvider>
     
      </HealthStatusProvider>
      </OwnershipProvider>
      </HeritageStatusProvider>
      </TreeCommonNameProvider>
      </WardProvider> */}
      
    </Router>
  );
}

