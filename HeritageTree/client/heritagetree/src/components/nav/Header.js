import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, NavItem, NavLink, Container} from 'reactstrap';
import { UserProfileContext } from "../../providers/UserProfileProvider";
import './header.css'

export const Header = () => {
  const { isLoggedIn, logout } = useContext(UserProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const currentUserType = currentUser?.userTypeId;
  
  

  return (
    <div >
      <Navbar className='nav' color="light" light expand="lg" >
      <Container fluid>
        <NavbarBrand tag={RRNavLink} to="/">Heritage Tree </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { /* When isLoggedIn === true, we will render the Home link */ }
            {   isLoggedIn &&
            <>
              <NavItem>
                <NavLink tag={RRNavLink} to="/">Home |</NavLink>
                </NavItem>
                <NavItem>
                <NavLink tag={RRNavLink} to="/posts">Trees |</NavLink>
                <NavLink  tag={RRNavLink} to="/myPosts">My trees </NavLink>
                <NavLink>Account Type: {currentUser.userTypeName} </NavLink>
              </NavItem>
              </>
            }
            { (isLoggedIn && currentUserType !==2)  && 
              <NavItem>
                <NavLink tag={RRNavLink} to="/maintenances">Maintenance |</NavLink>
              </NavItem>
            } 
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
        </Container>
      </Navbar>
    </div>
  );
}