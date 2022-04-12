import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand,
 Nav, NavItem, NavLink} from 'reactstrap';
import { UserProfileContext } from "../../providers/UserProfileProvider";

export const Header = () => {
  const { isLoggedIn, logout } = useContext(UserProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isArbor, setIsArbor] = useState(false);
  
  // const userTypeId = JSON.parse(sessionStorage.getItem('userProfile'))?.userTypeId
  // if (userTypeId === 3 ){
  //   setIsArbor(true);
  // }
  const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={RRNavLink} to="/">Heritage Trees </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { /* When isLoggedIn === true, we will render the Home link */ }
            {   isLoggedIn &&
              <NavItem>
                <NavLink tag={RRNavLink} to="/">Home |</NavLink>
                <NavLink tag={RRNavLink} to="/posts">Posts |</NavLink>
                <NavLink>Account Type: {currentUser.userTypeName} </NavLink>
              </NavItem>
              
            }
            {/* { isArbor && 
              <NavItem>
                <NavLink tag={RRNavLink} to="/maintenance">/Maintenance |</NavLink>
              </NavItem>
            } */}
          </Nav>
          <Nav navbar>
            {isLoggedIn &&
              <>
                <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}